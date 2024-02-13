import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-afa40-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const AttendanceListInDB = ref(database, "attendance")


const inputUsername = document.getElementById("username")
const inputDate= document.getElementById("date")
const inputTime= document.getElementById("time")
const clockInEl = document.getElementById("clockin")
const shoppingListEl = document.getElementById("shopping-list")

clockInEl.addEventListener("click", function() {
    let inputValue = inputUsername.value
    let DateValue = inputDate.value
    let TimeValue = inputTime.value
    
    push(AttendanceListInDB, inputValue, DateValue, TimeValue)
    
    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputUsername.value = ""
    inputDate.value = ""
    inputTime.value = ""
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