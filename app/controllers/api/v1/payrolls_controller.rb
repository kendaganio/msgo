class Api::V1::PayrollsController < ApiController
  def index
    render json: PayrollBlueprint.render(Payroll.all)
  end

  def show
    @payroll = Payroll.find(params[:id])
    render json: PayrollBlueprint.render(@payroll)
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

  private

  def payroll_params
    params.require(:payroll).permit(:name, :start_date, :end_date)
  end
end
