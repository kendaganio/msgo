class Api::V1::ContractorsController < ApiController
  def index
    @contractors = ::DatatableQuery.new(Contractor.all, params).call
    render json: ContractorBlueprint.render(@contractors)
  end

  def update
    @contractor = Contractor.find(params[:id])
    if @contractor.update(contractor_params)
      render json: ContractorBlueprint.render(@contractor)
    else
      render json: ErrorBlueprint.render(@contractor.errors),
             status: :unprocessable_entity
    end
  end

  def show
    @contractor = Contractor.find(params[:id])
    render json:
             ContractorBlueprint.render(@contractor, view: :with_associations)
  end

  def create
    @contractor = Contractor.new(contractor_params)

    if @contractor.save
      render json: ContractorBlueprint.render(@contractor)
    else
      render json: ErrorBlueprint.render(@contractor.errors),
             status: :unprocessable_entity
    end
  end

  def attendances
    @contractor = Contractor.find(params[:id])
    Attendance.transaction do
      attendance_params[:attendances].each do |att|
        @contractor.attendances.build(
          {
            contractor_id: params[:id],
            time_in_at: att[:time_in_at],
            time_out_at: att[:time_out_at]
          }
        )
      end
    end

    if @contractor.save
      render json: ContractorBlueprint.render(@contractor)
    else
      render json: ErrorBlueprint.render(@contractor.errors),
             status: :unprocessable_entity
    end
  end

  protected

  def contractor_params
    params.require(:contractor).permit(
      :address,
      :birthday,
      :contact_number,
      :emergency_contact,
      :emergency_contact_number,
      :emergency_contact_relation,
      :first_name,
      :hire_date,
      :hourly_rate,
      :job_title,
      :last_name,
      :pagibig,
      :philhealth,
      :middle_name,
      :sss,
      :status,
      :tin
    )
  end

  def attendance_params
    params.permit(attendances: %i[time_in_at time_out_at])
  end
end
