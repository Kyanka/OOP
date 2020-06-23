////////////////////ADD LIBS
const readlinesync = require("readline-sync");
const fs = require("./addlibs/jsonparser.js");
////////////////////MODELS
//////////////USERS
class User {
  constructor(params) {
    this.gmail = params.gmail;
    this.password = params.password;
    this.fullname = params.fullname;
    this.role = undefined;
  }
}
////////BUILDER
class UserCreator {
  constructor(gmail, password, fullname) {
    let params = {};
    params.gmail = gmail;
    params.password = password;
    params.fullname = fullname;
    this.user = new User(params);
  }
  setRole(role) {
    this.user.role = role;
  }
  create() {
    return this.user;
  }
}
class TeacherCreator extends UserCreator {
  setRole() {
    this.user.role = "teacher";
  }
  setSubject(subject) {
    this.user.subject = subject;
  }
}
class StudentCreator extends UserCreator {
  setRole() {
    this.user.role = "student";
  }
  setGroup(group) {
    this.user.group = group;
  }
}
class AdminCreator extends UserCreator {
  setRole() {
    this.user.role = "admin";
  }
}
//Builder director
class ConsoleUserCreator {
  create(gmail) {
    let password = readlinesync.question("Enter password:\n");
    let fullname = readlinesync.question("Enter fullname:\n");
    //let user = new UserCreator(gmail, password, fullname);
    let r = readlinesync.question(
      "Enter your number of role:\n1.Admin\n2.Teacher\n3.Student\n"
    );
    let user;
    let usercreator;
    switch (r) {
      case "1": {
        usercreator = new AdminCreator(gmail, password, fullname);
        usercreator.setRole();
        user = usercreator.create();
        break;
      }
      case "2": {
        usercreator = new TeacherCreator(gmail, password, fullname);
        usercreator.setRole();
        let medi = new UserMediator(usercreator);
        usercreator = medi.setSubject();
        user = usercreator.create();
        break;
      }
      case "3": {
        usercreator = new StudentCreator(gmail, password, fullname);
        usercreator.setRole();
        let medi = new UserMediator(usercreator);
        usercreator = medi.setGroup();
        user = usercreator.create();
        break;
      }
    }
    return user;
  }
}
////////REPOSITORY
class Users {
  constructor() {
    this.users = fs.readJsonFile("./data/users.json");
  }
  getAll() {
    return this.users;
  }
  getByGmail(gmail) {
    let users = this.getAll();
    for (let user of users) {
      if (user.gmail == gmail) {
        return user;
      }
    }
    return false;
  }
  isUniq(gmail) {
    if (this.getByGmail(gmail)) return false;
    else return true;
  }
  getAllByGroup(group) {
    let users = this.getAll();
    let usersByGroup = [];
    for (let user of users) {
      if ((user.group = group)) {
        usersByGroup.push(user);
      }
    }
    return usersByGroup;
  }
  deleteUser(gmail) {
    let users = this.getAll();
    for (let index in users) {
      if (users[index].gmail === gmail) {
        users.splice(index, 1);
      }
    }
    this.users = users;
    fs.writeJsonFile("./data/users.json", users);
  }
  addUser(user) {
    if (this.isUniq(user.gmail)) {
      let users = this.getAll();
      users.push(user);
      this.users = users;
      fs.writeJsonFile("./data/users.json", users);
      return user;
    } else {
      console.log("This user has been already added");
      return user;
    }
  }
}
//////////////GROUPS
class Group {
  constructor(name) {
    this.name = name;
    this.students = [];
  }
}
//////////FACTORY + FLYWEIGHT + REPOSITORY
class GroupCreator {
  constructor() {
    this.groups = fs.readJsonFile("./data/groups.json");
  }
  create(name) {
    let groups = this.groups;
    let group = this.getByName(name);
    if (group) {
      console.log("This group has been already created");
      return group;
    }
    group = new Group(name);
    groups.push(group);
    this.groups = groups;
    fs.writeJsonFile("./data/groups.json", groups);
    return group;
  }
  update(group) {
    let groups = this.groups;
    for (let index in groups) {
      if (groups[index].name === group.name) {
        groups[index] = group;
      }
    }
    this.groups = groups;
    fs.writeJsonFile("./data/groups.json", groups);
  }
  delete(name) {
    let groups = this.groups;
    for (let index in groups) {
      if (groups[index].name === name) {
        groups.splice(index, 1);
      }
    }
    this.groups = groups;
    fs.writeJsonFile("./data/groups.json", groups);
  }
  getByName(name) {
    let groups = this.getAll();
    for (let group of groups) {
      if (group.name == name) {
        return group;
      }
    }
    return false;
  }
  getAll() {
    return this.groups;
  }
}
//////////////SUBJECTS
class Subject {
  constructor(name, group) {
    this.name = name;
    this.teacher;
    this.group = group;
  }
}
//////////FACTORY + FLYWEIGHT + REPOSITORY
class SubjectCreator {
  constructor() {
    this.subjects = fs.readJsonFile("./data/subjects.json");
  }
  create(name, group) {
    let subjects = this.subjects;
    let subject = this.getByName(name);
    if (subject) {
      console.log("This subject has been already created");
      return false;
    }
    subject = new Subject(name, group);
    subjects.push(subject);
    this.subjects = subjects;
    fs.writeJsonFile("./data/subjects.json", subjects);
    return subject;
  }
  update(subject) {
    let subjects = this.subjects;
    for (let index in subjects) {
      if (subjects[index].name === subject.name) {
        subjects[index] = subject;
      }
    }
    this.subjects = subjects;
    fs.writeJsonFile("./data/subjects.json", subjects);
  }
  delete(name) {
    let subjects = this.subjects;
    for (let index in subjects) {
      if (subjects[index].name === name) {
        subjects.splice(index, 1);
      }
    }
    this.subjects = subjects;
    fs.writeJsonFile("./data/subjects.json", subjects);
  }
  getByName(name) {
    let subjects = this.getAll();
    for (let subject of subjects) {
      if (subject.name == name) {
        return subject;
      }
    }
    return false;
  }
  getAll() {
    return this.subjects;
  }
}
//////////////CHECKS
//////////PROTOTYPE
class Check {
  constructor(value) {
    this.value = value;
  }
  set(value) {
    this.value = value;
  }
  copy() {
    return new Check(this.value);
  }
}
//////////FLYWEIGHT
class Checks {
  constructor() {
    this.checksArr = fs.readJsonFile("./data/allChecks.json");
  }
  write(student, subject) {
    //let checksArr = this.checksArr;
    let checks = this.getByStudentAndSubject(student, subject);
    /////////////////////////////////////////////////////////
    if (!checks) {
      checks = {
        student: student,
        subject: subject,
        values: []
      };
    }
    let value = new Check("empty");
    let t = true;
    while (t) {
      console.clear();
      for (let value of checks.values) {
        console.log(value.value + ", ");
      }
      let c = readlinesync.question(
        "1.Present\n2.Absent\n3.Delete last\n4.End filling\n"
      );
      let val;
      switch (c) {
        case "1": {
          value.set("p");
          val = value.copy();
          checks.values.push(val);
          break;
        }
        case "2": {
          value.set("a");
          val = value.copy();
          checks.values.push(val);
          break;
        }
        case "3": {
          checks.values.pop();
          break;
        }
        case "4": {
          t = false;
        }
      }
    }
    let temp = false;
    let checksArr = this.checksArr;
    for (let index in checksArr) {
      if (
        checksArr[index].name == checks.name &&
        checksArr[index].student == checks.student
      ) {
        checksArr[index] = checks;
        temp = true;
      }
    }
    if (temp == false) {
      checksArr.push(checks);
      console.log(temp);
    }
    this.checksArr = checksArr;
    fs.writeJsonFile("./data/allChecks.json", checksArr);

    /////////////////////////////////////////////////////////
    return checksArr;
  }
  getByStudentAndSubject(student, subject) {
    let allChecks = this.getAll();
    for (let checks of allChecks) {
      if (checks.student == student && checks.subject == subject) {
        return checks;
      }
    }
    return false;
  }
  getByStudent(student) {
    let allChecks = this.getAll();
    let arr = [];
    for (let checks of allChecks) {
      if (checks.student == student) {
        arr.push(checks);
      }
    }
    //if ((arr[0] = undefined)) return false;
    return arr;
  }

  getAll() {
    return this.checksArr;
  }
}
////////////////////RELATIONS
//////////MEDIATOR
class UserMediator {
  constructor(usercreator) {
    this.usercr = usercreator;
  }
  setGroup() {
    let groupcr = new GroupCreator();
    let name = readlinesync.question("Enter your group name:");
    let group = groupcr.getByName(name);
    while (!group) {
      console.log("This group does not exist!");
      name = readlinesync.question("Enter your group name:\n");
      group = groupcr.getByName(name);
    }
    //
    this.usercr.setGroup(group.name);
    //
    group.students.push(this.usercr.user.gmail);
    groupcr.update(group);
    return this.usercr;
  }
  setSubject() {
    let subjectcr = new SubjectCreator();
    let sname = readlinesync.question("Enter your subject name:");
    let subject = subjectcr.getByName(sname);
    //
    while (!subject) {
      console.log("This subject does not exist!");
      sname = readlinesync.question("Enter your subject name:\n");
      subject = subjectcr.getByName(sname);
    }
    //
    this.usercr.setSubject(subject.name);
    //
    subject.teacher = this.usercr.user.gmail;
    subjectcr.update(subject);
    return this.usercr;
  }
}
//////////PROXY
class ActionsProxy {
  constructor(actions) {
    this.actions = actions;
  }
  signIn() {
    this.actions.signIn();
  }
  signUp() {
    this.actions.signUp();
  }
  createSubject() {
    if (this.actions.user.role == "admin") {
      this.actions.createSubject();
    } else {
      console.log("Not enough rights");
      readlinesync.question("Push Enter to next action!\n");
    }
  } //admin
  createGroup() {
    if (this.actions.user.role == "admin") {
      this.actions.createGroup();
    } else {
      console.log("Not enough rights");
      readlinesync.question("Push Enter to next action!\n");
    }
  } //admin
  createCheck() {
    if (this.actions.user.role == "teacher") {
      this.actions.createCheck();
    } else {
      console.log("Not enough rights");
      readlinesync.question("Push Enter to next action!\n");
    }
  } //teacher
  lookGroup() {
    if (this.actions.user.role == "student") {
      this.actions.lookGroup();
    } else {
      console.log("Not enough rights");
      readlinesync.question("Push Enter to next action!\n");
    }
  } //student
  lookMyCheck() {
    if (this.actions.user.role == "student") {
      this.actions.lookMyCheck();
    } else {
      console.log("Not enough rights");
      readlinesync.question("Push Enter to next action!\n");
    }
  } //student
}
class Actions {
  constructor() {
    this.user = undefined;
  }
  signUp() {
    console.clear();
    let gmail = readlinesync.question("Enter gmail:\n");
    //check gmail
    let users = new Users();
    while (!users.isUniq(gmail)) {
      console.log("This gmail has been already registered");
      gmail = readlinesync.question("Enter gmail:\n");
    }
    let usercr = new ConsoleUserCreator();
    let user = usercr.create(gmail);

    users.addUser(user);
    console.log("You are registered!");
    this.user = user;
    return user;
  }
  signIn() {
    console.clear();
    let gmail = readlinesync.question("Enter gmail:\n");
    //find by gmail
    let users = new Users();
    while (!users.getByGmail(gmail)) {
      console.log(
        "This gmail is not found in the system!\nChoose next action:"
      );
      let c = readlinesync.question("1.Enter gmail again\n2.Get back\n");
      switch (c) {
        case "1": {
          gmail = readlinesync.question("Enter gmail:\n");
          break;
        }
        case "2": {
          return 0;
        }
      }
    }
    let user = users.getByGmail(gmail);
    //check password
    let password = readlinesync.question("Enter password:\n");
    while (user.password != password) {
      console.log("This password is not right!\nChoose next action:");
      let c = readlinesync.question("1.Enter password again\n2.Get back\n");
      switch (c) {
        case "1": {
          password = readlinesync.question("Enter password:\n");
          break;
        }
        case "2": {
          return 0;
        }
      }
    }
    this.user = user;
    return user;
  }
  createSubject() {
    console.clear();
    let name = readlinesync.question("Enter name of subject:\n");
    let subjectcr = new SubjectCreator();
    let subject = subjectcr.getByName(name);
    while (subject) {
      console.log("Subject has been already created\nChoose next action");
      let c = readlinesync.question("1.Enter name again\n2.Get back\n");
      switch (c) {
        case "1": {
          name = readlinesync.question("Enter name of subject:\n");
          subject = subjectcr.getByName(name);
          break;
        }
        case "2": {
          return 0;
        }
      }
    }
    ////
    let gname = readlinesync.question("Enter name of group:\n");
    let groupcr = new GroupCreator();
    let group = groupcr.getByName(gname);
    while (!group) {
      console.log("Group not found\nChoose next action");
      let c = readlinesync.question("1.Enter name again\n2.Get back\n");
      switch (c) {
        case "1": {
          gname = readlinesync.question("Enter name of group:\n");
          group = groupcr.getByName(group);
          break;
        }
        case "2": {
          return 0;
        }
      }
    }
    subjectcr.create(name, gname);
  } //admin
  createGroup() {
    console.clear();
    let name = readlinesync.question("Enter name of group:\n");
    let groupcr = new GroupCreator();
    let group = groupcr.getByName(name);
    while (group) {
      console.log("Group has been already created\nChoose next action");
      let c = readlinesync.question("1.Enter name again\n2.Get back\n");
      switch (c) {
        case "1": {
          name = readlinesync.question("Enter name of group:\n");
          group = groupcr.getByName(name);
          break;
        }
        case "2": {
          return 0;
        }
      }
    }
    groupcr.create(name);
  } //admin
  createCheck() {
    console.clear();
    let checksArr = new Checks();
    //
    let gmail = readlinesync.question("Enter gmail of student:\n");
    let users = new Users();
    let user = users.getByGmail(gmail);
    while (!user) {
      console.log("This gmail is not found\nChoose next action");
      let c = readlinesync.question("1.Enter gmail again\n2.Get back\n");
      switch (c) {
        case "1": {
          gmail = readlinesync.question("Enter gmail of student:\n");
          user = users.getByGmail(gmail);
          break;
        }
        case "2": {
          return 0;
        }
      }
    }
    ////
    let name = this.user.subject;
    let checks = checksArr.write(gmail, name);
  } //teacher
  lookGroup() {
    console.clear();
    let name = this.user.group;
    let groupcr = new GroupCreator();
    let group = groupcr.getByName(name);
    let i = 1;
    for (let user of group.students) {
      console.log(`${i}.${user}`);
      i++;
    }
    readlinesync.question("Push Enter to next action!\n");
  } //student
  lookMyCheck() {
    console.clear();
    let allcheck = new Checks();
    let checks = allcheck.getByStudent(this.user.gmail);
    //checks = checks.values;
    let arr = [];
    for (let check of checks) {
      for (let value of check.values) {
        arr.push(value.value);
      }
      console.log(check.subject+":")
      console.log(arr);
    }
    readlinesync.question("Push Enter to next action!\n");
  } //student
}
////////////////////CONSOLE
///////FACADE
class Console {
  constructor(actions) {
    this.actions = actions;
  }
  run() {
    while (true) {
      console.clear();
      console.log("Welcome to ICheck! Choose your action");
      let c = readlinesync.question("1.Sign in\n2.Sign up\n3.Exit\n");
      let user;
      switch (c) {
        case "1": {
          user = this.actions.signIn();
          break;
        }
        case "2": {
          user = this.actions.signUp();
          break;
        }
        case "3": {
          console.log("BYE!!!");
          return 0;
        }
      }
      this.menu();
    }
  }
  menu() {
    while (true) {
      console.clear();
      console.log("Choose next action:");
      let c = readlinesync.question(
        "1.Create subject\n2.Create group\n3.Create check\n4.Look group\n5.Look your checks\n6.Log out\n"
      );
      let user;
      switch (c) {
        case "1": {
          this.actions.createSubject();
          break;
        }
        case "2": {
          this.actions.createGroup();
          break;
        }
        case "3": {
          this.actions.createCheck();
          break;
        }
        case "4": {
          this.actions.lookGroup();
          break;
        }
        case "5": {
          this.actions.lookMyCheck();
          break;
        }
        case "6": {
          console.log("LOG OUT");
          return 0;
        }
      }
    }
  }
}
////////////////////PROGRAM
let cons = new Console(new ActionsProxy(new Actions()));
cons.run();
