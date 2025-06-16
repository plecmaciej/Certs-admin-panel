json.extract! certificate, :id, :name, :description, :created_at, :updated_at
json.user do
  json.extract! certificate.user, :id, :email
end
json.url certificate_url(certificate, format: :json)