import React, { useState } from "react";
import { Sun, Moon, Monitor, Droplet, Type, Layers, ImageIcon } from "lucide-react";

export default function AppearanceSettings() {
  const [appearance, setAppearance] = useState({
    theme: "light", // light | dark | system
    accent: "#6366F1",
    fontSize: "medium", // small | medium | large
    density: "comfortable", // comfortable | compact
    bubble: "rounded", // rounded | square | outline
    backgroundType: "solid", // solid | image
    backgroundColor: "#F8FAFC",
    backgroundImage: "", // data URL or url
  });

  const accentPresets = [
    "#6366F1", // indigo
    "#06B6D4", // cyan
    "#10B981", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#8B5CF6", // violet
  ];

  const fontSizeMap = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const previewBubbleStyles = {
    rounded: "rounded-2xl",
    square: "rounded-none",
    outline: "rounded-lg border border-gray-200",
  };

  const handleAccentSelect = (color) => setAppearance((s) => ({ ...s, accent: color }));

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAppearance((s) => ({ ...s, backgroundImage: reader.result, backgroundType: "image" }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // TODO: persist settings to API
    console.log("Saved appearance:", appearance);
    alert("Appearance settings saved");
  };

  const handleCancel = () => {
    // TODO: reload from API or reset local changes
    alert("Changes canceled");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-8">
      <div className="flex items-center gap-4 mb-6">
        <Monitor size={22} className="text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appearance</h1>
          <p className="text-sm text-gray-500">Customize theme, fonts, chat density and background.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Controls */}
        <div className="space-y-6">
          {/* Theme */}
          <section className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Sun className="text-yellow-500" />
                <div>
                  <div className="text-sm font-medium text-gray-700">Theme</div>
                  <div className="text-xs text-gray-500">Choose Light, Dark or System</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setAppearance((s) => ({ ...s, theme: "light" }))}
                className={`px-3 py-2 rounded-lg text-sm ${appearance.theme === "light" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                Light
              </button>
              <button
                onClick={() => setAppearance((s) => ({ ...s, theme: "dark" }))}
                className={`px-3 py-2 rounded-lg text-sm ${appearance.theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                Dark
              </button>
              <button
                onClick={() => setAppearance((s) => ({ ...s, theme: "system" }))}
                className={`px-3 py-2 rounded-lg text-sm ${appearance.theme === "system" ? "bg-gray-200 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                System
              </button>
            </div>
          </section>

          {/* Accent color */}
          <section className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Droplet className="text-indigo-600" />
              <div>
                <div className="text-sm font-medium text-gray-700">Accent color</div>
                <div className="text-xs text-gray-500">Choose a brand/accent color for buttons and links</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              {accentPresets.map((c) => (
                <button
                  key={c}
                  onClick={() => handleAccentSelect(c)}
                  className={`w-8 h-8 rounded-full ring-2 ${appearance.accent === c ? "ring-2 ring-offset-1" : "ring-0"}`}
                  style={{ background: c }}
                  aria-label={`Accent ${c}`}
                />
              ))}
              <input
                type="color"
                value={appearance.accent}
                onChange={(e) => setAppearance((s) => ({ ...s, accent: e.target.value }))}
                className="w-10 h-8 p-0 border-none"
                title="Custom accent"
              />
            </div>

            <div className="text-xs text-gray-500">Accent preview:</div>
            <div className="mt-2">
              <button style={{ backgroundColor: appearance.accent }} className="px-3 py-1 rounded text-white text-sm">
                Accent button
              </button>
            </div>
          </section>

          {/* Font size */}
          <section className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Type className="text-gray-700" />
              <div>
                <div className="text-sm font-medium text-gray-700">Font size</div>
                <div className="text-xs text-gray-500">Adjust base font size</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setAppearance((s) => ({ ...s, fontSize: "small" }))}
                className={`px-3 py-2 rounded-lg ${appearance.fontSize === "small" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Small</button>
              <button onClick={() => setAppearance((s) => ({ ...s, fontSize: "medium" }))}
                className={`px-3 py-2 rounded-lg ${appearance.fontSize === "medium" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Medium</button>
              <button onClick={() => setAppearance((s) => ({ ...s, fontSize: "large" }))}
                className={`px-3 py-2 rounded-lg ${appearance.fontSize === "large" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Large</button>
            </div>
          </section>

          {/* Density & Bubble style */}
          <section className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="text-gray-700" />
              <div>
                <div className="text-sm font-medium text-gray-700">Message density & bubbles</div>
                <div className="text-xs text-gray-500">Compact or comfortable layout and bubble shape</div>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <button onClick={() => setAppearance((s) => ({ ...s, density: "comfortable" }))}
                className={`px-3 py-2 rounded-lg ${appearance.density === "comfortable" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Comfortable</button>
              <button onClick={() => setAppearance((s) => ({ ...s, density: "compact" }))}
                className={`px-3 py-2 rounded-lg ${appearance.density === "compact" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Compact</button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setAppearance((s) => ({ ...s, bubble: "rounded" }))}
                className={`px-3 py-2 rounded-lg ${appearance.bubble === "rounded" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Rounded</button>
              <button onClick={() => setAppearance((s) => ({ ...s, bubble: "square" }))}
                className={`px-3 py-2 rounded-lg ${appearance.bubble === "square" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Square</button>
              <button onClick={() => setAppearance((s) => ({ ...s, bubble: "outline" }))}
                className={`px-3 py-2 rounded-lg ${appearance.bubble === "outline" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Outline</button>
            </div>
          </section>

          {/* Background / Wallpaper */}
          <section className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <ImageIcon className="text-gray-700" />
              <div>
                <div className="text-sm font-medium text-gray-700">Background</div>
                <div className="text-xs text-gray-500">Solid color or custom wallpaper</div>
              </div>
            </div>

            <div className="flex gap-2 items-center mb-3">
              <button onClick={() => setAppearance((s) => ({ ...s, backgroundType: "solid", backgroundImage: "" }))}
                className={`px-3 py-2 rounded-lg ${appearance.backgroundType === "solid" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Solid</button>
              <button onClick={() => setAppearance((s) => ({ ...s, backgroundType: "image" }))}
                className={`px-3 py-2 rounded-lg ${appearance.backgroundType === "image" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700 hover:bg-gray-50"}`}>Image</button>
            </div>

            {appearance.backgroundType === "solid" ? (
              <input type="color" value={appearance.backgroundColor} onChange={(e) => setAppearance((s) => ({ ...s, backgroundColor: e.target.value }))} className="w-16 h-10 p-0 border-none" />
            ) : (
              <div className="flex items-center gap-3">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {appearance.backgroundImage && <button onClick={() => setAppearance((s) => ({ ...s, backgroundImage: "", backgroundType: "solid" }))} className="text-sm text-rose-600">Remove</button>}
              </div>
            )}
          </section>
        </div>

        {/* Right: Live preview */}
        <div>
          <div className="p-4 rounded-lg border border-gray-100 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Preview</div>
                <div className="text-xs text-gray-400">How chat will look with current settings</div>
              </div>
              <div className="text-sm text-gray-500">{appearance.theme === "system" ? "System" : appearance.theme}</div>
            </div>

            <div
              className="mt-4 p-4 rounded-lg h-96 overflow-auto"
              style={{
                background: appearance.backgroundType === "image" && appearance.backgroundImage ? `url(${appearance.backgroundImage}) center/cover` : appearance.backgroundColor,
                color: appearance.theme === "dark" ? "#F8FAFC" : "#0f172a",
              }}
            >
              <div className={`max-w-md mx-auto space-y-3 ${fontSizeMap[appearance.fontSize] || ""}`}>
                {/* Incoming message */}
                <div className={`p-3 inline-block ${previewBubbleStyles[appearance.bubble]} ${appearance.bubble === "outline" ? "bg-transparent" : "bg-white"} shadow-sm`} style={{ borderColor: appearance.bubble === "outline" ? "#e5e7eb" : undefined }}>
                  <div className="text-sm">Hey — are we meeting later?</div>
                  <div className="text-xs text-gray-400 mt-1">10:23 AM</div>
                </div>

                {/* Outgoing message */}
                <div className="flex justify-end">
                  <div className={`p-3 inline-block ${previewBubbleStyles[appearance.bubble]} text-white`} style={{ backgroundColor: appearance.accent }}>
                    <div className="text-sm">Yes — 6 PM works!</div>
                    <div className="text-xs text-white/80 mt-1">10:24 AM</div>
                  </div>
                </div>

                {/* Compact density example */}
                {appearance.density === "compact" && (
                  <div className="mt-2 text-xs text-gray-500">Compact mode reduces spacing between messages.</div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button onClick={handleCancel} className="px-4 py-2 rounded-lg border border-gray-300">Cancel</button>
            <button onClick={handleSave} style={{ backgroundColor: appearance.accent }} className="px-4 py-2 rounded-lg text-white">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
