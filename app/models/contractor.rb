class Contractor < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :job_title, presence: true
  validates :hourly_rate, presence: true

  has_many :attendances

  enum status: %i[active inactive ulol]

  before_create :generate_employee_number

  def generate_employee_number
    current_year = Time.now.year
    last =
      Contractor.where("employee_number LIKE '?%'", current_year).order(
        employee_number: :asc
      ).last

    if last
      employee_number = last.employee_number.to_i + 1
    else
      employee_number = "#{current_year}#{'1'.rjust(5, '0')}"
    end

    self.employee_number = employee_number
  end

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
