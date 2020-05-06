FactoryBot.define do
  factory :contractor do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    daily_rate { Faker::Number.number(digits: 3) }
  end
end
