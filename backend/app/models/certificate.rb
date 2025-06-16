class Certificate < ApplicationRecord
  belongs_to :user

  validates :name, :description, presence: true
end
