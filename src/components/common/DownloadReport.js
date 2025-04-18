import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
const DownloadReport = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("userdata");

    if (userData) {
      const parsedUser = JSON.parse(userData);

      setCustomerId(parsedUser._id); // Assuming userData contains an `_id` field
    }
  }, []);

  useEffect(() => {
    if (!customerId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${customerId}`)
      .then((response) => response.json())
      .then((data) => {

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
export default DownloadReport;
