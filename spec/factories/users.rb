FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password 'foobar'
    steps_completed [0]
  end
end
