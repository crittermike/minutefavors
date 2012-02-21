class AddUserToFavors < ActiveRecord::Migration
  def self.up
    add_column :favors, :user_id, :integer
  end

  def self.down
    remove_column :favors, :user_id
  end
end
