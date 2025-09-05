import { useState } from "react";
import { Copy, Download, ExternalLink } from "lucide-react";

interface ResultsCardProps {
    results: any[];
    isVisible: boolean;
}

export function ResultsCard({ results, isVisible }: ResultsCardProps) {
    const [activeTab, setActiveTab] = useState("preview");

    if (!isVisible || results.length === 0) {
        return null;
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(results, null, 2));
        // Add toast notification here
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(results, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "scraping-results.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        // Add toast notification here
    };

    return (
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">
                        Scraping Results
                    </h3>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="px-3 py-1.5 text-sm text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
                        >
                            <Copy className="w-4 h-4" />
                            Copy
                        </button>
                        <button
                            onClick={handleDownload}
                            className="px-3 py-1.5 text-sm text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex rounded-lg bg-slate-800/50 p-1">
                        {["Preview", "Table", "JSON", "Logs"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                    activeTab === tab.toLowerCase()
                                        ? "bg-slate-700 text-white"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        {activeTab === "preview" && (
                            <div className="space-y-4">
                                <p className="text-slate-400">
                                    Found {results.length} results
                                </p>
                                <div className="grid gap-4">
                                    {results.map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-medium text-white">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-slate-400">
                                                        Rating: {item.rating}/5
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-medium text-blue-400">
                                                        {item.price}
                                                    </p>
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex p-1 text-slate-400 hover:text-white transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "table" && (
                            <div className="rounded-lg border border-slate-700 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-slate-800/50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-white">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-white">
                                                Price
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-white">
                                                Rating
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-white">
                                                URL
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {results.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-sm text-white">
                                                    {item.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-blue-400 font-medium">
                                                    {item.price}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-white">
                                                    {item.rating}/5
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                                    >
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === "json" && (
                            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800/50">
                                <pre className="text-sm font-mono text-white overflow-x-auto">
                                    <code>
                                        {JSON.stringify(results, null, 2)}
                                    </code>
                                </pre>
                            </div>
                        )}

                        {activeTab === "logs" && (
                            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800/50">
                                <div className="space-y-1 max-h-64 overflow-y-auto">
                                    {/* Add your logs here */}
                                    <div className="text-sm font-mono text-green-400">
                                        <span className="text-slate-500 mr-2">
                                            [14:23:01]
                                        </span>
                                        Starting scraping process...
                                    </div>
                                    {/* Add more logs as needed */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
