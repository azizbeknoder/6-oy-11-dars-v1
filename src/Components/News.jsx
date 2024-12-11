import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function News() {
  const [newsList, setNewsList] = useState([]);
  const [currentNews, setCurrentNews] = useState("");

  const handleChange = (e) => {
    setCurrentNews(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNews.trim() === "") return; // Bo'sh qiymatni qo'shmaslik uchun
    setNewsList([...newsList, { id: uuidv4(), title: currentNews }]);
    setCurrentNews("");
  };

  const handleEdit = (id) => {
    const newsItem = newsList.find((item) => item.id === id);
    const newTitle = prompt("Enter new title:", newsItem?.title || "");
    if (newTitle?.trim()) {
      setNewsList(
        newsList.map((item) =>
          item.id === id ? { ...item, title: newTitle } : item
        )
      );
    }
  };

  const handleDelete = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        className="bg-white p-6 shadow-md rounded mb-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Add a News Title
          </label>
          <input
            type="text"
            value={currentNews}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter news title"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add News
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.length > 0 ? (
          newsList.map((news) => (
            <div key={news.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-bold mb-3">{news.title}</h2>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => handleEdit(news.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(news.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No news added yet. Start adding!</p>
        )}
      </div>
    </div>
  );
}

export default News;
