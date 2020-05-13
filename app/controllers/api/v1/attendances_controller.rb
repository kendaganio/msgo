class Api::V1::AttendancesController < ApplicationController
  before_action :set_attendance, only: %i[show update]

  def index
    @attendances = Attendance.joins(:contractor).all
    if params[:contractor_id]
      @attendances = @attendances.where(contractor_id: params[:contractor_id])
    end

    render json:
             AttendanceBlueprint.render(@attendances, view: :with_associations)
  end

  def create
    @attendance = Attendance.new(attendance_params)

    if @attendance.save
      render json: AttendanceBlueprint.render(@attendance)
    else
      render json: ErrorBlueprint.render(@attendance.errors),
             status: :unprocessable_entity
    end
  end

  def update
    @attendance.assign_attributes(attendance_params)

    if @attendance.save
      render json: AttendanceBlueprint.render(@attendance)
    else
      render json: ErrorBlueprint.render(@attendance.errors),
             status: :unprocessable_entity
    end
  end

  def show
    render json:
             AttendanceBlueprint.render(@attendance, view: :with_associations)
  end

  private

  def set_attendance
    @attendance = Attendance.find(params[:id])
  end

  def attendance_params
    params.require(:attendance).permit(
      :contractor_id,
      :time_in_at,
      :time_out_at
    )
  end
end
