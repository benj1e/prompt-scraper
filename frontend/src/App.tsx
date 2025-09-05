import { useState } from "react";
import { Hero } from "./components/Hero";
import { InputCard } from "./components/InputCard";
import { ExecutionState } from "./components/ExecutionState";
import Navigation from "./components/Navigation";
import History from "./components/History";
import Settings from "./components/Settings";
import { ResultsCard } from "./components/ResultsCard";

function App() {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionLogs, setExecutionLogs] = useState<string[]>([]);
    const [executionProgress, setExecutionProgress] = useState(0);
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleExecute = async (prompt: string) => {
        setIsExecuting(true);
        setExecutionLogs([]);
        setExecutionProgress(0);
        setShowResults(false);
        setResults([]);

        // Simulate execution process
        const logs = [
            "Initializing scraping environment...",
            "Analyzing prompt and generating script...",
            "Setting up browser automation...",
            "Processing...",
        ];

        for (let i = 0; i < logs.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 800));
            setExecutionLogs((prev) => [...prev, logs[i]]);
            setExecutionProgress(Math.round(((i + 1) / logs.length) * 100));
        }

        // Simulate results
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setResults([
            {
                name: "Sony WH-1000XM4",
                price: "$249.99",
                rating: "4.6",
                url: "https://amazon.com",
            },
            {
                name: "Bose QuietComfort 45",
                price: "$329.99",
                rating: "4.5",
                url: "https://amazon.com",
            },
            {
                name: "Apple AirPods Max",
                price: "$479.99",
                rating: "4.4",
                url: "https://amazon.com",
            },
            {
                name: "Sennheiser HD 450BT",
                price: "$149.99",
                rating: "4.3",
                url: "https://amazon.com",
            },
        ]);

        setIsExecuting(false);
        setShowResults(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f1419] to-[#1a1f2e]">
            <div className="container mx-auto px-4 max-w-6xl">
                <Navigation
                    onHistoryClick={() => setIsHistoryOpen(true)}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                />

                <main className="py-12 space-y-8">
                    <Hero />
                    <InputCard
                        onExecute={handleExecute}
                        isExecuting={isExecuting}
                    />
                    <ExecutionState
                        isExecuting={isExecuting}
                        logs={executionLogs}
                        progress={executionProgress}
                    />
                    <ResultsCard results={results} isVisible={showResults} />
                </main>
            </div>

            <History
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                onSelectHistory={(item) => {
                    console.log("Selected history item:", item);
                    setIsHistoryOpen(false);
                }}
            />
            <Settings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
}

export default App;
