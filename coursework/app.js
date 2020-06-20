////////////////////ADD LIBS
const readlinesync = require("readline-sync");
const fs = require("./addlibs/jsonparser.js");
////////////////////MODELS
//////////////USERS
class User {
  constructor(gmail, password, fullname) {
    this.gmail = gmail;
    this.password = password;
    this.fullname = fullname;
    this.role = undefined;
  }
  getInfo() {
    //todo
  }
}
////////BUILDER
class UserCreator {
  constructor(gmail, password, fullname) {
    this.user = new User(gmail, password, fullname);
  }
  toStudent(group) {
    this.user.role = "student";
    this.user.group = group;
    return this;
  }
  toTeacher(subject) {
    this.user.role = "teacher";
    this.user.subject = subject;
    return this;
  }
  toAdmin() {
    this.user.role = "admin";
    return this;
  }
  create() {
    return this.user;
  }
}
////////FLYWEIGHT
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
//////////FACTORY + FLYWEIGHT
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
//////////FACTORY + FLYWEIGHT
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
  set(value){
    this.value =value;
  }
  copy() {
    return new Check(this.value);
  }
}
class Checks {
  constructor() {
    this.checks = [];
    this.student;
    this.subject;
  }
  getByStudent(gmail) {
    let checks = this.getAll();
    for (let check of checks) {
      if (check.name == name) {
        return check;
      }
    }
    return false;
  }
  getAll() {
    return this.checks;
  }
}
//////////FACTORY + FLYWEIGHT
class AllChecks {
  constructor() {
    this.allChecks = fs.readJsonFile("./data/checks.json");
  }
  create(student, subject) {
    let allChecks = this.allChecks;
    let allCheck = this.getByStudentAndSubject(student, subject);
    if (allCheck) {
      console.log("This allCheck has been already created");
      return allCheck;
    }
    Checks = new Checks(student, subject);
    allChecks.push(Check);
    this.allChecks = allChecks;
    fs.writeJsonFile("./data/allChecks.json", allChecks);
    return allCheck;
  }
  update(allCheck) {
    let allChecks = this.allChecks;
    let temp = false;
    for (let index in allChecks) {
      if (allChecks[index].name === allCheck.name) {
        allChecks[index] = allCheck;
        temp = true;
      }
    }
    if(!temp);
    {
      allChecks.push(allCheck);
    }
    this.allChecks = allChecks;
    fs.writeJsonFile("./data/allChecks.json", allChecks);
  }
  delete(name) {
    let allChecks = this.allChecks;
    for (let index in allChecks) {
      if (allChecks[index].name === name) {
        allChecks.splice(index, 1);
      }
    }
    this.allChecks = allChecks;
    fs.writeJsonFile("./data/allChecks.json", allChecks);
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
    for (let checks of allChecks) {
      if (checks.student == student) {
        return checks;
      }
    }
    return false;
  }
  getAll() {
    return this.allChecks;
  }
}
////////////////////RELATIONS
//////////MEDIATOR
class UserMediator {
  constructor(user) {
    this.user = user;
  }
  getGroup() {
    let groupcr = new GroupCreator();
    let name = readlinesync.question("Enter your group name:");
    let group = groupcr.getByName(name);
    while (!group) {
      console.log("This group does not exist!");
      name = readlinesync.question("Enter your group name:\n");
      group = groupcr.getByName(name);
    }
    let user = this.user.toStudent(group.name);
    user = user.create();
    group.students.push(user);
    groupcr.update(group);
    return user;
  }
  getSubject() {
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
    let user = this.user.toTeacher(subject.name);
    user = user.create();
    //
    subject.teacher = user;
    subjectcr.update(subject);
    return user;
  }
}
//////////PROXY
class RoleProxy {
  constructor(user) {
    this.user = user;
    this.role = user.role;
  }
  createSubject() {
    if (this.role == "admin") {
      let name = readlinesync.question("Enter name of subject:\n");
      let subjectcr = new SubjectCreator();
      let subject = subjectcr.getByName(name);
      while (subject) {
        console.log("Subject has been already created\nChoose next action");
        let c = readlinesync.question("1.Enter name again\n2.Get back\n");
        switch (c) {
          case "1": {
            name = readlinesync.question("Enter name of subject:\n");
            subject = groupcr.getByName(name);
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
    } else {
      console.log("Not enough rights");
    }
  } //admin
  createGroup() {
    if (this.role == "admin") {
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
    } else {
      console.log("Not enough rights");
    }
  } //admin
  createCheck() {
    if (this.role == "teacher") {
      let allcheck = new AllChecks();
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
      let name = this.user.subject
    
      let checks = allcheck.getByStudentAndSubject(gmail, name);
      if(!checks){
        checks = new Array();
      }
      //checks = checks.checks
      let check = new Check("empty");
      while (true) {
        let c = readlinesync.question("1.Present\n2.Absent\n3.End filling\n");
        let ch;
        switch (c) {
          case "1": {
            check.set("p")
            ch = check.copy();
            break;
          }
          case "2": {
            check.set("a")
            ch = check.copy();
            break;
          }
          case "3": {
            return 0;
          }
        }
        checks.push(ch);
        allcheck = {
          student:gmail, subject:name, checks:checks
        };
        let allcheck1 = new AllChecks();
        allcheck1.update(allcheck);
        
      }
    } else {
      console.log("Not enough rights");
    }
  } //teacher
  lookGroup() {
    if (this.role == "student" || this.role == "teacher") {
      let name = readlinesync.question("Enter name of group:\n");
      let groupcr = new GroupCreator();
      let group = groupcr.getByName(name);
      while (!group) {
        console.log("Can`t find group\nChoose next action");
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
      let i = 1;
      for(let user of group.students){
          console.log(`${i}.${user.fullname} gmail:${user.gmail}`)
      }
    } else {
      console.log("Not enough rights");
    }
  } //student
  lookMyCheck() {
    if (this.role == "student") {

        let allcheck = new AllChecks();
        let checks = allcheck.getByStudent(this.user.gmail);
        checks = checks.checks
        console.log(checks)
    } else {
      console.log("Not enough rights");
    }
  } //student
}


////////////////////CONSOLE
class Console{
  menu(user) {
    let proxy = new RoleProxy(user);
    while (true) {
      console.log("Choose next action:");
      let c = readlinesync.question(
        "1.Create subject\n2.Create group\n3.Create check\n4.Look group\n5.Look your checks\n6.Log out\n"
      );
      let user;
      switch (c) {
        case "1": {
          proxy.createSubject();
          break;
        }
        case "2": {
          proxy.createGroup();
          break;
        }
        case "3": {
          proxy.createCheck();
          break;
        }
        case "4": {
          proxy.lookGroup();
          break;
        }
        case "5": {
          proxy.lookMyCheck();
          break;
        }
        case "6": {
          console.log("LOG OUT");
          return 0;
        }
      }
    }
  }
 signIn() {
    let gmail = readlinesync.question("Enter gmail:\n");
    //find by gmail
    let users = new Users();
    while (!users.getByGmail(gmail)) {
      console.log("This gmail is not found in the system!\nChoose next action:");
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
    return user;
  }
  signUp() {
    let gmail = readlinesync.question("Enter gmail:\n");
    //check gmail
    let users = new Users();
    while (!users.isUniq(gmail)) {
      console.log("This gmail has been already registered");
      gmail = readlinesync.question("Enter gmail:\n");
    }
    //
    let password = readlinesync.question("Enter password:\n");
    let fullname = readlinesync.question("Enter fullname:\n");
    let user = new UserCreator(gmail, password, fullname);
    let r = readlinesync.question(
      "Enter your number of role:\n1.Admin\n2.Teacher\n3.Student\n"
    );
    switch (r) {
      case "1": {
        user = user.toAdmin();
        user = user.create();
        break;
      }
      case "2": {
        //todo add subject
        let medi = new UserMediator(user);
        user = medi.getSubject();
        break;
      }
      case "3": {
        let medi = new UserMediator(user);
        user = medi.getGroup();
        break;
      }
    }
  
    users.addUser(user);
    console.log("You are registered!");
    return user;
  }
}
class ConsoleFacade{
  constructor(cons){
    this.console = cons;
  }
  run() {
    while (true) {
      console.log("Welcome to ICheck! Choose your action");
      let c = readlinesync.question("1.Sign in\n2.Sign up\n3.Exit\n");
      let user;
      switch (c) {
        case "1": {
          user = this.console.signIn();
          break;
        }
        case "2": {
          user = this.console.signUp();
          break;
        }
        case "3": {
          console.log("BYE!!!");
          return 0;
        }
      }
      this.console.menu(user);
    }
  }

}

////////////////////PROGRAM
let cons = new ConsoleFacade(new Console);
cons.run();
