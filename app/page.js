"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { postData } from "./helpers";

export default function Home() {
  const [dropdown, setDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingaction, setLoadingAction] = useState(false);
  const [productForm, setProductForm] = useState({
    slug: "",
    quantity: "",
    price: "",
  });
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/product");
    let rjson = await response.json();
    setProducts(rjson.products);
  };

  useEffect(() => {
    // Fetch products on load
    fetchProducts();
  }, []);

  const onDropdownEdit = (e) => {
    // Placeholder code
  };

  const buttonAction = (action, slug, quantity) => {
    // Placeholder code
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/api/product", productForm);
      if (response.ok) {
        // Product added successfully
        setAlert("Your Product has been added!");
        setProductForm({});
      } else {
        // Handle error case
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Fetch all the products again to sync back
    fetchProducts();
    setProductForm({ slug: "", quantity: "", price: "" });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-8">
        <div className="text-orange-800 text-center mb-4">
          Placeholder Alert Message
        </div>
        <h1 className="text-4xl font-semibold mb-6">Search a Product</h1>
        <div className="flex flex-col mb-4 md:flex-row">
          <input
            onChange={onDropdownEdit}
            type="text"
            placeholder="Enter a product name"
            className="flex-1 border border-gray-300 px-4 py-3 rounded-l-md focus:outline-none focus:border-orange-500"
          />
          <select className="border border-gray-300 px-4 py-3 rounded-r-md mt-2 md:mt-0 md:ml-2 focus:outline-none focus:border-orange-500">
            <option value="">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <img width={74} src="/loading.svg" alt="" />
          </div>
        )}
        <div className="dropcontainer relative w-full md:w-[72vw] bg-orange-100 rounded-md mt-4">
          {dropdown.map((item) => (
            <div
              key={item.slug}
              className="container flex justify-between p-2 my-1 border-b-2"
            >
              <span className="slug">
                {item.slug} ({item.quantity} available for ₹{item.price})
              </span>
              <div className="mx-5">
                <button
                  onClick={() => {
                    buttonAction("minus", item.slug, item.quantity);
                  }}
                  disabled={loadingaction}
                  className="subtract inline-block px-3 py-1 cursor-pointer bg-orange-500 text-white font-semibold rounded-lg shadow-md disabled:bg-orange-200"
                >
                  -
                </button>
                <span className="quantity inline-block min-w-3 mx-3">
                  {item.quantity}
                </span>
                <button
                  onClick={() => {
                    buttonAction("plus", item.slug, item.quantity);
                  }}
                  disabled={loadingaction}
                  className="add inline-block px-3 py-1 cursor-pointer bg-orange-500 text-white font-semibold rounded-lg shadow-md disabled:bg-orange-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto my-10">
        <hr className="border-orange-300 my-8" />
        <h1 className="text-4xl font-semibold mb-6">Add a Product</h1>

        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-2">
              Product Slug
            </label>
            <input
              value={productForm?.slug || ""}
              name="slug"
              onChange={handleChange}
              type="text"
              id="productName"
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">
              Quantity
            </label>
            <input
              value={productForm?.quantity || ""}
              name="quantity"
              onChange={handleChange}
              type="number"
              id="quantity"
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Price
            </label>
            <input
              value={productForm?.price || ""}
              name="price"
              onChange={handleChange}
              type="number"
              id="price"
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            onClick={addProduct}
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="container mx-auto my-10">
        <hr className="border-orange-300 my-8" />
        <h1 className="text-4xl font-semibold mb-6">Display Current Stock</h1>

        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-200">Product Name</th>
                  <th className="px-4 py-2 bg-gray-200">Quantity</th>
                  <th className="px-4 py-2 bg-gray-200">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.slug}>
                    <td className="border px-4 py-2 text-center">
                      {product.slug}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {product.quantity}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      ₹{product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-center text-xl mt-4">No products found</h2>
        )}
      </div>
    </>
  );
}
