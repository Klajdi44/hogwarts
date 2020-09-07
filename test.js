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

// if (selected === 'capitalize') {
//   const splited = name.split(' ');
//   const splitedFIrstName = splited[0];
//   const sliced = name.slice(1); //or slice
//   // console.log(sliced);
//   const together = splitedFIrstName[0].toUpperCase() + sliced.toLowerCase();
//   output.value = together;
// }
// else if (selected === 'findFirstName') {
//   const firstSpace = name.indexOf(' ');
//   const splited = name.slice(0, firstSpace);
//   output.value = splited;
// }
// else if (selected === 'firstNameLength') {
//   const firstSpace = name.indexOf(' ');
//   const splited = name.slice(0, firstSpace);
//   output.value = splited.length;
// }
// else if (selected === 'middleName') {
//   const firstSpace = name.indexOf(' ');
//   const lastSpace = name.lastIndexOf(' ');
//   const splited = name.substring(firstSpace, lastSpace);
//   output.value = `your middlename start position is ${firstSpace + 1} and last position is ${lastSpace - 1} the middle name is ${splited}`;
// }
// else if (selected === 'pngOrJpg') {
//   if (name.includes('.png')) {
//     output.value = `the file is png`;
//   } else if (name.includes('.jpg')) {
//     output.value = `the file is jpg`;

//   } else {
//     output.value = `stop writting gibberish Peter`;
//   }
// }
// else if (selected === 'password') {
//   const replaced = name.replaceAll(name, '*');
//   output.value = replaced;

// }
// else if (selected === 'thierdCharUppercase') {
//   const begginingOfName = name.substring(0, 2);
//   const thierdLetter = name.substring(2, 3);
//   const restOfName = name.substring(3);

//   const glued = `${begginingOfName}${thierdLetter.toUpperCase()}${restOfName}`;
//   output.value = glued;
// }
// else if (selected === 'hyphen') {
//   if (/-/.test(name)) {
//     const hyphenIndex = name.indexOf('-'); //returns the index of -
//     const beggining = name.substring(0, hyphenIndex); //returns everything before the -
//     const letterAfter = name.substring(hyphenIndex, hyphenIndex + 2);//returns a
//     const restOf = name.substring(hyphenIndex + 2); //returns the rest of the name after a

//     const glued = `${beggining}${letterAfter.toUpperCase()}${restOf}`
//     output.value = glued;

function prepareObjects(jsonData) {
  jsonData.forEach(studentObj => {
    // TODO: Create new object with cleaned data - and store that in the allStudents array

    //clone the prototype object
    const student = Object.create(Student);

    //remove excesive white space
    const studentObjTrimmed = studentObj.fullname.trim();

    //firstName uppercase
    const firstSpace = studentObjTrimmed.indexOf(' ');
    const secondSpace = studentObjTrimmed.indexOf(' ', firstSpace + 1);
    const lastSpace = studentObjTrimmed.lastIndexOf(' ');


    const firstLetter = studentObjTrimmed[0].toUpperCase();
    const rest = studentObjTrimmed.substring(1, firstSpace);
    const glued = `${firstLetter}${rest}`
    const splitedIntoArray = Array.from(studentObjTrimmed);


    //middle name uppercase
    const firstLetterMiddle = studentObjTrimmed.substring(firstSpace, firstSpace + 2);

    //TODO: find a way to fix the rest of name
    const restMiddle = studentObjTrimmed.substring(firstSpace + 2);
    // console.log(restMiddle);


    const middleName = studentObjTrimmed.substring(firstSpace, lastSpace);

    const middleGlued = `${firstLetterMiddle.toUpperCase()}${restMiddle}`

    //get last name
  
    //TODO: fix firstLetterLast
    const firstLetterLast = studentObjTrimmed.substring(lastSpace)



    console.log(studentObjTrimmed);


    student.name = `${glued}${middleGlued}`





    // student.desc = studentObj.fullname.substring(secondSpace, lastSpace);

    // student.type = studentObj.fullname.substring(lastSpace);

    // student.age = studentObj.age;


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


// First name
// Last name
// Middle name (if any)
// Nick name (if any)
// Image/photo filename
// House 