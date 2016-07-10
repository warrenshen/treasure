class GeoNoteSerializer < ActiveModel::Serializer
  attributes :id,
             :latitude,
             :longitude,
             :note_text,
             :popularity,
             :note_image_url

  def note_image_url
    object.note_image.url
  end

  def popularity
    object.votes_for.up.size - object.votes_for.down.size
  end
end
