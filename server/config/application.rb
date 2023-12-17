require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Myapp
  class Application < Rails::Application
    config.action_controller.allow_forgery_protection = false
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.api_only = false
    config.session_store :cookie_store, key: '_code_meow_session'
    # config/initializers/session_store.rb

    # Rails.application.config.session_store :cookie_store, key: '_code_meow_session', expire_after: 1.hour
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::Cookies

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
