Rails.application.routes.draw do
  post 'geo_notes/my_notes', to: 'geo_notes#my_notes'
  post 'geo_notes/visible_notes', to: 'geo_notes#visible_notes'
  post 'geo_notes/visible_treasure', to: 'geo_notes#visible_treasure'
  post 'geo_notes/upvote', to: 'geo_notes#upvote'
  post 'geo_notes/downvote', to: 'geo_notes#downvote'
  resources :geo_notes, only: [:index, :show, :create]
end
