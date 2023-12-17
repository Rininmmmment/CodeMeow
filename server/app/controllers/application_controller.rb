class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception, unless: -> { request.format.json? }
  
  skip_before_action :verify_authenticity_token, only: :create

  def create
    user = User.find_by(email: params[:email])
    if user && BCrypt::Password.new(user.password_digest) == params[:password]
      render json: { message: 'Login successful!', user_id: user.id }, status: :ok
    else
      render json: { message: 'Login failed. Invalid email or password.' }, status: :unauthorized
    end
  end    
  
  def destroy
    session[:user_id] = nil
    session[:token] = nil
    render json: { message: 'Logout successful!' }
  end
end
  