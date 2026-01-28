/* GET THE DATE */
var date = new Date();
console.log(date);

/* EXTRACT THE CURRENT DATE INFO */
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log(currentMonth);
console.log(currentDay);
console.log(currentDate);
console.log(currentYear);

/* IMPORTANT DATE INFO */
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

/* CHANGING MONTHS */
var title = document.getElementById("title");
title.innerHTML = "&#127800;" + months[currentMonth] + "&#127800;";

/* CHANGING HABIT OR GOAL TITLE */
var habitTitle = document.getElementById("habitTitle")
habitTitle.onclick = function () {
  let habits = prompt("What's your goal or habit?", habitTitle.innerHTML);
  if(habits.length == 0) {
    habitTitle.innerHTML = "Hey! You left this blank!";
  }else{
    habitTitle.innerHTML = habits;
  }
}

/* SET THE TOTAL DAYS */
var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31 ,31, 30, 31, 30, 31];
var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById("totalDays");

/*SETUP THE CALENDAR DAYS*/
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days");

/* OUTER LOOP */
for( var i=0; i < days.length; i++ ){
  var day = days[rowCount].getElementsByClassName("day");

/* INNER LOOP */
  for ( var j=0; j < day.length; j++){
    if (dayCount == currentDate - 1) {
      day[j].classList.add("current-day");
    }

    if (dayCount < daysInThisMonth) {
      day[j].innerHTML = dayCount +1;
      day[j].setAttribute("id", "day" + (dayCount + 1));
      day[j].classList.add("incomplete");
      dayCount++;
    } else {
      day[j].innerHTML = "";
      day[j].classList.remove("completed", "incomplete");
    }
  }
  rowCount++;
}

/* INITIALIZE COMPLETED ARRAY */
var completed = new Array(31);
  for (var i = 0; i < dayCount; i++) {
    var tempString =
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log("storing date: " + tempString);
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if(tempDay == null || tempDay == "false"){
      localStorage.setItem(tempString, "false");
    } else if (tempDay == "true") {
      daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
  }

  console.log("completed array: " + completed);
  console.log("total days completed: " + daysCompleted);

  /* CHECK STORAGE AND UPDATE COMPLETED ARRAY */
   for (var i = 0; i < currentDate; i++) {
    var tempString = 
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log(tempString);

    var chosenDay = localStorage.getItem(tempString);
    console.log(i + 1 + ": " + chosenDay);
    var chosenDayDiv = document.getElementById("day" + (i + 1));
        if (chosenDay === "true") {
      chosenDayDiv.classList.add("completed");
      chosenDayDiv.classList.remove("incomplete");
    } else {
      chosenDayDiv.classList.add("incomplete");
      chosenDayDiv.classList.remove("completed");
    }
   }

   /* UPDATE COMPLETED ON CALENDAR */
   var dayDivs = document.querySelectorAll(".day");
   for (var i=0; i<currentDate;i++) {
    dayDivs[i].onclick = function (e) {
      var num =e.target.innerText;
      var selectedDate = document.getElementById(e.target.id);
      var storageString =
        "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
          if (localStorage.getItem(storageString) === "false") {
      selectedDate.classList.add("completed");
      selectedDate.classList.remove("incomplete");
      localStorage.setItem(storageString, "true");
      daysCompleted++;
    } else {
      selectedDate.classList.add("incomplete");
      selectedDate.classList.remove("completed");
      localStorage.setItem(storageString, "false");
      daysCompleted--;
    }

      totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
      console.log(daysCompleted, currentDate);
      if(daysCompleted === currentDate){
        alert("great job!");
      }
    }
   }

   /* RESET BUTTON */
   var resetButton = document.getElementById("resetButton");
   resetButton.onclick = function () {
    for (var i = 0; i < dayCount; i++) {
      var tempStrings =
      "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
      console.log(tempStrings);
      localStorage.setItem(tempStrings, "false");
      var curDay = document.getElementById("day" + (i + 1));
      curDay.classList.add("incomplete");
      curDay.classList.remove("completed");

    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
   };