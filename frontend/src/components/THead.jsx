export default function THead({ headers }) {
    const sum = headers.reduce((s, cur) => s + cur.width, 0);
    const textClass = "text-gray-500";
    const accent = "bg-white";

    return (
        <thead className={accent}>
            <tr>
                {headers.map(({ txt, width }) => (
                    <th
                        key={txt}
                        style={{ width: `${(width / sum) * 100}%` }}
                        className={`px-4 py-3 text-left text-xs font-medium ${textClass} uppercase tracking-wider`}
                    >
                        {txt}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
