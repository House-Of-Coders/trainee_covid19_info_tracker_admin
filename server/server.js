const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PROT || 5000;
const db_connection = require('./utils/db_connection');
const createAdmin = require('./config/SystemAdmin.config');

/** Secure accessing */
app.use(cors());

/** To identify incoming request as json object */
app.use(express.json());

/** Configure database connection */
db_connection();
createAdmin();
/** Configure server port */
const server = app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

/** User route for handle user function */
app.use('/api/user',require('./routers/User.router'));

/** Protection route protect access control*/
app.use('/api/protect',require('./routers/Protection.route'));

/** System user routes*/
app.use('/api/district',require('./routers/District.router'));
app.use('/api/division',require('./routers/DivisionalSec.router'));


