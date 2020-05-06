FactoryBot.define do
  factory :oauth_application, class: 'Doorkeeper::Application' do
    name { Faker::Movies::StarWars.character }
    uid { Faker::Alphanumeric.alphanumeric }
    secret { Faker::Alphanumeric.alphanumeric }
    redirect_uri { 'https://localhost:3000' }
  end
end
