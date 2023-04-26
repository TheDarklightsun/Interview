import {Component, ElementRef, Inject, OnInit} from '@angular/core';
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

  constructor(private MessageService: MessageService, public dialog: MatDialog, private elementRef: ElementRef) { }

  //TODO: Выбранная строка таблицы
  selectedMessage: any;
  showDialog: boolean = false;
  totalLength: any;
  page: number = 1;
  messages: IMessage[];
  messagesSubscription: Subscription;


  ngOnInit(): void {
    this.messagesSubscription = this.MessageService.getMessages().subscribe( (data) => {
      this.messages = data;
    })
  }

  //TODO: Обработчик клика на строку таблицы
  selectMessage(message: any) {
    this.selectedMessage = message;
  }

  //TODO: открытие диалога
  showEditDialog() {
    this.showDialog = true;
  }

  //TODO: сохранение
  saveChanges() {
    this.MessageService.updateData(this.selectedMessage).subscribe(() => {
      const index = this.messages.findIndex(m => m.id === this.selectedMessage.id);

      this.messages[index] = this.selectedMessage;
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


  deleteMessageByUsername(username: string) {
    this.MessageService.deleteMessageByUsername(username).subscribe(() => this.messages.find((item) => {
      if (username === item.username) {
        let idx = this.messages.findIndex((data) => data.username === username);
        this.messages.splice(idx,1);
      }
    }));
  }

  ngOnDestroy() {
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
  }

}
