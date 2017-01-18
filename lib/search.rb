require 'json'
require 'nokogiri'

class CreateFullTextIndex
  COMMON_WORDS = %w{ a about above across ... } unless defined?(COMMON_WORDS)

  def initialize(items)
    @items = items
  end

  def call
    @items.reject{|i| i.binary?}.each do |item|
      {
        id: item.path,
        title: item[:title]
      }
    end.to_a
  end
end
