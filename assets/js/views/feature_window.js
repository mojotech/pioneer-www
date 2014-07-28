window.site = window.site || {};
;(function(Site, Backbone){
  Site.Views = Site.Views || {};
  Site.Views.FeatureView = Backbone.Marionette.CompositeView.extend({
    childView: Site.Views.CodeLine,
    el: '.top.left',
    template: _.template(""),
    childEvents:{
      'active': function(e){
        this.children.each(function(child){
          child.model.set('highlighted', false);
        });
        var index = this.collection.models.indexOf(arguments[0].model);
        site.getRelationship({
          pane:1,
          line: index,
          full: true
        });
      },
      'hovered': function(e) {
        site.unhoverAll();
        var index = this.collection.models.indexOf(arguments[0].model);
        site.getRelationship({
          pane: 1,
          line: index,
          full: false
        });
      }
    },
    highlight: function(views){
      for(var i=0; i < views.length; i++){
        var _this = this;
        this.children.each(function(child){
          var index = _this.collection.models.indexOf(child.model);
          if(index == views[i])
            child.model.set('highlighted', true);
        });
      }
    },
    hover: function(views){
      for(var i=0; i < views.length; i++){
        var _this = this;
        this.children.each(function(child){
          var index = _this.collection.models.indexOf(child.model);
          if(index == views[i])
            child.model.set('hovered', true);
        });
      }
    },
    unhighlightAll: function(){
      this.children.each(function(child){
        child.model.set('highlighted', false);
      });
    },
    unhoverAll: function(){
      this.children.each(function(child){
        child.model.set('hovered', false);
      });
    }
  })
})(site, Backbone)
