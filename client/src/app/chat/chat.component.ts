import {Component, OnDestroy, OnInit} from '@angular/core';
import { Socket } from './websocket';
import {HttpClient} from "@angular/common/http";


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
    this.http.get('/api/group')
      .subscribe(data => this.groups = <IGroup[]>data['groups']);
  }

  ngOnDestroy() {
    this.socket.destroy();
  }

  onSelectGroup(group: IGroup) {
    this.selectedGroup = group;
  }

  onAddGroup() {
    const newGroup = {
      name: `New Group${this.groups.length === 0 ? '' : this.groups.length}`,
    };

    this.http.post(
      '/api/group',
      newGroup
    )
      .subscribe(() => this.groups.push(newGroup));
  }
}
