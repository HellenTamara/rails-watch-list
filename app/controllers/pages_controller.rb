class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]
  def home
    @public_user = User.find_by(email: "public@user.com")
    @lists = List.all.where(user_id: @public_user)
  end
end
