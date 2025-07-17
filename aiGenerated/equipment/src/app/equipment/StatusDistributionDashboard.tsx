import React, { useState } from 'react';

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const mockEquipment = [
    { id: '1', name: 'Drill 123', category: 'Power Tools', department: 'Field', status: 'Active' },
    { id: '2', name: 'Generator X', category: 'Electrical', department: 'Shop', status: 'In Repair' },
    { id: '3', name: 'Pipe Camera', category: 'Inspection', department: 'Field', status: 'Out of Service' },
    { id: '4', name: 'Ladder 10ft', category: 'Safety Gear', department: 'Warehouse', status: 'Out of Service' },
    { id: '5', name: 'Impact Wrench', category: 'Power Tools', department: 'Shop', status: 'Retired' },
    { id: '6', name: 'Vacuum Pump', category: 'HVAC Tools', department: 'Field', status: 'Active' },
    { id: '7', name: 'Multimeter', category: 'Electrical', department: 'Warehouse', status: 'Active' },
    { id: '8', name: 'Tablet A', category: 'IT Equipment', department: 'Field', status: 'Active' },
    { id: '9', name: 'Compressor', category: 'Pneumatic', department: 'Shop', status: 'Active' },
    { id: '10', name: 'Torch Kit', category: 'Welding', department: 'Warehouse', status: 'In Repair' }
];

const statuses = ['Active', 'In Repair', 'Out of Service', 'Retired'] as const;
type Status = (typeof statuses)[number];

const statusColors: Record<Status, string> = {
    Active: '#10b981',
    'In Repair': '#f59e42',
    'Out of Service': '#ef4444',
    Retired: '#6b7280'
};

const categories = ['All', ...Array.from(new Set(mockEquipment.map((e) => e.category)))];
const departments = ['All', ...Array.from(new Set(mockEquipment.map((e) => e.department)))];

// Mock trend data: status counts per month
const mockTrend = [
    { month: '2024-03', Active: 5, 'In Repair': 2, 'Out of Service': 2, Retired: 1 },
    { month: '2024-04', Active: 6, 'In Repair': 1, 'Out of Service': 2, Retired: 1 },
    { month: '2024-05', Active: 7, 'In Repair': 1, 'Out of Service': 1, Retired: 1 },
    { month: '2024-06', Active: 6, 'In Repair': 2, 'Out of Service': 1, Retired: 1 },
    { month: '2024-07', Active: 5, 'In Repair': 2, 'Out of Service': 2, Retired: 1 }
];

const StatusDistributionDashboard: React.FC = () => {
    const [category, setCategory] = useState('All');
    const [department, setDepartment] = useState('All');

    const filtered = mockEquipment.filter(
        (e) => (category === 'All' || e.category === category) && (department === 'All' || e.department === department)
    );

    // Pie/Bar chart data
    const statusCounts = statuses.map((s) => filtered.filter((e) => e.status === s).length);
    const pieData = {
        labels: Array.from(statuses),
        datasets: [
            {
                data: statusCounts,
                backgroundColor: statuses.map((s) => statusColors[s])
            }
        ]
    };
    const barData = {
        labels: Array.from(statuses),
        datasets: [
            {
                label: 'Count',
                data: statusCounts,
                backgroundColor: statuses.map((s) => statusColors[s])
            }
        ]
    };

    // Trend line chart data
    const lineData = {
        labels: mockTrend.map((t) => t.month),
        datasets: statuses.map((s) => ({
            label: s,
            data: mockTrend.map((t) => t[s as Status]),
            borderColor: statusColors[s],
            backgroundColor: statusColors[s],
            fill: false,
            tension: 0.3
        }))
    };

    return (
        <div className='mx-auto max-w-3xl p-4'>
            <h2 className='mb-4 text-lg font-semibold'>Status Distribution Dashboard</h2>
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
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className='rounded border px-2 py-1'>
                    {departments.map((dep) => (
                        <option key={dep} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='flex flex-col items-center rounded border bg-white p-4 shadow'>
                    <h3 className='mb-2 font-semibold text-blue-700'>Status Pie Chart</h3>
                    <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
                </div>
                <div className='rounded border bg-white p-4 shadow'>
                    <h3 className='mb-2 font-semibold text-blue-700'>Status Bar Chart</h3>
                    <Bar
                        data={barData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
            </div>
            <div className='mt-6 rounded border bg-white p-4 shadow'>
                <h3 className='mb-2 font-semibold text-blue-700'>Status Trend Over Time</h3>
                <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
        </div>
    );
};

export default StatusDistributionDashboard;
