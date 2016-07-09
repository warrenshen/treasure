Rails.application.routes.draw do
  post 'geo_notes/in_bounds', to: 'geo_notes#in_bounds'
  resources :geo_notes, only: [:show, :create]
end
