class QuizController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_quiz, only: [:show, :update, :destroy]

  def index
    user_id = params[:user_id]
    quizzes = Quiz
      .joins(:chapter, :section)
      .where(user_id: user_id)
      .order('quizzes.created_at ASC')
      .select('quizzes.*, chapters.*, sections.*')
  
    @formatted_quizzes = quizzes.group_by { |quiz| quiz.chapter_name }
      .transform_values do |chapter_quizzes|
        chapter_quizzes.group_by { |quiz| quiz.section_name }
          .transform_values { |section_quizzes| section_quizzes.map { |quiz| quiz.attributes.slice('question', 'answer') } }
      end
  
    render json: @formatted_quizzes
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
    params.permit(:question, :answer, :chapter_id, :section_id, :result, :user_id, :text)
  end
end
