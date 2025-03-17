import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";


const HomeBanner = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchValue, setSearchValue] = useState("");
  const [searchslug, setSearchSlug] = useState("");
  const [bannerImage, setDesktopBanner] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const headlines = [
    "Find Top IT Services IT Companies",
    "Discover Leading AI & IT Solutions",
    "Compare the Best Tech Providers",
    "Your Gateway to Top IT Firms",
  ];
  const [currentHeadline, setCurrentHeadline] = useState(headlines[0]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => {
        const nextIndex = (headlines.indexOf(prev) + 1) % headlines.length;
        return headlines[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => {
        const nextIndex = (headlines.indexOf(prev) + 1) % headlines.length;
        return headlines[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/categories`);
        const desktopBannerResponse = await axios.get(
          `${apiBaseUrl}/gethomepage`
        );
        console.log(desktopBannerResponse,"desktopBannerResponse");
        
        setDesktopBanner(desktopBannerResponse.data.data.desktopBanner);
        setCategories(response.data.data || []);
        setFilteredCategories(response.data.data.slice(0, 3)); // Show first 3 categories by default
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredCategories(categories.slice(0, 3)); // Show first 3 categories when input is empty
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchValue, categories]);

  const handleInputClick = () => {
    setDropdownVisible(true);
  };

  const handleSelectOption = (option) => {
    setSearchValue(option.name);
    setSearchSlug(option.slug);

    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleNavigate = () => {
    if (searchslug) {
      router.push(`/product-category/${searchslug}`);
    }
  };



  return (
    <section
      className="relative py-10 text-primary px-6 md:px-12 flex justify-center items-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/30"></div>
      <div className="relative z-10 container mx-auto flex flex-col items-center text-center space-y-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl text-white md:text-4xl font-bold leading-tight transition-opacity duration-500">
            {currentHeadline}
          </h1>
          <p className="mt-4 text-white text-lg text-primary">
            Discover and compare the best AI and IT service providers worldwide
          </p>
        </div>
        {/* <div className="relative z-10 container mx-auto flex flex-col items-center text-center space-y-8"> */}
        <Card className="md:w-[700px] bg-white/10 shadow-lg backdrop-blur-lg">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-[90%] relative">
               
                <div className="relative dropdown-container">
                  <Input
                    type="text"
                    placeholder="Search for categories"
                    className="bg-white text-gray-700 pl-10 w-full"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClick={handleInputClick}
                  />
                  <Tag
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  {dropdownVisible && (
                    <div className="absolute left-0 w-full bg-white border border-gray-300 mt-2 rounded-md shadow-md">
                      <div className="border-b px-4 py-2">
                        <h3 className="font-bold text-gray-600 text-left ml-4">
                          Categories
                        </h3>
                        <ul>
                          {filteredCategories.map((option, index) => (
                            <li
                              key={`category-${option._id || index}`}
                              className="p-2 hover:bg-gray-100 cursor-pointer text-left ml-4"
                              onClick={() => handleSelectOption(option)}
                            >
                              {option.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button
                className="w-full md:w-auto mt-2 md:mt-0 transition duration-200"
                onClick={handleNavigate}
              >
                Find
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HomeBanner;
