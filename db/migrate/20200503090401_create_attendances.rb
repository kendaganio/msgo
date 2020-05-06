class CreateAttendances < ActiveRecord::Migration[6.0]
  def change
    create_table :attendances do |t|
      t.datetime :time_in_at
      t.datetime :time_out_at
      t.belongs_to :contractor

      t.timestamps
    end
  end
end
