class ApiController < ActionController::Base
  skip_forgery_protection
  before_action :doorkeeper_authorize!

  def current_user
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  private

  def page
    params[:page] || 1
  end

  def per_page
    params[:per_page] || 1
  end
end
