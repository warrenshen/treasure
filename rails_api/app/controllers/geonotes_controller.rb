class GeoNotesController < ApplicationController
  def show
    # TODO make a serializer for this shit
    GeoNote.find(params.require(:id))
  end

  def create
    GeoNote.new(
      params
        .require(:latitude, :longitude, :phone_id, :note_text)
        .permit(:note_image)
    )
  end

  def in_bounds
    params = params.require(sw: [:latitude, :longitude], ne: [:latitude, :longitude])
    GeoNote.in_bounds([params[:sw], params[:ne]]).all
  end
end
