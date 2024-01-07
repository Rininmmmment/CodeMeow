class UserController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :verify_api_key

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def verify_api_key
    api_key = request.headers['Authorization']
    unless valid_api_key?(api_key)
      render json: { error: 'Invalid API key' }, status: :unauthorized
    end
  end

  def valid_api_key?(api_key)
    valid_keys = ['']
    valid_keys.include?(api_key)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    # params.require(:user).permit(:user_name, :email, :password)
    params.permit(:user_name, :email, :password)
  end
end
