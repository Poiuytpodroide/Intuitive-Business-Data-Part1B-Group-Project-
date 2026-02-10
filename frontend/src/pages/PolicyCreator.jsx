import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PolicyCreator.css";

function PolicyCreator() {
    const [blocksPanelExpanded, setBlocksPanelExpanded] = useState(false);
    const location = useLocation();

    // sample templates with mock VPL blocks and ticket data
    const templates = [
        {
            id: "t-scale",
            title: "Scale when low usage",
            description: "Create ticket to scale down instances when usage < 20%",
            vplBlocks: [
                { id: "b-usage", type: "input", label: "Usage %", ticket: { recipient: "ops@example.com", action: "read usage", description: "Read current usage %" } },
                { id: "b-const", type: "const", label: "20", ticket: { recipient: "ops@example.com", action: "const value", description: "Threshold value" } },
                { id: "b-compare", type: "decider", label: "<", ticket: { recipient: "ops@example.com", action: "compare", description: "Compare usage with threshold" } },
                { id: "b-ticket", type: "output", label: "Create Ticket", ticket: { recipient: "ops@example.com", action: "Scale down instances", description: "Scale down due to low usage" } },
            ],
        },
        {
            id: "t-cost",
            title: "Notify on high cost",
            description: "Notify when daily cost > $200",
            vplBlocks: [
                { id: "b-cost", type: "input", label: "Daily Cost", ticket: { recipient: "finance@example.com", action: "read cost", description: "Read daily cost" } },
                { id: "b-cconst", type: "const", label: "200", ticket: { recipient: "finance@example.com", action: "const value", description: "Cost threshold" } },
                { id: "b-ccompare", type: "decider", label: ">", ticket: { recipient: "finance@example.com", action: "compare", description: "Compare cost with threshold" } },
                { id: "b-cticket", type: "output", label: "Notify Team", ticket: { recipient: "finance@example.com", action: "Notify on high cost", description: "Send notification to finance team" } },
            ],
        },
    ];

    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
    const [selectedBlock, setSelectedBlock] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const policyId = params.get("policy");
        const isNew = params.get("new");
        if (isNew) {
            setSelectedTemplate(templates[0]);
            setSelectedBlock(null);
            return;
        }

        if (policyId) {
            // map policy id to a template and a block to open
            const map = {
                "p-1": { templateId: "t-scale", blockId: "b-ticket" },
                "p-2": { templateId: "t-cost", blockId: "b-cticket" },
            };
            const entry = map[policyId];
            if (entry) {
                const t = templates.find((x) => x.id === entry.templateId);
                setSelectedTemplate(t || templates[0]);
                const block = (t || templates[0]).vplBlocks.find((b) => b.id === entry.blockId);
                setSelectedBlock(block || null);
            }
        }
    }, [location.search]);

    return (
        <div className="policy-creator">
            {/* Header with Save Button */}
            <header className="policy-header">
                <button className="save-btn">Save</button>
            </header>

            {/* Main Content Area */}
            <div className="policy-container">
                {/* Left Sidebar - Policies/Templates */}
                <aside className="policy-sidebar">
                    <div className="sidebar-header">
                        <h3>Templates</h3>
                    </div>
                    <div className="sidebar-search">
                        <input type="text" placeholder="🔍 Search" />
                    </div>
                    <div className="template-list">
                        {templates.map((t) => (
                            <div
                                key={t.id}
                                className={`template-item ${selectedTemplate && selectedTemplate.id === t.id ? "selected" : ""}`}
                                onClick={() => {
                                    setSelectedTemplate(t);
                                    setSelectedBlock(null);
                                }}
                            >
                                <div className="template-title">{t.title}</div>
                                <div className="template-desc">{t.description}</div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Center Canvas Area */}
                <main className="flowchart-canvas">
                    <div className="vpl-canvas">
                        {selectedTemplate && selectedTemplate.vplBlocks.map((b, i) => (
                            <div
                                key={b.id}
                                className={`vpl-node ${selectedBlock && selectedBlock.id === b.id ? "active" : ""}`}
                                style={{ left: 60 + i * 160 }}
                                onClick={() => setSelectedBlock(b)}
                            >
                                <div className="node-top">{b.type}</div>
                                <div className="node-label">{b.label}</div>
                                <button
                                    className="node-plus"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // open ticket editor for this block
                                        setSelectedBlock(b);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar - Ticket Editor */}
                <aside className="ticket-editor">
                    <div className="ticket-header">
                        <h4>Ticket Editor</h4>
                    </div>

                    <div className="ticket-body">
                        <label>
                            Recipient
                            <input
                                type="text"
                                placeholder="Recipient"
                                value={selectedBlock ? selectedBlock.ticket.recipient : ""}
                                onChange={(e) => {
                                    if (!selectedBlock) return;
                                    setSelectedBlock({ ...selectedBlock, ticket: { ...selectedBlock.ticket, recipient: e.target.value } });
                                }}
                            />
                        </label>

                        <label>
                            Action
                            <input
                                type="text"
                                placeholder="Action"
                                value={selectedBlock ? selectedBlock.ticket.action : ""}
                                onChange={(e) => {
                                    if (!selectedBlock) return;
                                    setSelectedBlock({ ...selectedBlock, ticket: { ...selectedBlock.ticket, action: e.target.value } });
                                }}
                            />
                        </label>

                        <label className="description-label">
                            Description
                            <textarea
                                placeholder="Describe the ticket..."
                                value={selectedBlock ? selectedBlock.ticket.description : ""}
                                onChange={(e) => {
                                    if (!selectedBlock) return;
                                    setSelectedBlock({ ...selectedBlock, ticket: { ...selectedBlock.ticket, description: e.target.value } });
                                }}
                            />
                        </label>

                        <div className="ticket-actions">
                            <button className="save-btn" onClick={() => alert('Ticket saved (mock)')}>Save</button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Bottom Panel - Flowchart Blocks Library */}
            <div
                className={`blocks-panel ${blocksPanelExpanded ? "expanded" : "collapsed"}`}
            >
                <div className="blocks-header">
                    <button
                        className="expand-toggle"
                        onClick={() =>
                            setBlocksPanelExpanded(!blocksPanelExpanded)
                        }
                    >
                        {blocksPanelExpanded ? "▼" : "▲"} Blocks Library
                    </button>
                </div>

                {blocksPanelExpanded && (
                    <div className="blocks-content">
                        <div className="block-category">
                            <h4>Inputs</h4>
                            <div className="block-items">
                                <div className="block-item">Input Block</div>
                            </div>
                        </div>

                        <div className="block-category">
                            <h4>Components</h4>
                            <div className="block-items">
                                <div className="block-item">Process Block</div>
                                <div className="block-item">Decision Block</div>
                            </div>
                        </div>

                        <div className="block-category">
                            <h4>Outputs</h4>
                            <div className="block-items">
                                <div className="block-item">Output Block</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PolicyCreator;
