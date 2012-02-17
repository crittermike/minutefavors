class AddPointsToFavors < ActiveRecord::Migration
  def change
    add_column :favors, :points, :integer

  end
end
