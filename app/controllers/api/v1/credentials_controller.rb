class Api::V1::CredentialsController < ApiController
  def me
    render json: UserBlueprint.render(current_user)
  end
end
