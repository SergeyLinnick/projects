'use client';

import React, { useState } from 'react';

// Equipment data type
type Equipment = {
    id: string;
    name: string;
    category: string;
    status: 'Active' | 'In Repair' | 'Out of Service' | 'Retired';
    assignedTo: string;
    serialNumber: string;
};

const mockEquipment: Equipment[] = [
    { id: '1', name: 'Drill 123', category: 'Power Tools', status: 'Active', assignedTo: 'OR', serialNumber: 'DR-001' },
    {
        id: '2',
        name: 'Generator X',
        category: 'Electrical',
        status: 'In Repair',
        assignedTo: 'AT',
        serialNumber: 'GR-340'
    },
    {
        id: '3',
        name: 'Pipe Camera',
        category: 'Inspection',
        status: 'Out of Service',
        assignedTo: 'MP',
        serialNumber: 'PC-044'
    },
    {
        id: '4',
        name: 'Ladder 10ft',
        category: 'Safety Gear',
        status: 'Out of Service',
        assignedTo: 'User',
        serialNumber: 'LD-782'
    },
    {
        id: '5',
        name: 'Impact Wrench',
        category: 'Power Tools',
        status: 'Retired',
        assignedTo: 'AK',
        serialNumber: 'IW-556'
    },
    {
        id: '6',
        name: 'Vacuum Pump',
        category: 'HVAC Tools',
        status: 'Active',
        assignedTo: 'User',
        serialNumber: 'VP-992'
    },
    {
        id: '7',
        name: 'Multimeter',
        category: 'Electrical',
        status: 'Active',
        assignedTo: 'User',
        serialNumber: 'MM-025'
    },
    {
        id: '8',
        name: 'Tablet A',
        category: 'IT Equipment',
        status: 'Active',
        assignedTo: 'User',
        serialNumber: 'TB-889'
    },
    {
        id: '9',
        name: 'Compressor',
        category: 'Pneumatic',
        status: 'Active',
        assignedTo: 'User',
        serialNumber: 'CP-301'
    },
    {
        id: '10',
        name: 'Torch Kit',
        category: 'Welding',
        status: 'In Repair',
        assignedTo: 'User',
        serialNumber: 'TK-150'
    }
];

const categories = ['All', ...Array.from(new Set(mockEquipment.map((e) => e.category)))];
const statuses = ['All', 'Active', 'In Repair', 'Out of Service', 'Retired'];
const assignedToOptions = ['All', ...Array.from(new Set(mockEquipment.map((e) => e.assignedTo)))];

const statusColors: Record<Equipment['status'], string> = {
    Active: 'bg-green-500',
    'In Repair': 'bg-yellow-400',
    'Out of Service': 'bg-red-500',
    Retired: 'bg-gray-400'
};

const PAGE_SIZE = 5;

// Add date range and custom field filter helpers
function getDateString(date: Date) {
    return date.toISOString().slice(0, 10);
}

export default function EquipmentList() {
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
    const [category, setCategory] = useState<string[]>(['All']);
    const [status, setStatus] = useState<string[]>(['All']);
    const [assignedTo, setAssignedTo] = useState<string[]>(['All']);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<keyof Equipment>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    // Advanced filters
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [customField, setCustomField] = useState('');
    const [customValue, setCustomValue] = useState('');

    // Filtering (enhanced)
    let filtered = mockEquipment.filter((e) => {
        const categoryMatch = category.includes('All') || category.includes(e.category);
        const statusMatch = status.includes('All') || status.includes(e.status);
        const assignedToMatch = assignedTo.includes('All') || assignedTo.includes(e.assignedTo);
        const searchMatch =
            search === '' ||
            [e.name, e.category, e.serialNumber].some((f) => f.toLowerCase().includes(search.toLowerCase()));
        // Date range (mock: use id as date for demo)
        let dateMatch = true;
        if (dateFrom || dateTo) {
            const fakeDate = new Date(2024, 0, Number(e.id));
            if (dateFrom && fakeDate < new Date(dateFrom)) dateMatch = false;
            if (dateTo && fakeDate > new Date(dateTo)) dateMatch = false;
        }
        // Custom field (mock: only serialNumber)
        let customMatch = true;
        if (customField && customValue) {
            if (customField === 'serialNumber') {
                customMatch = e.serialNumber.toLowerCase().includes(customValue.toLowerCase());
            }
        }
        return categoryMatch && statusMatch && assignedToMatch && searchMatch && dateMatch && customMatch;
    });

    // Sorting
    filtered = filtered.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // Selection
    const allSelected = paged.length > 0 && paged.every((e) => selected.includes(e.id));
    const toggleSelectAll = () => {
        if (allSelected) {
            setSelected(selected.filter((id) => !paged.some((e) => e.id === id)));
        } else {
            setSelected([...selected, ...paged.filter((e) => !selected.includes(e.id)).map((e) => e.id)]);
        }
    };
    const toggleSelect = (id: string) => {
        setSelected(selected.includes(id) ? selected.filter((sid) => sid !== id) : [...selected, id]);
    };

    // Bulk actions
    const handleBulkArchive = () => {
        if (window.confirm(`Archive ${selected.length} items?`)) {
            // In real, update backend; here, just alert
            alert(`Archived: ${selected.join(', ')}`);
            setSelected([]);
        }
    };
    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selected.length} items? This cannot be undone.`)) {
            alert(`Deleted: ${selected.join(', ')}`);
            setSelected([]);
        }
    };
    const handleBulkReassign = () => {
        const to = prompt('Reassign selected to (enter name):');
        if (to) {
            alert(`Reassigned ${selected.length} items to ${to}`);
            setSelected([]);
        }
    };
    const handleBulkExport = () => {
        alert(`Exported ${selected.length} items (mock)`);
    };

    // UI
    return (
        <div className='equipment-list-container p-4'>
            {/* Header: Filters, Search, View Toggle, Add Button */}
            <div className='equipment-list-header mb-4 flex flex-wrap items-center justify-between gap-2'>
                <div className='flex gap-2'>
                    {/* Multi-select filters */}
                    <select
                        multiple
                        value={category}
                        onChange={(e) => {
                            const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
                            setCategory(opts.length ? opts : ['All']);
                            setPage(1);
                        }}>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <select
                        multiple
                        value={status}
                        onChange={(e) => {
                            const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
                            setStatus(opts.length ? opts : ['All']);
                            setPage(1);
                        }}>
                        {statuses.map((stat) => (
                            <option key={stat} value={stat}>
                                {stat}
                            </option>
                        ))}
                    </select>
                    <select
                        multiple
                        value={assignedTo}
                        onChange={(e) => {
                            const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
                            setAssignedTo(opts.length ? opts : ['All']);
                            setPage(1);
                        }}>
                        {assignedToOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Advanced filters */}
                <div className='flex gap-2'>
                    <input
                        type='date'
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className='rounded border px-2 py-1'
                        placeholder='From'
                    />
                    <input
                        type='date'
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className='rounded border px-2 py-1'
                        placeholder='To'
                    />
                    <select
                        value={customField}
                        onChange={(e) => setCustomField(e.target.value)}
                        className='rounded border px-2 py-1'>
                        <option value=''>Custom Field</option>
                        <option value='serialNumber'>Serial Number</option>
                    </select>
                    {customField && (
                        <input
                            type='text'
                            value={customValue}
                            onChange={(e) => setCustomValue(e.target.value)}
                            className='rounded border px-2 py-1'
                            placeholder='Value'
                        />
                    )}
                </div>
                <input
                    type='text'
                    placeholder='Search equipment...'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className='rounded border px-2 py-1'
                />
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => setViewMode('table')}
                        className={viewMode === 'table' ? 'font-bold underline' : ''}>
                        Table
                    </button>
                    <button
                        onClick={() => setViewMode('card')}
                        className={viewMode === 'card' ? 'font-bold underline' : ''}>
                        Card
                    </button>
                    <button className='rounded bg-blue-600 px-3 py-1 text-white'>Add Equipment</button>
                </div>
            </div>

            {/* Bulk Actions */}
            {selected.length > 0 && (
                <div className='bulk-actions-bar mb-2 flex gap-2'>
                    <span>{selected.length} selected</span>
                    <button onClick={handleBulkArchive}>Archive</button>
                    <button onClick={handleBulkReassign}>Reassign</button>
                    <button onClick={handleBulkExport}>Export</button>
                    <button onClick={handleBulkDelete} className='text-red-600'>
                        Delete
                    </button>
                </div>
            )}

            {/* Equipment List: Table or Card View */}
            {viewMode === 'table' ? (
                <div className='equipment-table-view overflow-x-auto'>
                    <table className='w-full border'>
                        <thead>
                            <tr>
                                <th>
                                    <input type='checkbox' checked={allSelected} onChange={toggleSelectAll} />
                                </th>
                                <th
                                    onClick={() => {
                                        setSortBy('name');
                                        setSortDir(sortBy === 'name' && sortDir === 'asc' ? 'desc' : 'asc');
                                    }}
                                    className='cursor-pointer'>
                                    Name
                                </th>
                                <th
                                    onClick={() => {
                                        setSortBy('category');
                                        setSortDir(sortBy === 'category' && sortDir === 'asc' ? 'desc' : 'asc');
                                    }}
                                    className='cursor-pointer'>
                                    Category
                                </th>
                                <th
                                    onClick={() => {
                                        setSortBy('status');
                                        setSortDir(sortBy === 'status' && sortDir === 'asc' ? 'desc' : 'asc');
                                    }}
                                    className='cursor-pointer'>
                                    Status
                                </th>
                                <th
                                    onClick={() => {
                                        setSortBy('assignedTo');
                                        setSortDir(sortBy === 'assignedTo' && sortDir === 'asc' ? 'desc' : 'asc');
                                    }}
                                    className='cursor-pointer'>
                                    Assigned To
                                </th>
                                <th
                                    onClick={() => {
                                        setSortBy('serialNumber');
                                        setSortDir(sortBy === 'serialNumber' && sortDir === 'asc' ? 'desc' : 'asc');
                                    }}
                                    className='cursor-pointer'>
                                    Serial Number
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className='text-center'>
                                        No equipment found.
                                    </td>
                                </tr>
                            ) : (
                                paged.map((e) => (
                                    <tr key={e.id} className='hover:bg-gray-50'>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={selected.includes(e.id)}
                                                onChange={() => toggleSelect(e.id)}
                                            />
                                        </td>
                                        <td>{e.name}</td>
                                        <td>{e.category}</td>
                                        <td>
                                            <span
                                                className={`mr-2 inline-block h-3 w-3 rounded-full align-middle ${statusColors[e.status]}`}></span>
                                            {e.status}
                                        </td>
                                        <td>{e.assignedTo}</td>
                                        <td>{e.serialNumber}</td>
                                        <td>
                                            <button className='mr-2 text-blue-600 hover:underline'>View</button>
                                            <button className='mr-2 text-green-600 hover:underline'>Edit</button>
                                            <button className='text-gray-600 hover:underline'>Archive</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='equipment-card-view grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {paged.length === 0 ? (
                        <div className='card col-span-full rounded border p-4 text-center shadow'>
                            No equipment found.
                        </div>
                    ) : (
                        paged.map((e) => (
                            <div key={e.id} className='card flex flex-col gap-2 rounded border p-4 shadow'>
                                <div className='flex items-center gap-2'>
                                    <span
                                        className={`inline-block h-3 w-3 rounded-full ${statusColors[e.status]}`}></span>
                                    <span className='text-lg font-bold'>{e.name}</span>
                                </div>
                                <div className='text-sm text-gray-600'>{e.category}</div>
                                <div className='text-sm'>
                                    Assigned to: <span className='font-medium'>{e.assignedTo}</span>
                                </div>
                                <div className='text-sm'>Serial: {e.serialNumber}</div>
                                <div className='mt-2 flex gap-2'>
                                    <button className='text-blue-600 hover:underline'>View</button>
                                    <button className='text-green-600 hover:underline'>Edit</button>
                                    <button className='text-gray-600 hover:underline'>Archive</button>
                                </div>
                                <div className='mt-2'>
                                    <input
                                        type='checkbox'
                                        checked={selected.includes(e.id)}
                                        onChange={() => toggleSelect(e.id)}
                                    />{' '}
                                    Select
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            <div className='pagination-controls mt-4 flex justify-center gap-2'>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                    {'<'}
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                    {'>'}
                </button>
            </div>
        </div>
    );
}
