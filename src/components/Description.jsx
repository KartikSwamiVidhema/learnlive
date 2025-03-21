import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Description = ({ product }) => {
  console.log(product.reviews, "productproduct");

  const reviewRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewerId, setreviewerId] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const productId = product._id;
  const scrollToReview = () => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const userData = localStorage.getItem("userdata");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);

        setreviewerId(parsedData._id);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  const submitReview = async () => {
    // Check if all required fields are filled
    if (!review || !rating || !name || !email) {
      toast.error("Please fill out all fields before submitting.");
      return; // Exit the function if validation fails
    }

    try {
      await axios.post(`${apiBaseUrl}/review`, {
        message: review,
        rating,
        name,
        email,
        reviewerId,
        productId,
        status: "inactive",
      });
      toast.success("Review submitted successfully!", {
        onClose: () => {
          window.location.reload(); // Refresh the page
        },
      });
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card >
        <CardContent>
          <h1 className="text-2xl font-bold">Product Features</h1>
          <p className="text-gray-600 mt-2">
            A powerful release with exciting new features
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Awesome Layout</h2>
            <ul className="list-disc pl-6 text-gray-700 ps-4">
              <li>100+ layout modes</li>
              <li>Tabler card layout</li>
              <li>Widgets & grid layouts</li>
              <li>Light and dark mode</li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Product Description</h2>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            />
          </div>

          <Button className="mt-6" onClick={scrollToReview}>
            Write a Review
          </Button>
        </CardContent>
      </Card>

      {product.reviews && product.reviews.length > 0 && (
  <div className="flex flex-col space-y-4 p-4 border border-gray-200 rounded-lg shadow-sm mt-9">
    <h2 className="text-lg font-semibold">Customer Reviews</h2>
    {product.reviews.map((item, index) => (
      <div
        key={index}
        className="p-4 border border-gray-200 rounded-lg shadow-sm"
      >
        <div className="flex items-start space-x-4">
          {/* User Avatar (Placeholder) */}
          <div className="w-12 h-12 bg-purple-200 text-white rounded flex items-center justify-center text-lg font-semibold">
            {item.name.charAt(0).toUpperCase()}
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatDate(item.createdAt)}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex space-x-1 text-yellow-500">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    stroke="none"
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <p className="mt-2 text-gray-700">{item.message}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


      <div ref={reviewRef} className="mt-12 p-3 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold">Be the first to review</h2>
        <textarea
          className="w-full mt-4 p-2 border rounded"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <h2 className="text-lg font-semibold"> Rating</h2>

        <div className="mt-4 flex gap-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`cursor-pointer ${
                index < rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>

        <input
          type="text"
          className="w-full mt-4 p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full mt-2 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button className="mt-4" onClick={submitReview}>
          Submit Review
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
};
export default Description;
