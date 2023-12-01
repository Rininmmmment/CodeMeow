class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session, if: -> { request.format.json? }
    helper_method :current_user, :logged_in?

    def create
      user = User.find_by(user_name: params[:user_name])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { message: 'Login successful!' }
      else
        render json: { message: 'Login failed. Invalid email or password.' }, status: :unauthorized
      end
    end
    
    def destroy
      session[:user_id] = nil
      render json: { message: 'Logout successful!' }
    end
  
    def current_user
      @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end
  
    def logged_in?
      if current_user
        render json: { message: 'Login', user: current_user }
      else
        render json: { message: 'Not logged in' }, status: :unauthorized
      end
    end
  end
  