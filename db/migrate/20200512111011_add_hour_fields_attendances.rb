class AddHourFieldsAttendances < ActiveRecord::Migration[6.0]
  def change
    change_table :attendances do |t|
      t.float :raw_hours
      t.float :regular_hours
      t.float :overtime_hours
    end
  end
end
