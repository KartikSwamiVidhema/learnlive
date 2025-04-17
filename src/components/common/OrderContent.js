
const ViewOrderDetails = ({ order, onClose }) => {

    return (
      <div className="bg-white p-8 rounded-xl w-11/12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-800">{order._id}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Transaction ID</p>
              <p className="font-semibold text-gray-800">{order.transaction_id}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Customer Name</p>
              <p className="font-semibold text-gray-800">{order.customer?.name || "N/A"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold text-gray-800">{order.payment_method}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Order Status</p>
              <p className="font-semibold text-gray-800">{order.order_status}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Order Note</p>
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
  
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          try {
            const response = await axios.get(`${apiBaseUrl}/seller/${sellerId}`);
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
  