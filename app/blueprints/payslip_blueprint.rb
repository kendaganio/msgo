class PayslipBlueprint < Blueprinter::Base
  identifier :id

  fields :status,
         :net_pay,
         :gross_pay,
         :net_deductions,
         :hourly_rate,
         :regular_hours,
         :overtime_hours,
         :pay_to,
         :regular_pay,
         :overtime_pay,
         :gross_pay

  view :with_associations do
    field :metadata
    association :payroll, blueprint: PayrollBlueprint
    association :contractor, blueprint: ContractorBlueprint
  end
end
