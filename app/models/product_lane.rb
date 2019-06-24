class ProductLane < ApplicationRecord
  has_many :product_bars
  belongs_to :user
end
