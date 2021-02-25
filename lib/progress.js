// 这里用到一个很实用的 npm 模块，用以在同一行打印文本
const slog = require('single-line-log').stdout;

function ProgressBar(description, bar_length){
  this.description = description || 'Progress';
  this.length = bar_length || 25;

  this.render = function (opts){
    const percent = (opts.completed / opts.total).toFixed(4); 
    const cellNum = Math.floor(percent * this.length);

    let cell = '';
    for (let i=0;i<cellNum;i++) {
      cell += '█';
    }

    let empty = '';
    for (let i=0;i<this.length-cellNum;i++) {
      empty += '░';
    }

    const cmdText = this.description + ': ' + (100*percent).toFixed(2) + '% ' + cell + empty + ' ' + opts.completed + '/' + opts.total;
    
    slog(cmdText);
  };

  this.clear = function(){
    slog("");
  }
  
}

// 模块导出
module.exports = ProgressBar;