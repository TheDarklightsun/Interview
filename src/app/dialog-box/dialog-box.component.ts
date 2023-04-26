import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "../services/message.service";
import {IMessage} from "../../models/message";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private MessageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  //TODO: Выбранная строка таблицы
  messages: IMessage[];
  messagesSubscription: Subscription;

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    username: new FormControl(this.data?.username ?? ''),
    message: new FormControl(this.data?.message ?? ''),
    datetime: new FormControl(this.data?.datetime ?? '')
  })

  //TODO: Закрытие
  onNoClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {
    this.messagesSubscription = this.MessageService.getMessages().subscribe( (data) => {
      this.messages = data;
    })
  }

  //TODO: отправка
  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      username: this.myForm.value.username,
      message: this.myForm.value.message,
      datetime: this.myForm.value.datetime,
    }
    this.dialogRef.close(this.data);
  }
}
