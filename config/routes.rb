Rails.application.routes.draw do
  resources :contractors
  root to: 'static#home'
end
