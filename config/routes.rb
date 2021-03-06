Rails.application.routes.draw do
  root to: 'pages#index'

  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  post :sign_up, to: "registrations#create"
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  get :steps_completed, to: 'users#steps_completed'
  post 'complete_step/:step', to: 'users#complete_step'
  get :login, to: 'sessions#login'
  get :sign_up, to: 'sessions#sign_up'

  resources :user
  resources :product_lanes
  resources :product_bars

end
