(function () {
  'use strict';

  angular
    .module('todoList')
    .directive('todoItem', todoItemDirective);

  todoItemDirective.$inject = ['TodoListService'];

  function todoItemDirective(TodoListService) {

    function link(scope, element, attrs) {

      scope.item.Desc = scope.item.Desc.replace(/\r?\n/g, '<br />');
      scope.editing = false;

      var token;

      if(localStorage.getItem('token') !== null) {
        token = localStorage.getItem('token');
      }

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
        if(token)
          itemCopy.token = token;
        TodoListService.updateTodo(itemCopy);
      });

      scope.editTodo = function(e) {
        e.stopPropagation();
        scope.editing = !scope.editing;
        // Need a slight timeout to let angular render the edit div, maybe there is a better way to do this though?
        if(scope.editing) {
          scope.item.Desc = scope.item.Desc.replace(/<br \/>/g, '\r\n');
          setTimeout(function () {
            element[0].querySelectorAll('textarea')[0].focus();
          }, 50);
        } else {
          scope.item.Desc = scope.item.Desc.replace(/\r?\n/g, '<br />');
        }
      };

      scope.saveTodo = function() {

        if(token)
          scope.item.token = token;

        TodoListService.updateTodo(scope.item);

        scope.editing = false;
        scope.item.Desc = scope.item.Desc.replace(/\r?\n/g, '<br />')

      };

      scope.deleteTodo = function() {

        TodoListService.deleteTodo(scope.item, token ? token : null).then(function() {
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

      scope.setPriority = function(priority) {

        scope.item.Priority = priority;

        if(token)
          scope.item.token = token;

        TodoListService.updateTodo(scope.item);

      };

    }
    

    return {
      restrict: 'E',
      replace: true,
      scope: {
        item: '='
      },
      templateUrl: '/app/directives/templates/todo-item.html',
      link: link
    }
  }

})();