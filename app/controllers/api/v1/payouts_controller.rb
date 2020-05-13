class Api::V1::PayoutsController < ApiController
  before_action :set_payout, only: %i[show update]

  def index
    @payouts = Payout.all
    render json: PayoutBlueprint.render(@payouts)
  end

  def show
    render json: PayoutBlueprint.render(@payout)
  end

  def create
    @payout = Payout.new(payout_params)

    if @payout.save
      render json: PayoutBlueprint.render(@payout)
    else
      render json: ErrorBlueprint.render(@payout.errors),
             status: :unprocessable_entity
    end
  end

  def update
    if @payout.update(payout_params)
      render json: PayoutBlueprint.render(@payout)
    else
      render json: ErrorBlueprint.render(@payout.errors),
             status: :unprocessable_entity
    end
  end

  private

  def set_payout
    @payout = Payout.find(params[:id])
  end

  def payout_params
    params.require(:payout).permit(
      :paid_at,
      :amount,
      :contractor_id,
      :cash_advance,
      :notes
    )
  end
end
