FactoryBot.define do
  factory :oauth_access_token, class: 'Doorkeeper::AccessToken' do
    application factory: :oauth_application

    expires_in { 2.hours }
    scopes { 'public' }
  end
end
