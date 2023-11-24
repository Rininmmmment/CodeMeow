require "test_helper"

class ResultControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get result_create_url
    assert_response :success
  end
end
