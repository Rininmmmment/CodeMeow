Rails.application.routes.draw do
  # - GET /users： ユーザー一覧を取得
  # - GET /users/:id：特定のユーザーの詳細を取得
  # - POST /users：ユーザーを作成
  # - PATCH/PUT /users/:id：特定のユーザーを更新
  # - DELETE /users/:id：特定のユーザーを削除

  # user
  resources :users, controller: 'user', only: [:index, :show, :create, :update, :destroy]

  # Chapters
  post 'chapter/create' => 'chapters#create'
  get 'chapter/read' => 'chapters#read'
  # patch 'chapter/update' => 'chapters#update'
  # delete 'chapter/delete' => 'chapters#delete'

  # Sections
  post 'section/create' => 'sections#create'
  get 'section/read' => 'sections#read'
  # patch 'section/update' => 'sections#update'
  # delete 'section/delete' => 'sections#delete'

  # Results
  post 'result/create' => 'results#create'
  get 'result/read' => 'results#read'
  # patch 'result/update' => 'results#update'
  # delete 'result/delete' => 'results#delete'

  # Quizzes
  post 'quiz/create' => 'quizzes#create'
  get 'quiz/read' => 'quizzes#read'
  # patch 'quiz/update' => 'quizzes#update'
  # delete 'quiz/delete' => 'quizzes#delete'

end
