const locationBtn = document.getElementById("locationBtn");
const locationText = document.getElementById("locationText");

locationBtn.addEventListener("click", function () {

    locationText.textContent = "Detecting location...";

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            locationText.textContent =
                `Location detected: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                map.setView([latitude, longitude], 15);
marker.setLatLng([latitude, longitude]);

        },

        function () {

            locationText.textContent =
                "Unable to detect location.";

        }

    );

});

const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");

photoInput.addEventListener("change", function () {

    const file = photoInput.files[0];

    if (file) {
        photoPreview.src = URL.createObjectURL(file);
        photoPreview.style.display = "block";
    }

});

const map = L.map("map").setView([26.84, 81.02], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const marker = L.marker([26.84, 81.02]).addTo(map);

marker.bindPopup("Incident location").openPopup();

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function () {
    alert("✅ Report submitted successfully!\n\nYour incident has been sent for verification.");
});