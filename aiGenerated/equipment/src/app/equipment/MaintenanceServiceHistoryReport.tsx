import React, { useState } from 'react';

import {
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
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const mockMaintenance = [
    { equipment: 'Drill 123', type: 'Routine', date: '2024-07-01', cost: 120, status: 'Completed' },
    { equipment: 'Generator X', type: 'Repair', date: '2024-07-03', cost: 350, status: 'Completed' },
    { equipment: 'Pipe Camera', type: 'Routine', date: '2024-07-05', cost: 90, status: 'Completed' },
    { equipment: 'Ladder 10ft', type: 'Inspection', date: '2024-07-10', cost: 60, status: 'Upcoming' },
    { equipment: 'Impact Wrench', type: 'Repair', date: '2024-07-02', cost: 200, status: 'Completed' },
    { equipment: 'Vacuum Pump', type: 'Routine', date: '2024-07-12', cost: 110, status: 'Upcoming' },
    { equipment: 'Multimeter', type: 'Inspection', date: '2024-07-04', cost: 50, status: 'Completed' },
    { equipment: 'Tablet A', type: 'Routine', date: '2024-07-15', cost: 80, status: 'Upcoming' },
    { equipment: 'Compressor', type: 'Repair', date: '2024-07-08', cost: 400, status: 'Completed' },
    { equipment: 'Torch Kit', type: 'Routine', date: '2024-07-09', cost: 100, status: 'Overdue' }
];

const equipmentTypes = ['All', ...Array.from(new Set(mockMaintenance.map((m) => m.equipment)))];
const serviceTypes = ['All', ...Array.from(new Set(mockMaintenance.map((m) => m.type)))];

const MaintenanceServiceHistoryReport: React.FC = () => {
    const [equipment, setEquipment] = useState('All');
    const [serviceType, setServiceType] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Filtered data
    const filtered = mockMaintenance.filter((m) => {
        const eqMatch = equipment === 'All' || m.equipment === equipment;
        const stMatch = serviceType === 'All' || m.type === serviceType;
        let dateMatch = true;
        if (dateFrom && m.date < dateFrom) dateMatch = false;
        if (dateTo && m.date > dateTo) dateMatch = false;
        return eqMatch && stMatch && dateMatch;
    });

    // Bar chart: maintenance frequency per equipment
    const eqList = Array.from(new Set(filtered.map((m) => m.equipment)));
    const freqCounts = eqList.map((e) => filtered.filter((m) => m.equipment === e).length);
    const freqBarData = {
        labels: eqList,
        datasets: [
            {
                label: 'Maintenance Frequency',
                data: freqCounts,
                backgroundColor: 'rgba(59, 130, 246, 0.7)'
            }
        ]
    };

    // Line chart: maintenance costs over time
    const dateList = Array.from(new Set(filtered.map((m) => m.date))).sort();
    const costSums = dateList.map((d) => filtered.filter((m) => m.date === d).reduce((sum, m) => sum + m.cost, 0));
    const costLineData = {
        labels: dateList,
        datasets: [
            {
                label: 'Maintenance Cost',
                data: costSums,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                fill: true,
                tension: 0.3
            }
        ]
    };

    // Upcoming/overdue maintenance
    const upcoming = filtered.filter((m) => m.status === 'Upcoming' || m.status === 'Overdue');

    return (
        <div className='mx-auto max-w-3xl p-4'>
            <h2 className='mb-4 text-lg font-semibold'>Maintenance & Service History Report</h2>
            <div className='mb-4 flex flex-wrap items-center gap-2'>
                <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className='rounded border px-2 py-1'>
                    {equipmentTypes.map((eq) => (
                        <option key={eq} value={eq}>
                            {eq}
                        </option>
                    ))}
                </select>
                <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className='rounded border px-2 py-1'>
                    {serviceTypes.map((st) => (
                        <option key={st} value={st}>
                            {st}
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
                    <h3 className='mb-2 font-semibold text-blue-700'>Maintenance Frequency</h3>
                    <Bar
                        data={freqBarData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
                <div className='rounded border bg-white p-4 shadow'>
                    <h3 className='mb-2 font-semibold text-blue-700'>Maintenance Costs Over Time</h3>
                    <Line
                        data={costLineData}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: 'bottom' } },
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
            </div>
            <div className='mt-6 rounded border bg-white p-4 shadow'>
                <h3 className='mb-2 font-semibold text-blue-700'>Upcoming & Overdue Maintenance</h3>
                <table className='min-w-full border text-sm'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='p-2 text-left'>Equipment</th>
                            <th className='p-2 text-left'>Type</th>
                            <th className='p-2 text-left'>Date</th>
                            <th className='p-2 text-left'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcoming.length === 0 ? (
                            <tr>
                                <td colSpan={4} className='p-4 text-center text-gray-400'>
                                    No upcoming or overdue maintenance.
                                </td>
                            </tr>
                        ) : (
                            upcoming.map((m, i) => (
                                <tr key={i} className={m.status === 'Overdue' ? 'bg-red-100' : ''}>
                                    <td className='p-2 font-medium'>{m.equipment}</td>
                                    <td className='p-2'>{m.type}</td>
                                    <td className='p-2'>{m.date}</td>
                                    <td
                                        className='p-2 font-bold'
                                        style={{ color: m.status === 'Overdue' ? '#ef4444' : '#f59e42' }}>
                                        {m.status}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaintenanceServiceHistoryReport;
