const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
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
const addWorkBtn = document.getElementById("add-past-work"); //<- add these in html ------------|
const doneAddingBtn = document.getElementById("done-adding");// <- add these in html JEFF ------|
// const endDialog;  //add necessary element in HTML
// |---- all done
const company  = document.getElementById("company");
const position = document.getElementById("position");
const workStartDate = document.getElementById("work_start_date");
const workEndDate = document.getElementById("work_end_date");
const reponsibility = document.getElementById("reponsibility");


const acceptCloseBtn = document.getElementById("accept-close");// add this in html -------------|
const cancelCloseBtn = document.getElementById("cancel-close");//,- add this in html -----------|
const submitBtn = document.getElementById("save");

const addEducationBtn = document.getElementById("add-education");
const levelOfEducation = document.getElementById("level-of-education");
const schoolName = document.getElementById("school-name");
const degreeName = document.getElementById("degree-name");
const schoolStartDate = document.getElementById("school-start-date");
const schoolEndDate = document.getElementById("school-end-date");
const doneAddingEducationBtn = document.getElementById("done-add-education");

//addWorkBtn.addEventListener("click", () => taskForm.classList.toggle("hidden"));
//use this if i need to hide shit. this will defniteley change

addWorkBtn.addEventListener("click", () => {
    const container = document.getElementById("work-experience-box").style.display = "block";
})

doneAddingBtn.addEventListener("click", ()=> {
    const discardBox = document.getElementsByClassName("discard");
    for (let i = 0; i < discardBox.length; i++) {
        discardBox[i].style.display = "block";
    }
    acceptCloseBtn.addEventListener("click", () => removeAll());
    cancelCloseBtn.addEventListener("click", ()=>{
        for (let i = 0; i < discardBox.length; i++) {
            discardBox[i].style.display = "none";
        }
    });
});

const removeAll = () => {
    const discardBox = document.getElementsByClassName("discard");
    const container = document.getElementById("work-experience-box").style.display = "none";
    for (let i = 0; i < discardBox.length; i++) {
        discardBox[i].style.display = "none";
    }
}




const allJobAppStorage = []; //array that stores objects
let currJobApp = {
    uniqueId: "", //need to create a hash or something here to assign unique values based on unique strings to see if
    //a app already exists
    f_name: fname.value.toLowerCase(),
    l_name: lname.value.toLowerCase(),
    email: email.value.toLowerCase(),
    address: address.value.toLowerCase(),
    city: city.value.toLowerCase(),
    state: state.value.toLowerCase(),
    postal: zip.value,
    phone: phone.value,
    //resume : as BOO potentially?
    workExp: {company: company.value.toLowerCase().split(" ").join("-"),
        position: position.value.toLowerCase().split(" ").join("-"),
        startDate: workStartDate.value,//might need the same method here as on top
        endDate: workEndDate.value,//might need the same shit here as on top
        responsibility: reponsibility.value.toLowerCase().split(" ").join("-")},
    education: {
        educationLevel: levelOfEducation.value.toLowerCase().split(" ").join("-"),
        school: schoolName.value.toLowerCase().split(" ").join("-"),
        degree: degreeName.value.toLowerCase().split(" ").join("-"),
        start: schoolStartDate.value,//might need the same shit here as on top
        end: schoolEndDate.value//might need the same shit here as on top
    } //NOTE TO JEFF:- use the mthod applied stuff to generate unique ids




};  //object to store current values.

//need a function to store the object into the task form
//NEED SOMETHING to check for if element already exists
//here using position ad unique id but we need to chane this for sure
const alreadyExistsApp = allJobAppStorage.indexOf((curr) => curr.uniqueId === currJobApp.uniqueId );
const addToList = (jobApp = {}) => {};
 if(alreadyExistsApp === -1){
     allJobAppStorage.unshift(currJobApp);
 }

acceptCloseBtn.addEventListener("click", () => endDialog.close());//primarily used to ask for confirmation
//before ending stuff.
submitBtn.addEventListener("click", () => {});  //these are part of add job stuff
