const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");
const router = express.Router();

// Function to handle Google signup and login
async function googleSignupHandler(googleData) {
  const { name, email, photo, role, gender } = googleData;

  // Check if the user already exists in users.json
  const usersData = JSON.parse(fs.readFileSync('users.json'));
  const userExists = usersData.some(user => user.email === email);

  if (userExists) {
    // User exists, proceed with login (no need to create a new user)
    const existingUser = usersData.find(user => user.email === email);
    return { user: existingUser, newSignup: false };
  } else {
    // User does not exist, create a new user with a random password
    const generatedPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = {
      name,
      email,
      photo,
      role,
      gender,
      password: hashedPassword,  // Store the hashed password
      verified: true,
    };

    // Save the new user to users.json
    saveUserToJson(newUser);

    return { user: newUser, newSignup: true, generatedPassword }; // Return the new user and password
  }
}

// Function to save the user to users.json
function saveUserToJson(user) {
  const usersData = JSON.parse(fs.readFileSync('users.json'));
  usersData.push(user);
  fs.writeFileSync('users.json', JSON.stringify(usersData));
}

// Google login/signup route
router.post('/google', async (req, res) => {
  const googleData = req.body;

  try {
    const { user, newSignup, generatedPassword } = await googleSignupHandler(googleData);

    // If it's a new signup, send the password so the client can handle it
    if (newSignup) {
      return res.json({
        message: "User created successfully with Google.",
        user,
        generatedPassword, // Send password back for client handling
      });
    } else {
      // If the user already exists, just return the user details
      return res.json({
        message: "Welcome back!",
        user,
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during Google login/signup" });
  }
});

module.exports = router;
