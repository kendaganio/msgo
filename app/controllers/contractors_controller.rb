class ContractorsController < ApplicationController
  before_action :set_contractor, only: [:edit, :show, :update]

  def index
    @contractors = Contractor.all
  end

  def new
    @contractor = Contractor.new
  end

  def update
    if @contractor.update(contractor_params)
      redirect_to contractors_path
    else
      render :new
    end
  end

  def create
    @contractor = Contractor.new(contractor_params)

    if @contractor.save
      redirect_to contractors_path
    else
      render :edit
    end
  end

  protected

  def set_contractor
    @contractor = Contractor.find(params[:id])
  end

  def contractor_params
    params.require(:contractor).permit(
      :first_name,
      :last_name,
      :daily_rate
    )
  end
end
