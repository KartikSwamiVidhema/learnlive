import { useState, useEffect } from "react";
import { Home, FileText, Settings, User, ListOrdered, SquareUserRound } from "lucide-react"; // Import User icon for profile
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Download } from "lucide-react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
function Sidebar({ setActiveTab }) {
  const [role, setRole] = useState(""); // Capitalized 'setRole' for consistency

  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");
  
    if (storedUserData) {
      try {
        const userdata = JSON.parse(storedUserData);
        if (userdata?.role) {
          setRole(userdata.role);
        }
      } catch (error) {
        console.error("Error parsing userdata from localStorage:", error);
      }
    }
  }, []);
  return (
    <div className="bg-primary text-white p-4 md:w-[15%] w-[20%] sm:block rounded-lg">
      <h2 className="text-xl font-bold mb-6 md:block hidden">Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("profile")}>
          <User className="w-6 h-6 md:w-5 md:h-5" />
          <span className="md:block hidden">Profile</span>
        </Button>
        {role !== "USER" && (
  <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("product")}>
     <FileText className="w-6 h-6 md:w-5 md:h-5" />
    <span className="md:block hidden">Product</span>
  </Button>
)}
 {role !== "USER" && (
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("plans")}>
          <ListOrdered className="w-6 h-6 md:w-5 md:h-5"/>
          <span className="md:block hidden">Orders</span>
        </Button>
 )}
 {role !== "VENDOR" && (
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("download")}>
          <Download className="w-6 h-6 md:w-5 md:h-5"/>
          <span className="md:block hidden">Download</span>
        </Button>
 )}
 {role !== "USER" && (
        <Button variant="ghost" className="flex items-center justify-start space-x-2" onClick={() => setActiveTab("settings")}>
          <SquareUserRound className="w-6 h-6 md:w-5 md:h-5" />
          <span className="md:block hidden">Plans</span>
        </Button>
        )}
      </nav>
    </div>
  );
}

function ProfileForm() {
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
        role:userdata.role
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
      console.log("API URL:", apiBaseUrl);

      const response = await axios.put(`${apiBaseUrl}/users/${UserId}`, profile);

      console.log("Profile Updated:", response.data);

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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
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


const DownloadReport = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerId, setCustomerId] = useState(null);
console.log(products,"productsproducts");

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("userdata");
    console.log("userData",userData)
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log("Customer ID from localStorage:", parsedUser._id);
      setCustomerId(parsedUser._id); // Assuming userData contains an `_id` field
    }
  }, []);

  useEffect(() => {
    if (!customerId) return;

    console.log("Fetching orders for customer:", customerId);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); 
        if (data.success) {
          // Extract products from orders
          const productsList = data.orders.flatMap(order =>
            order.items.map(item => ({
              ...item.item_id, // Spread product details
              quantity: item.item_quantity,
              price: item.item_price,
              file: item.item_id?.file,
            }))
          );
          console.log("productsList",productsList);
          setProducts(productsList);
        } else {
          setError("Failed to fetch products");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Error fetching data");
        setLoading(false);
      });
  }, [customerId]);
  

  // Function to handle download
  const handleDownload = (fileUrl) => {
    if (!fileUrl) {
      alert("No file available for download.");
      return;
    }
    window.open(fileUrl, "_blank"); // Opens the link in a new tab
  };
  

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 md:p-6 p-3 ">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-4xl">
        <h2 className="md:text-2xl text-[18px] font-semibold mb-4">Download Your Report</h2>

        {/* Display Loading/Error Messages */}
        {loading && <p className="mt-6 text-gray-500">Loading products...</p>}
        {error && <p className="mt-6 text-red-500">{error}</p>}

        {/* Product Table */}
        {!loading && !error && products.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Download</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">${product.salePrice}</td>
                    <td className="px-4 py-2 border">{product.quantity}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={product.coverImage || product.images?.[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {product.file ? (
                        <button
                          onClick={() => handleDownload(product.file)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Download"
                        >
                          <Download size={20} />
                        </button>
                      ) : (
                        <span className="text-gray-400">No File</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};







const ProductContent = ({ categorydata }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [categoriesList, setCategoriesList] = useState(categorydata);
  const [imageInputs, setImageInputs] = useState([""]);
  const [coverImages, setcoverImages] = useState([""]);
  const [fileupload, setfileupload] = useState([""]);
  const [errors, setErrors] = useState({ // Initialize errors state
    name: "",
    images: "",
    categories: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedUserData = localStorage.getItem("userdata");
      console.log("storedUserData",storedUserData)
      if (storedUserData) {
        console.log("2");
        const userdata = JSON.parse(storedUserData);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        try {
          const responseProduct = await axios.get(`${apiBaseUrl}/product?filter={"vendor":"${userdata._id}"}`);
          console.log('responseProduct', responseProduct.data.data);
          setData(responseProduct.data.data);
        } catch (error) {
          console.error("Error fetching product data", error);
        }
      }
    };
    fetchData();
  }, []);
  const removeImageInput = (index) => {
    const updatedInputs = imageInputs.filter((_, i) => i !== index);
    setImageInputs(updatedInputs);
  };
  // initial state from server-side props
  const [UserId, setUserId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    file: "",
    description: "",
    shortdescription: "",
    previewLink: "",
    salePrice: "",
    regularPrice: "",
    images: [],
    coverImage: "",
    demoLink: "",
    languages: "",
    compatible_with: "",
    compatible_browsers: "",
    tags: "",
    categories: "",
  });

  // Assuming userdata is fetched or available in localStorage or context
  const [userdataa, setUserdata] = useState(null);

  useEffect(() => {
    // Fetch userdata from localStorage or wherever it is stored
    const storedUserData = localStorage.getItem('userdataa');
    if (storedUserData) {
      console.log("3");
      setUserdata(JSON.parse(storedUserData));
    }
  }, []);


  const [editIndex, setEditIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const storedUserData = localStorage.getItem("userdata");

  const userdata = JSON.parse(storedUserData);

  const handleDialogOpen = (isEdit = false, index = null) => {
    const storedUserData = localStorage.getItem("userdata");
    if (!storedUserData) {
      console.error("User data not found in local storage.");
      return;
    }
    const userdata = JSON.parse(storedUserData);
    const vendorId = userdata._id;

    if (isEdit) {
      // Set the form data to the product being edited
      setNewProduct({
        ...data[index],
        vendor: vendorId, // Ensure vendor ID is set
      });
      setEditIndex(index);
    } else {
      // Reset the form for adding a new product
      setNewProduct({
        name: "",
        file: "",
        description: "",
        shortdescription: "",
        previewLink: "",
        salePrice: "",
        regularPrice: "",
        images: [],
        coverImage: "",
        demoLink: "",
        languages: "",
        compatible_with: "",
        compatible_browsers: "",
        tags: "",
        categories: "",
        vendor: vendorId, // Explicitly set the vendor ID
      });
      setEditIndex(null);
    }
    setIsOpen(true); // Open the dialog
  };
  const [successMessage, setSuccessMessage] = useState(""); // State to hold the success message

  const handleFileSingle = (event) => {
    const file = event.target.files[0];
    if (file) {
      setcoverImages(file);
      setNewProduct((prev) => ({
        ...prev,
        coverImage: URL.createObjectURL(file),
        coverImageName: file.name, // Store the file name
      }));
    }
  };

  const handleSingle = (event) => {
    const file = event.target.files[0];
    if (file) {
      setfileupload(file);
      setNewProduct((prev) => ({
        ...prev,
        file: URL.createObjectURL(file),
        fileName: file.name, // Store the file name
      }));
    }
  };
  // Multiple file upload (for images or other multiple files)
  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Store the files locally (without uploading to Cloudinary yet)
    const fileArray = Array.from(files);
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...fileArray], // Store files in the 'images' array
    }));
  };


  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });
  
  const uploadToS3 = async (file) => {
    if (!file) return null;
  
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  
    // Convert File to Buffer (Node.js compatible)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: buffer,
      ContentType: "application/zip", // Explicitly setting content type for ZIP files
      ACL: "public-read",
    };
  
    try {
      await s3Client.send(new PutObjectCommand(uploadParams));
      return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    } catch (error) {
      console.error("Error uploading to S3:", error);
      return null;
    }
  };
  
  const handleAdd = async () => {
    setErrors({
      name: "",
      images: "",
      categories: "",
    });
  
    let formIsValid = true;
  
    if (!newProduct.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "This field is required",
      }));
      formIsValid = false;
    }
  
    if (!newProduct.images || newProduct.images.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "At least one image is required",
      }));
      formIsValid = false;
    }
  
    if (!newProduct.categories) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        categories: "This field is required",
      }));
      formIsValid = false;
    }
  
    if (!formIsValid) {
      console.error("Please fill in the required fields.");
      return;
    }
  
    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      let successMessage = "";
  
      // Upload cover image if it's a new file
      let coverImageUrl = newProduct.coverImage;
      if (coverImages instanceof File) {
        coverImageUrl = await uploadToS3(coverImages);
        if (!coverImageUrl) {
          setLoading(false);
          return;
        }
      }
  
      // Upload main file if it's a new file
      let fileUrl = newProduct.file;
      if (fileupload instanceof File) {
        fileUrl = await uploadToS3(fileupload);
        if (!fileUrl) {
          setLoading(false);
          return;
        }
      }
  
      // Upload new images (skip existing URLs)
      const uploadedImages = [];
      for (let img of newProduct.images) {
        if (img instanceof File) {
          const imageUrl = await uploadToS3(img);
          uploadedImages.push(imageUrl);
        } else {
          uploadedImages.push(img); // Keep existing URLs
        }
      }
  
      // Prepare final product data
      const vendorId = userdata?._id;
      const finalProduct = {
        ...newProduct,
        images: uploadedImages,
        coverImage: coverImageUrl,
        file: fileUrl,
        vendor: vendorId,
      };
  
      let response;
      if (editIndex === null) {
        response = await axios.post(`${apiBaseUrl}/product`, finalProduct);
        if (response.data.message === "Product created successfully") {
          const newProductData = [...data, response.data.data];
          setData(newProductData);
          localStorage.setItem("productData", JSON.stringify(newProductData));
          successMessage = "Product added successfully!";
        }
      } else {
        const productId = data[editIndex]._id;
        response = await axios.put(`${apiBaseUrl}/product/${productId}`, finalProduct);
        if (response.data.message === "Product updated successfully") {
          const updatedData = [...data];
          updatedData[editIndex] = response.data.data;
          setData(updatedData);
          localStorage.setItem("productData", JSON.stringify(updatedData));
          successMessage = "Product updated successfully!";
        }
      }
  
      if (successMessage) {
        setSuccessMessage(successMessage);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
  
      setNewProduct({
        name: "",
        file: "",
        description: "",
        shortdescription: "",
        previewLink: "",
        salePrice: "",
        regularPrice: "",
        images: [],
        coverImage: "",
        demoLink: "",
        languages: "",
        compatible_with: "",
        compatible_browsers: "",
        tags: "",
        categories: "",
      });
      setIsOpen(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error adding/updating product:", error);
    } finally {
      setLoading(false);
    }
  };
  


  // Function to handle opening the form for editing an existing product
  const handleEdit = (index) => {
    const productToEdit = data[index];
    setNewProduct({
      ...productToEdit,
      images: productToEdit.images || [], // Ensure images array is initialized
    });
    setEditIndex(index);
    setIsOpen(true);
  };

  // Helper function to upload a file to Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) {
      console.log("No file provided, skipping upload.");
      return null; // Return null if no file is provided
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vendors");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/drsh5gjtv/upload", formData);
      console.log('Uploaded file URL:', res.data.secure_url);
      return res.data.secure_url; // Return the URL of the uploaded file
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      return null; // Return null if there's an error
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productIndexToDelete, setProductIndexToDelete] = useState(null);


  const handleDeleteConfirmation = (index, productId) => {
    setProductIdToDelete(productId);
    setProductIndexToDelete(index);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.delete(`${apiBaseUrl}/product/${productIdToDelete}`);

      if (response.status === 200) {
        // Remove the deleted product from the state (UI)
        const updatedData = data.filter((_, i) => i !== productIndexToDelete);

        // Update state and show success message
        setData(updatedData); // Update the data after deletion
        setSuccessMessage("Product deleted successfully!");
        setIsModalVisible(false); // Close the modal after successful deletion

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message
        }, 3000);
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal if user cancels
  };


  const totalPages = Math.ceil(data.length / productsPerPage);
  const paginatedData = data.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the product state
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the error for that field if the user starts typing
    if (value) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "", // Clear the error for that specific field
      }));
    }
  };
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    setNewProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files], // Append new files to existing images
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      images: "",
    }));
  };
  const handleRemoveImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index), // Remove the image at the specified index
    }));
  };
  return (
    <div className="container mx-auto p-3 mt-0">
      <div className="md:w-[99%] mx-auto">
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6">
            <Dialog className="rounded-lg max-h-[500px] overflow-y-scroll" open={isOpen} onOpenChange={setIsOpen}>

              <DialogTrigger asChild>
                <Button
                  onClick={() => handleDialogOpen()} // Open the dialog for adding a new product
                  className="mb-4 bg-[black] hover:bg-dark text-white rounded-lg px-4 py-2"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Add Product'}
                </Button>


              </DialogTrigger>
              {successMessage && (
                <div className="flex items-center bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                  {/* Success Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              )}
              <DialogContent className="rounded-lg max-h-[500px]  max-w-[42rem] overflow-y-scroll no-scrollbar">
                <DialogHeader>
                  <DialogTitle>{editIndex !== null ? "Edit Product" : "Add Product"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleChange}
                      placeholder="Enter your country"
                      className="mt-1 rounded-lg"

                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                  </div>
                  <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                      File
                    </label>
                    <Input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleSingle}
                      placeholder="Enter your file"
                      className="mt-1 rounded-lg"
                    />
                    {newProduct.file && (
                      <span className="text-sm text-gray-500">{newProduct.file}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Input
                      type="text"
                      id="description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleChange}
                      placeholder="Enter your description"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="shortdescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <Input
                      type="text"
                      id="shortdescription"
                      name="shortdescription"
                      value={newProduct.shortdescription}
                      onChange={handleChange}
                      placeholder="Enter your shortdescription"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="previewLink" className="block text-sm font-medium text-gray-700 mb-2">
                      Preview Link
                    </label>
                    <Input
                      type="text"
                      id="previewLink"
                      name="previewLink"
                      value={newProduct.previewLink}
                      onChange={handleChange}
                      placeholder="Enter your previewlink"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price
                    </label>
                    <Input
                      type="text"
                      id="salePrice"
                      name="salePrice"
                      value={newProduct.salePrice}
                      onChange={handleChange}
                      placeholder="Enter your salePrice"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="regularPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Regular Price
                    </label>
                    <Input
                      type="text"
                      id="regularPrice"
                      name="regularPrice"
                      value={newProduct.regularPrice}
                      onChange={handleChange}
                      placeholder="Enter your regularprice"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                      Images
                    </label>

                    {/* Image Gallery Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {/* Show Selected Images */}
                      {newProduct.images?.map((img, index) => (
                        <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                          <img
                            src={typeof img === "string" ? img : URL.createObjectURL(img)} // Handle both URLs and File objects
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Remove Image Button */}
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Add More Images Button */}
                      <label
                        htmlFor="imageUpload"
                        className="w-24 h-24 border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-gray-400 text-3xl">+</span>
                      </label>
                    </div>

                    {/* Hidden Input Field for Image Upload */}
                    <input
                      id="imageUpload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImagesChange}
                    />
                    {errors.images && <span className="text-red-500 text-xs">{errors.images}</span>}
                  </div>
                  <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image
                    </label>
                    <Input
                      type="file"
                      id="coverImage"
                      name="coverImage"
                      onChange={handleFileSingle}
                      placeholder="Enter your coverImage"
                      className="mt-1 rounded-lg"
                    />
                    <div className="w-[85px] h-[85px] mt-2 flex items-center justify-center border border-gray-300 rounded-lg">
                      {newProduct.coverImage ? (
                        <img
                          src={newProduct.coverImage}
                          alt="Cover Image"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-500 text-xs">No Photo</span>
                      )}
                    </div>
                  </div>


                  <div>
                    <label htmlFor="demoLink" className="block text-sm font-medium text-gray-700 mb-2">
                      Demo Link
                    </label>
                    <Input
                      type="text"
                      id="demoLink"
                      name="demoLink"
                      value={newProduct.demoLink}
                      onChange={handleChange}
                      placeholder="Enter your demolink"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
                      Languages
                    </label>
                    <Input
                      type="text"
                      id="languages"
                      name="languages"
                      value={newProduct.languages}
                      onChange={handleChange}
                      placeholder="Enter your languages"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="compatible_with" className="block text-sm font-medium text-gray-700 mb-2">
                      Compatible With
                    </label>
                    <Input
                      type="text"
                      id="compatible_with"
                      name="compatible_with"
                      value={newProduct.compatible_with}
                      onChange={handleChange}
                      placeholder="Enter your compatiblewith"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="compatible_browsers" className="block text-sm font-medium text-gray-700 mb-2">
                      Compatible Browser
                    </label>
                    <Input
                      type="text"
                      id="compatible_browsers"
                      name="compatible_browsers"
                      value={newProduct.compatible_browsers}
                      onChange={handleChange}
                      placeholder="Enter your compatiblrBrowser"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <Input
                      type="text"
                      id="tags"
                      name="tags"
                      value={newProduct.tags}
                      onChange={handleChange}
                      placeholder="Enter your tags"
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <Input
                      type="hidden"
                      id="vendor"
                      name="tags"
                      value={newProduct.vendor}
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
                      Categories
                    </label>
                    <select
                      id="categories"
                      name="categories"
                      value={newProduct.categories}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
                    >
                      <option value="" disabled>Select a category</option>
                      {categoriesList.length > 0 ? (
                        categoriesList.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No categories available</option>
                      )}
                    </select>
                    {errors.categories && (
                      <span className="text-red-500 text-sm mt-1">{errors.categories}</span>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleAdd}
                    disabled={loading}
                    className={`bg-green-600 hover:bg-green-700 text-white rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Loading..." : editIndex !== null ? "Update" : "Add"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


            <Table className="mt-4 rounded-lg border border-gray-200 shadow-md">
              <TableHeader>
                <TableRow className="bg-gray-100 rounded-t-lg">
                  <TableHead>Name</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    item ? (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="p-3 rounded-lg">{item?.name || "N/A"}</TableCell>
                        <TableCell className="p-3 rounded-lg">{item?.previewLink || "N/A"}</TableCell>
                        <TableCell className="p-3 rounded-lg">{item?.salePrice || "N/A"}</TableCell>
                        <TableCell className="p-3 flex space-x-2">
                          <Button variant="outline" onClick={() => handleEdit(index)} className="border-blue-500 text-blue-500">
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteConfirmation(index, item?._id)}
                            className="ml-2 rounded-lg"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : null // Skip if item is undefined
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-3 text-gray-500">No products available</td>
                  </tr>
                )}
              </TableBody>

              {/* Modal for Confirmation */}
              {isModalVisible && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    {/* Modal Heading */}
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Confirm Action</h2>

                    {/* Modal Content */}
                    <p className="text-center text-gray-700 mb-6">Are you sure you want to delete this product?</p>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={handleDelete}
                        variant="destructive"
                        className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-md"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-2 rounded-md"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4 space-x-4">
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                  {"<"}
                </Button>
                <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                  {">"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};





const ViewOrderDetails = ({ order, onClose }) => {

  return (
    <div className="bg-white p-8 rounded-xl w-11/12 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 whitespace-nowrap">Order ID</p>
            <p className="font-semibold text-gray-800">{order._id}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 whitespace-nowrap">Transaction ID</p>
            <p className="font-semibold text-gray-800">{order.transaction_id}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 whitespace-nowrap">Customer Name</p>
            <p className="font-semibold text-gray-800">{order.customer?.name || "N/A"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 whitespace-nowrap">Payment Method</p>
            <p className="font-semibold text-gray-800">{order.payment_method}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 whitespace-nowrap">Order Status</p>
            <p className="font-semibold text-gray-800">{order.order_status}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 whitespace-nowrap">Order Note</p>
            <p className="font-semibold text-gray-800">{order.order_note}</p>
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Shipping Address</p>
            <p className="font-semibold text-gray-800">{order.shipping_address}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Billing Address</p>
            <p className="font-semibold text-gray-800">{order.billing_address}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Customer Email</p>
            <p className="font-semibold text-gray-800">{order.customer?.email || "N/A"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-semibold text-gray-800">{order.phone_no}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Shipping Method</p>
            <p className="font-semibold text-gray-800">{order.shipping_method}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Invoice ID</p>
            <p className="font-semibold text-gray-800">{order.invoice_id}</p>
          </div>
        </div>
      </div>

      {/* Financial Details */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Financial Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Sub Total</p>
            <p className="font-semibold text-gray-800">{order.sub_total?.$numberDecimal || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tax</p>
            <p className="font-semibold text-gray-800">{order.tax?.$numberDecimal || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Discount</p>
            <p className="font-semibold text-gray-800">{order.discount?.$numberDecimal || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shipping Charges</p>
            <p className="font-semibold text-gray-800">{order.shipping_charges?.$numberDecimal || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Grand Total</p>
            <p className="font-semibold text-gray-800">{order.grand_total?.$numberDecimal || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Items</h3>
        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Item {index + 1}</p>
              <p className="font-semibold text-gray-800">{item.item_name || "N/A"}</p>
              <p className="text-sm text-gray-500">Quantity: {item.item_quantity || "N/A"}</p>
              <p className="text-sm text-gray-500">Price: {item.item_price?.$numberDecimal || "N/A"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Orders
        </button>

     
      </div>
    </div>
  );
};





const OrderContent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const storedUserData = localStorage.getItem("userdata");
      if (storedUserData) {
        const userdata = JSON.parse(storedUserData);
        const sellerId = userdata._id; // Extract seller ID
        console.log("Seller ID:", sellerId);

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        try {
          const response = await axios.get(`${apiBaseUrl}/seller/${sellerId}`);
          console.log("Orders:", response.data.orders);
          setData(response.data.orders);
          setTotalPages(Math.ceil(response.data.orders.length / itemsPerPage));
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchData();
  }, []);

  // Paginate the data
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle "View" button click
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Handle closing the order details view
  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto p-3">
      <div className="md:w-[99%] mx-auto">
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6">
            {selectedOrder ? (
              <ViewOrderDetails order={selectedOrder} onClose={handleCloseOrderDetails} />
            ) : (
              <>
                <Table className="mt-4 rounded-lg border border-gray-200 shadow-md">
                  <TableHeader>
                    <TableRow className="bg-gray-100 rounded-t-lg">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Order Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                      paginatedData.map((item, index) => (
                        item ? (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="p-3 rounded-lg">{item?._id || "N/A"}</TableCell>
                            <TableCell className="p-3 rounded-lg">{item?.transaction_id || "N/A"}</TableCell>
                            <TableCell className="p-3 rounded-lg">{item?.payment_method || "N/A"}</TableCell>
                            <TableCell className="p-3 rounded-lg">{item?.order_status || "N/A"}</TableCell>
                            <TableCell className="p-3 flex space-x-2">
                              <Button
                                variant="outline"
                                className="border-blue-500 text-blue-500"
                                onClick={() => handleViewOrder(item)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ) : null
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center p-3 text-gray-500">No Orders available</td>
                      </tr>
                    )}
                  </TableBody>
                </Table>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-4 space-x-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                      {"<"}
                    </button>
                    <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                      {">"}
                    </button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};







export default function Dashboard({ userdata, categorydata }) {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "product":
        return <ProductContent categorydata={categorydata.data} />;
      case "settings":
        return (
          <div className="flex-grow bg-gray-100 md:min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-700 mb-3">
                  Congratulations!
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  You are currently on the Free Plan.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Upgrade to unlock premium features and enjoy exclusive benefits!
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <button className="bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300 ease-in-out">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

        );
      case "plans":
        return <OrderContent />;

        case "download":
          return (
         <DownloadReport/>
          );
    
      default:
        return <ProfileForm />;
    }
  };
  return (
    <>
    
      <div className="container flex py-4 px-3">
        <Sidebar setActiveTab={setActiveTab}  />
        <div className="md:w-[85%] w-[80%] md:px-6 ">
          <Card className="rounded-0">
            <CardContent>{renderContent()}</CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  console.log('api base url1233' + apiBaseUrl)
  try {
    const initialTab = "all";

    // const responseProduct = await axios.get(`${apiBaseUrl}/product?filter={"vendor":"67bd5ccc684c54fa8c4060b3"}`);
    const categoryData = await fetch(`${apiBaseUrl}/categories`);
    const categorydata = await categoryData.json();
    return {
      props: { categorydata },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { productdata: [] } };
  }
}