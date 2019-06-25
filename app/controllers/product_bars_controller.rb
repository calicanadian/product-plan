class ProductBarsController < ApplicationController
  include CurrentUserConcern
  skip_before_action :verify_authenticity_token

  def index
    @product_lanes = ProductLane.where(user: @current_user)
    @product_bars = []
    @product_lanes.each do |lane|
      @product_bars << lane.product_bars
    end
    if !@product_bars.empty?
      puts "PROD BARS:::::: #{@product_bars.inspect}"
      render json: { product_bars: @product_bars }
    else
      puts "::::: 204"
      render json: { user: @current_user, status: "found" }
    end
  end

  def create
    product_lane = ProductLane.find(params[:product_lane_id].to_i)
    column = params[:col].to_i
    puts "LANE:::::::: #{product_lane.inspect}"
    product_bar = ProductBar.create(name: "#{product_lane.name} - #{rand(0..100)}", product_lane_id: product_lane.id, column: column)
    puts "BAR::::::::: #{product_bar.inspect}"
    if product_bar
      render json: { product_bars: product_bar, user: @current_user, status: 'created'}
    else
      render json: { status: 500 }
    end
  end
end
