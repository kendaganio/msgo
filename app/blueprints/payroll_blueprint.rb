class PayrollBlueprint < Blueprinter::Base
  identifier :id
  fields :name, :start_date, :end_date, :status

  view :with_payees do
    field :payees
  end
end
