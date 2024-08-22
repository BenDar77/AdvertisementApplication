import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LinkAdvertToCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryId: "",
    advertId: "",
  });

  const [categories, setCategories] = useState([]);
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };

    const fetchAdverts = async () => {
      try {
        const response = await api.get("/adverts");
        setAdverts(response.data);
      } catch (error) {
        console.error("Error fetching adverts:", error);
        toast.error("Error fetching adverts");
      }
    };

    fetchCategories();
    fetchAdverts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `/category/${formData.categoryId}/advert/${formData.advertId}`
      );
      if (response.status === 200) {
        toast.success("Advert linked to category successfully");
      } else {
        toast.error("Failed to link advert to category");
      }
      navigate("/adverts");
    } catch (error) {
      console.error("Error linking advert to category:", error);
      toast.error("Error linking advert to category");
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.delete(
        `/category/${formData.categoryId}/advert/${formData.advertId}`
      );
      if (response.status === 200) {
        toast.success("Advert removed from category successfully");
      } else {
        toast.error("Failed to remove advert from category");
      }
      navigate("/adverts");
    } catch (error) {
      console.error("Error deleting advert from category:", error);
      toast.error("Error deleting advert from category");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full md:w-1/2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Link Advert to Category
          </h1>
          <form className="space-y-4" onSubmit={handleLinkSubmit}>
            <div>
              <label
                htmlFor="categoryId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="advertId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Advert
              </label>
              <select
                id="advertId"
                name="advertId"
                value={formData.advertId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select advert</option>
                {adverts.map((advert) => (
                  <option key={advert.id} value={advert.id}>
                    {advert.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Link Advert to Category
            </button>
          </form>
        </div>

        {/* Delete Advert from Category Section */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Remove Advert from Category
          </h1>
          <form className="space-y-4" onSubmit={handleDeleteSubmit}>
            <div>
              <label
                htmlFor="categoryId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="advertId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Advert
              </label>
              <select
                id="advertId"
                name="advertId"
                value={formData.advertId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select advert</option>
                {adverts.map((advert) => (
                  <option key={advert.id} value={advert.id}>
                    {advert.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Remove Advert from Category
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LinkAdvertToCategory;
