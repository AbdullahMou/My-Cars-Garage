'use strict';
var allCars = [];
var table = document.getElementById('table');
var headerArray = ['Car Model', 'Model Year', 'Price', 'Manufacturer'];
var form = document.getElementById('form');

function Car(model, year, manufacturer) {
    this.model = model;
    this.year = year;
    this.manufacturer = manufacturer;
    this.price = 0;
    allCars.push(this);

}
Car.prototype.addPrice = function() {
    var randomPrice = Math.floor(Math.random() * (100000 - 7000 + 1) + 7000);
    this.price = randomPrice;
}
Car.prototype.insertCar = function() {
    var tr = document.createElement('tr')
    table.appendChild(tr);

    var td = document.createElement('td');
    td.textContent = this.model;
    tr.appendChild(td);

    var td1 = document.createElement('td');
    td1.textContent = this.year;
    tr.appendChild(td1);

    var td3 = document.createElement('td');
    td3.textContent = this.price;
    tr.appendChild(td3);

    var td2 = document.createElement('td');
    td2.textContent = this.manufacturer;
    tr.appendChild(td2);
}

function addHeader() {
    var tr = document.createElement('tr');
    table.appendChild(tr);

    for (var i = 0; i < headerArray.length; i++) {
        var td = document.createElement('th');
        td.textContent = headerArray[i];
        tr.appendChild(td);

    }
}
addHeader();
form.addEventListener('submit', addNewCar)

function addNewCar(event) {
    event.preventDefault();
    var model = event.target.model.value;
    var year = event.target.year.value;
    var manufacturer = event.target.manufacturer.value;
    var car = new Car(model, year, manufacturer);
    car.addPrice();
    car.insertCar();

    calcolateTotalPrice();
    localStorage.setItem('car', JSON.stringify(allCars));
}
var carInStorage = JSON.parse(localStorage.getItem('car'));
if (localStorage.getItem('car')) {
    for (var j = 0; j < carInStorage.length; j++) {
        var carFromStorage = new Car(carInStorage[j].model, carInStorage[j].year, carInStorage[j].price, carInStorage[j].manufacturer)


    }
    carFromStorage.addPrice();
    carFromStorage.insertCar();
}

function calcolateTotalPrice() {
    var allPrice = 0;
    for (var k = 0; k < allCars.length; k++) {
        allPrice += allCars[k].price
    }
    document.getElementById('totalPrice').textContent = 'total Price = ' + allPrice
    console.log(allPrice);

}