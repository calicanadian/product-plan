module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
      @product_lanes = @current_user.product_lanes.blank? ? nil : @current_user.product_lanes
      @product_bars = @current_user.product_bars.blank? ? nil : @current_user.product_bars
      @completed_steps = Array.wrap(@current_user.steps_completed.gsub(/\[|\]|\s/, '').split(','))
    end
  end
end
