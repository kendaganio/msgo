class AddFieldsToContractors < ActiveRecord::Migration[6.0]
  def change
    add_column :contractors, :employee_no, :string
    add_column :contractors, :hire_date, :date
    add_column :contractors, :job_title, :string
    add_column :contractors, :hourly_rate, :float
    remove_column :contractors, :daily_rate
  end
end
