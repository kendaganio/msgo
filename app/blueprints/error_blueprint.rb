class ErrorBlueprint < Blueprinter::Base
  field :errors do |errors, options|
    errors.messages
  end
end
