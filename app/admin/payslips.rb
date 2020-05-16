ActiveAdmin.register Payslip do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :status, :net_pay, :gross_pay, :net_deductions, :hourly_rate, :regular_hours, :overtime_hours, :pay_to, :contractor_id, :payroll_id, :metadata
  #
  # or
  #
  # permit_params do
  #   permitted = [:status, :net_pay, :gross_pay, :net_deductions, :hourly_rate, :regular_hours, :overtime_hours, :pay_to, :contractor_id, :payroll_id, :metadata]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  index do
    selectable_column
    id_column
    column :pay_to
    column :status
    column :regular_hours
    column :overtime_hours
    column :gross_pay
    column :net_deductions
    column :net_pay
    actions
  end
end
