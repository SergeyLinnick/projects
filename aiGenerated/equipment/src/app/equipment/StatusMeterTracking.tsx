import React, { useState } from 'react';

const statusOptions = [
    { value: 'Active', color: 'bg-green-500' },
    { value: 'In Repair', color: 'bg-yellow-400' },
    { value: 'Out of Service', color: 'bg-red-500' },
    { value: 'Retired', color: 'bg-gray-400' }
];

const meterTypes = ['Distance', 'Time', 'Count'];
const meterUnits = {
    Distance: ['Miles', 'Kilometers'],
    Time: ['Hours', 'Minutes'],
    Count: ['Cycles', 'Starts', 'Jobs']
};

const mockStatusHistory = [
    { status: 'Active', date: '2025-05-01', reason: 'Initial', notes: '' },
    { status: 'In Repair', date: '2025-06-01', reason: 'Malfunction', notes: 'Sent for repair.' },
    { status: 'Active', date: '2025-06-10', reason: 'Repaired', notes: 'Returned to service.' }
];

const mockMeterHistory = [
    { type: 'Distance', value: 100, unit: 'Miles', date: '2025-05-01' },
    { type: 'Distance', value: 150, unit: 'Miles', date: '2025-06-01' },
    { type: 'Distance', value: 200, unit: 'Miles', date: '2025-07-01' }
];

export default function StatusMeterTracking() {
    // Status state
    const [status, setStatus] = useState('Active');
    const [showStatusForm, setShowStatusForm] = useState(false);
    const [statusReason, setStatusReason] = useState('');
    const [statusNotes, setStatusNotes] = useState('');
    const [statusHistory, setStatusHistory] = useState(mockStatusHistory);
    const [confirmStatus, setConfirmStatus] = useState(false);
    const [pendingStatus, setPendingStatus] = useState('');

    // Meter state
    const [meterType, setMeterType] = useState<'Distance' | 'Time' | 'Count'>('Distance');
    const [meterUnit, setMeterUnit] = useState('Miles');
    const [meterValue, setMeterValue] = useState('');
    const [meterHistory, setMeterHistory] = useState(mockMeterHistory);
    const [meterError, setMeterError] = useState('');

    // Status change form submit
    const handleStatusSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'Active' && pendingStatus === 'Out of Service') {
            setConfirmStatus(true);
            return;
        }
        setStatus(pendingStatus);
        setStatusHistory((h) => [
            {
                status: pendingStatus,
                date: new Date().toISOString().slice(0, 10),
                reason: statusReason,
                notes: statusNotes
            },
            ...h
        ]);
        setShowStatusForm(false);
        setStatusReason('');
        setStatusNotes('');
        setPendingStatus('');
        setConfirmStatus(false);
    };

    // Meter entry form submit
    const handleMeterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const last = meterHistory.filter((m) => m.type === meterType).sort((a, b) => b.value - a.value)[0];
        const val = parseFloat(meterValue);
        if (isNaN(val) || val <= 0) {
            setMeterError('Enter a valid meter value.');
            return;
        }
        if (last && val <= last.value) {
            setMeterError('New reading must be greater than previous.');
            return;
        }
        setMeterHistory((h) => [
            ...h,
            { type: meterType, value: val, unit: meterUnit, date: new Date().toISOString().slice(0, 10) }
        ]);
        setMeterValue('');
        setMeterError('');
    };

    // Chart mock (simple bar chart)
    const chartData = meterHistory
        .filter((m) => m.type === meterType)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const maxVal = Math.max(...chartData.map((m) => m.value), 1);

    return (
        <div className='status-meter-tracking mx-auto max-w-2xl rounded border bg-white p-4 shadow'>
            {/* Status Management */}
            <div className='mb-6'>
                <div className='mb-2 flex items-center gap-2'>
                    <span
                        className={`inline-block h-4 w-4 rounded-full ${statusOptions.find((s) => s.value === status)?.color}`}></span>
                    <span className='font-bold'>Status:</span> <span>{status}</span>
                    <button
                        className='ml-2 rounded bg-blue-600 px-3 py-1 text-white'
                        onClick={() => setShowStatusForm(true)}>
                        Change Status
                    </button>
                </div>
                <h3 className='mb-1 font-bold'>Status History</h3>
                <div className='mb-2 space-y-1'>
                    {statusHistory.map((h, i) => (
                        <div key={i} className='flex items-center gap-2 text-sm'>
                            <span
                                className={`inline-block h-3 w-3 rounded-full ${statusOptions.find((s) => s.value === h.status)?.color}`}></span>
                            <span>{h.status}</span>
                            <span>{h.date}</span>
                            {h.reason && <span>({h.reason})</span>}
                            {h.notes && <span className='text-gray-500'>{h.notes}</span>}
                        </div>
                    ))}
                </div>
            </div>
            {/* Status Change Modal */}
            {showStatusForm && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow'>
                        <button
                            className='absolute top-2 right-2 text-gray-500'
                            onClick={() => setShowStatusForm(false)}>
                            &times;
                        </button>
                        <h3 className='mb-2 text-lg font-bold'>Change Status</h3>
                        <form onSubmit={handleStatusSubmit}>
                            <div className='mb-2'>
                                <label className='mb-1 block'>New Status</label>
                                <select
                                    value={pendingStatus}
                                    onChange={(e) => setPendingStatus(e.target.value)}
                                    className='w-full rounded border px-2 py-1'>
                                    <option value=''>Select...</option>
                                    {statusOptions.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-2'>
                                <input
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Reason'
                                    value={statusReason}
                                    onChange={(e) => setStatusReason(e.target.value)}
                                />
                            </div>
                            <div className='mb-2'>
                                <textarea
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Notes'
                                    value={statusNotes}
                                    onChange={(e) => setStatusNotes(e.target.value)}
                                />
                            </div>
                            <div className='mt-4 flex gap-2'>
                                <button
                                    type='button'
                                    className='rounded bg-gray-200 px-3 py-1'
                                    onClick={() => setShowStatusForm(false)}>
                                    Cancel
                                </button>
                                <button type='submit' className='rounded bg-blue-600 px-3 py-1 text-white'>
                                    Change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Status Change Confirmation Modal */}
            {confirmStatus && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow'>
                        <h3 className='mb-2 text-lg font-bold'>Confirm Status Change</h3>
                        <p>This change will make the equipment unavailable. Are you sure?</p>
                        <div className='mt-4 flex gap-2'>
                            <button className='rounded bg-gray-200 px-3 py-1' onClick={() => setConfirmStatus(false)}>
                                Cancel
                            </button>
                            <button
                                className='rounded bg-blue-600 px-3 py-1 text-white'
                                onClick={() => {
                                    setStatus(pendingStatus);
                                    setStatusHistory((h) => [
                                        {
                                            status: pendingStatus,
                                            date: new Date().toISOString().slice(0, 10),
                                            reason: statusReason,
                                            notes: statusNotes
                                        },
                                        ...h
                                    ]);
                                    setShowStatusForm(false);
                                    setStatusReason('');
                                    setStatusNotes('');
                                    setPendingStatus('');
                                    setConfirmStatus(false);
                                }}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Meter Tracking */}
            <div className='mb-6'>
                <div className='mb-2 flex items-center gap-2'>
                    <span className='font-bold'>Meter Tracking:</span>
                    <select
                        value={meterType}
                        onChange={(e) => {
                            setMeterType(e.target.value as 'Distance' | 'Time' | 'Count');
                            setMeterUnit(meterUnits[e.target.value as 'Distance' | 'Time' | 'Count'][0]);
                        }}
                        className='rounded border px-2 py-1'>
                        {meterTypes.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <select
                        value={meterUnit}
                        onChange={(e) => setMeterUnit(e.target.value)}
                        className='rounded border px-2 py-1'>
                        {(meterUnits[meterType] as string[]).map((u: string) => (
                            <option key={u} value={u}>
                                {u}
                            </option>
                        ))}
                    </select>
                </div>
                <form onSubmit={handleMeterSubmit} className='mb-2 flex gap-2'>
                    <input
                        className='w-32 rounded border px-2 py-1'
                        placeholder='New Reading'
                        value={meterValue}
                        onChange={(e) => setMeterValue(e.target.value)}
                        type='number'
                    />
                    <button type='submit' className='rounded bg-blue-600 px-3 py-1 text-white'>
                        Add
                    </button>
                </form>
                {meterError && <div className='mb-2 text-red-600'>{meterError}</div>}
                <h3 className='mb-1 font-bold'>Meter History</h3>
                <div className='mb-2 space-y-1'>
                    {meterHistory
                        .filter((m) => m.type === meterType)
                        .map((m, i) => (
                            <div key={i} className='flex items-center gap-2 text-sm'>
                                <span>
                                    {m.value} {m.unit}
                                </span>
                                <span>{m.date}</span>
                            </div>
                        ))}
                </div>
                {/* Simple Bar Chart (mock) */}
                <div className='mt-2 flex h-24 items-end gap-1'>
                    {chartData.map((m, i) => (
                        <div
                            key={i}
                            className='w-6 bg-blue-400'
                            style={{ height: `${(m.value / maxVal) * 80 + 10}px` }}
                            title={`${m.value} ${m.unit} on ${m.date}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
