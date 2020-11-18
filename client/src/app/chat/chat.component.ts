import {Component, OnDestroy, OnInit} from '@angular/core';
import { Socket } from './websocket';
import {HttpClient} from "@angular/common/http";
import {Form, FormControl} from "@angular/forms";


interface Model {
  _id?: string;
}

interface IGroup extends Model {
  name: string
}

interface IMessage {
  text: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}


const userId = '5fb52e7e579b7022a0523c6f';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private socket: Socket;
  public groups: IGroup[] = [];
  public messages: IMessage[] = [];
  public selectedGroup: IGroup;
  public message: FormControl = new FormControl('');

  constructor(
    public http: HttpClient,
  ) {
    this.socket = new Socket();
    this.socket.listen();

    this.socket.onMessage(data => {
      console.log('chart.component', data);

      // this.groups = data['groups'];
      this.messages.push(data.message);
    });
  }

  async ngOnInit() {
    this.http.get('/api/group', {
      params: {
        userId,
      }
    })
      .subscribe(data => this.groups = <IGroup[]>data['groups']);
  }

  ngOnDestroy() {
    this.socket.destroy();
  }

  onSelectGroup(group: IGroup) {
    this.http.get('/api/message', {

      // TODO Тут и далее нельзя передавать userId,
      //  а должы как-то хранить или извлекать на стороне бэека
      params: {
        userId,
        groupId: group._id,
      }
    })
      .subscribe(data => {
        this.messages = data['messages'];

        this.selectedGroup = group;
      });
  }

  onAddGroup() {
    const newGroup = {
      name: `New Group${this.groups.length === 0 ? '' : this.groups.length}`,
      userId,
    };

    this.http.post(
      '/api/group',
      newGroup
    )
      .subscribe(() => this.groups.push(newGroup));
  }

  onAddMessage() {
    const message = {
      text: this.message.value,
      userId,
      groupId: this.selectedGroup._id,
    };

    this.http.post(
      '/api/message',
      message
    )
      .subscribe(() => {
        this.messages.push(message);

        this.message.setValue('');
      });
  }
}
