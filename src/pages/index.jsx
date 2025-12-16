import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import axios from "axios";
import HomeBanner from "@/components/HomeBanner";
import BestSellingProducts from "@/components/BestSellingProducts";
import BestSellingThemes from "@/components/BestSellingTheme";
import ThemeMarketplace from "@/components/ThemeMarketPlace";
import { useCart } from "../../context/CartContext";
import MetaTags from "@/components/metaTags";
import metadata from "../components/common/metadata.json";
import ProductCard from "@/components/ProductCard";
import PopularCategories from "@/components/PopularCategories";

const Index = ({ initialProducts, initialTab, categoriesData }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [categories, setCategories] = useState(categoriesData || []);
  const [activeTab, setActiveTab] = useState(initialTab || "all");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { addToCart } = useCart();
  const seo = metadata.home;

  // ✅ Fetch products by category
  const handleCategoryClick = async (categorySlug) => {
    try {
      setActiveTab(categorySlug);

      const url = `${apiBaseUrl}/getProductByCategorySlug/${categorySlug}`;
      console.log("Fetching products from:", url);

      const response = await axios.get(url);
      console.log("Fetched products:", response.data);

      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // ✅ Filter products based on active category
  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) =>
        product?.categories?.some((cat) => cat.slug === activeTab)
      );

  return (
    <>
      {/* ---------- SEO ---------- */}
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      <div className="min-h-screen flex flex-col">
        <HomeBanner />
        <ThemeMarketplace />

        <main className="flex-grow">
          {/* ---------- FEATURED PRODUCTS SECTION ---------- */}
          <section className="p-1">
            <h2 className="text-3xl font-bold text-center mb-4 mt-10">
              Featured Products
            </h2>

            <div className="mx-auto px-4">
              <Tabs defaultValue={activeTab} value={activeTab} className="mt-5">
                <TabsContent value={activeTab}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-4">
                    {filteredProducts && filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))
                    ) : (
                      <p className="col-span-full text-center text-gray-500">
                        No products found for this category.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* ---------- BEST SELLING PRODUCTS ---------- */}
          <BestSellingProducts />

          {/* ---------- POPULAR CATEGORIES SECTION ---------- */}
          <PopularCategories
            categories={
              Array.isArray(categories?.data)
                ? categories.data.filter((cat) => cat.isFeatured)
                : Array.isArray(categories)
                  ? categories.filter((cat) => cat.isFeatured)
                  : []
            }
            onCategoryClick={handleCategoryClick}
          />
        </main>

        <BestSellingThemes />
        <Footer />
      </div>
    </>
  );
};

// ✅ SERVER-SIDE FETCH
export async function getServerSideProps() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // 🔹 Replace 'ionic-7' with a real existing category slug from your database
    const initialTab = "ionic-7";

    const [productRes, categoryRes] = await Promise.all([
      axios.get(`${apiBaseUrl}/getProductByCategorySlug/${initialTab}`),
      axios.get(`${apiBaseUrl}/categories?filter={"isFeatured":"true"}`),
    ]);

    return {
      props: {
        initialProducts: productRes.data || [],
        initialTab,
        categoriesData: categoryRes.data || [],
      },
    };
  } catch (error) {
    console.error("Server fetch error:", error.message);
    return {
      props: { initialProducts: [], initialTab: "all", categoriesData: [] },
    };
  }
}

export default Index;
