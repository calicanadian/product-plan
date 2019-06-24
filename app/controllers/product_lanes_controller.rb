class ProductLanesController < ApplicationController
  include CurrentUserConcern
  skip_before_action :verify_authenticity_token

  def create
    product_lane = ProductLane.create(name: rand(0..10000), user_id: @current_user.id)
    if product_lane
      render json: { product_lane: product_lane, user: @current_user, status: 'created'}
    else
      render json: { status: 500 }
    end
  end
end
