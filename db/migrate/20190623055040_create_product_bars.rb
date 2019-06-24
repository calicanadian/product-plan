class CreateProductBars < ActiveRecord::Migration[5.2]
  def change
    create_table :product_bars do |t|
      t.string :name
      t.integer :product_lane_id

      t.timestamps
    end
  end
end
