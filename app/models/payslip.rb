class Payslip < ApplicationRecord
  belongs_to :contractor
  belongs_to :payroll

  has_many :attendances

  def regular_pay
    regular_hours * hourly_rate
  end

  def overtime_pay
    overtime_hours * hourly_rate * 1.25
  end
end
