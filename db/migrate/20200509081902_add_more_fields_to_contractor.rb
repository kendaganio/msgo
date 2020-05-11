class AddMoreFieldsToContractor < ActiveRecord::Migration[6.0]
  def change
    change_table :contractors do |t|
      t.string 'middle_name'
      t.string 'contact_number'
      t.string 'sss'
      t.string 'philhealth'
      t.string 'pagibig'
      t.string 'tin'
      t.string 'emergency_contact'
      t.string 'emergency_contact_number'
      t.string 'emergency_contact_relation'
      t.date 'birthday'
    end

    remove_column :contractors, :employee_no
    add_column :contractors, :employee_number, :string
  end
end
