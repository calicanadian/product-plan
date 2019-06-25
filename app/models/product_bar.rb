class ProductBar < ApplicationRecord
  belongs_to :product_lane, dependent: :destroy
end
