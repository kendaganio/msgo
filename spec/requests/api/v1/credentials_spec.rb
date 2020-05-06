require 'rails_helper'

describe '/api/v1/me' do
  include_context 'valid oauth_user'

  describe 'me' do
    context 'valid token' do
      it 'returns current authenticated user' do
        get '/api/v1/me', headers: auth_header
        expect(json).to include(email: oauth_user.email, id: oauth_user.id)
      end
    end
  end
end
