class AddImageToGeoNotes < ActiveRecord::Migration[5.0]
  def up
    add_attachment :geo_notes, :note_image
  end

  def down
    remove_attachment :geo_notes, :note_image
  end
end
