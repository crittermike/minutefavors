class AddHelperToFavors < ActiveRecord::Migration
  def change
    add_column :favors, :helper_id, :integer

  end
end
