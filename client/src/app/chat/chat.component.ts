import {Component, OnDestroy, OnInit} from '@angular/core';
import { Socket } from './websocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private socker;

  constructor() {
    this.socker = new Socket();
    this.socker.listen({
      port: 5000,
      host: 'localhost',
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.socker.destroy();
  }

}
