(function() {


  var $body = $('body')

  var searchForm = $('#articles-search');



  // window.addEventListener("submit", function(e) {
    //   e.preventDefault();
    //   // search(input.value);
    //   alert('fdfdf11111');
    // });
  window.renderResults = function(results) {
  results.forEach(function(result) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = result.id;
    a.innerHTML = result.title;
    li.appendChild(a);
    resultsContainer.appendChild(li);
  });
};


  window.onload = function(){
      $('.version_item').click(function(){
          window.location.href = $(this).val();
      })
      $('.language_item').click(function(){
          window.location.href = $(this).val();
      })
  }

  window.searchFunction = function(query) {
    preventDefault();
    window.search(query);
    results = index.search(query).map(function(i) { return findDocumentById(i.ref); });
    window.renderResults
  }


  window.clickLanguageSelector = function() {
    $('.language_selector').toggleClass('active');
    $('.languages').slideToggle(200);
  }

    $('#speed').change(function() {
        window.location.href = $(this).val();
    });

  // trigger.click(function() {
  //     trigger.toggleClass('active');
  //     list.slideToggle(200);
  // });

  // this is optional to close the list while the new page is loading
  // list.click(function() {
  //     trigger.click();
  // });

  window.detectPlatform = function () {
    $('body').addClass('platform-switch')

    if (navigator.userAgent.indexOf('Win') !== -1) {
      $('body').addClass('platform-windows')
    } else if (navigator.userAgent.indexOf('Mac') !== -1) {
      $('body').addClass('platform-mac')
    } else if (navigator.userAgent.indexOf('Linux') !== -1) {
      $('body').addClass('platform-linux')
    } else {
      $('body').addClass('platform-all')
    }
  }

  var platformPrefix = 'platform-'
  var validPlatforms = ['mac', 'windows', 'linux']

  var classForPlatform = function (platform) {
    return platformPrefix + platform
  }

  var validPlatformBodyClasses = $(validPlatforms).map(function (_index, platform) {
    return classForPlatform(platform)
  })

  window.updateArticlePlatform = function (platform) {
    var className = classForPlatform(platform)

    $(validPlatformBodyClasses).each(function (_index, value) {
      if (value === className) {
        $body.addClass(value)
      } else {
        $body.removeClass(value)
      }

      var $navItem = $('#platform-nav .' + value)

      if (value === className) {
        $navItem.addClass('selected')
      } else {
        $navItem.removeClass('selected')
      }
    })
  }

  window.initPlatformNav = function () {
    var $platformNav = $('#platform-nav')
    $platformNav.addClass('show')
    $platformNav.find('a').click(function () {
      updateArticlePlatform($(this).data('platform'))
    })
  }

  window.setupSwitcher = function () {
    detectPlatform()

    var $articleBody = $('.document-content')

    var hasPlatformSpecificSections = {}
    var platformSpecificSectionsCount = 0

    $(validPlatformBodyClasses).each(function (_index, className) {
      if ($articleBody.find('.' + className).length > 0) {
        hasPlatformSpecificSections[className] = true
        platformSpecificSectionsCount++
      }
    })

    if (platformSpecificSectionsCount > 0) {
      initPlatformNav()

      $(validPlatformBodyClasses).each(function (_index, className) {
        if (!hasPlatformSpecificSections[className]) {
          $('#platform-nav li.' + className).addClass('hidden')
        }
      })

      var platform = 'all'

      $body = $('body')
      var platformPrefixHashIndex = location.hash.indexOf(platformPrefix)

      if (platformPrefixHashIndex >= 0) {
        // Check if a platform is specified in the location hash
        var platformHashIndex = platformPrefixHashIndex + platformPrefix.length
        platform = location.hash.substring(platformHashIndex)
      } else if (!$body.hasClass(classForPlatform('all'))) {
        $(validPlatforms).each(function (_index, value) {
          if ($body.hasClass(classForPlatform(value))) {
            platform = value
          }
        })
      }

      updateArticlePlatform(platform)
    }
  }

  $(function () {
    setupSwitcher()
  })
})()
