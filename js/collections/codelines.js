window.site = window.site || {};
;(function(Site, Backbone){
  Site.Collections = Site.Collections || {};
  Site.Collections.CodeLines = Backbone.Collection.extend({
    model: Site.Models.CodeLine
  })
})(site, Backbone)
