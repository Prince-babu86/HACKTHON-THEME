/*
  NotificationsSettings.jsx
  - Light-mode Notifications Settings panel for your chat app.
  - Single-file React component using Tailwind CSS and lucide-react icons.
  - Features:
      • Global notification toggles (In-app, Push, Email)
      • Do Not Disturb with schedule
      • Sound & vibration toggles + test sound
      • Mentions-only mode
      • Notification tone selector (preview)
      • Mute conversations list (add/remove)
      • Save / Cancel buttons

  Usage:
    - Ensure Tailwind is set up in your project.
    - Ensure lucide-react is installed (`npm i lucide-react`).
    - Import and mount: <NotificationsSettings /> or route to /settings/notifications
*/

import React, { useState } from 'react';
import { Bell, Volume2, Moon, Check, X, Plus, Trash2 } from 'lucide-react';

const ToneOption = ({ value, label, selected, onSelect }) => (
  <button
    onClick={() => onSelect(value)}
    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg border transition text-sm ${selected ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-indigo-600" />
      <div className="text-gray-700">{label}</div>
    </div>
    {selected ? <Check size={16} className="text-indigo-600" /> : null}
  </button>
);

export default function NotificationsSettings() {
  const [settings, setSettings] = useState({
    inApp: true,
    push: true,
    email: false,
    mentionsOnly: false,
    sound: true,
    vibrate: true,
    doNotDisturb: false,
    dndFrom: '22:00',
    dndTo: '07:00',
    tone: 'chime',
    muted: [],
  });

  const [newMute, setNewMute] = useState('');
  const [status, setStatus] = useState('');

  const toneList = [
    { value: 'chime', label: 'Chime' },
    { value: 'ping', label: 'Ping' },
    { value: 'pop', label: 'Pop' },
    { value: 'digital', label: 'Digital' },
  ];

  const handleSave = () => {
    setStatus('Saving...');
    // replace with API call
    setTimeout(() => setStatus('Settings saved'), 600);
  };

  const handleCancel = () => {
    // revert or reload defaults (for now clear status)
    setStatus('Edits canceled');
    setTimeout(() => setStatus(''), 1000);
  };

  const testSound = () => {
    setStatus('Playing sound...');
    // small webaudio beep as preview (simple tone)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = settings.tone === 'chime' ? 880 : settings.tone === 'ping' ? 1200 : settings.tone === 'pop' ? 600 : 1000;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
      setTimeout(() => {
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.2);
        o.stop(ctx.currentTime + 0.25);
        setStatus('');
      }, 300);
    } catch (e) {
      console.warn('Audio not supported', e);
      setStatus('Audio preview not available');
      setTimeout(() => setStatus(''), 1200);
    }
  };

  const addMuted = () => {
    const v = newMute.trim();
    if (!v) return;
    setSettings((s) => ({ ...s, muted: [...s.muted, v] }));
    setNewMute('');
  };

  const removeMuted = (idx) => {
    setSettings((s) => ({ ...s, muted: s.muted.filter((_, i) => i !== idx) }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-8">
      <div className="flex items-center gap-4 mb-6">
        <Bell size={22} className="text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notification Settings</h1>
          <p className="text-sm text-gray-500">Control how and when you receive notifications from the chat app.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Global toggles */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">In-app notifications</div>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={settings.inApp} onChange={() => setSettings((s)=>({...s,inApp:!s.inApp}))} className="hidden" />
                <div className={`w-11 h-6 rounded-full p-1 ${settings.inApp ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                  <div className={`${settings.inApp ? 'translate-x-5' : ''} bg-white w-4 h-4 rounded-full shadow-md transform transition`}></div>
                </div>
              </label>
            </div>
            <div className="text-xs text-gray-500">Show notifications while using the app.</div>
          </div>

          <div className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">Push notifications</div>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={settings.push} onChange={() => setSettings((s)=>({...s,push:!s.push}))} className="hidden" />
                <div className={`w-11 h-6 rounded-full p-1 ${settings.push ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                  <div className={`${settings.push ? 'translate-x-5' : ''} bg-white w-4 h-4 rounded-full shadow-md transform transition`}></div>
                </div>
              </label>
            </div>
            <div className="text-xs text-gray-500">Receive notifications on your device.</div>
          </div>

          <div className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">Email notifications</div>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={settings.email} onChange={() => setSettings((s)=>({...s,email:!s.email}))} className="hidden" />
                <div className={`w-11 h-6 rounded-full p-1 ${settings.email ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                  <div className={`${settings.email ? 'translate-x-5' : ''} bg-white w-4 h-4 rounded-full shadow-md transform transition`}></div>
                </div>
              </label>
            </div>
            <div className="text-xs text-gray-500">Send me emails for activity and mentions.</div>
          </div>
        </section>

        {/* Mentions, sound, vibrate */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">Mentions only</div>
              <input type="checkbox" checked={settings.mentionsOnly} onChange={()=>setSettings(s=>({...s,mentionsOnly:!s.mentionsOnly}))} className="hidden" />
              <div className={`w-11 h-6 rounded-full p-1 ${settings.mentionsOnly ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                <div className={`${settings.mentionsOnly ? 'translate-x-5' : ''} bg-white w-4 h-4 rounded-full shadow-md transform transition`}></div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Only notify me when I’m mentioned directly.</div>
          </div>

          <div className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">Sound & Vibrate</div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={settings.sound} onChange={()=>setSettings(s=>({...s,sound:!s.sound}))} className="mr-2" /> Sound
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={settings.vibrate} onChange={()=>setSettings(s=>({...s,vibrate:!s.vibrate}))} className="mr-2" /> Vibrate
                </label>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <select value={settings.tone} onChange={(e)=>setSettings(s=>({...s,tone:e.target.value}))} className="px-3 py-2 rounded border border-gray-200">
                {toneList.map(t=> <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button onClick={testSound} className="px-3 py-2 bg-indigo-600 text-white rounded">Test</button>
            </div>
            <div className="text-xs text-gray-500 mt-2">Preview the selected notification tone.</div>
          </div>
        </section>

        {/* Do Not Disturb */}
        <section className="p-4 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-700">Do Not Disturb</div>
            <input type="checkbox" checked={settings.doNotDisturb} onChange={()=>setSettings(s=>({...s,doNotDisturb:!s.doNotDisturb}))} className="hidden" />
            <div className={`w-11 h-6 rounded-full p-1 ${settings.doNotDisturb ? 'bg-indigo-600' : 'bg-gray-200'}`}>
              <div className={`${settings.doNotDisturb ? 'translate-x-5' : ''} bg-white w-4 h-4 rounded-full shadow-md transform transition`}></div>
            </div>
          </div>

          {settings.doNotDisturb && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 items-center">
              <div>
                <label className="text-sm text-gray-500 block mb-1">From</label>
                <input type="time" value={settings.dndFrom} onChange={(e)=>setSettings(s=>({...s,dndFrom:e.target.value}))} className="px-3 py-2 rounded border border-gray-200" />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-1">To</label>
                <input type="time" value={settings.dndTo} onChange={(e)=>setSettings(s=>({...s,dndTo:e.target.value}))} className="px-3 py-2 rounded border border-gray-200" />
              </div>

              <div className="text-sm text-gray-500">Scheduled DND will silence push notifications during the chosen hours.</div>
            </div>
          )}
        </section>

        {/* Muted conversations */}
        <section className="p-4 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-700">Muted conversations</div>
            <div className="text-xs text-gray-500">Silence specific chats</div>
          </div>

          <div className="space-y-2">
            {settings.muted.length === 0 ? <div className="text-sm text-gray-500">No muted conversations</div> : (
              settings.muted.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <div className="text-sm text-gray-700">{m}</div>
                  <button onClick={()=>removeMuted(idx)} className="text-rose-500"><Trash2 size={14} /></button>
                </div>
              ))
            )}

            <div className="flex gap-2 mt-2">
              <input placeholder="username or chat id" value={newMute} onChange={(e)=>setNewMute(e.target.value)} className="flex-1 px-3 py-2 rounded border border-gray-200" />
              <button onClick={addMuted} className="px-3 py-2 bg-indigo-600 text-white rounded"><Plus size={14} /></button>
            </div>
          </div>
        </section>

      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between mt-6 border-t pt-4">
        <div className="text-sm text-gray-500">{status}</div>
        <div className="flex gap-3">
          <button onClick={handleCancel} className="px-4 py-2 rounded border border-gray-200">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save changes</button>
        </div>
      </div>

    </div>
  );
}
