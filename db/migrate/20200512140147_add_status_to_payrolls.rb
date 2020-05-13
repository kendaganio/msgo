class AddStatusToPayrolls < ActiveRecord::Migration[6.0]
  def change
    add_column :payrolls, :status, :string, default: 'draft'
  end
end
