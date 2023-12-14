Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3000', 'http://127.0.0.1:8000'
      resource '*', 
        headers: :any, credentials: true, 
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        expose: ['X-CSRF-Token']
    end
    
  end