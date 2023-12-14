# 使わない

class ResultController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_result, only: [:show, :update, :destroy]

  def index
    @results = Result.all
    render json: @results
  end

  def show
    render json: @result
  end

  def create
    @result = Result.new(result_params)

    if @result.save
      render json: @result, status: :created
    else
      render json: @result.errors, status: :unprocessable_entity
    end
  end

  def update
    if @result.update(result_params)
      render json: @result
    else
      render json: @result.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @result.destroy
    head :no_content
  end

  private

  def set_result
    @result = Result.find(params[:id])
  end

  def result_params
    # params.require(:result).permit(:result_name, :email, :password)
    params.permit(:result)
  end
end
