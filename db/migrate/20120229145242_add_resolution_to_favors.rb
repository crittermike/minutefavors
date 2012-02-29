class AddResolutionToFavors < ActiveRecord::Migration
  def change
    add_column :favors, :resolution, :text

  end
end
