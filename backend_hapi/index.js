const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const fs = require('fs');
const mongoose = require('mongoose');
const Path = require('path');
require("dotenv").config();

const init = async () => {
    const UPLOAD_PATH = Path.join(__dirname, 'uploads');

    // Skapa server
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: UPLOAD_PATH
            },
            cors: {
                origin: ['*'],
                headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"]
            }
        }
    });

    // Skapa uploads-mapp
    if (!fs.existsSync(UPLOAD_PATH)) {
        fs.mkdirSync(UPLOAD_PATH);
    }

    // Plugins
    await server.register(Inert);

    await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Registrera routes
    require('./routes/user.routes')(server);
    require('./routes/upload.routes')(server, UPLOAD_PATH);

    await server.start();
    console.log('Server running on', server.info.uri);
};

init();