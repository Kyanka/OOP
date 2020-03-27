class Messager {
  send(message) {
    console.log(message);
  }
}
class Proxy{
    constructor(_message, _length) {
        this.message = _message;
        this.length = _length || 10;
    }
    send(message)
    {
        if(message.length > this.length)
        console.log("Message too long");
        else
        console.log(message);
    }
}

let messager = new Proxy(new Messager());
messager.send("grfhbajdakhdkadk");
messager.send("Hello");
