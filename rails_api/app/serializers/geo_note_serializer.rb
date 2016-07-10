class GeoNoteSerializer < ActiveModel::Serializer
  attributes :id,
             :latitude,
             :longitude,
             :note_text,
             :popularity
  
  def popularity
    object.votes_for.up.size - object.votes_for.down.size
  end
end
