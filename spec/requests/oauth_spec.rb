require 'rails_helper'

describe 'OAuth' do
  describe 'POST /oauth/token' do
    let(:user) { create :user }

    context 'invalid login' do
      before do
        post '/oauth/token',
             params: {
               grant_type: 'password',
               username: user.email,
               password: 'herpderp'
             }
      end

      it 'shows the error' do
        expect(json).to include(error: 'invalid_grant')
      end

      it 'returns 400' do
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'valid login' do
      before do
        post '/oauth/token',
             params: {
               grant_type: 'password',
               username: user.email,
               password: user.password
             }
      end

      it 'returns the access token' do
        expect(json).to have_key(:access_token)
        expect(json).to have_key(:token_type)
        expect(json).to have_key(:expires_in)
      end

      it 'returns 200' do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
