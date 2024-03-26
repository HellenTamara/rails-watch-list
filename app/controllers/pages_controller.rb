class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]
  def home
    @public_user = User.find_by(email: "public@user.com")
    @lists = List.all.where(user_id: @public_user)
    @bookmark = Bookmark.new
    @user_lists = List.all.where(user: current_user)
    if params[:query].present?
      @lists = List.where(user_id: @public_user).joins(:movies).where("movies.title ILIKE ?", "%#{params[:query]}%")
      @movies = Movie.where("title ILIKE ?", "%#{params[:query]}%")
    end
  end
end
