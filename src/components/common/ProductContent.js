

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
        if (storedUserData) {
  
          const userdata = JSON.parse(storedUserData);
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          try {
            const responseProduct = await axios.get(`${apiBaseUrl}/product?filter={"vendor":"${userdata._id}"}`);
  
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
        return null; // Return null if no file is provided
      }
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "vendors");
  
      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/drsh5gjtv/upload", formData);
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