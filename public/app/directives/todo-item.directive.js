(function () {
  'use strict';

  angular
    .module('todoList')
    .directive('todoItem', todoItemDirective);

  function todoItemDirective() {

    function link(scope, element, attrs) {

      var dragItem = Draggable.create(element[0], { type:"x,y", edgeResistance:0.65, bounds:".todo-items" })[0];

      dragItem.addEventListener('dragstart', function() {
        Draggable.get('.todo-items__wrapper').disable();
      });

      dragItem.addEventListener('dragend', function() {
        Draggable.get('.todo-items__wrapper').enable();
      });
    }

    return {
      restrict: 'E',
      replace: true,
      scope: {
        item: '='
      },
      template:
      '<div class="todo-item" item="item" ng-style="{ \'top\': item.Ycoord + \'px\', \'left\': item.Xcoord + \'px\' }">' +
        '{{ item.Desc }}' +
      '</div>',
      link: link
    }
  }

})();