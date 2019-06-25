class UsersController < ApplicationController
  include CurrentUserConcern
  skip_before_action :verify_authenticity_token

  def complete_step
    step_completed = params[:step].to_i
    user_steps = Array.wrap(@current_user.steps_completed.gsub(/\[|\]|\s/, '').split(','))
    user_steps << step_completed
    @current_user.steps_completed = user_steps.uniq
    if @current_user.save!
      render json: { status: "updated", user: @current_user, productLanes: @product_lanes, productBars: @product_bars, steps_completed: @current_user.steps_completed }
    else
      render json: { status: 500 }
    end
  end

  def steps_completed
    puts "SESSION::::::   #{session[:user_id]}"
    if @current_user
      steps = Array.wrap(@current_user.steps_completed.gsub(/\[|\]|\s/, '').split(','))
      puts "STEPS:::::::::::: #{steps}"
      render json: {
        user: @current_user, productLanes: @product_lanes, productBars: @product_bars, steps_completed: @completed_steps
      }
    else
      render json: {status: 401}
    end
  end
end
