class AddUserHasManyGeoNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :geo_notes, :device_id, :string
  end
end
