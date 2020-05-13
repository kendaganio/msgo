class ContractorBlueprint < Blueprinter::Base
  identifier :id

  fields :first_name,
         :last_name,
         :full_name,
         :job_title,
         :employee_number,
         :hourly_rate,
         :hire_date,
         :image_url,
         :status,
         :address,
         :birthday,
         :contact_number,
         :emergency_contact,
         :emergency_contact_relation,
         :emergency_contact_number

  view :with_associations do
    association :attendances, blueprint: AttendanceBlueprint
    association :payouts, blueprint: PayoutBlueprint
    association :payslips, blueprint: PayslipBlueprint
  end
end
