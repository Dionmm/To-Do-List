import { Component, Input } from '@angular/core';
import { TodoItem } from './models/todo-item';

@Component({
    selector: 'todo-item',
    template: `
      {{ todo.Text }}
    `
})
export class TodoItemComponent {
    @Input()
    todo: TodoItem;
}