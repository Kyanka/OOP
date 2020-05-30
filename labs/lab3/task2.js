const readlinesync = require("readline-sync");
class TP_Provider {
  constructor() {
    this.type = "TP";
    this.tariff;
  }
  info() {
    console.clear();
    console.log(
      "This is your " +
        this.type +
        " provider\nYour tariff is:" +
        "\nSpeed:" +
        this.tariff.speed +
        "\nVolume:" +
        this.tariff.volume +
        "\nPrice:" +
        this.tariff.price
    );
  }
  chooseTariff() {
    let tariff1 = { speed: 300, volume: 30, price: 100 };
    let tariff2 = { speed: 400, volume: 40, price: 150 };
    let tariff3 = { speed: 500, volume: 50, price: 200 };
    console.clear();
    console.log("1.Speed 300 Volume 30 Price 100");
    console.log("2.Speed 400 Volume 40 Price 150");
    console.log("3.Speed 500 Volume 50 Price 200");
    let t = readlinesync.question("Choose tariff:");
    if (t == 1) this.tariff = tariff1;
    if (t == 2) this.tariff = tariff2;
    if (t == 3) this.tariff = tariff3;

  }
}
class TV_Provider {
  constructor() {
    this.type = "TV";
    this.tariff;
  }
  info() {
    console.clear();
    console.log(
      "This is your " +
        this.type +
        " provider\nYour tariff is:" +
        "\nSpeed:" +
        this.tariff.speed +
        "\nVolume:" +
        this.tariff.volume +
        "\nPrice:" +
        this.tariff.price
    );
  }
  chooseTariff() {
    let tariff1 = { speed: 300, volume: 30, price: 100 };
    let tariff2 = { speed: 400, volume: 40, price: 150 };
    let tariff3 = { speed: 500, volume: 50, price: 200 };
    console.clear();
    console.log("1.Speed 300 Volume 30 Price 100");
    console.log("2.Speed 400 Volume 40 Price 150");
    console.log("3.Speed 500 Volume 50 Price 200");
    let t = readlinesync.question("Choose tariff:");
    if (t == 1) this.tariff = tariff1;
    if (t == 2) this.tariff = tariff2;
    if (t == 3) this.tariff = tariff3;
  }
}
class WIFI_Provider {
  constructor() {
    this.type = "WIFI";
    this.tariff;
  }
  info() {
    console.clear();
    console.log(
      "This is your " +
        this.type +
        " provider\nYour tariff is:" +
        "\nSpeed:" +
        this.tariff.speed +
        "\nVolume:" +
        this.tariff.volume +
        "\nPrice:" +
        this.tariff.price
    );
  }
  chooseTariff() {
    let tariff1 = { speed: 300, volume: 30, price: 100 };
    let tariff2 = { speed: 400, volume: 40, price: 150 };
    let tariff3 = { speed: 500, volume: 50, price: 200 };
    console.clear();
    console.log("1.Speed 300 Volume 30 Price 100");
    console.log("2.Speed 400 Volume 40 Price 150");
    console.log("3.Speed 500 Volume 50 Price 200");
    let t = readlinesync.question("Choose tariff:");
    if (t == 1) this.tariff = tariff1;
    if (t == 2) this.tariff = tariff2;
    if (t == 3) this.tariff = tariff3;
  }
}

class ServiceCenter {
  connect(type) {
    if (type == "1") {
      return new TP_Provider();
    }
    if (type == "2") {
      return new TV_Provider();
    }
    if (type == "3") {
      return new WIFI_Provider();
    }
  }
  offer() {
    console.clear();
    let type = readlinesync.question(
      "Choose type of Provider\n1.TP\n2.TV\n3.WIFI\n"
    );
    return this.connect(type);
  }
}


console.clear();
let service = new ServiceCenter();
let provider = service.offer();
provider.chooseTariff();
provider.info();