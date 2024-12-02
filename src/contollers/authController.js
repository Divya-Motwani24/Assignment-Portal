import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Ensure the role is either 'user' or 'admin', default to 'user'
    const userRole = role === 'admin' ? 'admin' : 'user';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password and role
    const newUser = new User({ username, password: hashedPassword, role: userRole });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Log received username and password (not the password, for security)
    console.log("Received username:", username);
    
    const user = await User.findOne({ username });
    
    // Log user data after finding it in DB
    console.log("Found user:", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // Log password validation result
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate and send the JWT token
    const token = generateToken(user._id, user.role);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};