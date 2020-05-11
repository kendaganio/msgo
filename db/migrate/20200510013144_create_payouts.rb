class CreatePayouts < ActiveRecord::Migration[6.0]
  def change
    create_table :payouts do |t|
      t.datetime :paid_at
      t.decimal :amount, precision: 8, scale: 2
      t.boolean :cash_advance
      t.text :notes
      t.belongs_to :payroll
      t.belongs_to :contractor

      t.timestamps
    end
  end
end
