class Api::V1::PayslipsController < ApiController
  before_action :set_payslip, only: %i[show]

  def show
    render json: PayslipBlueprint.render(@payslip, view: :with_associations)
  end

  private

  def set_payslip
    @payslip = Payslip.find(params[:id])
  end
end
