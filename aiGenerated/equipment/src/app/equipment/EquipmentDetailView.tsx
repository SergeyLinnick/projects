import React, { Suspense, useState } from 'react';

const mockEquipment = {
    id: '1',
    name: 'Drill 123',
    status: 'Active',
    category: 'Power Tools',
    assignedTo: 'OR',
    serialNumber: 'DR-001',
    description: 'Cordless power drill'
};

const statusColors = {
    Active: 'bg-green-500',
    'In Repair': 'bg-yellow-400',
    'Out of Service': 'bg-red-500',
    Retired: 'bg-gray-400'
};

const tabs = ['Summary', 'Activity', 'Ownership', 'Check-in/out', 'Inspections', 'Maintenance', 'Service', 'Documents'];

const mockTimeline = [
    { type: 'check-out', date: '2025-06-01', user: 'OR', note: 'Checked out for field work.' },
    { type: 'maintenance', date: '2025-05-20', user: 'Service', note: 'Routine maintenance completed.' },
    { type: 'check-in', date: '2025-05-10', user: 'OR', note: 'Returned to warehouse.' }
];

function TimelineEntry({ entry }: { entry: (typeof mockTimeline)[0] }) {
    return (
        <div className='mb-2 flex items-center gap-2'>
            <span className='h-2 w-2 rounded-full bg-blue-500'></span>
            <span className='text-xs text-gray-500'>{entry.date}</span>
            <span className='font-medium'>{entry.type.replace('-', ' ').toUpperCase()}</span>
            <span className='text-xs text-gray-700'>{entry.user}</span>
            <span className='text-xs text-gray-400'>{entry.note}</span>
        </div>
    );
}

function AssignmentInfo({ assignedTo }: { assignedTo: string }) {
    return (
        <div className='flex items-center gap-2'>
            <span className='font-bold'>Assigned to:</span>
            <span className='rounded bg-gray-100 px-2 py-1'>{assignedTo}</span>
            <button className='ml-2 text-blue-600 hover:underline'>Reassign</button>
        </div>
    );
}

export default function EquipmentDetailView() {
    const [tab, setTab] = useState(0);

    return (
        <div className='equipment-detail-view mx-auto max-w-3xl rounded border bg-white p-4 shadow'>
            {/* Header */}
            <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
                <div className='flex items-center gap-3'>
                    <span
                        className={`inline-block h-4 w-4 rounded-full ${statusColors[mockEquipment.status as keyof typeof statusColors]}`}></span>
                    <span className='text-2xl font-bold'>{mockEquipment.name}</span>
                    <span className='text-sm text-gray-500'>({mockEquipment.category})</span>
                    <span className='rounded bg-gray-200 px-2 py-1 text-xs'>{mockEquipment.status}</span>
                </div>
                <div className='flex gap-2'>
                    <button className='rounded bg-blue-600 px-3 py-1 text-white'>Check In</button>
                    <button className='rounded bg-blue-600 px-3 py-1 text-white'>Check Out</button>
                    <button className='rounded bg-yellow-500 px-3 py-1 text-white'>Update Meter</button>
                    <button className='rounded bg-green-600 px-3 py-1 text-white'>Edit</button>
                    <button className='rounded bg-gray-600 px-3 py-1 text-white'>Archive</button>
                </div>
            </div>
            {/* Assignment Info */}
            <AssignmentInfo assignedTo={mockEquipment.assignedTo} />
            {/* Tabs */}
            <div className='mt-6 mb-4 flex gap-2 border-b'>
                {tabs.map((t, idx) => (
                    <button
                        key={t}
                        className={`-mb-px border-b-2 px-3 py-2 ${tab === idx ? 'border-blue-600 font-bold text-blue-600' : 'border-transparent text-gray-600'}`}
                        onClick={() => setTab(idx)}>
                        {t}
                    </button>
                ))}
            </div>
            {/* Tab Content (Lazy loaded, mocked) */}
            <div className='min-h-[120px]'>
                <Suspense fallback={<div>Loading...</div>}>
                    {tab === 0 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Summary</h3>
                            <div className='mb-2'>Serial: {mockEquipment.serialNumber}</div>
                            <div className='mb-2'>Description: {mockEquipment.description}</div>
                        </div>
                    )}
                    {tab === 1 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Activity Timeline</h3>
                            {mockTimeline.map((entry, i) => (
                                <TimelineEntry key={i} entry={entry} />
                            ))}
                        </div>
                    )}
                    {tab === 2 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Ownership / Assignment History</h3>
                            <div className='text-gray-500'>(Mocked) Assignment history goes here.</div>
                        </div>
                    )}
                    {tab === 3 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Check-in / Check-out History</h3>
                            <div className='text-gray-500'>(Mocked) Check-in/out history goes here.</div>
                        </div>
                    )}
                    {tab === 4 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Inspections</h3>
                            <div className='text-gray-500'>(Mocked) Inspections data goes here.</div>
                        </div>
                    )}
                    {tab === 5 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Maintenance Records</h3>
                            <div className='text-gray-500'>(Mocked) Maintenance records go here.</div>
                        </div>
                    )}
                    {tab === 6 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Service History</h3>
                            <div className='text-gray-500'>(Mocked) Service history goes here.</div>
                        </div>
                    )}
                    {tab === 7 && (
                        <div>
                            <h3 className='mb-2 font-bold'>Documents</h3>
                            <div className='text-gray-500'>(Mocked) Documents go here.</div>
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}
