const dotenv = require('dotenv');
dotenv.config();


const api = process.env.REACT_APP_REDER_BACKEND_API;
// const api = process.env.REACT_APP_LOCAL_BACKEND_API;
// const api = "https://e-pasal-inventory-backend.vercel.app/";
module.exports  = api;