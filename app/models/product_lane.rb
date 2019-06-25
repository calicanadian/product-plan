class ProductLane < ApplicationRecord
  has_many :product_bars
  belongs_to :user

  validates_uniqueness_of :name, scope: [:user_id]
  validates_presence_of :name, :user_id
end
