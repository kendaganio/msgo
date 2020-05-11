ActiveAdmin.register Contractor do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :first_name,
                :last_name,
                :address,
                :status,
                :hire_date,
                :job_title,
                :hourly_rate,
                :middle_name,
                :contact_number,
                :sss,
                :philhealth,
                :pagibig,
                :tin,
                :emergency_contact,
                :emergency_contact_number,
                :emergency_contact_relation,
                :birthday,
                :employee_number
  #
  # or
  #
  # permit_params do
  #   permitted = [:first_name, :last_name, :address, :status, :hire_date, :job_title, :hourly_rate, :middle_name, :contact_number, :sss, :philhealth, :pagibig, :tin, :emergency_contact, :emergency_contact_number, :emergency_contact_relation, :birthday, :employee_number]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
