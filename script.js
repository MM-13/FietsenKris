// Java Scrips
/*async function loadDriveImages() {
    const folderId = "1lUPw_VSiS0ATBQ7QaYnQJMbXT5v8K6ey"; // your Drive folder
    const apiKey = "AIzaSyB-yi6iDH50MbClc21JHwBnJQosJ_j6FGE"; // replace with your real key
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents and trashed=false&key=${apiKey}&fields=files(id,name,mimeType)`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const gallery = document.getElementById("gallery");

        data.files.forEach(file => {
            if (file.mimeType.startsWith("image/")) {
                // wrapper div keeps the square shape
                const wrapper = document.createElement("div");
                wrapper.className = "square";

                // Google Drive iframe preview
                const iframe = document.createElement("iframe");
                iframe.src = `https://drive.google.com/file/d/${file.id}/preview`;
                iframe.style.border = "0";
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.setAttribute("fullscreen", "true");

                wrapper.appendChild(iframe);
                gallery.appendChild(wrapper);
            }
        });
    } catch (e) {
        console.error("Error loading images:", e);
    }
}

window.onload = loadDriveImages;*/

async function loadDriveImages() {
    const folderId = "1lUPw_VSiS0ATBQ7QaYnQJMbXT5v8K6ey"; // your folder
    const apiKey = "AIzaSyB-yi6iDH50MbClc21JHwBnJQosJ_j6FGE"; // your real key
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents and trashed=false&key=${apiKey}&fields=files(id,name,mimeType)`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const gallery = document.getElementById("gallery");

        data.files.forEach(file => {
            if (file.mimeType.startsWith("image/")) {
                // wrapper div for square grid
                const wrapper = document.createElement("div");
                wrapper.className = "square";

                // load direct image from Drive
                const img = document.createElement("img");
                img.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`; 
                img.alt = file.name;
				img.style.width = "100%";
				img.style.objectFit = "cover";

                wrapper.appendChild(img);
                gallery.appendChild(wrapper);
            }
        });
    } catch (e) {
        console.error("Error loading images:", e);
    }
}

window.onload = loadDriveImages;