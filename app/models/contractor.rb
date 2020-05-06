class Contractor < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :job_title, presence: true
  validates :hourly_rate, presence: true

  has_many :attendances

  def full_name
    [first_name, last_name].join(' ')
  end

  def attendance_events
    attendances.map(&:to_calendar_event)
  end

  def image_url
    "https://api.adorable.io/avatars/200/#{first_name.parameterize}.png"
  end
end
