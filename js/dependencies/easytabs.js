/*
 * jQuery EasyTabs plugin 1.1
 *
 * Copyright (c) 2010 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Thu Aug 24 01:02:00 2010 -0500
 */
(function($) {
  $.fn.easyTabs = function(options) {

    var opts = $.extend({}, $.fn.easyTabs.defaults, options);

    selectDefaultTab = function(tabs){
      selectedTab = tabs.find("a[href='" + window.location.hash + "']").parent();
      if(selectedTab.size() == 1){
        defaultTab = selectedTab;
        opts.cycle = false;
      }else{
        defaultTab = ( tabs.parent().find(opts.defaultTab).length ) ? $(tabs.parent().find(opts.defaultTab)) : $(tabs.parent().find('li:first-child'));
      }
      return defaultTab;
    }

    selectTab = function(tabs,panels,clicked){
      if(opts.animate){
        panels.filter("." + opts.panelActiveClass).removeClass(opts.panelActiveClass).fadeOut(opts.animationSpeed, function(){
          panels.filter("#" + $(clicked).attr("href").substr(1)).fadeIn(opts.animationSpeed, function(){ $(this).addClass(opts.panelActiveClass); });
        });
      }else{
        panels.removeClass(opts.panelActiveClass).hide();
        panels.filter("#" + $(clicked).attr("href").substr(1)).show().addClass(opts.panelActiveClass);
      }
      tabs.removeClass(opts.tabActiveClass).children().removeClass(opts.tabActiveClass);
      clicked.parent().addClass(opts.tabActiveClass).children().addClass(opts.tabActiveClass);
    }

    cycleTabs = function(tabs,panels,tabNumber){
      if(opts.cycle){
        tabNumber = tabNumber % tabs.size();
        selectTab(tabs,panels,$(tabs[tabNumber]).children("a"));
        setTimeout(function(){cycleTabs(tabs,panels,(tabNumber + 1));}, opts.cycle);
      }
    }

    return this.each(function() {
      var url = window.location;
      var container = $(this);
      var tabs = $("#" + this.id + " " + (opts.tabs));
      var panels = $();
      tabs.each(function(){
        panels = panels.add(container.find("div[id=" + $(this).children("a").attr("href").substr(1) + "]").hide());
      });
      $('a.anchor').remove().prependTo('body');
      var defaultTab = selectDefaultTab(tabs);
      $(panels.filter("#" + defaultTab.children("a").attr("href").substr(1))).show().addClass(opts.panelActiveClass);

      defaultTab.addClass(opts.tabActiveClass).children().addClass(opts.tabActiveClass);

      tabs.children("a").click(function() {
        opts.cycle = false;
        var clicked = $($(this));
        if(clicked.hasClass(opts.tabActiveClass)){ return false; }
        selectTab(tabs,panels,clicked);
        if(opts.updateHash){
          window.location = url.toString().replace((url.pathname + url.hash), (url.pathname + clicked.attr("href")));
        }
        return false;
      });

      // enabling back-button with jquery.hashchange plugin
      // http://benalman.com/projects/jquery-hashchange-plugin/
      if(typeof $(window).hashchange == 'function'){
        $(window).hashchange( function(){
          selectTab(tabs,panels,selectDefaultTab(tabs).children("a"));
        }) 
      }else if($.address && typeof $.address.change == 'function'){ // back-button with jquery.address plugin http://www.asual.com/jquery/address/docs/
        $.address.change( function(){
          selectTab(tabs,panels,selectDefaultTab(tabs).children("a"));
        })
      }

      cycleTabs(tabs,panels,0);

    });

  }

  $.fn.easyTabs.defaults = {animate: true, panelActiveClass: "active", tabActiveClass: "active", defaultTab: "li:first-child", animationSpeed: "normal", tabs: "> ul > li", updateHash: true, cycle: false}
})(jQuery);