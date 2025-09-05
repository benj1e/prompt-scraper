import { Settings, History, Zap } from "lucide-react";
import { Button } from "@headlessui/react";

interface NavigationProps {
    onSettingsClick: () => void;
    onHistoryClick: () => void;
}

export default function Navigation({
    onSettingsClick,
    onHistoryClick,
}: NavigationProps) {
    return (
        <nav className="flex items-center justify-between p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-primary to-[#7c35ff]">
                    <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-base sm:text-lg font-medium text-white">
                        Prompt Scraper AI
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
                <Button
                    className="text-white p-2 rounded-xl transition-all bg-transparent text-sm hover:bg-gray-500/70"
                    onClick={onHistoryClick}
                >
                    <History className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                    className="text-white p-2 rounded-xl transition-all bg-transparent text-sm hover:bg-gray-500/70"
                    onClick={onSettingsClick}
                >
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
            </div>
        </nav>
    );
}
