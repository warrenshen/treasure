class GeoNoteSerializer < ActiveModel::Serializer
  attributes :id,
             :latitude,
             :longitude,
             :note_text,
             :popularity,
             :is_treasure
  
  def popularity
    object.votes_for.up.size - object.votes_for.down.size
  end

  def is_treasure
    object.votes_for.up.size - object.votes_for.down.size > 9
  end
end
