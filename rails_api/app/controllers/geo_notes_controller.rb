class GeoNotesController < ApplicationController
  def index
    render json: GeoNote.all
  end

  def show
    render json: GeoNote.find(params.require(:id))
  end

  def create
    render json: GeoNote.create(
      params.permit(:latitude, :longitude, :phone_id, :note_text, :note_image)
    )
  end

  def in_bounds
    bounds = params.permit(sw: [:latitude, :longitude], ne: [:latitude, :longitude])
    render json: GeoNote.in_bounds([bounds[:sw].values, bounds[:ne].values]).all
  end
end
