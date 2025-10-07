import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LazyImage from "@/components/common/LazyImage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Popup from "@/components/Popup";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {

    console.log(product, "productcardproductcardproductcardproductcardproductcardproductcard");

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const defaultImage = "https://tse1.mm.bing.net/th/id/OIP.mtFzdGV6x4bKHCxjmS7yrQHaF4?pid=Api&P=0&h=180";
    const router = useRouter();
    const { addToCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        email: '',
        businessType: '',
        budget: '',

    });

    if (!product) return null;
    const imageUrl = product.coverImage;

    // Prefer coverImage, fallback to scanner_url, fallback to file (if image)
    const initialImage = imageUrl || defaultImage;
    console.log(initialImage, "initialImageinitialImage");
    // Navigate and scroll to features (Features button)
    const handleFeaturesClick = () => {
        if (product?.slug) {
            // Pass a query param to indicate scrolling is desired
            router.push({
                pathname: `/productdetail/${product.slug}`,
                query: { scrollTo: 'features' },
            });
        }
    };
    const handleNavigate = () => {
        router.push(`/productdetail/${product.slug || product._id}`);
    };
    const [imgSrc, setImgSrc] = useState(initialImage);



    const handleImageError = () => {
        if (imgSrc !== defaultImage) {
            setImgSrc(defaultImage);
        }
    };
    const isDefaultImage = imageUrl === defaultImage;


    return (
        <Card className="shadow-noneborder-0 w-full max-w-sm rounded-lg mt-4">
            <CardHeader onClick={handleNavigate} style={{ border: 'none', outline: 'none' }} className="cursor-pointer p-0 relative overflow-hidden rounded-lg">
                <LazyImage
                    src={imageUrl || defaultImage}
                    alt={product.name}
                    className={`w-full aspect-[2/1] object-cover   ${!imageUrl ? 'blur-sm' : ''} `}
                    onError={handleImageError}
                />
                {/* Conditionally render product name overlay if default image is shown */}
                {!imageUrl && (
                    <div className={'absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-black font-bold text-lg p-4 text-center '}>
                        {product.name}


                    </div>
                )}
            </CardHeader>
            <CardContent className="p-4 gap-6">
                <h3 className="mb-2 flex items-center cursor-pointer group text-base font-semibold " onClick={handleNavigate}>
                    {product.name?.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}

                    <ArrowRight className="ml-2 size-4 transition-transform duration-200 translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </h3>
                <div className="flex items-center space-x-1 gap-4">
                    <span className="text-green-600 font-semibold">★4.3</span>
                    <button onClick={handleFeaturesClick} className="text-blue-600 underline text-sm">
                        Features
                    </button>


                    <span
                        className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded"
                    >
                        {product.categories[0].name}
                    </span>


                </div>

                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="mt-4 w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition"
                >
                    GET FREE DEMO
                </button>

                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    {/* Your popup content here */}

                </Popup>

                <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between items-center gap-2">
                    <div>
                        <span className="text-lg font-semibold">{product.salePrice || "2,999"} $</span>
                        <span className="text-xs text-gray-500 ml-1">/Month</span>

                    </div>
                    <Link href="/checkoutform">
                        <Button onClick={() => addToCart(product)}>
                            GET PRICE
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

const ProductCardList = ({ products }) => {
    if (!Array.isArray(products) || products.length === 0) return null;
    return (
        <div className="card-container">
            {products.map((product, idx) => (
                <ProductCard key={product._id || idx} product={product} />
            ))}
        </div>
    );
};

export { ProductCardList };
export default ProductCard;