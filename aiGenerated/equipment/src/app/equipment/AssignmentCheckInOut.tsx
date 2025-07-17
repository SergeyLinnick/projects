import React, { useState } from 'react';

const mockEntities = {
    user: ['Alice', 'Bob', 'Charlie'],
    vehicle: ['Van #1', 'Truck #2'],
    facility: ['Warehouse A', 'Depot B']
};

const mockAssignmentHistory = [
    { type: 'assign', entityType: 'user', entity: 'Alice', start: '2025-06-01', end: '', notes: 'Initial assignment.' },
    { type: 'check-out', entityType: 'user', entity: 'Alice', date: '2025-06-10', notes: 'Checked out for job.' },
    { type: 'check-in', entityType: 'user', entity: 'Alice', date: '2025-06-15', notes: 'Returned.' },
    {
        type: 'assign',
        entityType: 'vehicle',
        entity: 'Van #1',
        start: '2025-06-16',
        end: '',
        notes: 'Assigned to vehicle.'
    }
];

export default function AssignmentCheckInOut() {
    const [showAssign, setShowAssign] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [assignType, setAssignType] = useState<'user' | 'vehicle' | 'facility'>('user');
    const [assignEntity, setAssignEntity] = useState('');
    const [assignDuration, setAssignDuration] = useState<'permanent' | 'temporary'>('permanent');
    const [assignStart, setAssignStart] = useState('');
    const [assignEnd, setAssignEnd] = useState('');
    const [assignNotes, setAssignNotes] = useState('');
    const [checkAction, setCheckAction] = useState<'check-in' | 'check-out'>('check-out');
    const [checkLocation, setCheckLocation] = useState('');
    const [checkCondition, setCheckCondition] = useState('');
    const [checkNotes, setCheckNotes] = useState('');
    const [checkPhoto, setCheckPhoto] = useState<File | null>(null);
    const [confirmReassign, setConfirmReassign] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState({
        entityType: 'user',
        entity: 'Alice',
        duration: 'permanent'
    });
    const [history, setHistory] = useState(mockAssignmentHistory);
    const [error, setError] = useState('');

    // Assignment form submit
    const handleAssign = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentAssignment && currentAssignment.entity !== assignEntity) {
            setConfirmReassign(true);
            return;
        }
        setHistory((h) => [
            ...h,
            {
                type: 'assign',
                entityType: assignType,
                entity: assignEntity,
                start: assignStart,
                end: assignEnd,
                notes: assignNotes
            }
        ]);
        setCurrentAssignment({ entityType: assignType, entity: assignEntity, duration: assignDuration });
        setShowAssign(false);
        setError('');
    };

    // Check-in/out form submit
    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        setHistory((h) => [
            ...h,
            {
                type: checkAction,
                entityType: currentAssignment.entityType,
                entity: currentAssignment.entity,
                date: new Date().toISOString().slice(0, 10),
                notes: checkNotes
            }
        ]);
        setShowCheck(false);
        setError('');
    };

    return (
        <div className='assignment-checkinout mx-auto max-w-2xl rounded border bg-white p-4 shadow'>
            <div className='mb-4 flex gap-2'>
                <button className='rounded bg-blue-600 px-3 py-1 text-white' onClick={() => setShowAssign(true)}>
                    Assign
                </button>
                <button className='rounded bg-blue-600 px-3 py-1 text-white' onClick={() => setShowCheck(true)}>
                    Check In/Out
                </button>
            </div>
            {error && <div className='mb-2 text-red-600'>{error}</div>}
            <div className='mb-4'>
                <span className='font-bold'>Current Assignment:</span> {currentAssignment.entityType} -{' '}
                {currentAssignment.entity} ({currentAssignment.duration})
            </div>
            <div className='mb-4'>
                <h3 className='mb-2 font-bold'>Assignment History</h3>
                <div className='space-y-1'>
                    {history.map((h, i) => (
                        <div key={i} className='flex items-center gap-2 text-sm'>
                            <span className='font-bold'>{h.type.replace('-', ' ').toUpperCase()}</span>
                            <span>
                                {h.entityType}: {h.entity}
                            </span>
                            {h.start && <span>Start: {h.start}</span>}
                            {h.end && <span>End: {h.end}</span>}
                            {h.date && <span>Date: {h.date}</span>}
                            {h.notes && <span className='text-gray-500'>({h.notes})</span>}
                        </div>
                    ))}
                </div>
            </div>
            {/* Assignment Modal */}
            {showAssign && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow'>
                        <button className='absolute top-2 right-2 text-gray-500' onClick={() => setShowAssign(false)}>
                            &times;
                        </button>
                        <h3 className='mb-2 text-lg font-bold'>Assign Equipment</h3>
                        <form onSubmit={handleAssign}>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Assignment Type</label>
                                <select
                                    value={assignType}
                                    onChange={(e) => setAssignType(e.target.value as any)}
                                    className='w-full rounded border px-2 py-1'>
                                    <option value='user'>User</option>
                                    <option value='vehicle'>Vehicle</option>
                                    <option value='facility'>Facility</option>
                                </select>
                            </div>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Entity</label>
                                <select
                                    value={assignEntity}
                                    onChange={(e) => setAssignEntity(e.target.value)}
                                    className='w-full rounded border px-2 py-1'>
                                    <option value=''>Select...</option>
                                    {mockEntities[assignType].map((ent) => (
                                        <option key={ent} value={ent}>
                                            {ent}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Assignment Duration</label>
                                <select
                                    value={assignDuration}
                                    onChange={(e) => setAssignDuration(e.target.value as any)}
                                    className='w-full rounded border px-2 py-1'>
                                    <option value='permanent'>Permanent</option>
                                    <option value='temporary'>Temporary</option>
                                </select>
                            </div>
                            {assignDuration === 'temporary' && (
                                <div className='mb-2 flex gap-2'>
                                    <input
                                        type='date'
                                        value={assignStart}
                                        onChange={(e) => setAssignStart(e.target.value)}
                                        className='w-full rounded border px-2 py-1'
                                        placeholder='Start Date'
                                    />
                                    <input
                                        type='date'
                                        value={assignEnd}
                                        onChange={(e) => setAssignEnd(e.target.value)}
                                        className='w-full rounded border px-2 py-1'
                                        placeholder='End Date'
                                    />
                                </div>
                            )}
                            <div className='mb-2'>
                                <textarea
                                    value={assignNotes}
                                    onChange={(e) => setAssignNotes(e.target.value)}
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Notes'
                                />
                            </div>
                            <div className='mt-4 flex gap-2'>
                                <button
                                    type='button'
                                    className='rounded bg-gray-200 px-3 py-1'
                                    onClick={() => setShowAssign(false)}>
                                    Cancel
                                </button>
                                <button type='submit' className='rounded bg-blue-600 px-3 py-1 text-white'>
                                    Assign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Reassign Confirmation Modal */}
            {confirmReassign && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow'>
                        <h3 className='mb-2 text-lg font-bold'>Confirm Reassignment</h3>
                        <p>This equipment is already assigned. Are you sure you want to reassign?</p>
                        <div className='mt-4 flex gap-2'>
                            <button className='rounded bg-gray-200 px-3 py-1' onClick={() => setConfirmReassign(false)}>
                                Cancel
                            </button>
                            <button
                                className='rounded bg-blue-600 px-3 py-1 text-white'
                                onClick={() => {
                                    setConfirmReassign(false);
                                    setShowAssign(false);
                                    setError('');
                                    setCurrentAssignment({
                                        entityType: assignType,
                                        entity: assignEntity,
                                        duration: assignDuration
                                    });
                                    setHistory((h) => [
                                        ...h,
                                        {
                                            type: 'assign',
                                            entityType: assignType,
                                            entity: assignEntity,
                                            start: assignStart,
                                            end: assignEnd,
                                            notes: assignNotes
                                        }
                                    ]);
                                }}>
                                Reassign
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Check-in/out Modal */}
            {showCheck && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow'>
                        <button className='absolute top-2 right-2 text-gray-500' onClick={() => setShowCheck(false)}>
                            &times;
                        </button>
                        <h3 className='mb-2 text-lg font-bold'>Check In/Out</h3>
                        <form onSubmit={handleCheck}>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Action</label>
                                <select
                                    value={checkAction}
                                    onChange={(e) => setCheckAction(e.target.value as any)}
                                    className='w-full rounded border px-2 py-1'>
                                    <option value='check-in'>Check In</option>
                                    <option value='check-out'>Check Out</option>
                                </select>
                            </div>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Location</label>
                                <input
                                    value={checkLocation}
                                    onChange={(e) => setCheckLocation(e.target.value)}
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Location'
                                />
                            </div>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Condition</label>
                                <input
                                    value={checkCondition}
                                    onChange={(e) => setCheckCondition(e.target.value)}
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Condition'
                                />
                            </div>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Notes</label>
                                <textarea
                                    value={checkNotes}
                                    onChange={(e) => setCheckNotes(e.target.value)}
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Notes'
                                />
                            </div>
                            <div className='mb-2'>
                                <label className='mb-1 block'>Photo (optional)</label>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => setCheckPhoto(e.target.files?.[0] || null)}
                                    className='w-full rounded border px-2 py-1'
                                />
                            </div>
                            <div className='mt-4 flex gap-2'>
                                <button
                                    type='button'
                                    className='rounded bg-gray-200 px-3 py-1'
                                    onClick={() => setShowCheck(false)}>
                                    Cancel
                                </button>
                                <button type='submit' className='rounded bg-blue-600 px-3 py-1 text-white'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
