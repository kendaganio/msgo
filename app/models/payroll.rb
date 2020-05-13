class Payroll < ApplicationRecord
  has_many :payslips

  def start_date_in_zone
    DateTime.new(
      start_date.year,
      start_date.month,
      start_date.day,
      0,
      0,
      0,
      '+08:00'
    ).utc
  end

  def end_date_in_zone
    DateTime.new(
      end_date.year,
      end_date.month,
      end_date.day,
      23,
      59,
      59,
      '+08:00'
    ).utc
  end

  def payees
    return(
      case status
      when 'final'
        payslips
      else
        DraftPayrollQuery.new(start_date_in_zone, end_date_in_zone).call
      end
    )
  end
end
