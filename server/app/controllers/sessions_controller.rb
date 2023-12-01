class SessionsController < ApplicationController
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
end
