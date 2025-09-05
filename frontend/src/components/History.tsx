import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircle, XCircle, AlertCircle, Clock, X } from "lucide-react";

interface HistoryItem {
    id: string;
    timestamp: Date;
    prompt: string;
    status: "success" | "failed" | "running";
    preview: string;
    resultCount?: number;
}

interface HistoryProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectHistory: (item: HistoryItem) => void;
}

const SAMPLE_HISTORY: HistoryItem[] = [
    {
        id: "1",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        prompt: "Scrape product prices from Amazon search results",
        status: "success",
        preview: "Found 4 wireless headphones with prices",
        resultCount: 4,
    },
    {
        id: "2",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        prompt: "Extract job listings from LinkedIn",
        status: "failed",
        preview: "Rate limit exceeded",
    },
    // ...existing sample data
];

export default function History({
    isOpen,
    onClose,
    onSelectHistory,
}: HistoryProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "success":
                return <CheckCircle className="w-4 h-4 text-green-400" />;
            case "failed":
                return <XCircle className="w-4 h-4 text-red-400" />;
            case "running":
                return <AlertCircle className="w-4 h-4 text-yellow-400" />;
            default:
                return <Clock className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            success: "bg-green-400/10 text-green-400",
            failed: "bg-red-400/10 text-red-400",
            running: "bg-yellow-400/10 text-yellow-400",
        };

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                    variants[status as keyof typeof variants] ||
                    "bg-gray-400/10 text-gray-400"
                }`}
            >
                {status}
            </span>
        );
    };

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) {
            const minutes = Math.floor(diff / (1000 * 60));
            return `${minutes}m ago`;
        } else if (hours < 24) {
            return `${hours}h ago`;
        } else {
            const days = Math.floor(hours / 24);
            return `${days}d ago`;
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-slate-900 shadow-xl">
                                        <div className="px-4 sm:px-6 py-6 border-b border-slate-700">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-lg font-semibold text-white">
                                                    Scraping History
                                                </Dialog.Title>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-gray-300"
                                                    onClick={onClose}
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="relative flex-1 px-4 sm:px-6">
                                            <div className="space-y-4 py-6">
                                                {SAMPLE_HISTORY.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        onClick={() =>
                                                            onSelectHistory(
                                                                item
                                                            )
                                                        }
                                                        className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 
                                     hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer"
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                {getStatusIcon(
                                                                    item.status
                                                                )}
                                                                <span className="text-xs text-slate-400">
                                                                    {formatTimestamp(
                                                                        item.timestamp
                                                                    )}
                                                                </span>
                                                            </div>
                                                            {getStatusBadge(
                                                                item.status
                                                            )}
                                                        </div>

                                                        <p className="text-sm text-slate-200 mb-2 line-clamp-2">
                                                            {item.prompt}
                                                        </p>

                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs text-slate-400">
                                                                {item.preview}
                                                            </p>
                                                            {item.resultCount && (
                                                                <span className="text-xs text-blue-400 font-medium">
                                                                    {
                                                                        item.resultCount
                                                                    }{" "}
                                                                    results
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="sticky bottom-0 bg-gradient-to-t from-slate-900 to-slate-900/0 pt-20 pb-6">
                                                <button
                                                    type="button"
                                                    className="w-full px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 
                                   hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                                                    onClick={() => {
                                                        /* Add clear history handler */
                                                    }}
                                                >
                                                    Clear History
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
