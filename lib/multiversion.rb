def versions_of(item)
  same_titles = @items.select do |i|
    i[:title] == item[:title]
  end
  same_titles.map{|item| item[:version]}.uniq.size > 1 ? same_titles : []
end

