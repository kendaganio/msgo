class CreateContractors < ActiveRecord::Migration[6.0]
  def change
    create_table :contractors do |t|
      t.string :first_name
      t.string :last_name
      t.text :address
      t.float :daily_rate
      t.integer :status

      t.timestamps
    end
  end
end
