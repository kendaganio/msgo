class PayrollBlueprint < Blueprinter::Base
  identifier :id
  fields :name, :start_date, :end_date, :payees

  view :with_attendances do
    field :attendances do |payroll, options|
      payroll.recorded_attendances.map do |a|
        AttendanceBlueprint.render_as_hash(a)
      end
    end
  end
end
