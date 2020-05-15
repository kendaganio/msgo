class Attendance < ApplicationRecord
  default_scope { order(time_in_at: :desc) }

  belongs_to :contractor

  before_save :compute_hours

  def compute_hours
    hrs = ((time_out_at - time_in_at) / 60 / 60).floor
    hrs = hrs - 1 if hrs > 8
    self.raw_hours = hrs
    self.overtime_hours = compute_ot_hours
    self.regular_hours = self.raw_hours - self.overtime_hours
  end

  def compute_ot_hours
    day = self.time_in_at.in_time_zone('Asia/Hong_Kong').strftime('%w').to_i
    return self.raw_hours if day == 0
    self.raw_hours < 8 ? 0 : self.raw_hours - 8
  end
end
