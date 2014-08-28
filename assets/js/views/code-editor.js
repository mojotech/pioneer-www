  window.site = window.site || {};
;(function(Site, Backbone){
  Site.Views = Site.Views || {};
  Site.Views.CodeEditor = Backbone.Marionette.ItemView.extend({
    template: '#code-editor-template',
    onDomRefresh: function(){
      this.myCodeMirror = CodeMirror(
        document.getElementById('js-editor'),
        {
          mode:'javascript',
          value: this.model.get('code'),
          theme:'solarized dark'
        });
      this.myCodeMirror.setSize(850,1000);
    },
    events:{
      "click input.code-run":'runButton'
    },
    onDestroy: function(){
      this.model.set('code', this.myCodeMirror.getValue());
    },
    runButton: function(){
      $('.output-terminal')[0].innerText = this.myCodeMirror.getValue()
    }
  })
})(site, Backbone)

