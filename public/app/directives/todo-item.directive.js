(function () {
  'use strict';

  angular
    .module('todoList')
    .directive('todoItem', todoItemDirective);

  todoItemDirective.$inject = ['TodoListService'];

  function todoItemDirective(TodoListService) {

    function link(scope, element, attrs) {

      scope.editing = false;

      var dragItem = Draggable.create(element[0], { type:"x,y", edgeResistance:0.65, bounds:".todo-items" })[0];

      dragItem.addEventListener('dragstart', function() {
        // Disable the main corkboard from being dragged
        Draggable.get('.todo-items__wrapper').disable();
      });

      dragItem.addEventListener('dragend', function() {
        // Allow the main corkboard to be dragged again
        Draggable.get('.todo-items__wrapper').enable();
        // Update the position on the note
        scope.item.Xcoord = dragItem.x + scope.item.Xcoord;
        scope.item.Ycoord = dragItem.y + scope.item.Ycoord;
        TodoListService.updateTodo(scope.item);
      });

      scope.editTodo = function() {
        scope.editing = !scope.editing;
      }

    }
    

    return {
      restrict: 'E',
      replace: true,
      scope: {
        item: '='
      },
      templateUrl: 'app/directives/templates/todo-item.html',
      link: link
    }
  }

})();