window.site = window.site || {};
;(function(Site, Backbone){
  site.Views = site.Views || {};
  site.Views.Editor = Backbone.Marionette.LayoutView.extend({
    template: "#tab-layout-template",
    regions: {
      tabRegion: ".tabs",
      contentRegion: ".content"
    },

    setContentRegion: function() {
      var a = this.options.active.get('active');
      this.contentRegion.show(new site.Views.CodeEditor({
        model: this.options.collection.at(a)
      }));
    },

    onShow: function(){
      this.tabRegion.show(new site.Views.TabsList({
        collection: this.options.collection,
        active: this.options.active
      }));

      this.listenTo(this.options.active, 'change', this.setContentRegion);
      this.setContentRegion();
    }
  });
})(site, Backbone)
