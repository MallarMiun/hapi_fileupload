const Path = require('path');
const fs = require('fs');
const User = require('../models/user.model');

const uploadController = {
    uploadFile: (uploadPath) => async (request, h) => {
        const { userId } = request.params; // hämtar in användar id som skickar som parameter
        const file = request.payload.file; //hämtar in filen

        if (!file) {
            return h.response({ message: "No file was sent" }).code(400);
        }

        try {
            const fileName = `${Date.now()}-${file.hapi.filename}`; // ger unikt namn med timestamp

            // Kombinerar sökväg till uppladdningsmapp (uploadPath) med filnamnet för att skapa sökvägen där filen ska sparas.
            const path = Path.join(uploadPath, fileName);

            /* 
            Initierar writeSteam för att kunna skriva data till sökvägen ovan.
            Detta öppnar filen i skrivläge. Om filen inte finns skapas den, och om den finns skrivs den över.
            */
            const writeStream = fs.createWriteStream(path);

            // Skriver data (lagrar filen) på den valda platsen
            await new Promise((resolve, reject) => {
                file.pipe(writeStream)
                    .on('finish', resolve)
                    .on('error', reject);
            });

            //Uppdatera användare med url till filen
            await User.findByIdAndUpdate(userId, {
                profileImage: "http://localhost:5000/upload/" + fileName
            });

            //returnera url till bilden
            return { file: "http://localhost:5000/upload/" + fileName };
        } catch (error) {
            console.error(error);
            return h.response({ message: error }).code(500);
        }
    },
    getFile: (uploadPath) => async (request, h) => {
        const { fileName } = request.params; // bildens namn skickas med
        const filePath = Path.join(uploadPath, fileName);

        if (!fs.existsSync(filePath)) {
            return h.response({ message: 'File not found' }).code(404);
        }

        return h.file(filePath); // Returnerar filen från servern
    }
}

module.exports = uploadController;