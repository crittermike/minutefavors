class Favor < ActiveRecord::Base
  acts_as_taggable
  validates :title, :presence => true
  validates :points, :presence => true
  belongs_to :user
end
