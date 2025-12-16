import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import axios from "axios";

const ProfileForm = () => {
  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      toast.success("Login successful! 🎉"); // ✅ Show success message
      localStorage.removeItem("loginSuccess"); // ✅ Remove it to prevent repeated toasts
    }
  }, []);
  const [UserId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    name: "",
    phoneNo: "",
    role: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");
    if (storedUserData) {
      const userdata = JSON.parse(storedUserData);
      setUserId(userdata._id);
      setProfile({
        username: userdata.username || "",
        email: userdata.email || "",
        name: userdata.name || "",
        phoneNo: userdata.phoneNo || "",
        role: userdata.role
      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting the form
    setSuccessMessage(""); // Reset the success message before starting the submission
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await axios.put(`${apiBaseUrl}/users/${UserId}`, profile);
      // Update localStorage with the new profile data
      localStorage.setItem("userdata", JSON.stringify({
        _id: UserId,
        ...profile
      }));
      setProfile(response.data);

      // Set success message
      setSuccessMessage("Profile updated successfully!");

      // Remove the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Clear the success message after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccessMessage("Error updating profile. Please try again.");
    } finally {
      // Set loading to false after the request completes (success or failure)
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <ToastContainer autoClose={3000} />
      <div className="container mx-auto p-3">
        <div className="md:w-[99%] mx-auto">
          <Card className="rounded-xl shadow-md">
            <CardContent className="p-6">
              <h2 className="md:text-2xl font-semibold mb-4">My Profile</h2>
              {successMessage && (
                <div className="flex items-center bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                  {/* Success Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    id="fullName"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="mt-1 rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Surname
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="mt-1 rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="mt-1 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone No
                  </label>
                  <Input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={profile.phoneNo}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="mt-1 rounded-lg"
                  />
                </div>
                <Button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2">
                  {isLoading ? 'Loading...' : 'Save Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
