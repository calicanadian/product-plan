class UsersController < ApplicationController
  include CurrentUserConcern
  skip_before_action :verify_authenticity_token

  def complete_step
    step_completed = params[:step]
    user_steps = JSON.parse(@current_user.steps_completed)
    user_steps << step_completed
    @current_user.steps_completed = user_steps.uniq
    if @current_user.save!
      render json: { status: "updated", steps_completed: @current_user.steps_completed, user: @current_user }
    else
      render json: { status: 500 }
    end
  end

  def steps_completed
    puts "SESSSIONNNNNNNN::::::   #{session[:user_id]}"
    if @current_user
      steps = @current_user.steps_completed.include?(",") ? @current_user.steps_completed.split(",") : @current_user.steps_completed
      render json: {steps_completed: steps, user: @current_user, status: 302}
    else
      render json: {status: 401}
    end
  end
end
