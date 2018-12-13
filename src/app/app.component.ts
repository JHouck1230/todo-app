import { Component } from '@angular/core';

import { TodoItem }  from './todo-item';
import { TodoList } from  './todo-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
