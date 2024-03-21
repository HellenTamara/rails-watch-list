class ListsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :show ]
  def index
    @list = List.new
    @user = current_user
    @lists = List.all.where(user: @user)
  end

  def show
    @list = List.find(params[:id])
    @bookmark = Bookmark.new
    @movies = Movie.where.not(id: @list.movies).order(:title)
  end

  def create
    @list = List.new(list_params)
    @list.user = current_user
    if @list.save
      redirect_to list_path(@list)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.destroy
      redirect_to lists_path
    else
      redirect_to lists_path.notice("Sorry, an error occurred")
    end
  end

  private

  def list_params
    params.require(:list).permit(:name, :photo)
  end
end
