(function () {
  'use strict';

  angular
    .module('todoList')
    .controller('todoListCtrl', todoListCtrl);

  todoListCtrl.$inject = ['TodoListService', 'UserService'];

  function todoListCtrl(TodoListService, UserService) {

    var vm = this;
    var corkboard;
    vm.email = '';
    vm.password = '';
    vm.emailNew = '';
    vm.passwordNew = '';
    vm.token = '';
    vm.loginStatus = '';
    vm.resetModal = false;
    vm.passwordReset = '';

    vm.addTodo = addTodo;
    vm.login = login;
    vm.register = register;
    vm.forgot = forgot;
    vm.logout = logout;
    vm.reset = reset;

    window.addEventListener('keydown', function(e) {
      if(e.keyCode === 13) {
        // Enter
        if(vm.email && vm.password) {
          login();
        } else if(vm.emailNew && vm.passwordNew) {
          register();
        }
      }
    });

    if(localStorage.getItem('token') !== null) {
      vm.token = localStorage.getItem('token');
    }

    TodoListService.getTodos(vm.token).then(function(data){
      // Set up the draggable corkboard
      corkboard = Draggable.create('.todo-items__wrapper', { type:'scroll', edgeResistance: 1 })[0];
      vm.items = data;
    });

    if(window.location.pathname.indexOf('forgot') > -1) {
      // Reset modal
      vm.resetModal = true;
    }

    function addTodo(e) {

      corkboard.update();

      var todo = {
        UserID: '666',
        Status: false,
        Priority: 'low',
        Desc: 'My new todo',
        Xcoord: e.clientX - 100 + (corkboard.x * -1),
        Ycoord: e.clientY + (corkboard.y * -1)
      };

      if(vm.token) {
        todo.token = vm.token;
      }

      TodoListService.addTodo(todo).then(function(data) {
        todo._id = data;
        vm.items.push(todo);
      });

    }

    function login() {
      UserService.login(vm.email, vm.password).then(function(data) {
        if(data.err) {
          vm.loginStatus = 'Incorrect login';
        }
        if(data.token) {
          vm.loginStatus = '';
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        }
      });
    }

    function register() {
      UserService.register(vm.emailNew, vm.passwordNew).then(function(data) {
        if(data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        }
      });
    }
    
    function forgot() {
      UserService.forgot(vm.email).then(function(data) {
        if(data.err) {
          vm.loginStatus = 'User not found';
        } else {
          vm.loginStatus = '';
          vm.loginSuccess = 'Email sent!';
        }
      });
    }

    function logout() {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    function reset() {
      UserService.reset(window.location.pathname.slice(13), vm.passwordReset).then(function(data) {
        if(!data.err) {
          vm.resetStatus = 'Password reset, you may now login';
          setTimeout(function() {
            // Did try just hiding the modal but it didn't seem to update
            window.location.href = '/';
          }, 2000);
        }
      })
    }

  }

})();