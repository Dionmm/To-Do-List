import { Component } from '@angular/core';
import {TodoItemComponent} from "./todo-item.component";
import {TodoItem} from "./models/todo-item";
@Component({
  selector: 'my-app',
  template: `
    <h1>Team Orange Bees!</h1>
    <ul>
        <li *ngFor="let todo of todoItems">
          <todo-item [todo]="todo"></todo-item>
        </li>
    </ul>
  `,
    directives: [TodoItemComponent]
})
export class AppComponent {
    todoItems: TodoItem[] = [{
            "TaskID": 1234567,
            "Status": 1,
            "Priority": "High",
            "Text": "Clean the dishes",
            "UserID": "Dion",
            "XCoord": 55,
            "YCoord": 67,
            "DateCreated": new Date(16,6,23).toISOString()
        },{
            "TaskID": 7654321,
            "Status": 0,
            "Priority": "Med",
            "Text": "Walk the dog",
            "UserID": "Dion",
            "XCoord": 78,
            "YCoord": 60,
            "DateCreated": new Date(16,6,22).toISOString()
        }
    ];
}
