class AddAcceptedAtToFavors < ActiveRecord::Migration
  def change
    add_column :favors, :accepted_at, :datetime

  end
end
