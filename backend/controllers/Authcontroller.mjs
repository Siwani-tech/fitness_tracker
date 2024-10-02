import Authuser from "../modal/Authuser.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Secretkey from "../Secretkey.mjs";

export const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body; 

    const existingUser = await Authuser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists. Please log in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await Authuser.create({ name, password: hashedPassword, email });
    const token = jwt.sign({ id: user._id }, Secretkey, { expiresIn: "1hr" });
    res.status(201).json({ message: `${user.name} created successfully`, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields are required' });
    }
    
    const existingUser = await Authuser.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Please signup' });
    }

    console.log(`User found: ${existingUser.email}`);
    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    console.log(`Password Valid: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: existingUser._id }, Secretkey, { expiresIn: "1hr" });
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



export const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
