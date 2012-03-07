class Favor < ActiveRecord::Base
  acts_as_taggable
  validates :title, :presence => true
  validates :points, :presence => true
  belongs_to :user
  before_save :sanitize_html

  def as_json(options={})
    super(:include => :tags, :methods => [:description_markdown, :resolution_markdown])
  end

  def description_markdown
    if description
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true, :fenced_code_blocks => true, :lax_html_blocks => true)
      return markdown.render(description).html_safe
    else
      return ''
    end
  end

  def resolution_markdown
    if resolution
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true, :fenced_code_blocks => true, :lax_html_blocks => true)
      return markdown.render(resolution).html_safe
    else
      return ''
    end
  end

  include ActionView::Helpers::SanitizeHelper  
  def sanitize_html # Automatically strips any tags from any string to text typed column  
    for column in Favor.content_columns  
      if column.type == :string || column.type == :text # if the column is text-typed  
        if !self[column.name].nil? # strip html from string if it's not empty  
          self[column.name] = sanitize(self[column.name])  
        end  
      end  
    end  
  end   
end
