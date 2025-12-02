import React, { useState } from "react";
import { Eye, Shield, UserX, Trash2, FileDown, Plus } from "lucide-react";

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    lastSeen: "everyone",
    profilePhoto: "everyone",
    readReceipts: true,
    whoCanAdd: "everyone",
    blockedUsers: [],
    adTracking: false,
  });

  const [newBlock, setNewBlock] = useState("");

  const saveSettings = () => {
    alert("Privacy settings saved!");
    console.log("Saved data:", settings);
  };

  const cancelChanges = () => {
    alert("Changes canceled!");
  };

  const addBlockedUser = () => {
    if (!newBlock.trim()) return;
    setSettings((s) => ({
      ...s,
      blockedUsers: [...s.blockedUsers, newBlock.trim()],
    }));
    setNewBlock("");
  };

  const removeBlockedUser = (index) => {
    setSettings((s) => ({
      ...s,
      blockedUsers: s.blockedUsers.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-8">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Eye size={22} className="text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Privacy Settings</h1>
          <p className="text-sm text-gray-500">
            Control who can see your information and interact with you.
          </p>
        </div>
      </div>

      <div className="space-y-8">

        {/* Last Seen */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Last Seen</h2>
          <select
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={settings.lastSeen}
            onChange={(e) => setSettings({ ...settings, lastSeen: e.target.value })}
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">My Contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </section>

        {/* Profile Photo Visibility */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Profile Photo</h2>
          <select
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={settings.profilePhoto}
            onChange={(e) => setSettings({ ...settings, profilePhoto: e.target.value })}
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">My Contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </section>

        {/* Read Receipts */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Read Receipts</h2>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.readReceipts}
                onChange={() =>
                  setSettings((s) => ({ ...s, readReceipts: !s.readReceipts }))
                }
                className="hidden"
              />
              <div
                className={`w-11 h-6 rounded-full p-1 transition ${
                  settings.readReceipts ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                    settings.readReceipts ? "translate-x-5" : ""
                  }`}
                />
              </div>
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Turning off read receipts disables yours too.
          </p>
        </section>

        {/* Who can add me */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Who Can Add Me
          </h2>
          <select
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={settings.whoCanAdd}
            onChange={(e) => setSettings({ ...settings, whoCanAdd: e.target.value })}
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">My Contacts Only</option>
            <option value="nobody">Nobody</option>
          </select>
        </section>

        {/* Blocked Users */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <UserX size={20} className="text-red-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              Blocked Users
            </h2>
          </div>

          {settings.blockedUsers.length === 0 ? (
            <p className="text-sm text-gray-500">No blocked users</p>
          ) : (
            <div className="space-y-2 mb-3">
              {settings.blockedUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border"
                >
                  <span className="text-sm text-gray-700">{user}</span>
                  <button
                    onClick={() => removeBlockedUser(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="username or id"
              value={newBlock}
              onChange={(e) => setNewBlock(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg border-gray-300"
            />
            <button
              onClick={addBlockedUser}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus size={16} />
            </button>
          </div>
        </section>

        {/* Ad Tracking */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Ad Personalization</h2>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.adTracking}
                onChange={() =>
                  setSettings((s) => ({ ...s, adTracking: !s.adTracking }))
                }
                className="hidden"
              />
              <div
                className={`w-11 h-6 rounded-full p-1 transition ${
                  settings.adTracking ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                    settings.adTracking ? "translate-x-5" : ""
                  }`}
                />
              </div>
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Control whether ads are personalized based on your activity.
          </p>
        </section>

        {/* Download Data */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Data</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <FileDown size={18} />
            Export My Data
          </button>
        </section>

        {/* Clear chat history */}
        <section>
          <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg text-red-700 hover:bg-red-200">
            <Trash2 size={18} />
            Clear Chat History
          </button>
        </section>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-10 pt-4 border-t">
        <button
          onClick={cancelChanges}
          className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={saveSettings}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
