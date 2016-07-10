class UsersController < ApplicationController
  def create
    Users.create(params.require(:device_id))
  end
end
