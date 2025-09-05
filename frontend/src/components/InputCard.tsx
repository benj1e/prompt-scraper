import { useState } from "react";
import { Sparkles, Play } from "lucide-react";

interface InputCardProps {
    onExecute: (prompt: string) => void;
    isExecuting: boolean;
}

const EXAMPLE_PROMPTS = [
    "Scrape product prices from Amazon search results",
    "Extract job listings from LinkedIn",
    "Get restaurant reviews from Yelp",
    "Collect news headlines from tech blogs",
    "Scrape real estate listings with prices",
];

export function InputCard({ onExecute, isExecuting }: InputCardProps) {
    const [prompt, setPrompt] = useState("");

    return (
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-6">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <h2 className="font-medium">
                        Describe what you want to scrape
                    </h2>
                </div>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your scraping prompt here... For example: 'Scrape the top 10 product names and prices from Amazon search results for wireless headphones'"
                    className="w-full h-32 p-4 bg-slate-950/50 border border-slate-800 rounded-xl 
                             text-slate-200 placeholder-slate-500 resize-none focus:outline-none 
                             focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                />

                <button
                    onClick={() => onExecute(prompt)}
                    disabled={isExecuting || !prompt.trim()}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-violet-600 
                             hover:from-blue-700 hover:to-violet-700 text-white font-medium 
                             rounded-2xl flex items-center justify-center gap-2 transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Generate & Execute Script
                    </span>
                </button>

                <div className="space-y-2">
                    <p className="text-sm text-slate-400">
                        Try these examples:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {EXAMPLE_PROMPTS.map((example) => (
                            <button
                                key={example}
                                onClick={() => setPrompt(example)}
                                className="px-3 py-1.5 text-sm text-slate-300 bg-slate-800/50 
                                         hover:bg-slate-800 rounded-full border border-slate-700/50
                                         transition-all hover:scale-105"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
