Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'https://autovice.jp', 'http://localhost:3000'
      resource '*', methods: :any, headers: :any
    end
  end