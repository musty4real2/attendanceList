import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-afa40-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const AttendanceListInDB = ref(database, "attendance")


const inputUsername = document.getElementById("username")
const inputDate = document.getElementById("date")
const inputTime = document.getElementById("time")
const clockInEl = document.getElementById("clock")
const attendanceListEl = document.getElementById("attendance-list")

clockInEl.addEventListener("click", function () {
    let inputValue = inputUsername.value
    let DateValue = inputDate.value
    let TimeValue = inputTime.value

    // Using push() and then setting the values
    // const newAttendanceRef = push(AttendanceListInDB)
    // set(newAttendanceRef, { username: inputValue, date: DateValue, time: TimeValue })

    push(AttendanceListInDB, { username: inputValue, date: DateValue, time: TimeValue })

    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputUsername.value = ""
    inputDate.value = ""
    inputTime.value = ""
    window.onload = dateTimeCollector();
}



onValue(AttendanceListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        
        clearAttendanceListEl();

        if (itemsArray.length > 0) {
            let firstItemValue = itemsArray[0][1];

            // Now you can use firstItemValue as needed
            // console.log(firstItemValue);
            let tblHead=document.createElement("tr");
            let usernameLabel=document.createElement("th");
            let dateLabel = document.createElement("th");
            let timeLabel = document.createElement("th");
            usernameLabel.innerHTML = "Username".toUpperCase();
            dateLabel.innerText = "Date".toUpperCase();
            timeLabel.innerHTML= "Time".toUpperCase();

            tblHead.appendChild(usernameLabel);
            tblHead.appendChild(dateLabel);
            tblHead.appendChild(timeLabel);

            attendanceListEl.appendChild(tblHead);


            for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i];
                let currentItemID = currentItem[0];
                let currentItemValue = currentItem[1];



                appendItemToAttendanceListEl(currentItem);
            }
        } else {
            attendanceListEl.innerHTML = "No items here... yet";
        }
    }
});



function clearAttendanceListEl() {
    attendanceListEl.innerHTML = ""
}
function appendItemToAttendanceListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newRow = document.createElement("tr"); 
    let usernameTd = document.createElement("td");
    usernameTd.textContent = itemValue.username.toUpperCase();

    let dateTd = document.createElement("td");
    dateTd.textContent = itemValue.date.toUpperCase();

    let timeTd = document.createElement("td");
    timeTd.textContent = itemValue.time.toUpperCase();

    // Challenge: Attach an event listener to the new row and make it so you console log the id of the item when it's pressed.
    newRow.addEventListener("click", function() {
        // console.log(itemID)
        let exactLocationOfItemInDB = ref(database, `attendance/${itemID}`);
        remove(exactLocationOfItemInDB);
    });

    
    // Append the td elements to the new row
    newRow.appendChild(usernameTd);
    newRow.appendChild(dateTd);
    newRow.appendChild(timeTd);

    // Append the new row to the attendance list
    attendanceListEl.appendChild(newRow);
}


function dateTimeCollector() {
    const now = new Date();

    // Date
    const currentDate = now.toLocaleDateString();
    document.getElementById('date').value = currentDate;
    // Time
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('time').value = currentTime;
}
window.onload = dateTimeCollector();
