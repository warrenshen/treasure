class RemoveVotingFromGeoNotes < ActiveRecord::Migration[5.0]
  def change
    remove_column :geo_notes, :upvotes, :int
    remove_column :geo_notes, :downvotes, :int
  end
end
