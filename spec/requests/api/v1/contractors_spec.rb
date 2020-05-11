require 'rails_helper'

describe '/api/v1/contractors' do
  include_context 'valid oauth_user'
  let!(:contractors) { create_list :contractor, 5 }

  describe 'index' do
    it 'gets all records' do
      get '/api/v1/contractors', headers: auth_header
      expect(response).to have_http_status(:ok)
      expect(json.size).to eq(contractors.count)
    end
  end

  describe 'create' do
    context 'invalid params' do
      before do
        params = { contractor: { first_name: 'lol', job_title: 'sandblaster' } }
        post '/api/v1/contractors', params: params, headers: auth_header
      end

      it 'returns the correct http status code' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'return the correct errors' do
        expect(json[:errors]).to include(
          "last_name": ["can't be blank"], "hourly_rate": ["can't be blank"]
        )
      end
    end

    context 'valid params' do
      before do
        params = {
          contractor: {
            first_name: 'Ken',
            last_name: 'D',
            hourly_rate: 100,
            job_title: 'sandblaster'
          }
        }
        post '/api/v1/contractors', params: params, headers: auth_header
      end

      it 'returns the created contractor' do
        expect(json).to include(
          first_name: 'Ken',
          last_name: 'D',
          full_name: 'Ken D',
          job_title: 'sandblaster'
        )
      end
    end
  end

  describe 'update' do
    let!(:contractor) { create :contractor }

    before do
      put "/api/v1/contractors/#{contractor.id}",
          params: {
            contractor: {
              last_name: 'newlast', first_name: 'newfirst', hourly_rate: 123
            }
          },
          headers: auth_header
    end

    it 'updates contractor' do
      expect(contractor.reload).to have_attributes(
        last_name: 'newlast', first_name: 'newfirst', hourly_rate: 123.0
      )
    end
  end
end
