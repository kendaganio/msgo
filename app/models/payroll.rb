class Payroll < ApplicationRecord
  def recorded_attendances
    @recorded_attendances ||=
      Attendance.joins(:contractor).where(
        'time_in_at::DATE >= ? AND time_out_at::DATE <= ?',
        start_date_in_zone,
        end_date_in_zone
      )
  end

  def start_date_in_zone
    DateTime.new(
      start_date.year,
      start_date.month,
      start_date.day,
      0,
      0,
      0,
      '+08:00'
    )
  end

  def end_date_in_zone
    DateTime.new(end_date.year, end_date.month, end_date.day, 0, 0, 0, '+08:00')
  end

  def summary_for_contractor(contractor_id); end

  def payees
    recorded_attendances.reduce({}) do |grouped, att|
      prev =
        grouped[att.contractor_id] ||
          att.contractor.attributes.merge(
            { regular_hours: 0, overtime_hours: 0, days_worked: 0 }
          )
      prev[:regular_hours] += att.regular_hours
      prev[:overtime_hours] += att.overtime_hours
      prev[:days_worked] += 1

      grouped[att.contractor_id] = prev
      grouped
    end
  end

  def dates_covered
    (start_date..end_date).map(&:to_date)
  end
end
