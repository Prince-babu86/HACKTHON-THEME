import React, { useState } from "react";
import { Lock, Mail, Phone, Shield, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function AccountSettings() {
  const [account, setAccount] = useState({
    email: "johndoe@gmail.com",
    phone: "+91 98765 43210",
    accountType: "standard",
    twoFactor: false,
    connectedGoogle: true,
    connectedApple: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const saveAccount = () => {
    console.log("Saving account:", account, passwords);
    alert("Account settings updated!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>

      {/* Email */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 block mb-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            value={account.email}
            onChange={handleInput}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            name="phone"
            value={account.phone}
            onChange={handleInput}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Account Type */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 block mb-1">Account Type</label>
        <select
          name="accountType"
          value={account.accountType}
          onChange={handleInput}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="standard">Standard</option>
          <option value="pro">Pro</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 block mb-2">Two-Factor Authentication</label>
        <div
          onClick={() =>
            setAccount((prev) => ({ ...prev, twoFactor: !prev.twoFactor }))
          }
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          {account.twoFactor ? (
            <CheckCircle size={22} className="text-green-600" />
          ) : (
            <XCircle size={22} className="text-gray-400" />
          )}

          <span className="text-gray-700 text-sm">
            {account.twoFactor ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      {/* Password Change */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Change Password</h2>

        <div className="space-y-3">
          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={passwords.current}
            onChange={handlePassword}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            name="newPass"
            placeholder="New Password"
            value={passwords.newPass}
            onChange={handlePassword}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={handlePassword}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Connected Login Methods</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span>Google Account</span>
            {account.connectedGoogle ? (
              <button className="text-red-500">Disconnect</button>
            ) : (
              <button className="text-indigo-600">Connect</button>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span>Apple ID</span>
            {account.connectedApple ? (
              <button className="text-red-500">Disconnect</button>
            ) : (
              <button className="text-indigo-600">Connect</button>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold text-red-600 mb-3">Danger Zone</h2>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition">
          <Trash2 size={18} />
          Delete My Account
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-10 gap-3">
        <button className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button
          onClick={saveAccount}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
