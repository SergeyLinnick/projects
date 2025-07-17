import React, { useState } from 'react';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mockAssignments = [
    { equipment: 'Drill 123', user: 'Alice', department: 'Field', category: 'Power Tools', date: '2024-07-01' },
    { equipment: 'Generator X', user: 'Bob', department: 'Shop', category: 'Electrical', date: '2024-07-02' },
    { equipment: 'Pipe Camera', user: 'Alice', department: 'Field', category: 'Inspection', date: '2024-07-03' },
    { equipment: 'Ladder 10ft', user: 'Charlie', department: 'Warehouse', category: 'Safety Gear', date: '2024-07-04' },
    { equipment: 'Impact Wrench', user: 'Bob', department: 'Shop', category: 'Power Tools', date: '2024-07-05' },
    { equipment: 'Vacuum Pump', user: 'Alice', department: 'Field', category: 'HVAC Tools', date: '2024-07-06' },
    { equipment: 'Multimeter', user: 'Charlie', department: 'Warehouse', category: 'Electrical', date: '2024-07-07' },
    { equipment: 'Tablet A', user: 'Alice', department: 'Field', category: 'IT Equipment', date: '2024-07-08' },
    { equipment: 'Compressor', user: 'Bob', department: 'Shop', category: 'Pneumatic', date: '2024-07-09' },
    { equipment: 'Torch Kit', user: 'Charlie', department: 'Warehouse', category: 'Welding', date: '2024-07-10' }
];

const departments = ['All', ...Array.from(new Set(mockAssignments.map((a) => a.department)))];
const categories = ['All', ...Array.from(new Set(mockAssignments.map((a) => a.category)))];
const users = Array.from(new Set(mockAssignments.map((a) => a.user)));

const AssignmentOverviewReport: React.FC = () => {
    const [department, setDepartment] = useState('All');
    const [category, setCategory] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Filtered data
    const filtered = mockAssignments.filter((a) => {
        const depMatch = department === 'All' || a.department === department;
        const catMatch = category === 'All' || a.category === category;
        let dateMatch = true;
        if (dateFrom && a.date < dateFrom) dateMatch = false;
        if (dateTo && a.date > dateTo) dateMatch = false;
        return depMatch && catMatch && dateMatch;
    });

    // Bar chart: assignments per user
    const userCounts = users.map((u) => filtered.filter((a) => a.user === u).length);
    const userBarData = {
        labels: users,
        datasets: [
            {
                label: 'Assignments per User',
                data: userCounts,
                backgroundColor: 'rgba(59, 130, 246, 0.7)'
            }
        ]
    };

    // Bar chart: assignments per department
    const depList = Array.from(new Set(filtered.map((a) => a.department)));
    const depCounts = depList.map((d) => filtered.filter((a) => a.department === d).length);
    const depBarData = {
        labels: depList,
        datasets: [
            {
                label: 'Assignments per Department',
                data: depCounts,
                backgroundColor: 'rgba(16, 185, 129, 0.7)'
            }
        ]
    };

    // Users with most assignments
    const maxCount = Math.max(...userCounts);
    const topUsers = users.filter((u, i) => userCounts[i] === maxCount);

    return (
        <div className='mx-auto max-w-3xl p-4'>
            <h2 className='mb-4 text-lg font-semibold'>Assignment Overview Report</h2>
            <div className='mb-4 flex flex-wrap items-center gap-2'>
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
                    <h3 className='mb-2 font-semibold text-blue-700'>Assignments per User</h3>
                    <Bar
                        data={userBarData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
                <div className='rounded border bg-white p-4 shadow'>
                    <h3 className='mb-2 font-semibold text-blue-700'>Assignments per Department</h3>
                    <Bar
                        data={depBarData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
            </div>
            <div className='mt-6 rounded border bg-white p-4 shadow'>
                <h3 className='mb-2 font-semibold text-blue-700'>Top Users</h3>
                {topUsers.length === 0 ? (
                    <div className='text-gray-400'>No assignments found.</div>
                ) : (
                    <ul className='list-disc pl-6'>
                        {topUsers.map((u) => (
                            <li key={u} className='font-medium text-green-700'>
                                {u} ({maxCount} assignments)
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AssignmentOverviewReport;
