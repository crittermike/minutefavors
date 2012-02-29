class AddPointsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :points, :integer, :default => 100

  end
end
