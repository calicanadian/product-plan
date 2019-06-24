class AddStepsCompletedToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :steps_completed, :string, default: '0'
  end
end
