  window.site = window.site || {};
;(function(Site, Backbone){
  Site.Views = Site.Views || {};
  Site.Views.TabsList = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',
    getChildView: function(){
      return site.Views.Tab 
    },

    onShow: function() {
      this.setActiveTab();      
    },

    setActiveTab: function() {
      this.$('.active').removeClass('active');
      this.$el.children()
      .eq(this.options.active.get('active'))
      .addClass('active');
    },

    childEvents: {
      "clicked": function(view) {
        var active = this.collection.indexOf(arguments[0].model); 

        this.options.active.set(
          "active", active
        );

        this.setActiveTab();
      }
    }
  })
  
  Site.Views.Tab = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    template: _.template("<%- name %>"),
    triggers: {
      "click": "clicked"
    }
  })
})(site, Backbone)

