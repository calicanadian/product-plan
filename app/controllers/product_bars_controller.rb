class ProductBarsController < ApplicationController
  def create
    product_lane_id = params[:product_lane_id]
    product_bar = ProductBar.create(name: "#{product_lane.name} - #{rand(0..100)}", product_lane_id: product_lane_id)
    if product_bar
      render json: { product_bar: product_bar, user: @current_user, status: 'created'}
    else
      render json: { status: 500 }
    end
  end
end
