class CreatePayslips < ActiveRecord::Migration[6.0]
  def change
    create_table :payslips do |t|
      t.string :status, default: 'new'
      t.decimal :net_pay, precision: 8, scale: 2
      t.decimal :gross_pay, precision: 8, scale: 2
      t.decimal :net_deductions, precision: 8, scale: 2
      t.float :hourly_rate
      t.float :regular_hours
      t.float :overtime_hours
      t.string :pay_to
      t.belongs_to :contractor
      t.belongs_to :payroll
      t.jsonb :metadata

      t.timestamps
    end
  end
end
