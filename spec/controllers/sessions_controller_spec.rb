require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

  describe '#session' do
    before do
      class SessionsController < ApplicationController
        include CurrentUserConcern
      end
    end
    context 'when user first hits page' do
      before do
        get :logged_in
      end

      it 'sets the confirms session user_id' do
        user = User.first
        parsed_body = JSON.parse(response.body)
        parsed_body["user"]["id"].should == user.id
        parsed_body["user"]["email"].should == user.email
      end
    end

    context 'when user ends session' do
      before do
        post :logout
      end

      it 'resets the session' do
        parsed_body = JSON.parse(response.body)
        parsed_body["status"].should == 200
        parsed_body["logged_out"].should == true
      end
    end
  end
end
