require 'rails_helper'

RSpec.describe ProductBarsController, type: :controller do
  let(:user) { create(:user) }

  before(:each) do
    request.session[:user_id] = user.id
    @productLane = ProductLane.create(name: rand(0..10000), user_id: user.id)
    5.times do
      ProductBar.create(name: "#{@productLane.name} - #{rand(0..100)}", product_lane_id: @productLane.id, column: rand(1..12))
    end
    @product_bars = [user.product_bars]
  end

  describe '#product_bars' do
    context 'when getting product bars' do
      before do
        get :index
      end

      it 'gets current user product bars' do
        @expected = { product_bars: @product_bars }.to_json
        expect(response.body).to eq(@expected)
      end
    end

    context 'when creating a new product bar' do
      before do
        post :create, params: {product_lane_id: @productLane.id, col: rand(1..12)}
      end

      it 'creates a new product bar' do
        @expected = {
          product_bars: ProductBar.last, user: user, status: "created"
        }.to_json
        expect(response.body).to eq(@expected)
      end
    end
  end
end
