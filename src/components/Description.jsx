import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import LazyImage from "@/components/common/LazyImage";
import Link from "next/link";

const Description = ({ product, reviewRef, type, onReviewSubmitted }) => {

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

  const router = useRouter();

  useEffect(() => {
    // Only scroll if query param scrollTo=features is present
    if (router.query.scrollTo === "description") {
      const el = document.getElementById("description");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router.query.scrollTo]);






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
    if (!reviewerId) {
      toast.error("Please log in to submit the review.");
      return;
    }
    // Check if all required fields are filled
    if (!review || !rating || !name || !email) {
      toast.error("Please fill out all fields before submitting.");
      return; // Exit the function if validation fails
    }

    try {
      const res = await axios.post(`${apiBaseUrl}/review`, {
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

      // clear local inputs
      setReview("");
      setRating(0);
      setName("");
      setEmail("");

      // notify parent to refresh product data (so new review appears)
      if (typeof onReviewSubmitted === "function") {
        onReviewSubmitted();
      } else {
        // fallback: reload
        window.location.reload();
      }
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

  if (type === "features") {
    return (
      <div className=" bg-gray-100 border px-4 py-8 mb-4 flex flex-col space-y-8">
        <Card >
          <CardContent id="features">
            <h1 className="text-2xl font-bold">Product Features</h1>
            <p className="text-gray-600 mt-2">
              A powerful release with exciting new features
            </p>

            <div className="mt-6 mb-6">
              <h2 className="text-lg font-semibold">Awesome Layout</h2>
              <ul className="list-disc pl-6 text-gray-700 ps-4">
                <li>100+ layout modes</li>
                <li>Tabler card layout</li>
                <li>Widgets & grid layouts</li>
                <li>Light and dark mode</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </div>
    );
  }




  return (
    <div className="px-4  ">

      {/* 2 Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT SIDE — Review Form (70%) */}
        <div ref={reviewRef} className="lg:w-[70%] p-4 border rounded-lg bg-gray-50 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold">Write a review</h2>

          <textarea
            className="w-full mt-4 p-2 border rounded"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          <h2 className="text-lg font-semibold mt-4">Rating</h2>

          <div className="mt-3 flex gap-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`cursor-pointer ${index < rating ? "text-yellow-500" : "text-yellow-400"
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

          <Button className="mt-4 bg-green-500" onClick={submitReview}>
            Submit Review
          </Button>

          <ToastContainer />
        </div>

        {/* RIGHT SIDE — Customer Reviews (30%) */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="lg:w-[30%] p-4 border border-gray-200 bg-gray-100 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-3 ">Customer Reviews</h2>

            <div className="bg-white space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {product.reviews.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-purple-200 text-white rounded flex items-center justify-center text-sm font-semibold">
                      {item.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-xs text-gray-500">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex space-x-1 text-yellow-500">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" stroke="none" />
                          ))}
                        </div>
                      </div>

                      <p className="mt-1 text-gray-700 text-sm">{item.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );

};
export default Description;
