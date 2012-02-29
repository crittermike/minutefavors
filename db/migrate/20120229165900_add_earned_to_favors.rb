class AddEarnedToFavors < ActiveRecord::Migration
  def change
    add_column :favors, :earned, :integer

  end
end
