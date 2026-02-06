import THead from "./THead";
import Row from "./Row";

function Table() {
    const headers = [
        { txt: "Service Name", width: 1 },
        { txt: "Billing (Monthly)", width: 2 },
        { txt: "Billing (pp)", width: 1 },
        { txt: "Quota usage%", width: 1 },
        { txt: "Renewal date", width: 1 },
        { txt: "Renewal period", width: 1 },
        { txt: "Essential", width: 1 },
    ];

    const rows = [
        ["AWS S3", "$0.023", "$500", "45%", "2024-03-15", "Monthly", "Yes"],
        [
            "Cloudflare CDN",
            "$20.00",
            "$200",
            "72%",
            "2024-02-28",
            "Annual",
            "No",
        ],
        [
            "Datadog Monitoring",
            "$150.00",
            "$1,200",
            "38%",
            "2024-04-10",
            "Monthly",
            "Yes",
        ],
        [
            "Stripe Payments",
            "$0.029",
            "$800",
            "61%",
            "2024-03-01",
            "Monthly",
            "Yes",
        ],
    ];

    const outerBg = "bg-gray-100";
    const containerBg = "bg-white border-gray-200";

    return (
        <div className={`w-full h-full p-6 ${outerBg}`}>
            <div
                className={`h-full rounded-lg ${containerBg} shadow-sm flex flex-col`}
            >
                <div className="bg-indigo-100 h-1 w-full rounded-t-lg" />

                <header className="px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Cloud Usage Data
                    </h2>
                    <p className="text-sm text-gray-500">
                        Preview of cloud service usage across platform.
                    </p>
                </header>

                <div className="flex-1 overflow-auto">
                    <table className="min-w-full table-fixed divide-y divide-gray-200">
                        <THead headers={headers} />
                        <tbody className="bg-white divide-y divide-gray-100">
                            {rows.map((r, i) => (
                                <Row key={i} cells={r} highlight="light" />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-2 border-t text-sm text-gray-400">
                    Showing {rows.length} rows
                </div>
            </div>
        </div>
    );
}

export default Table;
