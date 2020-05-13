class Contractor < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :job_title, presence: true
  validates :hourly_rate, presence: true

  has_many :attendances
  has_many :payslips
  has_many :payouts

  enum status: %i[active inactive ulol]

  before_create :generate_employee_number

  def attendances_in_range(start_date, end_date)
    attendances.where(
      'time_in_at >= ? AND time_out_at <= ?',
      start_date,
      end_date
    )
  end

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

  def total_ca
    Payout.where(cash_advance: true, contractor_id: self.id).pluck(
      'sum(amount)'
    )[
      0
    ].to_f
  end

  def image_url
    "https://api.adorable.io/avatars/200/#{first_name.parameterize}.png"
  end
end
