class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  has_many :product_lanes
  has_many :product_bars, through: :product_lanes
end
