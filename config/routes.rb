Rails.application.routes.draw do
  devise_for :users
  use_doorkeeper

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/me', to: 'credentials#me'

      resources :contractors do
        member { post :attendances }
      end
      resources :attendances
      resources :payrolls
    end
  end

  root to: 'static#home'
  get '*path', to: 'static#home', constraints: ->(req) { req.format == :html }
end
