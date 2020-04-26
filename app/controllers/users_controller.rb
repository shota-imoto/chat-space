class UsersController < ApplicationController
  def index
    return nil if params[:keyword] == ""
    @users = User.where(["name LIKE ?", "%#{params[:keyword]}%"]).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    user = User.find(current_user.id)
    if user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    if current_user.destroy
      redirect_to new_user_session_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
