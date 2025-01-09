"use strict"

const fileFormEl = document.getElementById("fileForm");
const submitButton = document.getElementById("submitButton");

const uploadFile = async (e) => {
    e.preventDefault();

    console.log(e);

    let selectedFile = document.getElementById("file");

    const formData = new FormData();
    formData.append("file", selectedFile.files[0])
    
    try {
        // anrop för att posta bild med användar id som parameter
        const res = await fetch("http://localhost:5000/upload/677f94dd309f8e49592380b9", {
            method: "POST",
            headers: {
                // OBS! Sätt INTE Content-Type när du använder FormData
                'Accept': 'application/json' 
            },
            body: formData,
        })
        
        const data = await res.json();

        if(res.ok) {
            console.log("test")
            const imageOutput = document.getElementById("imageOutput");

            imageOutput.innerHTML = `<img src="${data.file}" alt="profil bild på användare" />`
        }

        console.log(data);

    } catch (error) {
        console.log("There was an error: " + error);
    }


}

fileFormEl.addEventListener("submit", uploadFile);