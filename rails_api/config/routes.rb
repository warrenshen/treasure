Rails.application.routes.draw do
  post 'geo_notes/in_bounds', to: 'geo_notes#in_bounds'
  post 'geo_notes/upvote', to: 'geo_notes#upvote'
  post 'geo_notes/downvote', to: 'geo_notes#downvote'
  resources :geo_notes, only: [:index, :show, :create]
end
