(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function(event) {

    Draggable.create('.todo-items__wrapper', { type:'scroll', edgeResistance: 1 });

  });


  angular
    .module('todoList', []);

})();