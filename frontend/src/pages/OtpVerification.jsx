import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const email = localStorage.getItem("otpEmail"); // ✅ Get email from storage

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/auth/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success("OTP verified! You can now log in.");
            localStorage.removeItem("otpEmail"); // ✅ Clear temp email
            navigate("/login");

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="w-full max-w-[400px] mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-5">Verify OTP</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Verify
                </button>
            </form>
        </div>
    );
};

export default OtpVerification;
