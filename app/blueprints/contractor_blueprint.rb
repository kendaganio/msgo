class ContractorBlueprint < Blueprinter::Base
  identifier :id

  fields :first_name,
         :last_name,
         :full_name,
         :job_title,
         :employee_no,
         :hourly_rate,
         :hire_date,
         :image_url

  view :with_associations do
    association :attendances, blueprint: AttendanceBlueprint
  end
end
