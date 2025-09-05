import { Loader2, Terminal } from "lucide-react";

interface ExecutionStateProps {
    isExecuting: boolean;
    logs: string[];
    progress: number;
}

export function ExecutionState({
    isExecuting,
    logs,
    progress,
}: ExecutionStateProps) {
    if (!isExecuting && logs.length === 0) {
        return null;
    }

    return (
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-6">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        {isExecuting && (
                            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                        )}
                        <Terminal className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-medium text-white">
                            {isExecuting
                                ? "Executing Script..."
                                : "Execution Complete"}
                        </h3>
                    </div>
                </div>

                {isExecuting && (
                    <div className="space-y-2">
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-sm text-slate-400">
                            {progress}% complete
                        </p>
                    </div>
                )}

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/50">
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {logs.map((log, index) => {
                            const getLogColor = (log: string) => {
                                if (log.includes("Initializing"))
                                    return "text-green-400";
                                if (log.includes("Analyzing"))
                                    return "text-blue-400";
                                if (log.includes("Setting up"))
                                    return "text-yellow-400";
                                if (log.includes("Processing"))
                                    return "text-violet-400";
                                return "text-slate-400";
                            };

                            return (
                                <div
                                    key={index}
                                    className={`text-sm font-mono ${getLogColor(
                                        log
                                    )}`}
                                >
                                    <span className="text-slate-500 mr-2">
                                        [{new Date().toLocaleTimeString()}]
                                    </span>
                                    {log}
                                </div>
                            );
                        })}
                        {isExecuting && (
                            <div className="text-sm font-mono text-blue-400 animate-pulse">
                                <span className="text-slate-500 mr-2">
                                    [{new Date().toLocaleTimeString()}]
                                </span>
                                Processing...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
