

export class Socket {
  private socket;

  constructor() {
    this.socket = new WebSocket("ws://127.0.0.1:5000/");

    this.socket.onopen = e => {
      console.log("[open] Соединение установлено");
      console.log("Отправляем данные на сервер");
      this.socket.send("Меня зовут Джон");
    };

    this.socket.onmessage = event => {
      console.log(`[message] Данные получены с сервера: ${event.data}`);
    };

    this.socket.onclose = event => {
      if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        console.log('[close] Соединение прервано');
      }
    };

    this.socket.onerror = error => {
      console.error(error);
    };
  }

  listen() {

  }


  destroy() {
    // TODO Проверка статуса перед закрытием
    //  https://developer.mozilla.org/ru/docs/Web/API/WebSocket/readyState
    if (this.socket.readyState) {

    }
    this.socket.close();
  }
}
