const fname = document.getElementById("fname");
const lmane = document.getElementById("lname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zip = document.getElementById("postal");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const resume = document.getElementById("resume");
const legal1 = document.getElementById("legal1");
const legal2 = document.getElementById("legal2");
//use this button to add work might need to be hidden in the begining
const addWorkBtn = document.getElementById("addWork"); //<- add these in html
const doneAddingBtn = document.getElementById("doneAdding");// <- add these in html JEFF
const endDialog;  //add necessary element in HTML
const acceptCloseBtn = document.getElementById("acceptClose");// add this in html
const cancelCloseBtn = document.getElementById("cancelClose");//,- add this in html
const submitBtn = document.getElementById("save");

//addWorkBtn.addEventListener("click", () => taskForm.classList.toggle("hidden"));
//use this if i need to hide shit. this will defniteley change

doneAddingBtn.addEventListener("click", ()=> endDialog.showModal());






const allJobApp = [];
let currentJobApp = {};



acceptCloseBtn.addEventListener("click", () => endDialog.close());//primarily used to ask for confirmation
//before ending stuff.
submitBtn.addEventListener("click", () => {});  //these are part of add job stuff
