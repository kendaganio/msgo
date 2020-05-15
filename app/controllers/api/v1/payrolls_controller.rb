class Api::V1::PayrollsController < ApiController
  before_action :set_payroll, only: %i[show finalize csv]

  def index
    render json: PayrollBlueprint.render(Payroll.all)
  end

  def show
    render json: PayrollBlueprint.render(@payroll, view: :with_payees)
  end

  def create
    @payroll = Payroll.new(payroll_params)

    if @payroll.save
      render json: PayrollBlueprint.render(@payroll)
    else
      render json: ErrorBlueprint.render(@payroll.errors),
             status: :unprocessable_entity
    end
  end

  def finalize
    @payroll.payees.each do |payee|
      Payroll::GeneratePayslip.call(@payroll, payee)
    end

    @payroll.update(status: 'final')
  end

  def csv
    raw =
      CSV.generate(headers: true) do |csv|
        csv << %w[name hourly_rate]
        @payroll.payslips.each do |p|
          csv << [p.contractor.full_name, p.hourly_rate]
        end
      end
    send_data raw, filename: 'derp.csv'
  end

  private

  def set_payroll
    @payroll = Payroll.find(params[:id])
  end

  def payroll_params
    params.require(:payroll).permit(:name, :start_date, :end_date)
  end
end
