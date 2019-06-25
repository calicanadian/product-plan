require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:user) { create(:user) }

  before(:each) do
    request.session[:user_id] = user.id
    @productLane = ProductLane.create(name: rand(0..10000), user_id: user.id)
    5.times do
      ProductBar.create(name: "#{@productLane.name} - #{rand(0..100)}", product_lane_id: @productLane.id, column: rand(1..12))
    end
  end

  describe '#users_controller' do
    context 'when completing a step' do
      before do
        post :complete_step, params: { step: "1" }
      end

      it 'it updates the user.steps_completed column' do
        expect(response).to have_http_status(:success)
      end
    end

    context 'when getting completed steps' do
      before do
        get :steps_completed
      end

      it 'gets the steps completed for current user' do
        @expected = {
          user: user,
          productLanes: user.product_lanes,
          productBars: user.product_bars,
          steps_completed: Array.wrap(user.steps_completed.gsub(/\[|\]|\s/, '').split(','))
        }.to_json
        expect(response.body).to eq(@expected)
      end
    end
  end
end
