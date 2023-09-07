;/*! showdown-mermaid 07-09-2023 */
(function(){
/**
 * Support for Mermaid in Showdown
 * Credit to @cwhinton 
 * https://github.com/showdownjs/showdown/issues/886
 */


(function (extension) {
  // UML - Universal Module Loader
  // This enables the extension to be loaded in different environments
  if (typeof showdown !== 'undefined') {
    // global (browser or nodejs global)
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = extension(require('showdown'));
  } else {
    // showdown was not found so we throw
    throw Error('Could not find showdown library');
  }

}(function (showdown) {

  //This is the extension code per se

  // Here you have a safe sandboxed environment where you can use "static code"
  // that is, code and data that is used accros instances of the extension itself
  // If you have regexes or some piece of calculation that is immutable
  // this is the best place to put them.

  // The following method will register the extension with showdown
  showdown.extension('showdown-mermaid', function() {
    var mermaidBlocks = [];

    return [
      {
        type:    'lang',
    regex: '(?:^|\\n)``` ?mermaid(.*)\\n([\\s\\S]*?)\\n```', 
        replace: function (s, match) {
      var thing = s.match('(?:^|\\n)``` ?mermaid(.*)\\n([\\s\\S]*?)\\n```');
      var thing_group = thing.length - 1;
      mermaidBlocks.push(thing[thing_group]);
      var n = mermaidBlocks.length - 1;
      return '%PLACEHOLDER' + n + '%';
    }
      },
      {
        type:    'output',
    filter: function (text) {
    for (var i=0; i< mermaidBlocks.length; ++i) {
                  var pat = '%PLACEHOLDER' + i + '%';
                  text = text.replace(new RegExp(pat, 'gi'), '<pre><code class="language-mermaid"><div class="mermaid" id="mermaid_' + i + '">' + mermaidBlocks[i] + '</div></code></pre>');
              }
          //reset array
          mermaidBlocks = [];
          return text;
    }
      }

    ];    
  });
}));
}).call(this);
//# sourceMappingURL=showdown-mermaid.js.map