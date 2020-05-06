FactoryBot.define do
  factory :user do
    email { Faker::Internet.safe_email }
    password { Faker::Internet.password(min_length: 12) }
  end

  factory :oauth_user do
    after_create { access_tokens << create(:oauth_access_token) }
  end
end
