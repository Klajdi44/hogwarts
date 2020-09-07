"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
}

const Student = {
  firstName: '',
  middleName: '',
  lastName: '',
  nickName: '',
  gender:'',
  house: '',
  image: ''
}

function loadJSON() {
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach(studentObj => {
    // TODO: Create new object with cleaned data - and store that in the allStudents array

    //clone the prototype object
    const student = Object.create(Student);

    //remove excesive white space
    const studentObjTrimmed = studentObj.fullname.trim();

    // make an array with every letter of names.
    const letterArray = studentObjTrimmed.split('')
    console.log(letterArray);

    //if previous index is equal to '' or - make next index uppercase
    letterArray.forEach((letter, i) => {
      if (letterArray[i - 1] === ' ' || letterArray[i - 1] === '-') {
        letterArray[0] = letter.toUpperCase();
        letterArray[i] = letter.toUpperCase();
      }
      else if (letterArray[i - 1] === '"') {
        letterArray[i] = letter.toUpperCase();
      }
      else {
        letterArray[0] = letter.toUpperCase();
        letterArray[i] = letter.toLowerCase();
      }
      student.name = letterArray.join('');

    });


    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayAnimal);

}

function displayAnimal(student) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = student.name
  // clone.querySelector("[data-field=desc]").textContent = student.desc;
  // clone.querySelector("[data-field=type]").textContent = student.type;
  // clone.querySelector("[data-field=age]").textContent = student.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
