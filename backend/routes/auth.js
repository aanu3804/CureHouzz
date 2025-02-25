const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const usersFile = path.join(__dirname, "../data/users.json");
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Function to safely get users
const getUsers = () => {
    try {
        const data = fs.readFileSync(usersFile, "utf8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Error reading users.json:", error.message);
        return [];
    }
};

// Function to save users
const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// ✅ Signup Route (Now Stores Gender and Role)
router.post("/signup", async (req, res) => {
    console.log("Signup request body:", req.body);

    const { name, email, password, photo, role, gender } = req.body;

    if (!name || !email || !password || !gender || !role) {
        return res.status(400).json({ message: "Name, email, password, role, and gender are required." });
    }

    const users = getUsers();
    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = {
        name,
        email,
        password: hashedPassword,
        photo: photo || "",
        otp,
        verified: false,
        role,
        gender
    };

    users.push(newUser);
    saveUsers(users);

    // Send OTP to Email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP for CareHouzz Verification",
            text: `Your OTP is: ${otp}`,
        });
        res.status(201).json({ message: "Signup successful. OTP sent to email.", email });
    } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ message: "Failed to send OTP. Try again later." });
    }
});

// ✅ Verify OTP Route
router.post("/verify", (req, res) => {
    const { email, otp } = req.body;
    let users = getUsers();

    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex === -1) return res.status(404).json({ message: "User not found" });

    if (users[userIndex].otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    // Mark user as verified
    users[userIndex].verified = true;
    delete users[userIndex].otp;
    saveUsers(users);

    res.json({ message: "Email verified successfully" });
});

// ✅ Login Route (Ensures User is Verified)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.verified) return res.status(403).json({ message: "Please verify your email first" });

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, user });
});

module.exports = router;
