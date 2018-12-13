import { Component, HostBinding } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { TodoItem }  from './todo-item';
import { TodoList } from  './todo-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(250)
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent {

  todoList = TodoList;
  todoItem: TodoItem = {
    description: '',
    id: 16,
    completed: false
  };
  selectAll = false;

  markComplete(event, item) {
    item.completed = !item.completed;
  }

  removeItem(event, index) {
    this.todoList.splice(index, 1);
  }

  saveTodo(event, form) {
    event.preventDefault();
    if (!form.valid) return;
    this.todoItem.description = form.value.description;
    let newItem = Object.assign({}, this.todoItem);
    this.todoList.unshift(newItem);
    this.todoItem.description = '';
    this.todoItem.id++;
    this.todoItem.completed = false;
    form.reset();
  }

}
