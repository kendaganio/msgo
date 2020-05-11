require 'rails_helper'

describe User do
  it 'create employee number after create' do
    u = User.create
    puts u.errors.messages
  end
end
