require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(session({ secret: "your_secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/* ===========================================
   ✅ Load Users from JSON Database
=========================================== */
const usersFile = path.join(__dirname, "./data/users.json");

const getUsers = () => {
    try {
        const data = fs.readFileSync(usersFile, "utf8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("❌ Error reading users.json:", error.message);
        return [];
    }
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

/* ===========================================
   ✅ Google OAuth Strategy
=========================================== */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        (accessToken, refreshToken, profile, done) => {
            const users = getUsers();

            let user = users.find((u) => u.email === profile.emails[0].value);

            if (!user) {
                // Create a new user entry
                user = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value,
                    role: "patient", // Default role
                    verified: true,
                };
                users.push(user);
                saveUsers(users);
            }

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

/* ===========================================
   ✅ API Routes
=========================================== */
app.use("/auth", authRoutes);

// ✅ Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        const user = req.user;

        // ✅ Send user data to frontend via query params
        res.redirect(
            `http://localhost:5173/?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&photo=${encodeURIComponent(user.photo)}`
        );
    }
);

/* ===========================================
   ✅ Appointment Data File
=========================================== */
const appointmentsFile = path.join(__dirname, "./data/AppointmentData.json");

const getAppointments = () => {
    try {
        const data = fs.readFileSync(appointmentsFile, "utf8");
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("❌ Error reading AppointmentData.json:", error.message);
        return [];
    }
};

const saveAppointments = (appointments) => {
    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
};

/* ===========================================
   ✅ POST Route to Save Appointment
=========================================== */
app.post("/save-appointment", (req, res) => {
    try {
        const newAppointment = req.body;
        const appointments = getAppointments();

        // Add the new appointment
        appointments.push(newAppointment);

        // Save updated appointments list
        saveAppointments(appointments);

        res.status(200).send("✅ Appointment saved successfully!");
    } catch (error) {
        console.error("❌ Error saving appointment:", error.message);
        res.status(500).send("❌ Error saving appointment");
    }
});

/* ===========================================
   ✅ GET Route to Fetch All Appointments (For Admin Use)
=========================================== */
app.get("/appointments", (req, res) => {
    try {
        const appointments = getAppointments();
        res.json(appointments);
    } catch (error) {
        console.error("❌ Error fetching appointments:", error.message);
        res.status(500).send("❌ Error fetching appointments");
    }
});

/* ===========================================
   ✅ GET Route to Fetch Appointments for Logged-in User
=========================================== */
app.get("/appointments/:email", (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const appointments = getAppointments();

        // Filter appointments based on user's email
        const userAppointments = appointments.filter(
            (appointment) => appointment.email === email
        );

        res.json(userAppointments);
    } catch (error) {
        console.error("❌ Error fetching user appointments:", error.message);
        res.status(500).send("❌ Error fetching user appointments");
    }
});

/* ===========================================
   ✅ DELETE Route to Delete Appointment
=========================================== */
app.delete("/appointments/:email/:date/:time", (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const date = decodeURIComponent(req.params.date).replace(/%2C/g, ",");
        const time = decodeURIComponent(req.params.time);

        let appointments = getAppointments();

        // Filter out the appointment to delete
        const updatedAppointments = appointments.filter(
            (appointment) =>
                appointment.email !== email ||
                appointment.date !== date ||
                appointment.time !== time
        );

        // Save updated appointments list
        saveAppointments(updatedAppointments);

        res.status(200).send("✅ Appointment deleted successfully!");
    } catch (error) {
        console.error("❌ Error deleting appointment:", error.message);
        res.status(500).send("❌ Error deleting appointment");
    }
});

/* ===========================================
   ✅ Handle Errors
=========================================== */
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

/* ===========================================
   ✅ Start Server
=========================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
