Rails.application.routes.draw do
  resources :certificates
  resources :users
  devise_for :users, defaults: { format: :json }
end
