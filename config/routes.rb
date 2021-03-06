Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :users
  use_doorkeeper
  ActiveAdmin.routes(self)

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/me', to: 'credentials#me'

      resources :contractors do
        member { post :attendances }
      end
      resources :attendances
      resources :payrolls do
        member do
          post :finalize
          get :csv
        end
      end
      resources :payouts
      resources :payslips
    end
  end

  root to: 'static#home'
  get '*path', to: 'static#home', constraints: ->(req) { req.format == :html }
end
