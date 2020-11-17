import {Component, OnDestroy, OnInit} from '@angular/core';
import { Socket } from './websocket';


interface IGroup {
  name: string
}

interface IMessage {
  text: string;
}

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

  constructor() {
    this.socket = new Socket();
    this.socket.listen();

    this.socket.onMessage(data => {
      console.log('chart.component', data);

      this.groups = data['groups'];
      this.messages = data['messages'];
    });
  }

  async ngOnInit() {
    // this.groups = [
    //   {
    //     name: 'первый чат'
    //   },
    //
    //   {
    //     name: 'второй!'
    //   }
    // ];
    //
    //
    // this.messages = [
    //   {
    //     text: '11111111111111111',
    //   },
    //   {
    //     text: '22222222222',
    //   },
    //   {
    //     text: '333333333333\n444444444444444\n555555555555\n6666666666',
    //   },
    //   {
    //     text: 'ну и жопа же',
    //   }
    // ]
  }

  ngOnDestroy() {
    this.socket.destroy();
  }

  onSelectGroup(group: IGroup) {
    this.selectedGroup = group;
  }
}
