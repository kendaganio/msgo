class Attendance < ApplicationRecord
  belongs_to :contractor

  default_scope { order(time_in_at: :desc) }

  def hours_worked
    hrs = ((time_out_at - time_in_at) / 60 / 60).floor
    hrs = hrs - 1 if hrs > 8
    hrs
  end

  def overtime_hours
    return 0.0 if hours_worked < 8
    hours_worked - 8
  end

  def regular_hours
    hours_worked - overtime_hours
  end

  def to_calendar_event
    { title: "#{hours_worked} hrs.", date: time_in_at.to_date.to_s }
  end
end
