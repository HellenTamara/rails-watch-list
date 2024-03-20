Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'

  resources :lists, only: [:index, :show, :new, :create] do
    resources :bookmarks, only: [:new, :create]
  end

  resources :bookmarks, only: [:destroy]
end
