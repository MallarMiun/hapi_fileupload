const uploadController = require('../controllers/upload.controller');

module.exports = (server, uploadPath) => {
    server.route({
        // Route för att ladda upp en fil
        method: 'POST',
        path: '/upload/{userId}',
        options: {
            payload: { //konfigurerar att formdata ska tas emot
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            }
        },
        handler: uploadController.uploadFile(uploadPath)
    });

        // Route för att hämta profilbild
        server.route({
            method: 'GET',
            path: '/upload/{fileName}',
            handler: uploadController.getFile(uploadPath)
        });
}
