"use client";
import React, { useState } from "react";
import Header from "./components/Header";

export default function Home() {
  const [dropdown, setDropdown] = useState([
    { slug: "Product 1", quantity: 10, price: 50 },
    { slug: "Product 2", quantity: 5, price: 100 },
    { slug: "Product 3", quantity: 2, price: 75 },
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingaction, setLoadingAction] = useState(false);
  const [productForm, setProductForm] = useState({
    slug: "",
    quantity: "",
    price: "",
  });
  const [products, setProducts] = useState([
    { slug: "Product 1", quantity: 10, price: 50 },
    { slug: "Product 2", quantity: 5, price: 100 },
    { slug: "Product 3", quantity: 2, price: 75 },
  ]);

  const onDropdownEdit = (e) => {
    // Placeholder code
  };

  const buttonAction = (action, slug, quantity) => {
    // Placeholder code
  };

  const handleChange = (e) => {
    // Placeholder code
  };

  const addProduct = (e) => {
    // Placeholder code
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-8">
        <div className="text-orange-800 text-center mb-4">
          Placeholder Alert Message
        </div>
        <h1 className="text-4xl font-semibold mb-6">Search a Product</h1>
        <div className="flex mb-2">
          <input
            onChange={onDropdownEdit}
            type="text"
            placeholder="Enter a product name"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:border-orange-500"
          />
          <select className="border border-gray-300 px-4 py-2 rounded-r-md focus:outline-none focus:border-orange-500">
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
        <div className="dropcontainer absolute w-[72vw] bg-orange-100 rounded-md">
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

      {/* Display Current Stock  */}
      <div className="container mx-auto my-8">
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
      <div className="container my-8 mx-auto">
        <h1 className="text-4xl font-semibold mb-6">Display Current Stock</h1>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <td className="border px-4 py-2">{product.slug}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
