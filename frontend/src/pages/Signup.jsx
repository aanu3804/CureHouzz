import { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import HashLoader from "react-spinners/HashLoader";
import uploadImageToCloudinary from "../utils/uploadCloudinary";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "", // Photo is optional
    gender: "",
    role: "patient",
  });

  // ✅ Google Signup Handler
  const handleGoogleSignup = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload (Optional ✅)
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      toast.info("Uploading image, please wait...");
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url }); // Save only if uploaded
      toast.success("Profile photo uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Try again.");
    }
  };

  // ✅ Signup Handler
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Signup failed.");
      }

      setEmail(result.email);
      setOtpSent(true);
      toast.success("OTP sent to your email. Please verify.");
    } catch (err) {
      toast.error(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ OTP Verification Handler
  const verifyOtpHandler = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "OTP verification failed.");
      }

      toast.success("Verification successful! You can now log in.");
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="Signup" className="w-full rounded-l-lg" />
            </figure>
          </div>

          {/* Signup Form */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">Account</span>
            </h3>

            {/* ✅ Signup with Google Button */}
            <button
              onClick={handleGoogleSignup}
              className="w-full bg-red-500 text-white text-[18px] rounded-lg px-4 py-3 mt-3"
            >
              Signup with Google
            </button>

            {otpSent ? (
              <div>
                <p className="mb-4 text-lg">Enter the OTP sent to your email:</p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                  required
                />
                <div className="mt-7">
                  <button
                    disabled={loading}
                    onClick={verifyOtpHandler}
                    className="w-full bg-primaryColor text-white text-[18px] rounded-lg px-4 py-3"
                  >
                    {loading ? <HashLoader size={25} color="#ffffff" /> : "Verify OTP"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitHandler}>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                    required
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                    required
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                    required
                  />
                </div>

                <div className="mb-5 flex items-center justify-between">
                  <label className="text-headingColor font-bold text-[16px]">
                    Are you a:
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="text-textColor font-semibold text-[15px] px-4 py-2 border rounded"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </label>

                  <label className="text-headingColor font-bold text-[16px]">
                    Gender:
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="text-textColor font-semibold text-[15px] px-4 py-2 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                {/* Profile Photo Upload (Optional ✅) */}
                <div className="mb-5 flex items-center gap-3">
                  {selectedFile && (
                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-primaryColor flex items-center justify-center">
                      <img src={previewURL} alt="Profile" className="w-full rounded-full" />
                    </figure>
                  )}
                  <input type="file" onChange={handleFileInputChange} accept=".jpg, .png" />
                </div>

                <button disabled={loading} type="submit" className="w-full bg-primaryColor text-white text-[18px] rounded-lg px-4 py-3">
                  {loading ? <HashLoader size={25} color="#ffffff" /> : "Sign Up"}
                </button>
                
                {/* ✅ Added Login link below the button */}
                <p className="text-center mt-4 text-gray-600">
                  Already have an account? 
                  <a href="/login" className="text-primaryColor font-semibold hover:underline"> Login</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
