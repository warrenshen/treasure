class GeoNoteSerializer < ActiveModel::Serializer
  attributes :id,
             :latitude,
             :longitude,
             :note_text,
             :popularity,
             :note_image_url,
             :upvoted,
             :downvoted

  def note_image_url
    object.note_image.url
  end

  def popularity
    object.votes_for.up.size - object.votes_for.down.size
  end

  def upvoted
    return unless @instance_options[:device_id].present?
    user = User.where(device_id: @instance_options[:device_id]).take
    user.voted_up_on? object
  end

  def downvoted
    user = User.where(device_id: @instance_options[:device_id]).take
    user.voted_down_on? object
  end
end
