module RequestHelpers
  def json
    parsed = JSON.parse(response.body)
    if parsed.is_a? Hash
      return parsed.with_indifferent_access
    else
      return parsed.map(&:with_indifferent_access)
    end
  end
end

shared_context 'valid oauth_user' do
  let(:oauth_user) { create :user }
  let(:access_token) do
    create :oauth_access_token, resource_owner_id: oauth_user.id
  end
  let(:auth_header) { { 'Authorization' => "Bearer #{access_token.token}" } }
end

RSpec.configure do |config|
  config.include RequestHelpers
  config.include_context 'valid oauth_user'
end
