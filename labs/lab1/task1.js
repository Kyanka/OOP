class User {
  constructor(name) {
    this._name = name;
  }
  getName() {
    return this._name;
  }
  getInfo() {
    console.log("This is " + this._name);
  }
}

class Users {
  constructor() {
    this._users = new Array();
  }
  addUser(user) {
    this._users.push(user);
  }
  logIn(name, password) {
    for (let user of this._users) {
      console.log(user);
      if (password != null) {
        if (name == user._user._name && password == user._user._password) {
          console.log("You are logged in!");
          return 0;
        }
      } else if (name === user._name) {
        console.log("You are logged in!");
        return 0;
      }
    }
    console.log("Name or password is not correct");
  }
}

class UserWithPassword {
    constructor(user, password) {
      this._user = user;
      this._user._password = password;
    }
  }

let user = new User("Kyanka");
let password = "123";
user = new UserWithPassword(user, password);

let users = new Users();
users.addUser(user);

users.logIn("Kyanka","12");
