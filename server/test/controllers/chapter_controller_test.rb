require "test_helper"

class ChapterControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get chapter_create_url
    assert_response :success
  end
end
