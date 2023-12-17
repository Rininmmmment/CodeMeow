Rails.application.routes.draw do
  match '*path' => 'options_request#response_preflight_request', via: :options
  post 'read-file', to: 'files#upload'
  # - GET /users： ユーザー一覧を取得
  # - GET /users/:id：特定のユーザーの詳細を取得
  # - POST /users：ユーザーを作成
  # - PATCH/PUT /users/:id：特定のユーザーを更新
  # - DELETE /users/:id：特定のユーザーを削除

  # Users
  resources :users, controller: 'user', only: [:index, :show, :create, :update, :destroy]

  # Chapters
  resources :chapters, controller: 'chapter', only: [:index, :show, :create, :update, :destroy]

  # Sections
  resources :sections, controller: 'section', only: [:index, :show, :create, :update, :destroy]

  # Results
  resources :results, controller: 'result', only: [:index, :show, :create, :update, :destroy]

  # Quizzes
  resources :quizzes, controller: 'quiz', only: [:index, :show, :create, :update, :destroy]

  # Sessions（アクションを変えると爆発する）
  post '/login', to: 'application#create'
  delete '/logout', to: 'application#destroy'
  get '/islogin', to: 'application#is_login'
  get '/get_csrf_token', to: 'application#set_csrf_token_header'
end
