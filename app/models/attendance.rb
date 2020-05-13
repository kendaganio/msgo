class Attendance < ApplicationRecord
  default_scope { order(time_in_at: :desc) }

  belongs_to :contractor

  before_save :compute_hours

  def compute_hours
    hrs = ((time_out_at - time_in_at) / 60 / 60).floor
    hrs = hrs - 1 if hrs > 8
    self.raw_hours = hrs
    self.overtime_hours = self.raw_hours < 8 ? 0 : self.raw_hours - 8

    self.regular_hours = self.raw_hours - self.overtime_hours
  end
end
