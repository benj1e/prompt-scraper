import { useState } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from "@headlessui/react";
import { Eye, EyeOff, Key, Server, Save, Trash2, X } from "lucide-react";
import clsx from "clsx"; // Make sure to install clsx: npm install clsx

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
    const [showApiKey, setShowApiKey] = useState(false);
    const [apiKey, setApiKey] = useState(
        "sk-proj-••••••••••••••••••••••••••••••••••••••••••••••••"
    );
    const [runInContainer, setRunInContainer] = useState(true);
    const [saveResults, setSaveResults] = useState(true);
    const [notifications, setNotifications] = useState(false);

    const handleSave = () => {
        // Add save logic here
        console.log("Saving settings...");
        onClose();
    };

    const handleClearApiKey = () => {
        setApiKey("");
    };

    const Switch = ({
        checked,
        onChange,
    }: {
        checked: boolean;
        onChange: (checked: boolean) => void;
    }) => (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                checked ? "bg-blue-600" : "bg-slate-700"
            )}
        >
            <span
                className={clsx(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    checked ? "translate-x-6" : "translate-x-1"
                )}
            />
        </button>
    );

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
            transition
        >
            {/* Backdrop */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/30 backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
            />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className={clsx(
                            "relative transform rounded-xl bg-slate-900 text-left shadow-xl",
                            "transition-all sm:my-8 sm:w-full sm:max-w-lg",
                            "duration-300 ease-out",
                            "data-[closed]:scale-95 data-[closed]:opacity-0 data-[closed]:rotate-[-3deg]",
                            "data-[enter]:scale-100 data-[enter]:opacity-100 data-[enter]:rotate-0"
                        )}
                    >
                        <div className="px-6 py-4 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-lg font-semibold text-white">
                                    Settings
                                </DialogTitle>
                                <button
                                    type="button"
                                    className="text-slate-400 hover:text-slate-300 transition-colors"
                                    onClick={onClose}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-6 space-y-6">
                            {/* API Key Section */}
                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Key className="w-4 h-4 text-blue-400" />
                                        <span className="text-white font-medium">
                                            API Key
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative">
                                            <input
                                                type={
                                                    showApiKey
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={apiKey}
                                                onChange={(e) =>
                                                    setApiKey(e.target.value)
                                                }
                                                placeholder="Enter your API key"
                                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 
                                                         rounded-lg text-white placeholder-slate-500 pr-10
                                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                         transition-all"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 
                                                         hover:text-slate-300 transition-colors"
                                                onClick={() =>
                                                    setShowApiKey(!showApiKey)
                                                }
                                            >
                                                {showApiKey ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSave}
                                                className="px-3 py-1.5 text-sm font-medium text-white 
                                                         bg-gradient-to-r from-blue-600 to-violet-600 
                                                         rounded-lg hover:from-blue-700 hover:to-violet-700 
                                                         flex items-center gap-2 transition-all"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save
                                            </button>
                                            <button
                                                onClick={handleClearApiKey}
                                                className="px-3 py-1.5 text-sm font-medium text-red-400 
                                                         bg-red-500/10 rounded-lg hover:bg-red-500/20 
                                                         flex items-center gap-2 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Execution Settings */}
                            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Server className="w-4 h-4 text-blue-400" />
                                        <span className="text-white font-medium">
                                            Execution Settings
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-white">
                                                    Run in Container
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    Execute scripts in isolated
                                                    environment
                                                </p>
                                            </div>
                                            <Switch
                                                checked={runInContainer}
                                                onChange={setRunInContainer}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-white">
                                                    Save Results
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    Automatically save scraping
                                                    results
                                                </p>
                                            </div>
                                            <Switch
                                                checked={saveResults}
                                                onChange={setSaveResults}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-white">
                                                    Notifications
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    Get notified when scraping
                                                    completes
                                                </p>
                                            </div>
                                            <Switch
                                                checked={notifications}
                                                onChange={setNotifications}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-slate-300 
                                         bg-slate-800 rounded-lg border border-slate-700 
                                         hover:bg-slate-700 transition-colors"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-white 
                                         bg-gradient-to-r from-blue-600 to-violet-600 
                                         rounded-lg hover:from-blue-700 hover:to-violet-700
                                         transition-all"
                                onClick={handleSave}
                            >
                                Save Settings
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
