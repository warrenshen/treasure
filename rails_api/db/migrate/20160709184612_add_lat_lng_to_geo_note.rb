class AddLatLngToGeoNote < ActiveRecord::Migration[5.0]
  def change
    add_column :geo_notes, :latitude, :decimal
    add_column :geo_notes, :longitude, :decimal
    add_index :geo_notes, [:latitude, :longitude]
  end
end
