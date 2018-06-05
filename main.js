"use strict";

const database = firebase.database();
const form = document.querySelector("form");
const headerEl = document.querySelector("#form-header");
const discriptionEl = document.querySelector("#form-description");
const template = document.querySelector("#noteTemplate").content;
const app = document.querySelector("#app");

// add new notes
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    //console.log(headerEl.value);
    database.ref("notes/").push({
        header: headerEl.value,
        description: discriptionEl.value
    });
    //clear our forms
    headerEl.value="";
    discriptionEl.value="";
});

//listen for new data
database.ref("notes/").on("child_added", (snapshot)=>{
    const key = snapshot.key;
    const data = snapshot.val();
console.log(snapshot);
const clone = template.cloneNode(true);
clone.querySelector("h1").textContent = data.header;
clone.querySelector("div.description").textContent = data.description;
app.appendChild(clone);
});





// delete from the / = root
// database.ref("/").remove()