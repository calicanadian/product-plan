class SessionsController < ApplicationController
  include CurrentUserConcern
  skip_before_action :verify_authenticity_token

  def create
    user = User.find_by(email: params[:user][:email]).try(:authenticate, params[:user][:password])
    if user
      session[:user_id] = user.id
      render json: { status: :created, logged_in: true, user: user }
    else
      render jsoon: { status: 401 }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end

  def logged_in
    if @current_user
      render json: { logged_in: true, user: @current_user }
    else
      # normally we would send back logged in false and redirect to login
      # render json: { logged_in: false }
      user = User.create(email: "sometestuser#{rand(0..9000)}@testing.com", password: "productplandemo", steps_completed: "0,1,2")
      if user
        session[:user_id] = user.id
        render json: { status: :created, logged_in: true, user: user}
      else
        render json: {status: 401}
      end
    end
  end

end
