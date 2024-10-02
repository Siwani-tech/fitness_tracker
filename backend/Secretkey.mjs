import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config(); 
const Secretkey = process.env.SECRET_KEY || crypto.randomBytes(48).toString('hex');

export default Secretkey;

