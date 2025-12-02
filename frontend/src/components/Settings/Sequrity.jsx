import React, { useState } from "react";
import {
  Lock,
  Smartphone,
  Mail,
  ShieldCheck,
  LogOut,
  KeyRound,
  AlertTriangle,
  Laptop,
} from "lucide-react";

export default function SecuritySettings() {
  const [security, setSecurity] = useState({
    twoFA: "none", // none | email | sms | app
    loginAlerts: true,
  });

  const handleSave = () => {
    console.log("Security saved:", security);
    alert("Security settings saved");
  };

  const handleCancel = () => {
    alert("Changes canceled");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <ShieldCheck size={24} className="text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Security</h1>
          <p className="text-sm text-gray-500">Control your account's security and protection features.</p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Two-Factor Authentication */}
        <section className="p-5 border border-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Lock size={20} className="text-indigo-600" />
            Two-Factor Authentication (2FA)
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Add an extra layer of security to your account.
          </p>

          <div className="space-y-3">
            {/* Email */}
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="2fa"
                value="email"
                checked={security.twoFA === "email"}
                onChange={() => setSecurity({ ...security, twoFA: "email" })}
              />
              <Mail size={18} className="text-gray-700" />
              <span className="text-sm text-gray-700">Email Verification</span>
            </label>

            {/* SMS */}
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="2fa"
                value="sms"
                checked={security.twoFA === "sms"}
                onChange={() => setSecurity({ ...security, twoFA: "sms" })}
              />
              <Smartphone size={18} className="text-gray-700" />
              <span className="text-sm text-gray-700">SMS Code</span>
            </label>

            {/* Authenticator App */}
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="2fa"
                value="app"
                checked={security.twoFA === "app"}
                onChange={() => setSecurity({ ...security, twoFA: "app" })}
              />
              <KeyRound size={18} className="text-gray-700" />
              <span className="text-sm text-gray-700">Authenticator App</span>
            </label>

            {/* None */}
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="2fa"
                value="none"
                checked={security.twoFA === "none"}
                onChange={() => setSecurity({ ...security, twoFA: "none" })}
              />
              <Lock size={18} className="text-gray-700" />
              <span className="text-sm text-gray-700">Disable 2FA</span>
            </label>
          </div>
        </section>

        {/* Login Alerts */}
        <section className="p-5 border border-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ShieldCheck size={20} className="text-indigo-600" />
            Login Alerts
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Get notified when someone logs into your account.
          </p>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={security.loginAlerts}
              onChange={(e) => setSecurity({ ...security, loginAlerts: e.target.checked })}
            />
            <span className="text-sm text-gray-700">Enable login alerts</span>
          </label>
        </section>

        {/* Connected Devices */}
        <section className="p-5 border border-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Laptop size={20} className="text-indigo-600" />
            Connected Devices
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Review devices that have logged into your account.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded-lg border hover:bg-gray-50">
              <div>
                <div className="font-medium text-sm">Chrome — Windows</div>
                <div className="text-xs text-gray-500">Last active: Today</div>
              </div>
              <button className="text-xs text-red-600 hover:underline">Remove</button>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg border hover:bg-gray-50">
              <div>
                <div className="font-medium text-sm">Safari — iPhone</div>
                <div className="text-xs text-gray-500">Last active: 2 days ago</div>
              </div>
              <button className="text-xs text-red-600 hover:underline">Remove</button>
            </div>
          </div>
        </section>

        {/* Logout Sessions */}
        <section className="p-5 border border-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <LogOut size={20} className="text-indigo-600" />
            Active Sessions
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Log out from all devices except this one.
          </p>

          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
            Logout from all other devices
          </button>
        </section>

        {/* Change Password */}
        <section className="p-5 border border-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <KeyRound size={20} className="text-indigo-600" />
            Change Password
          </h2>

          <div className="grid gap-3 mt-3">
            <input
              type="password"
              placeholder="Current password"
              className="px-4 py-2 border rounded-lg text-sm"
            />
            <input
              type="password"
              placeholder="New password"
              className="px-4 py-2 border rounded-lg text-sm"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="px-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
            Update Password
          </button>
        </section>

        {/* Danger Zone */}
        <section className="p-5 border border-red-200 bg-red-50 rounded-lg">
          <h2 className="text-lg font-semibold text-red-700 flex items-center gap-2">
            <AlertTriangle size={20} />
            Danger Zone
          </h2>

          <p className="text-sm text-red-600 mb-3">
            Irreversible actions — proceed with caution.
          </p>

          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-100">
              Freeze Account
            </button>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
              Delete Account Permanently
            </button>
          </div>
        </section>
      </div>

      {/* Save / Cancel */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-lg border border-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: "#6366F1" }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
