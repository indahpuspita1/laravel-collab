import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = '/api/products';

export default function ProductApp() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    axios.get(api).then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${api}/${editingId}`, form).then(() => {
        fetchProducts();
        setEditingId(null);
        setForm({ name: '', description: '', price: '', stock: '' });
      });
    } else {
      axios.post(api, form).then(() => {
        fetchProducts();
        setForm({ name: '', description: '', price: '', stock: '' });
      });
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`${api}/${id}`).then(() => fetchProducts());
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Product Management</h1>

      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-lg mx-auto">
        <table className="w-full border-collapse text-left">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-2 pr-4 align-top text-gray-700 font-medium whitespace-nowrap">
                <label htmlFor="name">Name:</label>
              </td>
              <td className="py-2">
                <input
                  id="name"
                  name="name"
                  placeholder="Product name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </td>
            </tr>

            <tr className="border-b border-gray-300">
              <td className="py-2 pr-4 align-top text-gray-700 font-medium whitespace-nowrap">
                <label htmlFor="description">Description:</label>
              </td>
              <td className="py-2">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Product description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </td>
            </tr>

            <tr className="border-b border-gray-300">
              <td className="py-2 pr-4 align-top text-left text-gray-700 font-medium">
                <label htmlFor="price">Price ($):</label>
              </td>
              <td className="py-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </td>
            </tr>

            <tr>
              <td className="py-2 pr-4 align-top text-gray-700 font-medium whitespace-nowrap">
                <label htmlFor="stock">Stock:</label>
              </td>
              <td className="py-2">
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {editingId ? 'Update' : 'Add'} Product
        </button>
      </form>

    <br></br>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-sm">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase font-semibold text-xs">
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Stock</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-2 border-b text-gray-700">{p.description}</td>
                  <td className="px-4 py-2 border-b text-indigo-600 font-semibold">${p.price}</td>
                  <td className="px-4 py-2 border-b text-gray-700">{p.stock}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleEdit(p)}
                      className="inline-block px-3 py-1 mr-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}