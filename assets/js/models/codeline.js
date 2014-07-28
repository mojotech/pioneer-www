window.site = window.site || {};
;(function(Site, Backbone){
  Site.Models = Site.Models || {};
  Site.Models.CodeLine = Backbone.Model.extend({
    defaults:{
      text: '',
      highlighted: false,
      hovered: false,
      hidden: false
    },
    initialize: function(){
    }
  })
})(site, Backbone)
