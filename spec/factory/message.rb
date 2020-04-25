FactoryBot define do
  factory :message do
    text {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/hage1.jpg")}
    user
    group
  end
end