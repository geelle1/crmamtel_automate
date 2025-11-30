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

    console.log("-> Starting Form Fill and Validation...");

    // --- 1. BASIC INFO ---
    setValue("firstName", "Amtel");
    setValue("middleName", "Amtel");
    setValue("lastName", "Amtel");
    setValue("address", "Qardho");
    setValue("gender", "1", "change");
    console.log("BASIC INFO ✅");


    // --- 2. CLICK 'Add New Identity' ---
    const addBtn = [...document.querySelectorAll(".btn-info")]
        .find(btn => btn.textContent.trim() === "Add New Identity");

    if (!addBtn) {
        console.error("❌ ERROR: 'Add New Identity' button not found.");
        return;
    }

    addBtn.click();
    console.log("-> 'Add New Identity' clicked. Loading fields...");

    // --- 3. FILL ID + NEXT OF KIN IMMEDIATELY (OUTSIDE ASYNC) ---
    // They will work *if fields already exist*, otherwise silently skip.

    // ID Section
    setValue("idnumber", randomID);
    setValue("issuer", "Ministry of Commerce & Industry", "change");
    setValue("issuedate", issueDate);
    setValue("expirydate", expiryDate);
    console.log("-> ID ✅");

    // Next of Kin
    setValue("nextkinfname", "Amtel");
    setValue("nextkinsname", "Amtel");
    setValue("nextkintname", "Amtel");
    setValue("nextkinmsisdn", phoneNumber);
    setValue("alternativeMsisdn", phoneNumber);
    console.log("Next of Kin ✅");

    // --- 4. CASCADING SELECTS (async to ensure loading times) ---
    (async () => {

        await wait(1500);

        // mdomain
        setValue("mdomain", "HZvOmetzvIQeEKFSEkdz", "change");
        console.log("mdomain set → waiting for mzone...");

        await wait(500);

        // mzone
        setValue("mzone", "01DJSVS67JT0PDVE8KR0615C4E", "change");
        console.log("mzone set → waiting for marea...");

        await wait(500);

        // marea
        setValue("marea", "01DK17S11C4RFZTE6RTVRAGJJW", "change");
        console.log("marea set.");

        await wait(500);

        const submitBtn = document.querySelector('.btn-info[type="submit"]');

        if (submitBtn) {
            submitBtn.click();
            console.log("✅ Submission SUCCESS! 'Save' clicked.");
        } else {
            console.error("❌ ERROR: Final 'Save' button not found.");
        }

    })();
}

fillFormFromConsole();
