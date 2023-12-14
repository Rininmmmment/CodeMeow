class ChapterController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :is_login
  before_action :set_chapter, only: [:show, :update, :destroy]

  def index
    @chapters = Chapter.all
    render json: {chapters: @chapters, login_user: @current_user}
  end

  def show
    render json: @chapter
  end

  def create
    @chapter = Chapter.new(chapter_params)

    if @chapter.save
      render json: @chapter, status: :created
    else
      render json: @chapter.errors, status: :unprocessable_entity
    end
  end

  def update
    if @chapter.update(chapter_params)
      render json: @chapter
    else
      render json: @chapter.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @chapter.destroy
    head :no_content
  end

  private

  def set_chapter
    @chapter = Chapter.find(params[:id])
  end

  def chapter_params
    # params.require(:chapter).permit(:chapter_name, :email, :password)
    params.permit(:chapter_name)
  end
end
