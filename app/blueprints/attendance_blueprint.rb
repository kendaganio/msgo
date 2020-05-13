class AttendanceBlueprint < Blueprinter::Base
  identifier :id

  fields :time_in_at,
         :time_out_at,
         :raw_hours,
         :regular_hours,
         :overtime_hours,
         :contractor_id

  view :with_associations do
    association :contractor, blueprint: ContractorBlueprint
  end
end
