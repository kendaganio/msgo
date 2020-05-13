class Payroll::GeneratePayslip
  OT_MULTIPLIER = 1.25

  attr_reader :payee, :payroll, :contractor, :attendances

  def initialize(payroll, payee)
    @payroll = payroll
    @payee = payee.with_indifferent_access
    @contractor = Contractor.find(@payee[:contractor_id])
    @attendances =
      @contractor.attendances_in_range(
        @payroll.start_date_in_zone,
        @payroll.end_date_in_zone
      )
  end

  def call
    payslip =
      payroll.payslips.create(
        {
          contractor_id: contractor.id,
          pay_to: contractor.full_name,
          hourly_rate: payee[:hourly_rate],
          regular_hours: payee[:regular_hours],
          overtime_hours: payee[:overtime_hours],
          metadata: { attendances: attendances.map(&:attributes) }
        }.merge(compute_pay)
      )

    if payslip.net_deductions > 0
      contractor.payouts.create(
        amount: payslip.net_deductions,
        paid_at: payroll.end_date,
        notes: "CA Payment from Payslip #{payslip.id}"
      )
    end
  end

  def compute_pay
    regular_pay = payee[:regular_hours] * payee[:hourly_rate]
    overtime_pay = payee[:overtime_hours] * payee[:hourly_rate] * OT_MULTIPLIER
    gross_pay = regular_pay + overtime_pay
    net_deductions = compute_deductions(gross_pay)

    {
      gross_pay: gross_pay,
      net_pay: gross_pay - net_deductions,
      net_deductions: net_deductions,
      cash_advance: false
    }
  end

  def compute_deductions(gross)
    payee[:total_ca] > gross ? gross : payee[:total_ca]
  end

  def self.call(payroll, payee)
    new(payroll, payee).call
  end
end
