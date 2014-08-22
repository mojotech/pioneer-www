window.site = window.site || {};

;(function(){
  site.CreateLines = function(input){
    return new site.Collections.CodeLines(
      input.split('\n').map(function(code){
        return new site.Models.CodeLine({
          text: code
        })
    }))
  };
  site.unhighlightAll = function(){
    site.feature.unhighlightAll();
    site.steps.unhighlightAll();
    site.terminal.unhighlightAll();
  };
  site.unhoverAll = function(){
    site.feature.unhoverAll();
    site.steps.unhoverAll();
    site.terminal.unhoverAll();
  };
  site.getRelationship = function(options){
    _.defaults(options, {moveVideo: true});
    if(options.full){
      for(var i = 0; i < site["p"+options.pane].length; i++){
        if (~site["p"+options.pane][i].indexOf(options.line)) {
          site.unhighlightAll();
          site.feature.highlight(site.p1[i]);
          site.steps.highlight(site.p2[i]);
          site.terminal.highlight(site.p3[i]);
          site.terminal.displayLines(site.p5[i]);
          if (options.moveVideo){
            site.MovieTheatre.seekTo(site.p4[i], true);
          }
        }
      }
    } else {
      for(var i = 0; i < site["p"+options.pane].length; i++){
        if (~site["p"+options.pane][i].indexOf(options.line)) {
          site.unhoverAll();
          site.feature.hover(site.p1[i]);
          site.steps.hover(site.p2[i]);
          site.terminal.hover(site.p3[i]);
        }
      }
    }
  };
  var featureLines = site.CreateLines(" \
<span class='variable'>Feature</span>: TODO MVC\n \
  <span class='variable'>Background</span>:\n \
    <span class='variable'>Given</span> I am viewing todomvc\n \
  <span class='variable'>Scenario</span>: Adding and Completing\n \
    <span class='variable'>When</span> I add a new todo\n \
    <span class='variable'>And</span> I finish it\n \
    <span class='variable'>Then</span> I should see no undone todos \
  ");
  site.feature = new site.Views.FeatureView({
    collection: featureLines
  });
  site.feature.render();
  var stepLines = site.CreateLines(" \
<span class='function'>module</span>.<span class = 'variable'>exports</span> = <span class='function'>function</span>() { \n \
  <span class='variable'>this</span>.Given(<span class='string'>/</span><span class='constant'>^</span><span class='string'>I am viewing todomvc</span><span class='constant'>$</span><span class='string'>/</span>, <span class='function'>function</span>(){ \n \
      <span class='keyword'>return</span> <span class='variable'>this</span>.driver.<span class='keyword'>get</span>(<span class='string'>'http://todomvc.com/architecture-examples/backbone/'</span>); \n \
  }); \n \
  <span class='variable'>this</span>.When(<span class='string'>/</span><span class='constant'>^</span><span class='string'>I add a new todo</span><span class='constant'>$</span><span class='string'>/</span>, <span class='function'>function</span>(){ \n \
    <span class='keyword'>return</span> <span class='variable'>this</span>.Widget.<span class='function'>find</span>({ \n \
      root: <span class='string'>'#new-todo' </span>\n \
    }).then(<span class='function'>function</span>(widget) { \n \
      <span class='keyword'>return</span> widget.el.sendKeys(<span class='string'>'doge'</span>, Driver.Key.ENTER); \n \
    }); \n \
  }); \n \
  <span class='variable'>this</span>.When(<span class='string'>/</span><span class='constant'>^</span><span class='string'>I finsih it</span><span class='constant'>$</span><span class='string'>/</span>, <span class='function'>function</span>(callback){ \n \
    <span class='keyword'>return new</span> <span class='variable'>this</span>.Widget({ \n \
     root:<span class='string'>'#todo-list.toggle'</span> \n \
    }).<span class='function'>click</span>(); \n \
  }); \n \
  <span class='keyword'>return</span> <span class='variable'>this</span>.Then(<span class='string'>/</span><span class='constant'>^</span><span class='string'>I should see no undone todos</span><span class='constant'>$</span><span class='string'>/</span>, <span class='function'>function</span>(callback){ \n \
   <span class='keyword'>return new</span> <span class='variable'>this</span>.Widget({ \n \
     root: <span class='string'>'#todo-count'</span> \n \
   }).read().should.eventually.eql(<span class='string'>'0 items left'</span>); \n \
  }); \n \
}; \
  ")
  site.steps = new site.Views.StepView({
    collection: stepLines
  });
  site.steps.render();
  var terminalLines = site.CreateLines(" \
User:dill$ ./node_modules/.bin/dill --require steps --format=pretty \n \
\n \
Feature: TODO MVC \n \
\n \
  Scenario: Adding and Completing          # features/sample.feature:5 \n \
    <span class='variable'>Given I am viewing todomvc</span>             # features/sample.feature:3 \n \
    <span class='variable'>When I add a new todo</span>                  # features/sample.feature:6 \n \
    <span class='variable'>And I finish it</span>                        # features/sample.feature:7 \n \
    <span class='variable'>Then I should see no undone todos</span>      # features/sample.feature:8 \n \
\n \
\n \
1 scenario (<span class='variable'>1 passed</span>) \n \
4 steps(<span class='variable'>4 passed</span>) \n \
Duration (0m:2s:854ms) \n \
    ")
  site.terminal = new site.Views.TerminalView({
    collection: terminalLines
  });
  site.terminal.render();

  var actionScene = new YoutubePlayer('movie-theatre', 'U8j3ZZRMSqQ',{
    width:430,
    height: 550,
    objparams: {allowFullScreen: "false"},
    ytparams: {showinfo: 0, controls: 0, modesbranding: 1, autoplay: 1}
  });
  setInterval(function(){
    site.MovieTheatre = document.getElementById('movie-theatre');
    if(site.MovieTheatre.getCurrentTime != void 0){
      var time = site.MovieTheatre.getCurrentTime();
      if( time >= 14){
        site.MovieTheatre.seekTo(0, true);
      }
      else if( time < 3){
        site.getRelationship({pane: 1,
          line: 2,
          full: true,
          moveVideo: false
        });
      }
      else if( time >= 3 && time <= 8){
        site.getRelationship({
          pane: 1,
          line: 4,
          full: true,
          moveVideo: false
        });
      }
      else if( time > 8 && time < 12){
        site.getRelationship({
          pane: 1,
          line: 5,
          full: true,
          moveVideo: false
        });
      }
      else if( time >= 12){
        site.getRelationship({
          pane: 1,
          line: 6,
          full: true,
          moveVideo: false
        });
      }
    }
  },500);

  site.p1 = [
    [0],
    [2],
    [4],
    [5],
    [6]
  ];
  site.p2 = [
    [0],
    [1,2,3],
    [4,5,6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20,21]
  ];
  site.p3 = [
    [2],
    [5],
    [6],
    [7],
    [8]
  ];
  site.p4 = [
    [0],
    [0],
    [5],
    [9],
    [12.5]
  ];
  site.p5 = [
    [0,1,2,3],
    [0,1,2,3,4,5],
    [0,1,2,3,4,5,6],
    [0,1,2,3,4,5,6,7],
    [0,1,2,3,4,5,6,7,8]
  ];

  // Headroom stuff
  var headerElement = document.querySelector(".top-nav")
  var headroom      = new Headroom(headerElement)
  headroom.init()
  window.onscroll = function(event) {
    if($('body').scrollTop() > 80){
      $('.top-nav').css("background-color", "rgba(0, 0, 0, .5)")
    }
    else{
      $('.top-nav').css("background-color", "rgba(0, 0, 0, .02)")
    }

  }
})()
