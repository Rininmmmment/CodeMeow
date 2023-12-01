Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost', 'http://localhost:3000'
      resource '*', methods: :any, headers: :any
    end
  end