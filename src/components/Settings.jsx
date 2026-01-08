import { Settings as SettingsIcon, Bell, Palette, Lock } from 'lucide-react'

export default function Settings() {
  return (
    <div className="flex-1 overflow-auto bg-bg-primary p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary bg-opacity-10 rounded-lg">
              <SettingsIcon size={24} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          </div>
          <p className="text-text-tertiary text-sm">Manage your preferences and account settings</p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary bg-opacity-10 rounded-lg">
                <Palette size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <label className="text-text-primary font-medium">Dark Mode</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <label className="text-text-primary font-medium">Compact View</label>
                <input type="checkbox" className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-info bg-opacity-10 rounded-lg">
                <Bell size={20} className="text-info" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <label className="text-text-primary font-medium">Price Alerts</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <label className="text-text-primary font-medium">Market News</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <label className="text-text-primary font-medium">Portfolio Updates</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-success bg-opacity-10 rounded-lg">
                <Lock size={20} className="text-success" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Security</h2>
            </div>
            <button className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg transition">
              Change Password
            </button>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button className="flex-1 bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg transition">
              Save Changes
            </button>
            <button className="flex-1 bg-surface hover:bg-surface-hover text-text-primary font-medium py-3 rounded-lg border border-border-color transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
