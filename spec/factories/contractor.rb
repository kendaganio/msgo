FactoryBot.define do
  factory :contractor do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    hourly_rate { Faker::Number.number(digits: 3) }
    job_title { Faker::Job.title }
  end
end
