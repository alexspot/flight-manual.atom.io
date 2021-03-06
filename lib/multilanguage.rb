require 'translit'

def transliterate_to_latin(string)
  Translit.convert(string, :english)
end

def language_code_of(item)
  # "/en/foo" becomes "en"
  (item.identifier.to_s.match(/\/([a-z]{2})\//) || [])[1]
 end

#Now, it is possible to find all translations of a given item simply by finding all items with the same canonical identifier.
 def translations_of(item)
  @items.select do |i|
    i[:canonical_identifier] == item[:canonical_identifier]
  end
end

LANGUAGE_CODE_TO_NAME_MAPPING = {
  'en' => 'English',
  'ru' => 'Russian'
}

def language_name_for_code(code)
  LANGUAGE_CODE_TO_NAME_MAPPING[code]
end

def language_name_of(item)
  language_name_for_code(language_code_of(item))
end
