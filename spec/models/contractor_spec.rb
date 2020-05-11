require 'rails_helper'

describe Contractor do
  it 'create employee number after create' do
    u =
      Contractor.create(
        first_name: 'test',
        last_name: 'test',
        job_title: 'ol',
        hourly_rate: 99,
        hire_date: '2020-05-22'
      )
    u.reload

    expect(u.employee_number).to eq("#{Time.now.year}00001")

    Contractor.create(
      first_name: 'test',
      last_name: 'test',
      job_title: 'ol',
      hourly_rate: 99,
      hire_date: '2020-05-22'
    )
    Contractor.create(
      first_name: 'test',
      last_name: 'test',
      job_title: 'ol',
      hourly_rate: 99,
      hire_date: '2020-05-22'
    )
    last =
      Contractor.create(
        first_name: 'test',
        last_name: 'test',
        job_title: 'ol',
        hourly_rate: 99,
        hire_date: '2020-05-22'
      )

    expect(last.employee_number).to eq("#{Time.now.year}00004")
  end
end
