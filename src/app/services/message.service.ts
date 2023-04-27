import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMessage} from "../../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = 'http://localhost:3001/message';
  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<IMessage[]>(this.url);
  }

  getMessage(id:number) {
    return this.http.get<IMessage>(`${this.url}/${id}`);
  }

  //TODO: добавление
  postProduct(message: IMessage) {
    return this.http.post<IMessage>(this.url, message);
  }

  //TODO: Удаление всего блока
  deleteMessage(id:number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  //TODO: обновление данных
  updateData(message: IMessage) {
    return this.http.put<any>(`${this.url}/${message.id}`, message)
  }
}
