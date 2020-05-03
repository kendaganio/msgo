class Contractor < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :daily_rate, presence: true

  def full_name
    [first_name, last_name].join(' ')
  end
end
