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
const addWorkBtn = document.getElementById("add-past-work"); //<- add these in html ------------|
const doneAddingBtn = document.getElementById("done-adding");// <- add these in html JEFF ------|
// const endDialog;  //add necessary element in HTML                                            |---- all done
const acceptCloseBtn = document.getElementById("accept-close");// add this in html -------------|
const cancelCloseBtn = document.getElementById("cancel-close");//,- add this in html -----------|
const submitBtn = document.getElementById("save");
const submitWorkBtn = document.getElementById("save-work-experience");
const listPastJobs = document.getElementById("inputted-job-experience");

//addWorkBtn.addEventListener("click", () => taskForm.classList.toggle("hidden"));
//use this if i need to hide shit. this will defniteley change


const container = document.getElementById("work-experience-box");
const company  = document.getElementById("company");
const position = document.getElementById("position");
const workStartDate = document.getElementById("work-start-date");
const workEndDate = document.getElementById("work-end-date");
const reponsibility = document.getElementById("reponsibility");

const addEducationBtn = document.getElementById("add-education");
const levelOfEducation = document.getElementById("level-of-education");
const schoolName = document.getElementById("school-name");
const degreeName = document.getElementById("degree-name");
const schoolStartDate = document.getElementById("school-start-date");
const schoolEndDate = document.getElementById("school-end-date");
const doneAddingEducationBtn = document.getElementById("done-add-education");

addWorkBtn.addEventListener("click", () => {showPastWorkBox()});     // Runs when Add Past Work Experience is pressed

const showPastWorkBox = () => {
    container.style.display = "block";
};

doneAddingBtn.addEventListener("click", ()=> {                  // Runs when X is pressed
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

submitWorkBtn.addEventListener("click", () => {              // Runs when submit button for PAST JOBS is pressed, pushes info to array
    const pastJob = {                                       // and updates ui
        company: company.value,
        position: position.value,
        startDate: workStartDate.value,
        endDate: workEndDate.value,
        responsibility: responsibility.value
    };
    allJobAppStorage.push(pastJob);

    listPastJobs.innerHTML += `<div id="temp"><br />
    Company: ${company.value} <br />
    Position: ${position.value} <br />
    Time: ${workStartDate.value} -> ${workEndDate.value} <br />
    Description: ${responsibility.value} <br />
    <button onclick="editPastWork()" type="button">Edit</button>
    <button onclick="removePastWork()" type="button">Delete</button>
    <br /></div>
    `
    alert("Successfully saved!");
    removeAll();
});

const clearJobInfo = () => {                            // Clears information in past work info boxes
    company.value = "";
    position.value = "";
    workStartDate.value = "";
    workEndDate.value = "";
    responsibility.value = "";
};

const removeAll = () => {                                           // Helper function to remove past work boxes
    clearJobInfo();
    const discardBox = document.getElementsByClassName("discard");
    const container = document.getElementById("work-experience-box").style.display = "none";
    for (let i = 0; i < discardBox.length; i++) {
        discardBox[i].style.display = "none";
    }
};

const removePastWork = () => {
    const removeDiv = document.getElementById("temp");
    removeDiv.innerHTML = ""; 
    alert(allJobAppStorage[0][company.value]);
};

const editPastWork = () => {
    alert("hei");
    const editDiv = document.getElementById("temp");
    showPastWorkBox();
};

const allJobAppStorage = []; //array that stores objects
let currentJobApp = {
    f_name: fname.value,
    l_name: lname.value,
    email: email.value,
    address: address.value,
    city: city.value,
    state: state.value,
    postal: zip.value,
    phone: phone.value,
    //resume : as BOO potentially?
    workExp: {
        company: company.value,
        position: position.value,
        startDate: workStartDate.value,
        endDate: workEndDate.value,
        responsibility: reponsibility.value
    },
    education: {
        educationLevel: levelOfEducation.value,
        school: schoolName.value,
        degree: degreeName.value,
        start: schoolStartDate.value,
        end: schoolEndDate.value
    }


};  //object to store current values.

//need a function to store the object into the task form

const addTolist = (jobapp = {}) => {};

acceptCloseBtn.addEventListener("click", () => endDialog.close());//primarily used to ask for confirmation
//before ending stuff.
submitBtn.addEventListener("click", () => {});  //these are part of add job stuff
