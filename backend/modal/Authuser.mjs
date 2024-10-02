import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const Userschema=new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"], 
    },
    password: {
        type: String,
        required: [true, "Password is required"], 
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true, 
    }
});




// Userschema.pre("save", async function (next) {
//     const user = this;

   
//     if (!user.isModified('password')) {
//         return next(); 
//     }

//     try {
        
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//         next(); 
//     } catch (error) {
//         next(error); 
//     }
// });

const Authuser=mongoose.model('User',Userschema);
export default Authuser;