import app from './app.js';
import { PORT } from './config.js';
import conexion from './bd.js';

const main = async () => {
    try{
        await conexion();
        app.listen(PORT);
        console.log(`Listening on port http://localhost:${PORT}`);
    } catch (error) {
        console.error (error);
    }
};

main();