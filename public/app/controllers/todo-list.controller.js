(function () {
  'use strict';

  angular
    .module('todoList')
    .controller('todoListCtrl', todoListCtrl);

  todoListCtrl.$inject = ['TodoListService'];

  function todoListCtrl(TodoListService) {

    var vm = this;

    vm.items = [
      {
        'name': 'yolo'
      },
      {
        'name': 'yolo2'
      }
    ];

    TodoListService.getTodos().then(function(data){
      console.log(data);
    })

  }

})();