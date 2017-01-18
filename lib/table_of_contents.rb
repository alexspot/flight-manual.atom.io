require 'nanoc-conref-fs'

class TableOfContents
  attr_reader :appendices_en, :chapters_en, :chapters_ru, :appendices_ru

  def initialize
    toc_en = NanocConrefFS::Variables.fetch_data_file('en.toc_en', :default)
    toc_ru = NanocConrefFS::Variables.fetch_data_file('ru.toc_ru', :default)
    @chapters_en = load_chapters(toc_en.values.first)
    @chapters_ru = load_chapters(toc_ru.values.first)
    @appendices_en = load_chapters(toc_en.values.last)
    @appendices_ru = load_chapters(toc_ru.values.last)
  end

  def index_of(title)
    @chapters_en.each_with_index do |chapter, chapter_index|
      chapter.section_names.each_with_index do |section, section_index|
        return "#{chapter_index + 1}.#{section_index + 1}" if title == section
      end
    end

    @appendices_en.each_with_index do |chapter, chapter_index|
      chapter.section_names.each_with_index do |section, section_index|
        return "#{('A'.ord + chapter_index).chr}.#{section_index + 1}" if title == section
      end
    end

    nil
  end

  private

  def load_chapters(chapters)
    chapters.map { |name, sections| Chapter.new(name, sections) }
  end
end
