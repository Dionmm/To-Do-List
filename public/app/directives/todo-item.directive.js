(function () {
  'use strict';

  angular
    .module('todoList')
    .directive('todoItem', todoItemDirective);

  todoItemDirective.$inject = ['TodoListService'];

  function todoItemDirective(TodoListService) {

    function link(scope, element, attrs) {

      scope.editing = false;
      setTimeout(function(){
        element[0].classList.add('ready');
      }, 200);

      var dragItem = Draggable.create(element[0], { type:"x,y", edgeResistance: 1, bounds:".todo-items" })[0];

      dragItem.addEventListener('dragstart', function() {
        // Disable the main corkboard from being dragged
        Draggable.get('.todo-items__wrapper').disable();
      });

      dragItem.addEventListener('dragend', function() {
        // Allow the main corkboard to be dragged again
        Draggable.get('.todo-items__wrapper').enable();
        // Update the position on the note
        var itemCopy = {
          _id: scope.item._id,
          UserID: scope.item.UserID,
          Status: scope.item.Status,
          Priority: scope.item.Priority,
          Desc: scope.item.Desc,
          Xcoord: dragItem.x + scope.item.Xcoord,
          Ycoord: dragItem.y + scope.item.Ycoord,
          __v: scope.item.__v,
          DateCreated: scope.item.DateCreated
        };
        TodoListService.updateTodo(itemCopy);
      });

      scope.editTodo = function() {
        scope.editing = !scope.editing;
      };

      scope.deleteTodo = function() {
        TodoListService.deleteTodo(scope.item).then(function() {
          // Add the deleted class to the element then delete it
          element[0].classList.add('deleted');
          if(Math.random() > .5) {
            // Randomly add a different animation
            element[0].classList.add('deleted--right');
          }
          // Destroy the draggable so it doesn't leave any leftovers
          dragItem.kill();
          TweenLite.to(element[0], 0 ,{css:{left: dragItem.x + scope.item.Xcoord, top:dragItem.y + scope.item.Ycoord}});
          // Destroy the scope so it doesn't leave any leftovers
          scope.$destroy();

          setTimeout(function () {
            // Finished animating, now remove the element
            element.remove();
          }, 550); // Kill it slightly before the animation ends
        });

      };

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