import express from 'express';
import configure from './routers';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

configure(app);

(async () => {
    console.log(`Attempting to run server on port ${port}`);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})();