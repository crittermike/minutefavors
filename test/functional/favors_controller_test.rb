require 'test_helper'

class FavorsControllerTest < ActionController::TestCase
  setup do
    @favor = favors(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:favors)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create favor" do
    assert_difference('Favor.count') do
      post :create, favor: @favor.attributes
    end

    assert_redirected_to favor_path(assigns(:favor))
  end

  test "should show favor" do
    get :show, id: @favor
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @favor
    assert_response :success
  end

  test "should update favor" do
    put :update, id: @favor, favor: @favor.attributes
    assert_redirected_to favor_path(assigns(:favor))
  end

  test "should destroy favor" do
    assert_difference('Favor.count', -1) do
      delete :destroy, id: @favor
    end

    assert_redirected_to favors_path
  end
end
