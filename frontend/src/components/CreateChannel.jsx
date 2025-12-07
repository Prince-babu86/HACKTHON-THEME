// CreateChannel.jsx
import React, { useState } from "react";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import instance from "../config/axios.config";

export default function CreateChannel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    logo: null,
    preview: "",
  });

  const [file, setfile] = useState(null);
  const [loader, setloader] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setfile(file);
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      logo: file,
      preview: URL.createObjectURL(file),
    }));
  };
  // make sure this is imported

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    try {
      const formData = new FormData();

      setloader(true);
      // ✅ text fields
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());

      // ✅ file (only if selected)
      if (file) {
        formData.append("logoUrl", file);
      }

      // ✅ API call
      const res = await instance.post("/channel/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Channel created:", res.data);

      // ✅ reset form
      setForm({
        name: "",
        description: "",
        logo: null,
        preview: "",
      });
      setfile(null);

      // ✅ redirect
      navigate("/channels");
    } catch (error) {
      console.error(
        "Create channel failed:",
        error?.response?.data || error.message
      );
    } finally {
      setloader(false);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>

        <h1 className="text-lg font-semibold text-gray-900">Create Channel</h1>
      </div>

      {/* Content */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto px-4 py-6 max-w-xl w-full mx-auto space-y-6"
      >
        {/* Channel logo */}
        <div className="flex flex-col items-center gap-3">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <div className="w-28 h-28 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden">
              {form.preview ? (
                <img
                  src={form.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImagePlus className="w-10 h-10 text-gray-400" />
              )}
            </div>
          </label>

          <p className="text-xs text-gray-500">Add channel icon</p>
        </div>

        {/* Channel name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Tech News"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 outline-none"
          />
        </div>

        {/* Channel description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="What is this channel about?"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          {!loader ? (
            <button
              type="submit"
              disabled={!form.name.trim()}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Create Channel
            </button>
          ) : (
            <button className="w-full bg-indigo-600 flex items-center justify-center text-white py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed">
              <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin duration-1000"></div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
