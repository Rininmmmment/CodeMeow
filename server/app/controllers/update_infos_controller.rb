class UpdateInfosController < ApplicationController
    before_action :set_update_info, only: [:show, :update, :destroy]
  
    def index
      @update_infos = UpdateInfo.all
      render json: @update_infos
    end
  
    def show
      render json: @update_info
    end
  
    def create
      @update_info = UpdateInfo.new(update_info_params)
  
      if @update_info.save
        render json: @update_info, status: :created
      else
        render json: @update_info.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @update_info.update(update_info_params)
        render json: @update_info
      else
        render json: @update_info.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @update_info.destroy
      head :no_content
    end
  
    private
  
    def set_update_info
      @update_info = UpdateInfo.find(params[:id])
    end
  
    def update_info_params
      params.permit(:title, :content)
    end
end
  