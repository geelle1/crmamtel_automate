function fillFormFromConsole() {
    // Helper to format a Date object into YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Helper function to generate a 10-digit number string
    const generateRandomId = (length) => 
        Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');

    // Data Preparation
    const today = new Date();
    const expiryDateObj = new Date(today);
    expiryDateObj.setFullYear(today.getFullYear() + 5); 
    
    const randomID = generateRandomId(10);
    const issueDate = formatDate(today);
    const expiryDate = formatDate(expiryDateObj);
    const phoneNumber = "252716408296";

    console.log("-> Starting Form Fill and Validation...");

    // --- 1. BASIC INFO (Fill & Validate) ---
    const dispatchInput = (element) => element.dispatchEvent(new Event('input', { bubbles: true }));
    const dispatchChange = (element) => element.dispatchEvent(new Event('change', { bubbles: true }));

    const firstName = document.getElementById("firstName");
    firstName.value = "Amtel";
    dispatchInput(firstName); 

    const middleName = document.getElementById("middleName");
    middleName.value = "Amtel";
    dispatchInput(middleName); 

    const lastName = document.getElementById("lastName");
    lastName.value = "Amtel";
    dispatchInput(lastName); 

    const address = document.getElementById("address");
    address.value = "Qardho";
    dispatchInput(address); 

    const gender = document.getElementById("gender");
    gender.value = "1";
    dispatchChange(gender); // Use 'change' for select dropdowns

    // --- 2. CLICK 'Add New Identity' ---
    const initialButtons = document.querySelectorAll(".btn-info");
    let foundAddButton = null;

    for (const button of initialButtons) {
        if (button.textContent.trim() === "Add New Identity") {
            foundAddButton = button;
            break;
        }
    }

    if (foundAddButton) {
        foundAddButton.click();
        console.log("-> 'Add New Identity' clicked. Waiting for fields to load...");
    } else {
        console.error("❌ ERROR: 'Add New Identity' button not found.");
        return; 
    }

    // --- 3. DYNAMIC FIELDS & SUBMISSION (Needs Wait Time) ---
    // Increased wait time (1.5s) for reliability in Angular apps
    setTimeout(() => {
        
        // --- FILL NEWLY ADDED ID FIELDS (Validate) ---
        
        const idInput = document.getElementById("idnumber");
        if (idInput) {
            idInput.value = randomID;
            dispatchInput(idInput);
        }

        const issuerInput = document.getElementById("issuer");
        if (issuerInput) {
            issuerInput.value = "Ministry of Commerce & Industry";
            dispatchChange(issuerInput);
        }
        
        const issueDateInput = document.getElementById("issuedate");
        if (issueDateInput) {
            issueDateInput.value = issueDate;
            dispatchInput(issueDateInput);
        }
        
        const expiryDateInput = document.getElementById("expirydate");
        if (expiryDateInput) {
            expiryDateInput.value = expiryDate;
            dispatchInput(expiryDateInput);
        }
        
        const specificSubmitButton = document.querySelector('.btn-info[type="submit"]');
        if (specificSubmitButton) {
            specificSubmitButton.click();
        }

        // --- 4. FILL MY CASH & NEXT OF KIN (Validate) ---
        

        

        // -- kin --
        const nextkinfname = document.getElementById("nextkinfname");
        if (nextkinfname) {
            nextkinfname.value = "Amtel";
            dispatchInput(nextkinfname);
        }
        const nextkinsname = document.getElementById("nextkinsname");
        if (nextkinsname) {
            nextkinsname.value = "Amtel";
            dispatchInput(nextkinsname);
        }
        const nextkintname = document.getElementById("nextkintname");
        if (nextkintname) {
            nextkintname.value = "Amtel";
            dispatchInput(nextkintname);
        }

        const nextkinmsisdn = document.getElementById("nextkinmsisdn");
        if (nextkinmsisdn) {
            nextkinmsisdn.value = phoneNumber;
            dispatchInput(nextkinmsisdn);
        }
        const alternativeMsisdn = document.getElementById("alternativeMsisdn");
        if (alternativeMsisdn) {
            alternativeMsisdn.value = phoneNumber;
            dispatchInput(alternativeMsisdn);
        }
        
        console.log("-> All fields filled and validation triggered.");


        // // --- 5. CLICK FINAL 'Save' BUTTON ---
        // const specificSubmitButton = document.querySelector('.btn-info[type="submit"]');

        // if (specificSubmitButton) {
        //     specificSubmitButton.click(); 
        //     console.log("✅ Submission SUCCESS! 'Save' button clicked.");
        // } else {
        //     console.error("❌ ERROR: Final 'Save' button not found, even after waiting.");
        // }

    }, 1500); // 1.5 second wait
}

fillFormFromConsole();
