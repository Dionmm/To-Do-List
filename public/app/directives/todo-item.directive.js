(function () {
  'use strict';

  angular
    .module('todoList')
    .directive('todoItem', todoItemDirective);

  function todoItemDirective() {
    return {
      restrict: 'E',
      scope: {
        item: '=item'
      },
      template: '{{ item.name }}'
    }
  }

})();