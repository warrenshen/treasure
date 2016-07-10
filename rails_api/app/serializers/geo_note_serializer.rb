class GeoNoteSerializer < ActiveModel::Serializer
  attributes :id,
             :latitude,
             :longitude,
             :note_text
end
