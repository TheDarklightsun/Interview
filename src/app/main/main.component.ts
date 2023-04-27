import {Component, OnInit} from '@angular/core';
import {IMessage} from "../../models/message";
import {Subscription} from "rxjs";
import {MessageService} from "../services/message.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  constructor(private MessageService: MessageService, public dialog: MatDialog) { }

  //TODO: Выбранная строка таблицы
  selectedMessage: any;
  selectedMessageId: any;
  selectedMessageUser: any;
  selectedMessageMessage: any;

  selectedMessageDeleteUser: any;
  selectedMessageDeleteMessage: any;

  showDialog: boolean = false;
  showIdElem: boolean = false;
  showUserElem: boolean = false;
  showMessageElem: boolean = false;

  totalLength: any;
  page: number = 1;
  messages: IMessage[];
  messagesSubscription: Subscription;


  ngOnInit(): void {
    this.messagesSubscription = this.MessageService.getMessages().subscribe( (data) => {
      this.messages = data;
    })
  }

  //TODO: Обработчик клика на кнопку delete user
  MessageDeleteUser(message: any) {
    this.selectedMessageDeleteUser = message;
  }

  //TODO: удаление User
  saveChangesDeleteUser() {
    this.selectedMessageDeleteUser.username = '';
    this.MessageService.updateData(this.selectedMessageDeleteUser).subscribe(() => {
      const index = this.messages.findIndex(m => m.id === this.selectedMessageDeleteUser.id);

      this.messages[index] = this.selectedMessageDeleteUser;
    });
    this.closeDialog();
  }

  //TODO: Обработчик клика на кнопку delete message
  MessageDeleteMessage(message: any) {
    this.selectedMessageDeleteMessage = message;
  }

  //TODO: удаление message
  saveChangesDeleteMessage() {
    this.selectedMessageDeleteMessage.message = '';
    this.MessageService.updateData(this.selectedMessageDeleteMessage).subscribe(() => {
      const index = this.messages.findIndex(m => m.id === this.selectedMessageDeleteMessage.id);

      this.messages[index] = this.selectedMessageDeleteMessage;
    });
    this.closeDialog();
  }


  //TODO: Обработчик клика на строку таблицы id
  selectMessage(message: any) {
    this.selectedMessageId = message;
    this.showIdElem = true;

    console.log(this.selectedMessageId)
  }

  //TODO: Обработчик клика на строку таблицы user
  selectMessage2(message: any) {
    this.selectedMessageUser = message;
    this.showUserElem = true;

    console.log(this.selectedMessageUser)
  }

  //TODO: Обработчик клика на строку таблицы message
  selectMessage3(message: any) {
    this.selectedMessageMessage = message;
    this.showMessageElem = true;

    console.log(this.selectedMessageMessage)
  }

  //TODO: открытие диалога
  showEditDialog() {
    this.showDialog = true;
  }

  //TODO: сохранение id
  saveChangesId() {
    this.MessageService.updateData(this.selectedMessageId).subscribe(() => {
      const index = this.messages.findIndex(m => m.id === this.selectedMessageId.id);

      this.messages[index] = this.selectedMessageId;
    });
    this.closeDialog();
  }

  //TODO: сохранение user
  saveChangesUser() {
    this.MessageService.updateData(this.selectedMessageUser).subscribe(() => {
      const index = this.messages.findIndex(m => m.id === this.selectedMessageUser.id);

      this.messages[index] = this.selectedMessageUser;
    });
    this.closeDialog();
  }

  //TODO: сохранение message
  saveChangesMessage() {
    this.MessageService.updateData(this.selectedMessageMessage).subscribe(() => {
      const index = this.messages.findIndex(m => m.id === this.selectedMessageMessage.id);

      this.messages[index] = this.selectedMessageMessage;
    });
    this.closeDialog();
  }

  //TODO: закрытие диалогового окна
  closeDialog() {
    this.showDialog = false;
  }

  //TODO: Удаление всего блока
  deleteItem(id: number) {
    this.MessageService.deleteMessage(id).subscribe(() => this.messages.find((item) => {
      if (id === item.id) {
        let idx = this.messages.findIndex((data) => data.id === id);
        this.messages.splice(idx,1);
      }
    }));
  }

  //TODO: Открытие диалога
  openDialog(): void {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.postData(data)
    });
  }

  postData(data: IMessage) {
    this.MessageService.postProduct(data).subscribe((data) => this.messages.push(data))
  }

  updateData(message: IMessage) {
    this.MessageService.postProduct(message).subscribe((data) => {
    });
  }

  ngOnDestroy() {
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
  }
}
