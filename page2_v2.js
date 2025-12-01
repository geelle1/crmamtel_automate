function Page1() {
  function fillFormFromConsole() {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const generateRandomId = (length) =>
      Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, "0");

    const dispatchEvent = (element, type = "input") => {
      element.dispatchEvent(new Event(type, { bubbles: true }));
    };

    const dispatchAllChangeEvents = (element) => {
      ["change", "input", "blur"].forEach((eventType) => {
        element.dispatchEvent(new Event(eventType, { bubbles: true }));
      });
    };

    const setInputValueById = (id, value, eventType = "input") => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`Element with id "${id}" not found.`);
        return;
      }
      el.value = value;
      dispatchEvent(el, eventType);
    };

    const clickButtonByText = (text, selector = ".btn-info") => {
      const button = [...document.querySelectorAll(selector)].find(
        (btn) => btn.textContent.trim() === text
      );
      if (!button) {
        console.warn(`Button with text "${text}" not found.`);
        return null;
      }
      button.click();
      return button;
    };

    // Simple sleep helper (kept in case you want manual waits later)
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // =========================
    // Static data
    // =========================

    const today = new Date();
    const expiryDateObj = new Date(today);
    expiryDateObj.setFullYear(today.getFullYear() + 5);

    const randomID = generateRandomId(10);
    const issueDate = formatDate(today);
    const expiryDate = formatDate(expiryDateObj);
    const phoneNumber = "252716408296";

    const TARGET_DOMAIN = "HZvOmetzvIQeEKFSEkdz"; // Somalia
    const TARGET_ZONE = "01DJSVS67JT0PDVE8KR0615C4E"; // ZONE 2
    const TARGET_AREA = "01DK17S11C4RFZTE6RTVRAGJJW"; // Qardho_KARKAAR

    const MAX_POLL_ATTEMPTS = 50;
    const POLL_INTERVAL_MS = 100;

    console.log("-> Starting form fill and validation...");

    // =========================
    // Step 1: Basic info
    // =========================

    const fillBasicInfo = () => {
      setInputValueById("firstName", "Amtel");
      setInputValueById("middleName", "Amtel");
      setInputValueById("lastName", "Amtel");
      setInputValueById("address", "Qardho");
      setInputValueById("gender", "1", "change");
      console.log("Step 1: Basic info filled ✅");
    };

    // =========================
    // Step 2: Identity section
    // =========================

    const openIdentitySection = () => {
      const btn = clickButtonByText("Add New Identity");
      if (!btn) {
        console.error("❌ ERROR: 'Add New Identity' button not found.");
        return false;
      }
      console.log("Step 2: 'Add New Identity' clicked.");
      return true;
    };

    const fillIdentitySection = () => {
      setInputValueById("idnumber", randomID);
      setInputValueById("issuer", "Ministry of Commerce & Industry", "change");
      setInputValueById("issuedate", issueDate);
      setInputValueById("expirydate", expiryDate);

      const saveButton = document.querySelector('.btn-info[type="submit"]');
      if (saveButton) {
        saveButton.click();
        console.log("Step 2: Identity 'Save' clicked.");
      } else {
        console.warn("Identity 'Save' button not found.");
      }
    };

    // =========================
    // Step 3: Next of kin
    // =========================

    const fillNextOfKinSection = () => {
      setInputValueById("nextkinfname", "Amtel");
      setInputValueById("nextkinsname", "Amtel");
      setInputValueById("nextkintname", "Amtel");
      setInputValueById("nextkinmsisdn", phoneNumber);
      setInputValueById("alternativeMsisdn", phoneNumber);
      console.log("Step 3: Next of kin filled ✅");
    };

    // =========================
    // Step 4: Domain / Zone / Area selection
    // =========================

    const setupLocationSelectors = () => {
      const domainSelect = document.getElementById("mdomain");
      const zoneSelect = document.getElementById("mzone");
      const areaSelect = document.getElementById("marea");

      if (!domainSelect || !zoneSelect || !areaSelect) {
        console.error(
          "❌ ERROR: One or more dropdowns (mdomain, mzone, marea) were not found."
        );
        return null;
      }

      return { domainSelect, zoneSelect, areaSelect };
    };

    const pollForOption = (selectEl, value, labelForLogs, onSuccess) => {
      let attempts = 0;

      const attemptPoll = () => {
        attempts += 1;
        const option = selectEl.querySelector(`option[value="${value}"]`);

        if (option) {
          selectEl.value = value;
          dispatchAllChangeEvents(selectEl);
          console.log(
            `${labelForLogs} found and selected. Attempts: ${attempts}`
          );
          onSuccess();
          return;
        }

        if (attempts >= MAX_POLL_ATTEMPTS) {
          console.error(
            `❌ Timeout: ${labelForLogs} with value "${value}" did not appear in time.`
          );
          return;
        }

        setTimeout(attemptPoll, POLL_INTERVAL_MS);
      };

      attemptPoll();
    };

    const selectLocationWithPolling = () => {
      console.log("Step 4: Starting dependent dropdown selection...");

      const selects = setupLocationSelectors();
      if (!selects) return;

      const { domainSelect, zoneSelect, areaSelect } = selects;

      // 1. Select domain
      domainSelect.value = TARGET_DOMAIN;
      dispatchAllChangeEvents(domainSelect);
      console.log("4.1 Domain selected.");

      // 2. Poll for zone, then area
      pollForOption(zoneSelect, TARGET_ZONE, "4.2 Zone", () => {
        console.log("Zone selection complete. Polling for area...");
        pollForOption(areaSelect, TARGET_AREA, "4.3 Area", () => {
          console.log("All dropdown selections complete 🎉");
          onLocationSelectionComplete(areaSelect);
        });
      });
    };

    const onLocationSelectionComplete = (areaSelect) => {
      if (areaSelect.value !== TARGET_AREA) {
        console.warn(
          "Location selection callback fired, but area value is not the expected one."
        );
        return;
      }

      const nextButton = clickButtonByText("Next");
      if (nextButton) {
        console.log("Step 4: 'Next' clicked. Moving to next step...");
      } else {
        console.warn("Could not find 'Next' button after location selection.");
      }
    };

    // =========================
    // Run all steps
    // =========================

    fillBasicInfo();
    if (!openIdentitySection()) {
      return;  // If identity cannot be opened, stop early
    }
    fillIdentitySection();
    fillNextOfKinSection();
    selectLocationWithPolling();
  }
  
  fillFormFromConsole();
}

function Page2() {
  // Prepaid checkbox
  function checkPrepaidCheckbox() {
    const checkbox = document.getElementById("isprepaid");
    if (!checkbox) {
      console.warn('Checkbox with id "isprepaid" not found.');
      return;
    }
    // Set checked state
    checkbox.checked = true; // [web:77][web:89]
    // Notify Angular/mdbcheckbox by firing common events
    ["click", "input", "change"].forEach((type) => {
      checkbox.dispatchEvent(new Event(type, { bubbles: true }));
    });
    console.log("Prepaid checkbox checked ✅");
  }
  // run it
  checkPrepaidCheckbox();

  function clickAddAttachPlan() {
    // 1. Click the add button
    const addBtn1 = document.querySelectorAll(
      "button.btn-info:has(.material-icons)"
    )[0];

    if (!addBtn1) {
      console.warn("Add button (btn-info with material-icons) not found.");
      return;
    }

    addBtn1.click();
    ["click"].forEach((type) => {
      addBtn1.dispatchEvent(new Event(type, { bubbles: true }));
    });
    console.log("Add Attach Plan button clicked ✅");

    // 2. Wait LONGER for modal/popup to fully load, then select Base plan
    setTimeout(() => {
      console.log("Looking for Base plan...");

      const basePlanCard = [
        ...document.querySelectorAll(".card-container"),
      ].find(
        (card) =>
          card.querySelector(".heading.bold.red")?.textContent.trim() ===
          "Base plan"
      );

      if (!basePlanCard) {
        console.warn("Base plan card not found.");
        return;
      }

      basePlanCard.click();
      ["click"].forEach((type) => {
        basePlanCard.dispatchEvent(new Event(type, { bubbles: true }));
      });
      console.log("Base plan selected ✅");

      // 3. Wait, then click Save
      setTimeout(() => {
        // 3. Click Save
        const saveBtn = [...document.querySelectorAll("button.btn-info")].find(
          (btn) => btn.textContent.trim() === "Save"
        );
        if (!saveBtn) {
          console.warn("Save button not found.");
          return;
        }
        saveBtn.click();
      }, 300);
    }, 1000); // INCREASED to 1.5 seconds for slower modal load
  }
  // run it
  clickAddAttachPlan();

async function addMsisdnSeries() {
    // 1) Safely find and click the MSISDN Add button (2nd add with icon)
    const iconSpans = [
      ...document.querySelectorAll("button.btn-info .material-icons"),
    ];
    const addIconSpans = iconSpans.filter(
      (s) => s.textContent.trim() === "add"
    );
    const addBtn = addIconSpans[1]?.closest("button"); // index 1 = MSISDN add

    if (!addBtn) {
      console.warn("MSISDN Add button not found.");
      return;
    }
    addBtn.click();
    console.log("1. MSISDN Add button clicked ✅");

    // helper wait
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    // 2) Wait for MSISDN modal + table to appear
    let modal = null;
    for (let i = 0; i < 20; i++) {
      modal = [...document.querySelectorAll(".modal-content")].find((m) =>
        m.textContent.includes("MSISDN List")
      );
      if (modal) break;
      await wait(100);
    }
    if (!modal) {
      console.warn("MSISDN modal not found after waiting.");
      return;
    }

    // -------------------------
    // 3) Select the 10th checkbox
    // -------------------------
    const checkboxes = [
      ...modal.querySelectorAll('table input.form-check-input[type="checkbox"]'),
    ];

    if (checkboxes.length < 10) {
      console.warn(`Only ${checkboxes.length} MSISDN rows available — cannot select the 10th.`);
      return;
    }

    const checkbox = checkboxes[9]; // 10th element (index starts at 0)
    checkbox.checked = true;

    ["click", "input", "change"].forEach((t) =>
      checkbox.dispatchEvent(new Event(t, { bubbles: true }))
    );

    console.log("2. 10th MSISDN row selected ✅");

    // 4) Click the Save in this same modal footer
    const footerRow = modal.querySelector(
      ".row.my-4 .col-12.d-flex.justify-content-end"
    );
    if (!footerRow) {
      console.warn("MSISDN footer row not found.");
      return;
    }

    const saveBtn = footerRow.querySelector("button.btn.btn-info.mx-2");
    if (!saveBtn) {
      console.warn("MSISDN Save button not found.");
      return;
    }

    await wait(200);
    saveBtn.click();
    console.log("3. MSISDN Save clicked ✅");
}

// run it
addMsisdnSeries();


  async function handleIccid() {
    // 1) Click 3rd Add button on the whole page
    const addIcons = document.querySelectorAll(
      "button.btn.btn-info .material-icons"
    );
    const addSpans = [...addIcons].filter(
      (span) => span.textContent.trim() === "add"
    );
    const addBtn = addSpans[2]?.closest("button"); // index 2 = 3rd
    if (!addBtn) {
      console.warn("3rd Add button not found.");
      return;
    }
    addBtn.click();
    console.log("1. IMSI Add button clicked ✅");

    // small wait for modal
    await new Promise((r) => setTimeout(r, 800));

    // 2) Ask user for IMSI search text
    const term = prompt("Enter IMSI (or part) to search:");
    if (!term) {
      console.warn("No search term entered.");
      return;
    }

    // 3) Type into IMSI search box inside IMSI List modal
    const modal = [...document.querySelectorAll(".modal-content")].find((m) =>
      m.textContent.includes("IMSI List")
    );
    if (!modal) {
      console.warn("IMSI modal not found.");
      return;
    }

    const searchInput = modal.querySelector(
      "input#searchtextIMSI.form-control"
    );
    if (!searchInput) {
      console.warn("IMSI search input not found.");
      return;
    }
    searchInput.value = term;
    ["input", "change", "keyup"].forEach((t) =>
      searchInput.dispatchEvent(new Event(t, { bubbles: true }))
    );
    console.log("2. Search term filled:", term);

    // 4) Click the search icon button in the same input group
    const searchBtn = modal.querySelector(
      ".input-group-append button.btn.btn-info .material-icons"
    );
    const searchButton = searchBtn?.closest("button");
    if (!searchButton) {
      console.warn("Search button not found.");
      return;
    }
    searchButton.click();
    console.log("3. Search button clicked ✅");

    // 5) Wait for results, select first checkbox
    await new Promise((r) => setTimeout(r, 1000));
    const firstCheckbox = modal.querySelector(
      'table input.form-check-input[type="checkbox"]'
    );
    if (!firstCheckbox) {
      console.warn("No IMSI checkbox found.");
      return;
    }
    firstCheckbox.checked = true;
    ["click", "input", "change"].forEach((t) =>
      firstCheckbox.dispatchEvent(new Event(t, { bubbles: true }))
    );
    console.log("4. First IMSI row selected ✅");

    // 6) Click Save in IMSI modal footer
    const footerRow = modal.querySelector(
      ".row.my-4 .col-12.d-flex.justify-content-end"
    );
    if (!footerRow) {
      console.warn("Footer row with Save/Reset not found.");
      return;
    }
    const saveBtn = footerRow.querySelector("button.btn.btn-info.mx-2");
    if (!saveBtn) {
      console.warn("IMSI Save button not found.");
      return;
    }
    saveBtn.click();
    console.log("5. IMSI Save clicked ✅");
  }

  function selectIccidRadio() {
    const radio = document.getElementById("iccid");
    if (!radio) {
      console.warn('Radio with id "iccid" not found.');
      return false;
    }

    radio.checked = true; // [web:267][web:273]
    ["click", "input", "change"].forEach((type) => {
      radio.dispatchEvent(new Event(type, { bubbles: true }));
    });
    console.log("Radio #iccid selected ✅");
    return true;
  }

  // After MSISDN completes, set ICCID radio then run ICCID modal
  setTimeout(() => {
    if (selectIccidRadio()) {
      handleIccid();
    }
  }, 2000); // adjust ms if MSISDN step is slower/faster

  function clickThirdPageNext() {
    const nextBtn = [...document.querySelectorAll("button.btn.btn-info")].find(
      (btn) => btn.textContent.trim() === "Next"
    );
    nextBtn.click();
    console.log("Next (to page 3) clicked ✅");
  }
  clickThirdPageNext();
  clickThirdPageNext();
}
