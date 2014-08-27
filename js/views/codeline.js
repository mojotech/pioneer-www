window.site = window.site || {};
;(function(Site, Backbone){
  Site.Views = Site.Views || {};
  Site.Views.CodeLine = Backbone.Marionette.ItemView.extend({
    template: '#codeline-template',
    className: 'line',
    modelEvents: {
      'change:highlighted': 'isActivated',
      'change:hovered': 'isHovered',
      'change:hidden': 'isHidden'
    },
    events: {
      'click': 'makeActive',
      'mouseover': 'hovered',
    },
    isHovered: function(e){
      $(this.el)[
        (this.model.get('hovered') ? 'add': 'remove') +
        'Class'
      ]('hovered');
    },
    isActivated: function(e){
      if(this.model.get('highlighted') === true){
        $(this.el).addClass('active');  
      } else{
        $(this.el).removeClass('active');  
      }
    },
    isHidden: function(e){
      $(this.el)[
        (this.model.get('hidden') ? 'add': 'remove') +
        'Class'
      ]('hidden');
    },
    makeActive: function(){
      this.trigger('active');
    },
    hovered: function(){
      this.trigger('hovered');
    },
    unhovered: function(){
      site.unhoverAll();  
    }
  })
})(site, Backbone)
