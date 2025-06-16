class CertificatesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_certificate, only: [:show, :update, :destroy]

  # GET /certificates
  def index
    @certificates = current_user.certificates.paginate(page: params[:page], per_page: params[:per_page])
    render json: @certificates
  end

  # GET /certificates/1
  def show
  end

  # POST /certificates
  def create
    @certificate = current_user.certificates.build(certificate_params)

    if @certificate.save
      render :show, status: :created, location: @certificate
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /certificates/1
  def update
    if @certificate.update(certificate_params)
      render :show, status: :ok, location: @certificate
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /certificates/1
  def destroy
    @certificate.destroy
    head :no_content
  end

  private

    def set_certificate
      @certificate = current_user.certificates.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Certificate not found" }, status: :not_found
    end

    def certificate_params
      params.require(:certificate).permit(:name, :description, :user_id)
    end
end
