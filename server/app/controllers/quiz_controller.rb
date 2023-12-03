class QuizController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_quiz, only: [:show, :update, :destroy]

  def index
    @quizzes = Quiz.all
    render json: @quizzes
  end

  def show
    render json: @quiz
  end

  def create
    @quiz = Quiz.new(quiz_params)

    if @quiz.save
      render json: @quiz, status: :created
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  def update
    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @quiz.destroy
    head :no_content
  end

  private

  def set_quiz
    @quiz = Quiz.find(params[:id])
  end

  def quiz_params
    # params.require(:quiz).permit(:quiz_name, :email, :password)
    params.permit(:question, :answer, :chapter_id, :section_id, :result_id, :user_id)
  end
end
