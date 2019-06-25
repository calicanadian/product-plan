class ProductBar < ApplicationRecord
  belongs_to :product_lane, dependent: :destroy
  validates_uniqueness_of :name, scope: [:product_lane_id]
  validates_presence_of :name, :product_lane_id
end
