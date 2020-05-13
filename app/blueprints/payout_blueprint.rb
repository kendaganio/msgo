class PayoutBlueprint < Blueprinter::Base
  fields :paid_at, :amount, :contractor_id, :cash_advance, :notes

  view :with_associations do
    association :contractor, blueprint: ContractorBlueprint
  end
end
