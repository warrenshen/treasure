# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  device_id  :string
#

class User < ApplicationRecord
  acts_as_voter

  has_many :geo_notes
end
