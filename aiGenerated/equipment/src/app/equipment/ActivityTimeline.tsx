import React, { useState } from 'react';

const mockActivities = [
    {
        id: '1',
        type: 'Assignment',
        user: 'Alice',
        timestamp: '2024-07-01T09:00:00Z',
        details: 'Assigned to Alice for project X.'
    },
    {
        id: '2',
        type: 'Check-Out',
        user: 'Bob',
        timestamp: '2024-07-02T14:30:00Z',
        details: 'Checked out for field work.'
    },
    {
        id: '3',
        type: 'Maintenance',
        user: 'Charlie',
        timestamp: '2024-07-03T11:15:00Z',
        details: 'Routine maintenance completed.'
    },
    {
        id: '4',
        type: 'Status Change',
        user: 'Alice',
        timestamp: '2024-07-04T08:45:00Z',
        details: 'Status changed to In Repair.'
    },
    {
        id: '5',
        type: 'Document Upload',
        user: 'Bob',
        timestamp: '2024-07-05T16:20:00Z',
        details: 'Uploaded inspection report.'
    },
    {
        id: '6',
        type: 'Check-In',
        user: 'Alice',
        timestamp: '2024-07-06T10:10:00Z',
        details: 'Checked in after use.'
    },
    {
        id: '7',
        type: 'Assignment',
        user: 'Charlie',
        timestamp: '2024-07-07T13:00:00Z',
        details: 'Reassigned to Charlie.'
    }
];

const activityTypes = ['All', ...Array.from(new Set(mockActivities.map((a) => a.type)))];
const users = ['All', ...Array.from(new Set(mockActivities.map((a) => a.user)))];

function formatDateTime(ts: string) {
    const d = new Date(ts);
    return d.toLocaleString();
}

const ActivityTimeline: React.FC = () => {
    const [typeFilter, setTypeFilter] = useState('All');
    const [userFilter, setUserFilter] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selected, setSelected] = useState<(typeof mockActivities)[0] | null>(null);

    const filtered = mockActivities.filter((a) => {
        const typeMatch = typeFilter === 'All' || a.type === typeFilter;
        const userMatch = userFilter === 'All' || a.user === userFilter;
        let dateMatch = true;
        if (dateFrom && new Date(a.timestamp) < new Date(dateFrom)) dateMatch = false;
        if (dateTo && new Date(a.timestamp) > new Date(dateTo)) dateMatch = false;
        return typeMatch && userMatch && dateMatch;
    });

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <h2 className='mb-4 text-lg font-semibold'>Activity Timeline</h2>
            <div className='mb-4 flex flex-wrap items-center gap-2'>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className='rounded border px-2 py-1'>
                    {activityTypes.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className='rounded border px-2 py-1'>
                    {users.map((u) => (
                        <option key={u} value={u}>
                            {u}
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
            <div className='space-y-4'>
                {filtered.length === 0 ? (
                    <div className='text-center text-gray-400'>No activities found.</div>
                ) : (
                    filtered.map((a) => (
                        <div
                            key={a.id}
                            className='flex cursor-pointer flex-col gap-2 rounded border bg-white p-3 shadow transition hover:bg-blue-50 md:flex-row md:items-center'
                            onClick={() => setSelected(a)}>
                            <div className='flex-1'>
                                <div className='font-semibold text-blue-700'>{a.type}</div>
                                <div className='text-sm text-gray-600'>{a.details}</div>
                            </div>
                            <div className='flex flex-col md:items-end'>
                                <div className='text-xs text-gray-500'>{a.user}</div>
                                <div className='text-xs text-gray-400'>{formatDateTime(a.timestamp)}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Modal for details */}
            {selected && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow-lg'>
                        <button
                            className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
                            onClick={() => setSelected(null)}>
                            ×
                        </button>
                        <h3 className='mb-2 text-lg font-bold'>{selected.type} Details</h3>
                        <div className='mb-2 text-sm text-gray-700'>{selected.details}</div>
                        <div className='mb-1 text-xs text-gray-500'>User: {selected.user}</div>
                        <div className='mb-1 text-xs text-gray-500'>Time: {formatDateTime(selected.timestamp)}</div>
                        <div className='mt-4 flex justify-end'>
                            <button
                                className='rounded bg-blue-600 px-4 py-1 text-white'
                                onClick={() => setSelected(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityTimeline;
