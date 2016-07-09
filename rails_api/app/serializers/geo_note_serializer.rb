class GeoNoteSerializer < ActiveModel::Serializer
  attributes :id,
             :latitude,
             :longitude
end
