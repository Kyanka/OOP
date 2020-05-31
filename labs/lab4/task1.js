class Installer {
	constructor(name, nextStatus) {
		this.name = name;
        this.nextStatus = nextStatus;
	}

	next() {
        console.log("\nInstalling " + this.name +".....\n")
		return new this.nextStatus();
	}
}

class Program1 extends Installer {
	constructor() {
		super('Program1', Program2);
	}
}

class Program2 extends Installer {
	constructor() {
		super('Program2', Program3);
	}
}

class Program3 extends Installer {
	constructor() {
		super('Program3', End);
	}
}
class End extends Installer {
    constructor() {
        super('End', End);
    console.log("Intallation End")
	}
}
//////////////////////////////////////////////
class ToInstall {
	constructor() {
		this.state = new Program1();
	}

	nextState() {
		this.state = this.state.next();
    };
    installOne(){
        if(this.state.name == "Program2" || this.state.name == "Program3" || this.state.name == "End")
        console.log("You have already installed First Program")
        else
        this.state = this.state.next();
    }
    installTwo(){
        if(this.state.name == "Program1")
        console.log("You should install First Program")
        if(this.state.name == "Program3" || this.state.name == "End")
        console.log("You have already installed Second Program")
        if(this.state.name == "Program2")
        this.state = this.state.next();
    }
    installThree(){
        if(this.state.name == "Program1")
        console.log("You should install First Program")
        if(this.state.name == "Program2")
        console.log("You should install Second Program")
        if(this.state.name == "End")
        console.log("You have already installed Third Program")
        if(this.state.name == "Program3")
        this.state = this.state.next();
        
    }
}

let installer = new ToInstall();
installer.installOne();
installer.installOne();
installer.installThree();
installer.installTwo();
installer.installOne();
installer.installTwo();
installer.installThree();
installer.installThree();
installer.installTwo();
installer.installOne();

