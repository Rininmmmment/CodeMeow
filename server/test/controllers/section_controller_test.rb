require "test_helper"

class SectionControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get section_create_url
    assert_response :success
  end
end
