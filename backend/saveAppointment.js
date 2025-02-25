const fs = require('fs');
const path = require('path');

// ✅ Define the path to AppointmentData.json
const filePath = path.join(__dirname, 'AppointmentData.json');

// ✅ Function to save appointment data
function saveAppointment(newAppointment) {
    try {
        // Read existing data
        let data = fs.readFileSync(filePath, 'utf8');
        let appointments = JSON.parse(data);

        // Add the new appointment
        appointments.push(newAppointment);

        // Write updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2), 'utf8');

        console.log('✅ Appointment saved successfully!');
    } catch (error) {
        console.error('❌ Error saving appointment:', error.message);
    }
}

// ✅ Example: Save a test appointment
const exampleAppointment = {
    service: "MRI Scan",
    lab: "MediCore Pharmaceuticals",
    date: "4 March, 2025",
    time: "10:00 AM",
    patient: "John Doe"
};

// Uncomment this line to test saving
// saveAppointment(exampleAppointment);

module.exports = saveAppointment;
