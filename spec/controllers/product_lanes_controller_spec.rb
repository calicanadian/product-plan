require 'rails_helper'

RSpec.describe ProductLanesController, type: :controller do
  let(:user) { create(:user) }

  before(:each) do
    request.session[:user_id] = user.id
    5.times do
      ProductLane.create(name: rand(0..10000), user_id: user.id)
    end
    @product_lanes = user.product_lanes
  end

  describe '#product_lanes' do
    context 'when getting product lanes' do

      before do
        get :index
      end

      it 'gets current user product lanes' do
        @expected = {
          product_lanes: @product_lanes,
          user: user,
          status: "found"
        }.to_json
        expect(response.body).to eq(@expected)
      end
    end

    context 'when creating a new product lane' do
      before do
        post :create
      end

      it 'creates a new product lane' do
        @expected = {
          product_lane: ProductLane.last,
          user: user,
          status: "created"
        }.to_json
        expect(response.body).to eq(@expected)
      end
    end
  end
end
