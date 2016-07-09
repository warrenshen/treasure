# == Schema Information
#
# Table name: geo_notes
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  latitude   :decimal(, )
#  longitude  :decimal(, )
#  phone_id   :string
#  upvotes    :integer
#  downvote   :integer
#  note_text  :string
#
# Indexes
#
#  index_geo_notes_on_latitude_and_longitude  (latitude,longitude)
#  index_geo_notes_on_phone_id                (phone_id)
#

class GeoNote < ApplicationRecord
  acts_as_mappable default_units: :miles,
                   default_formula: :sphere,
                   distance_field_name: :distance,
                   lat_column_name: :latitude,
                   lng_column_name: :longitude
end
