class AddColumnToProductBars < ActiveRecord::Migration[5.2]
  def change
    add_column :product_bars, :column, :integer, default: 1
  end
end
