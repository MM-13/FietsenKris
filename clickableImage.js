async function loadDriveImages() {
    const folderId = "1lUPw_VSiS0ATBQ7QaYnQJMbXT5v8K6ey";
    const imagePIink = (await (await fetch("Images/Website/images.txt")).text()).trim();

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents and trashed=false&key=${imagePIink}&fields=files(id,name,mimeType)`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const gallery = document.getElementById("gallery");

        data.files.forEach(file => {
            if (file.mimeType.startsWith("image/")) {
                const wrapper = document.createElement("div");
                wrapper.className = "square";

                const img = document.createElement("img");
                img.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
                img.alt = file.name;
                img.style.width = "100%";
                img.style.objectFit = "cover";

                wrapper.appendChild(img);
                gallery.appendChild(wrapper);

                // Klik event voor info box
                img.addEventListener("click", () => {
                    showInfoBox(file.name);
                });
            }
        });
    } catch (e) {
        console.error("Error loading images:", e);
    }
}

// Functie om info box te tonen
function showInfoBox(filename) {
    // verwijder bestaande box
    const existingBox = document.getElementById("infoBox");
    if (existingBox) existingBox.remove();

    // filename zonder extensie
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const parts = nameWithoutExt.split("_"); // splits op underscore

    // vul data (controleer of er genoeg onderdelen zijn)
    const naam = parts[0] || "Onbekend";
    const categorie = parts[1] || "Fietsen";
    const staat = parts[2] || "Altijd Goed";
    const prijs = parts[3] ? `€${parts[3]}` : "Voordelig";

    const infoBox = document.createElement("div");
    infoBox.id = "infoBox";
    infoBox.innerHTML = `
        <div class="info-content">
            <span class="close">&times;</span>
            <h3>${naam}</h3>
            <p><strong>Categorie:</strong> ${categorie}</p>
            <p><strong>Staat:</strong> ${staat}</p>
            <p><strong>Prijs:</strong> ${prijs}</p>
        </div>
    `;
    document.body.appendChild(infoBox);

    // Close button
    infoBox.querySelector(".close").addEventListener("click", () => {
        infoBox.remove();
    });
}

window.onload = loadDriveImages;
