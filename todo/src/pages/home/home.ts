import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private todos = [];
  private reorderIsEnabled = false;
  private archivedTodosPage = ArchivedTodosPage;

  constructor(private toastController: ToastController, private todoService: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoService.getTodos();
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    //First parameter is the list we want we want sorted based
    //on the how the user has moved the items in the reordered list
    reorderArray(this.todos, $event)
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {

              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000,
              });

              addTodoToast.present();
            });
          }
        }
      ]
    });
    addTodoAlert.present();
  }

  goToArchivePage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo(todoIndex) {
    this.todoService.archiveTodo(todoIndex);
  }

  editTodo(todoIndex) {
    let editTodoAlert = this.alertController.create({
      title: "Edit A Todo",
      message: "Edit your Todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text:"Cancel"
        },
        {
          text: "Edit",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoService.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(() => {
              let editTodoToast = this.toastController.create({
                message: "Todo Edited",
                duration: 2000
              });

              editTodoToast.present();
            });
          }
        }
      ]

    });

    editTodoAlert.present();
  }
}
