Rails.application.routes.draw do
  resources :geo_notes, only: [:show, :create]
  get 'geo_notes/in_bounds', to: 'geo_notes#in_bounds'
end
