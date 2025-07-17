import React, { useState } from 'react';

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const mockEquipmentUsage = [
    { id: '1', name: 'Drill 123', category: 'Power Tools', usage: 18, duration: 32, idle: 10 },
    { id: '2', name: 'Generator X', category: 'Electrical', usage: 12, duration: 25, idle: 20 },
    { id: '3', name: 'Pipe Camera', category: 'Inspection', usage: 7, duration: 10, idle: 40 },
    { id: '4', name: 'Ladder 10ft', category: 'Safety Gear', usage: 15, duration: 20, idle: 15 },
    { id: '5', name: 'Impact Wrench', category: 'Power Tools', usage: 10, duration: 15, idle: 30 },
    { id: '6', name: 'Vacuum Pump', category: 'HVAC Tools', usage: 20, duration: 40, idle: 5 }
];

const categories = ['All', ...Array.from(new Set(mockEquipmentUsage.map((e) => e.category)))];

function exportToCSV(data: any[], filename: string) {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const csv = [keys.join(','), ...data.map((row) => keys.map((k) => JSON.stringify(row[k] ?? '')).join(','))].join(
        '\n'
    );
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function exportToExcel(data: any[], filename: string) {
    // Simple CSV with .xls extension for demo
    exportToCSV(data, filename.replace(/\.xlsx?$/, '') + '.xls');
}

const EquipmentUtilizationReport: React.FC = () => {
    const [category, setCategory] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Filtered data (date filtering is mock, not applied)
    const filtered = mockEquipmentUsage.filter((e) => category === 'All' || e.category === category);

    // Bar chart: Usage frequency
    const barData = {
        labels: filtered.map((e) => e.name),
        datasets: [
            {
                label: 'Usage Frequency',
                data: filtered.map((e) => e.usage),
                backgroundColor: 'rgba(59, 130, 246, 0.7)'
            }
        ]
    };

    // Doughnut chart: Utilization vs Idle
    const totalDuration = filtered.reduce((sum, e) => sum + e.duration, 0);
    const totalIdle = filtered.reduce((sum, e) => sum + e.idle, 0);
    const doughnutData = {
        labels: ['Utilized', 'Idle'],
        datasets: [
            {
                data: [totalDuration, totalIdle],
                backgroundColor: ['#10b981', '#d1d5db']
            }
        ]
    };

    // Prepare export data
    const exportData = filtered.map((e) => ({
        Name: e.name,
        Category: e.category,
        Usage: e.usage,
        Duration: e.duration,
        Idle: e.idle
    }));

    return (
        <div className='mx-auto max-w-3xl p-4'>
            <h2 className='mb-4 text-lg font-semibold'>Equipment Utilization Report</h2>
            {/* Export/Print Controls */}
            <div className='mb-4 flex gap-2'>
                <button
                    className='rounded bg-blue-600 px-3 py-1 text-white'
                    onClick={() => exportToCSV(exportData, 'equipment-utilization.csv')}>
                    Export CSV
                </button>
                <button
                    className='rounded bg-green-600 px-3 py-1 text-white'
                    onClick={() => exportToExcel(exportData, 'equipment-utilization.xls')}>
                    Export Excel
                </button>
                <button className='rounded bg-gray-600 px-3 py-1 text-white' onClick={() => window.print()}>
                    Print
                </button>
                <button
                    className='rounded bg-red-600 px-3 py-1 text-white'
                    onClick={() => alert('PDF export coming soon!')}>
                    Export PDF
                </button>
            </div>
            <div className='mb-4 flex flex-wrap items-center gap-2'>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='rounded border px-2 py-1'>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input
                    type='date'
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className='rounded border px-2 py-1'
                />
                <input
                    type='date'
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className='rounded border px-2 py-1'
                />
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='rounded border bg-white p-4 shadow'>
                    <h3 className='mb-2 font-semibold text-blue-700'>Usage Frequency</h3>
                    <Bar
                        data={barData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
                <div className='flex flex-col items-center rounded border bg-white p-4 shadow'>
                    <h3 className='mb-2 font-semibold text-blue-700'>Utilization vs Idle</h3>
                    <Doughnut
                        data={doughnutData}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: 'bottom' } }
                        }}
                    />
                    <div className='mt-2 text-sm text-gray-600'>
                        Utilized: <span className='font-bold text-green-600'>{totalDuration}</span> hrs
                        <br />
                        Idle: <span className='font-bold text-gray-500'>{totalIdle}</span> hrs
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentUtilizationReport;
