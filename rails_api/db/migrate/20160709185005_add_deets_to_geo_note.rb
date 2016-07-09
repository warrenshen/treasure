class AddDeetsToGeoNote < ActiveRecord::Migration[5.0]
  def change
    add_column :geo_notes, :phone_id, :string
    add_column :geo_notes, :upvotes, :int
    add_column :geo_notes, :downvotes, :int
    add_column :geo_notes, :note_text, :string
    add_index :geo_notes, :phone_id
  end
end
