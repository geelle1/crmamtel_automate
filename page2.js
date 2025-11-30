function fillFormFromConsole() {

    // --- Helper Functions ---
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const generateRandomId = (length) =>
        Math.floor(Math.random() * Math.pow(10, length))
            .toString()
            .padStart(length, "0");

    const dispatchEvent = (element, type = "input") =>
        element.dispatchEvent(new Event(type, { bubbles: true }));

    const setValue = (id, value, eventType = "input") => {
        const el = document.getElementById(id);
        if (el) {
            el.value = value;
            dispatchEvent(el, eventType);
        }
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // --- Data ---
    const today = new Date();
    const expiry = new Date(today);
    expiry.setFullYear(today.getFullYear() + 5);

    const randomID = generateRandomId(10);
    const issueDate = formatDate(today);
    const expiryDate = formatDate(expiry);
    const phoneNumber = "252716408296";

    console.log("-> Starting Form Fill — Page 1");

    // --- PAGE 1 FIELDS ---
    setValue("firstName", "Amtel");
    setValue("middleName", "Amtel");
    setValue("lastName", "Amtel");
    setValue("address", "Qardho");
    setValue("gender", "1", "change");

    // Add identity
    const addBtn = [...document.querySelectorAll(".btn-info")]
        .find(btn => btn.textContent.trim() === "Add New Identity");

    if (!addBtn) {
        console.error("❌ ERROR: 'Add New Identity' button not found.");
        return;
    }

    addBtn.click();
    console.log("-> 'Add New Identity' clicked");

    // PAGE-1 ID + NOK (OUTSIDE async)
    setValue("idnumber", randomID);
    setValue("issuer", "Ministry of Commerce & Industry", "change");
    setValue("issuedate", issueDate);
    setValue("expirydate", expiryDate);

    setValue("nextkinfname", "Amtel");
    setValue("nextkinsname", "Amtel");
    setValue("nextkintname", "Amtel");
    setValue("nextkinmsisdn", phoneNumber);
    setValue("alternativeMsisdn", phoneNumber);

    console.log("-> ID + Next of Kin filled.");

    // --- CASCADE + Next button ---
    (async () => {

        await wait(1500);

        // mdomain cascade
        setValue("mdomain", "HZvOmetzvIQeEKFSEkdz", "change");
        await wait(500);

        setValue("mzone", "01DJSVS67JT0PDVE8KR0615C4E", "change");
        await wait(500);

        setValue("marea", "01DK17S11C4RFZTE6RTVRAGJJW", "change");
        await wait(500);

        // --- CLICK NEXT PAGE BUTTON ---
        const nextBtn = [...document.querySelectorAll(".btn.btn-info")]
            .find(btn => btn.textContent.trim().toLowerCase() === "next");

        if (!nextBtn) {
            console.error("❌ ERROR: 'Next' button not found.");
            return;
        }

        nextBtn.click();
        console.log("➡ Moving to Page 2...");

        // --- WAIT FOR PAGE 2 TO LOAD ---
        await wait(1500);

        console.log("-> Page 2 Loaded. Filling fields...");

        /*
        ===========================
         PAGE 2 — FILL THESE FIELDS
        ===========================
        Simply replace the IDs + values below with correct ones
        */

        // Example placeholders (replace with real IDs)
        // setValue("occupation", "Business");
        // setValue("education", "University");
        // setValue("maritalStatus", "1", "change");

        // -------- End Page 2 fields --------

        console.log("-> Page 2 Completed.");

        // --- CLICK FINAL SAVE ---
        // --- CLICK NEXT PAGE BUTTON ---
        // const nextBtn = [...document.querySelectorAll(".btn.btn-info")]
        //     .find(btn => btn.textContent.trim().toLowerCase() === "next");

        // if (!nextBtn) {
        //     console.error("❌ ERROR: 'Next' button not found.");
        //     return;
        // }
        // nextBtn.click();
        // console.log("➡ Moving to Page 2...");
        // // --- WAIT FOR PAGE 2 TO LOAD ---
        // await wait(1500);
        // console.log("-> Page 2 Loaded. Filling fields...");

    })();
}

fillFormFromConsole();
