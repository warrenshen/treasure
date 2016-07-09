class CreateGeoNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :geo_notes do |t|

      t.timestamps
    end
  end
end
