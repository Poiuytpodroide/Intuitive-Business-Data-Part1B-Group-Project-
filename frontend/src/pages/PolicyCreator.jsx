import { useState } from "react";

function PolicyCreator() {
    const [blocksPanelExpanded, setBlocksPanelExpanded] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header with Save Button */}
            <header className="flex justify-end items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
                <button className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded hover:bg-emerald-700 transition-colors">
                    Save
                </button>
            </header>

            {/* Main Content Area */}
            <div className="flex gap-4 p-4 overflow-hidden flex-1">
                {/* Left Sidebar - Policies/Templates */}
                <aside className="w-72 bg-white border border-gray-200 rounded shadow-sm flex flex-col overflow-y-auto">
                    <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="m-0 text-sm font-bold text-gray-900">
                            Templates
                        </h3>
                    </div>
                    <div className="px-3 py-3 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="🔍 Search"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>
                    <div className="flex-1 p-2 flex flex-col gap-1.5 overflow-y-auto">
                        <div className="px-3 py-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-900 cursor-pointer hover:bg-emerald-50 hover:border-emerald-400 transition-all">
                            Template 1
                        </div>
                        <div className="px-3 py-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-900 cursor-pointer hover:bg-emerald-50 hover:border-emerald-400 transition-all">
                            Template 2
                        </div>
                        <div className="px-3 py-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-900 cursor-pointer hover:bg-emerald-50 hover:border-emerald-400 transition-all">
                            Template 5
                        </div>
                    </div>
                </aside>

                {/* Center Canvas Area */}
                <main className="flex-1 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center overflow-hidden">
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 text-lg">
                        <p>Flowchart Editor Canvas</p>
                    </div>
                </main>
            </div>

            {/* Bottom Panel - Flowchart Blocks Library */}
            <div
                className={`bg-white border-t border-gray-200 rounded-t shadow-sm transition-all duration-300 ${
                    blocksPanelExpanded ? "max-h-[40vh]" : "max-h-14"
                } ${blocksPanelExpanded ? "overflow-y-auto" : "overflow-hidden"}`}
            >
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                    <button
                        className="flex items-center gap-2 bg-none border-none cursor-pointer text-sm font-semibold text-gray-900 p-0 hover:text-emerald-600 transition-colors"
                        onClick={() =>
                            setBlocksPanelExpanded(!blocksPanelExpanded)
                        }
                    >
                        {blocksPanelExpanded ? "▼" : "▲"} Blocks Library
                    </button>
                </div>

                {blocksPanelExpanded && (
                    <div className="p-4 flex gap-8 overflow-x-auto">
                        <div className="flex-shrink-0">
                            <h4 className="m-0 mb-3 text-xs font-bold text-gray-600 uppercase tracking-wide">
                                Inputs
                            </h4>
                            <div className="flex flex-col gap-2">
                                <div className="px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 cursor-grab hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all active:cursor-grabbing">
                                    Input Block
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <h4 className="m-0 mb-3 text-xs font-bold text-gray-600 uppercase tracking-wide">
                                Components
                            </h4>
                            <div className="flex flex-col gap-2">
                                <div className="px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 cursor-grab hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all active:cursor-grabbing">
                                    Process Block
                                </div>
                                <div className="px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 cursor-grab hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all active:cursor-grabbing">
                                    Decision Block
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <h4 className="m-0 mb-3 text-xs font-bold text-gray-600 uppercase tracking-wide">
                                Outputs
                            </h4>
                            <div className="flex flex-col gap-2">
                                <div className="px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm text-gray-900 cursor-grab hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all active:cursor-grabbing">
                                    Output Block
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PolicyCreator;
