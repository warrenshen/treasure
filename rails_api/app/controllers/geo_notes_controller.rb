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

  # The default treasure popularity minimum
  def base_popularity
    10
  end

  # The default visible note radius
  def base_radius
    200
  end

  # The maximum visible treasure radius
  def max_radius
    4000
  end

  def popularity(geonote)
    geonote.votes_for.up.size - geonote.votes_for.down.size
  end

  # The number of notes nearby
  def density(geonote)
    center = Geokit::LatLng.new(geonote[:latitude], geonote[:longitude])
    GeoNote.within(base_radius, units: :meters, origin: center).all.size
  end

  # The treasure popularity minimum increases with density
  def is_treasure(geonote)
    influence = 2
    popularity(geonote) >= base_popularity + influence * density(geonote)
  end

  # The visible treasure radius increases with popularity
  def radius(treasure)
    influence = 10
    base_radius + influence * popularity(treasure)
  end

  # Returns a list of visible notes
  def visible_notes
    user = params.permit(:latitude, :longitude)
    center = Geokit::LatLng.new(user[:latitude], user[:longitude])
    render json: GeoNote.within(base_radius, units: :meters, origin: center).all.select{|geonote| not is_treasure(geonote)}
  end

  # Returns a list of visible treasure
  def visible_treasure
    user = params.permit(:latitude, :longitude)
    center = Geokit::LatLng.new(user[:latitude], user[:longitude])
    render json: GeoNote.within(max_radius, units: :meters, origin: center).all.select{|geonote| is_treasure(geonote) \
      and radius(geonote) > center.distance_to(Geokit::LatLng.new(geonote[:latitude], geonote[:longitude]), units: :meters)}
  end

  def upvote
    vote = params.permit(:id, :device_id)
    geonote = GeoNote.find(vote[:id])

    if User.where(device_id: vote[:device_id]).blank?
      User.create(device_id: vote[:device_id])
    end

    geonote.liked_by User.where(device_id: vote[:device_id]).take
    render json: popularity(geonote)
  end

  def downvote
    vote = params.permit(:id, :device_id)
    geonote = GeoNote.find(vote[:id])

    if User.where(device_id: vote[:device_id]).blank?
      User.create(device_id: vote[:device_id])
    end

    geonote.downvote_from User.where(device_id: vote[:device_id]).take
    render json: popularity(geonote)
  end
end
