const fname = document.getElementById("fname");
const lmane = document.getElementById("lname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zip = document.getElementById("postal");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const resume = document.getElementById("resume");
const removeResumeBtn = document.getElementById("remove-resume-btn")
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

let currentlyEditing = false;
let currentlyEditingId;
const container = document.getElementById("work-experience-box");
const company  = document.getElementById("company");
const position = document.getElementById("position");
const workStartDate = document.getElementById("work-start-date");
const workEndDate = document.getElementById("work-end-date");
const responsibility = document.getElementById("responsibility");

const addEducationBtn = document.getElementById("add-education-btn");
const educationBox = document.getElementById("education-box");
const stopAddingBtn = document.getElementById("done-adding-edu");
const acceptCloseBtnEdu = document.getElementById("accept-close-edu");
const cancelCloseBtnEdu = document.getElementById("cancel-close-edu");
const levelOfEducation = document.getElementById("dropdown");
const schoolName = document.getElementById("school");
const degreeName = document.getElementById("degree");
const schoolStartDate = document.getElementById("education-start-date");
const schoolEndDate = document.getElementById("education-end-date");
const doneAddingEducationBtn = document.getElementById("save-education-experience");
const listEducation = document.getElementById("inputted-education");
let currentlyEditingEdu = false;
let currentlyEditingEduId;

addWorkBtn.addEventListener("click", () => {showPastWorkBox()});     // Runs when Add Past Work Experience is pressed
addEducationBtn.addEventListener("click", ()=> {showEducationBox()}); // Runs when Add Education is pressed

const showEducationBox = () => {                                // helper function to show education box
    educationBox.style.display = "block";
};

const showPastWorkBox = () => {                                     // helper function to show past work box
    container.style.display = "block";
};

doneAddingBtn.addEventListener("click", ()=> {                  // Runs when X is pressed for past jobs
    const discardBox = document.getElementsByClassName("discard");
    for (let i = 0; i < discardBox.length; i++) {
        discardBox[i].style.display = "block";
    }
    acceptCloseBtn.addEventListener("click", (e) => {           // This is the "close" option after you press X
        e.preventDefault();
        removeAll();
 });
    cancelCloseBtn.addEventListener("click", (e)=>{              // This is the "cancel close" option after you press X
        e.preventDefault();
        for (let i = 0; i < discardBox.length; i++) {
            discardBox[i].style.display = "none";
        }
    }); 
});

stopAddingBtn.addEventListener("click", () => {                             // Runs when X is pressed for education
    const discardBox = document.getElementsByClassName("discard-edu");
    for (let i = 0; i < discardBox.length; i++) {
        discardBox[i].style.display = "block";
    }
    acceptCloseBtnEdu.addEventListener("click", () => removeAllEdu());
    cancelCloseBtnEdu.addEventListener("click", ()=>{
        for (let i = 0; i < discardBox.length; i++) {
            discardBox[i].style.display = "none";
        }
    });
});

submitWorkBtn.addEventListener("click", (e) => {             // Checks validity after trying to submit past work
    let validity = company.value && position.value && workStartDate.value && workEndDate.value && responsibility.value;
    e.preventDefault();
    if (validity) {
        submitWork();
    }
    else {
        alert("Fill in all areas");
    }
});

const submitWork = () => {              // Runs when submit button for PAST JOBS is pressed AND checked for validity 
    if (editBool() == true) {               //pushes info to array and updates ui
        allJobAppStorage.forEach(e => {
            if (`'${currentlyEditingId}'` == e.uniqueWorkId) {    // Checks if the submission was for an edit or new job, if true, submission was an edit
                e.uniqueWorkId = `'${company.value}-${position.value}-${workStartDate.value}'`
                e.company = company.value;
                e.position = position.value;
                e.workStartDate = workStartDate.value;
                e.workEndDate = workEndDate.value;
                e.responsibility = responsibility.value;

                let tempId = `${company.value}-${position.value}-${workStartDate.value}`;
                const temp = document.getElementById(currentlyEditingId);
                temp.innerHTML = `
                                <br />
                                Company: ${company.value} <br />
                                Position: ${position.value} <br />
                                Time: ${workStartDate.value} -> ${workEndDate.value} <br />
                                Description: ${responsibility.value} <br />
                                <button onclick="editPastWork(${e.uniqueWorkId})" type="button">Edit</button>
                                <button onclick="removePastWork(${e.uniqueWorkId})" type="button">Delete</button>
                                <br />
                                `
                alert("Updated!");
                temp.setAttribute("id", tempId);
                currentlyEditing = false;
                currentlyEditingId = "";
                container.style.display = "none";
            }
        })
    }
    else {                                              // Submission for new job
        const pastJob = {
            uniqueWorkId: `'${company.value}-${position.value}-${workStartDate.value}'`,
            company: company.value,
            position: position.value,
            startDate: workStartDate.value,
            endDate: workEndDate.value,
            responsibility: responsibility.value
        };
        allJobAppStorage.unshift(pastJob);

        listPastJobs.innerHTML += `<div id=${pastJob.uniqueWorkId}><br />
        Company: ${company.value} <br />
        Position: ${position.value} <br />
        Time: ${workStartDate.value} -> ${workEndDate.value} <br />
        Description: ${responsibility.value} <br />
        <button onclick="editPastWork(${pastJob.uniqueWorkId})" type="button">Edit</button>
        <button onclick="removePastWork(${pastJob.uniqueWorkId})" type="button">Delete</button>
        <br /></div>
        `
        alert("Successfully saved!");
        removeAll();
    }
};

doneAddingEducationBtn.addEventListener("click", () => {    // runs after the submit button for education is pressed. Checks validity and calls helper functions
    let validity = levelOfEducation.value && schoolName.value && degreeName.value && schoolStartDate.value && schoolEndDate.value;
    if (validity) {
        submitEducation();
    }
    else {
        alert("Fill in all areas");
    }
});

const submitEducation = () => {    // after validation check, helper function runs to determine whether submission was an edit or not
    if (currentlyEditingEdu) {      // then appends or changes html depending on condition. also pushes to array or change object contents
        allEducationStorage.forEach(e => {
            if (`'${currentlyEditingEduId}'` == e.uniqueEducationId) {                  // condition: submission = edit
                e.levelOfEducation.value = levelOfEducation.value;
                e.schoolName.value = schoolName.value;
                e.degreeName.value = degreeName.value;
                e.schoolStartDate.value = schoolStartDate.value;
                e.schoolEndDate.value = schoolEndDate.value;
                
                let tempId = `${levelOfEducation.value}-${schoolName.value}-${degreeName.value}`;
                const temp = document.getElementById(currentlyEditingEduId);
                console.log(temp);
                temp.innerHTML = `
                                <br />
                                Degree: ${degreeName} <br />
                                Education Level: ${levelOfEducation.value} <br />
                                School Name: ${schoolName.value} <br />
                                Time: ${schoolStartDate.value} -> ${schoolEndDate.value} <br />
                                <button onclick="editPastEducation(${e.uniqueEducationId})" type="button">Edit</button>
                                <button onclick="removePastEducation(${e.uniqueEducationId})" type="button">Delete</button>
                                <br />
                                `
                alert("Updated!");
                temp.setAttribute("id", tempId);
                currentlyEditingEdu = false;
                currentlyEditingEduId = "";
                educationBox.style.display = "none";
            }
        });
    }
    else {                                                  // condition: submission = new
        const edu = {
            uniqueEducationId: `'${levelOfEducation.value}-${schoolName.value}-${degreeName.value}'`,
            educationLevel: levelOfEducation.value,
            school: schoolName.value,
            degree: degreeName.value,
            start: schoolStartDate.value,
            end: schoolEndDate.value
        }
        allEducationStorage.unshift(edu);

        listEducation.innerHTML += `<div id=${edu.uniqueEducationId}><br />
                                    Degree: ${degreeName.value} <br />
                                    Education Level: ${levelOfEducation.value} <br />
                                    School Name: ${schoolName.value} <br />
                                    Time: ${schoolStartDate.value} -> ${schoolEndDate.value} <br />
                                    <button onclick="editPastEducation(${edu.uniqueEducationId})" type="button">Edit</button>
                                    <button onclick="removePastEducation(${edu.uniqueEducationId})" type="button">Delete</button>
                                    <br />
                                    </div>
                                    `
        alert("Successfully saved!");
        removeAllEdu();
    }
};
const editPastEducation = (unique) => {               // Functions for editing education (use edit work for reference)
    allEducationStorage.forEach(e => {                                 
        if (`'${unique}'` == e.uniqueEducationId) {          
            levelOfEducation.value = e.educationLevel;
            degreeName.value = e.degree;
            schoolName.value = e.school;
            schoolStartDate.value = e.start;
            schoolEndDate.value = e.end;
            currentlyEditingEduId = unique;
            currentlyEditingEdu = true;
        }
    });
    showEducationBox();
    console.log(allEducationStorage);
};


const removePastEducation = (unique) => {                   // Function for removing education (use remove work for reference)
    if (unique == currentlyEditingEduId) {
        removeAllEdu();
    }
    const removeDiv = document.getElementById(unique);
    removeDiv.remove();
};

const clearJobInfo = () => {                            // helper function to remove all info inside past work boxes
    company.value = "";
    position.value = "";
    workStartDate.value = "";
    workEndDate.value = "";
    responsibility.value = "";
};

const clearEducationInfo = () => {                          // helper function to remove all info inside education boxes
    levelOfEducation.value = "";
    schoolName.value = "";
    degreeName.value = "";
    schoolStartDate.value = "";
    schoolEndDate.value = ""; 
};

const removeAll = () => {                                           // Helper function to remove past work boxes
    clearJobInfo();
    const discardBox = document.getElementsByClassName("discard");
    container.style.display = "none";
    for (let i = 0; i < discardBox.length; i++) {
        discardBox[i].style.display = "none";
    }
    currentlyEditing = false;
    currentlyEditingId = "";
};

const removeAllEdu = () => {                                        // Helper function to remove education boxes
    clearEducationInfo();
    educationBox.style.display = "none";
    const discardBox = document.getElementsByClassName("discard-edu");
    for (let i = 0; i < discardBox.length; i++) {
        discardBox[i].style.display = "none";
    }
    currentlyEditingEdu = false;
    currentlyEditingId = "";
}
const removePastWork = (unique) => {            // Helper function which is called from "Delete" button. Takes id of div to remove
    if (unique == currentlyEditingId) {
        removeAll();
    }
    const removeDiv = document.getElementById(unique);
    removeDiv.remove(); 
};

const editPastWork = (unique) => {              //  Helper function that checks for the existing past work after EDIT button is clicked
    allJobAppStorage.forEach(e => {                                 // Then pre fills existing information. Takes div id as a parameter 
        if (`'${unique}'` == e.uniqueWorkId) {          
            company.value = e.company;
            position.value = e.position;
            workStartDate.value = e.startDate;
            workEndDate.value = e.endDate;
            responsibility.value = e.responsibility;
            currentlyEditingId = unique;
            currentlyEditing = true;
        }
    });
    showPastWorkBox();
}; 

const editBool = (bool) => {            // Helper function that is lowkey useless. Will probably be changed
    if (bool == "true") {
        currentlyEditing = true;
        return;
    }
    else {
        return currentlyEditing;
    }
}

resume.addEventListener("change", () => {               // Displays the "Clear file" button after inserting a file
    removeResumeBtn.style.display = "block";
});

removeResumeBtn.addEventListener("click", () => {       // Removes the file and hides the button
    resume.value = "";
    removeResumeBtn.style.display = "none";
});

const allEducationStorage =[]; // stores education objects
const allJobAppStorage = []; //array that stores objects (work)

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
        uniqueWorkId: `${company.value}-${position.value}-${workStartDate.value}`,
        company: company.value,
        position: position.value,
        startDate: workStartDate.value,
        endDate: workEndDate.value,
        responsibility: responsibility.value
    },
    education: {
        uniqueEducationId: `${levelOfEducation.value}-${schoolName.value}-${degreeName.value}`,
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
