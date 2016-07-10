class GeoNotesController < ApplicationController
  require 'securerandom'

  def index
    render json: GeoNote.all
  end

  def show
    render json: GeoNote.find(params.require(:id))
  end

  def create
    create_params = params
                    .require(:geo_note)
                    .permit(:latitude, :longitude, :phone_id, :note_text, :note_image)

    # HACK: use the raw params because for some reason permit filters out the base64.
    # probably because it's way too big but yolo
    if params[:note_image].present?
      create_params[:note_image] = Paperclip.io_adapters.for(params[:note_image])
      create_params[:note_image].original_filename = "#{SecureRandom.uuid}.jpg"
    end

    render json: GeoNote.create(create_params)
  end

  def in_bounds
    bounds = params.permit(sw: [:latitude, :longitude], ne: [:latitude, :longitude])
    render json: GeoNote.in_bounds([bounds[:sw].values, bounds[:ne].values]).all
  end

  def upvote
    vote = params.permit(:id, :device_id)
    geonote = GeoNote.find(vote[:id])
    if User.where(device_id: vote[:device_id]).blank?
      User.create(device_id: vote[:device_id])
    end
    geonote.liked_by User.where(device_id: vote[:device_id]).take
    render json: geonote.votes_for.up.size - geonote.votes_for.down.size
  end

  def downvote
    vote = params.permit(:id, :device_id)
    geonote = GeoNote.find(vote[:id])
    if User.where(device_id: vote[:device_id]).blank?
      User.create(device_id: vote[:device_id])
    end
    geonote.downvote_from User.where(device_id: vote[:device_id]).take
    render json: geonote.votes_for.up.size - geonote.votes_for.down.size
  end
end
