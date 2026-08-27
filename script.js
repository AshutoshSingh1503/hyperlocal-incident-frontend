const locationBtn = document.getElementById("locationBtn");
const locationText = document.getElementById("locationText");


// ==========================================
// MAP
// ==========================================

const map = L.map("map").setView(
    [26.84, 81.02],
    13
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


const marker = L.marker(
    [26.84, 81.02]
).addTo(map);

marker.bindPopup("Incident location");


// ==========================================
// DETECT LOCATION
// ==========================================

locationBtn.addEventListener(
    "click",
    function () {

        locationText.textContent =
            "Detecting location...";


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                locationText.textContent =
                    `Location detected: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;


                map.setView(
                    [latitude, longitude],
                    15
                );


                marker.setLatLng(
                    [latitude, longitude]
                );


                marker
                    .bindPopup(
                        "📍 Your Incident Location"
                    )
                    .openPopup();


                // Save current location

                localStorage.setItem(
                    "incidentLatitude",
                    latitude
                );

                localStorage.setItem(
                    "incidentLongitude",
                    longitude
                );

            },


            function () {

                locationText.textContent =
                    "Unable to detect location.";

            }

        );

    }
);


// ==========================================
// PHOTO PREVIEW
// ==========================================

const photoInput =
    document.getElementById("photo");

const photoPreview =
    document.getElementById("photoPreview");


photoInput.addEventListener(
    "change",
    function () {

        const file =
            photoInput.files[0];


        if (file) {

            photoPreview.src =
                URL.createObjectURL(file);

            photoPreview.style.display =
                "block";

        }

    }
);


// ==========================================
// SUBMIT REPORT
// ==========================================

const submitBtn =
    document.getElementById("submitBtn");


submitBtn.addEventListener(
    "click",
    function () {


        // Get incident type

        const incidentType =
            document.getElementById(
                "incidentType"
            ).value;


        // Get description

        const description =
            document.getElementById(
                "description"
            ).value;


        // Get location

        const latitude =
            localStorage.getItem(
                "incidentLatitude"
            );

        const longitude =
            localStorage.getItem(
                "incidentLongitude"
            );


        // ======================================
        // VALIDATION
        // ======================================

        if (!incidentType) {

            alert(
                "Please select an incident type."
            );

            return;

        }


        if (!description.trim()) {

            alert(
                "Please enter a description."
            );

            return;

        }


        if (
            !latitude ||
            !longitude
        ) {

            alert(
                "Please detect your location before submitting."
            );

            return;

        }


        // ======================================
        // CREATE NEW REPORT
        // ======================================

        const report = {

            id:
                "REP-" +
                Date.now(),

            incidentType:
                incidentType,

            description:
                description,

            latitude:
                latitude,

            longitude:
                longitude,

            status:
                "Pending",

            date:
                new Date().toLocaleString()

        };


        // ======================================
        // GET OLD REPORTS
        // ======================================

        let reports =
            JSON.parse(
                localStorage.getItem(
                    "incidentReports"
                )
            ) || [];


        // ======================================
        // ADD NEW REPORT
        // ======================================

        reports.push(report);


        // ======================================
        // SAVE ALL REPORTS
        // ======================================

        localStorage.setItem(
            "incidentReports",
            JSON.stringify(reports)
        );


        // ======================================
        // SUCCESS
        // ======================================

        alert(
            "✅ Report submitted successfully!\n\n" +
            "Your report has been sent to the officer."
        );


        console.log(
            "All reports:",
            reports
        );


        // ======================================
        // RESET FORM
        // ======================================

        document.getElementById(
            "incidentForm"
        ).reset();


        locationText.textContent =
            "Location not detected";


        photoPreview.style.display =
            "none";


        photoPreview.src = "";

    }
);