import React, { useState } from 'react';

const MOCK_DOCUMENTS = [
    {
        id: '1',
        name: 'Manual.pdf',
        type: 'Manual',
        size: 1024 * 1024 * 2,
        uploadedAt: new Date('2024-06-01'),
        url: '#',
        status: 'active'
    },
    {
        id: '2',
        name: 'Warranty.jpg',
        type: 'Warranty',
        size: 1024 * 500,
        uploadedAt: new Date('2024-06-10'),
        url: '#',
        status: 'active'
    },
    {
        id: '3',
        name: 'Inspection.docx',
        type: 'Inspection Report',
        size: 1024 * 1024,
        uploadedAt: new Date('2024-06-15'),
        url: '#',
        status: 'archived'
    }
];

const DOCUMENT_TYPES = ['All', 'Manual', 'Warranty', 'Inspection Report', 'Service Record', 'Other'];

function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const DocumentList: React.FC = () => {
    const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
    const [typeFilter, setTypeFilter] = useState('All');
    const [sortBy, setSortBy] = useState<'name' | 'uploadedAt'>('uploadedAt');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [search, setSearch] = useState('');

    const filtered = documents
        .filter((doc) => (typeFilter === 'All' ? true : doc.type === typeFilter))
        .filter((doc) => (search.trim() === '' ? true : doc.name.toLowerCase().includes(search.toLowerCase())))
        .sort((a, b) => {
            let cmp = 0;
            if (sortBy === 'name') {
                cmp = a.name.localeCompare(b.name);
            } else {
                cmp = a.uploadedAt.getTime() - b.uploadedAt.getTime();
            }
            return sortDir === 'asc' ? cmp : -cmp;
        });

    const handleDelete = (id: string) => {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    };

    const handleArchive = (id: string) => {
        setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, status: 'archived' } : doc)));
    };

    const handleDownload = (id: string) => {
        // For mock, just alert. In real, trigger download.
        const doc = documents.find((d) => d.id === id);
        if (doc) alert(`Downloading ${doc.name}`);
    };

    return (
        <div className='mx-auto mt-6 max-w-3xl rounded-lg border bg-white p-4 shadow-md'>
            <h2 className='mb-4 text-lg font-semibold'>Documents</h2>
            <div className='mb-4 flex flex-col items-center gap-2 md:flex-row'>
                <input
                    type='text'
                    className='flex-1 rounded border px-2 py-1 text-sm'
                    placeholder='Search by name...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className='rounded border px-2 py-1 text-sm'
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}>
                    {DOCUMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <div className='flex items-center gap-1'>
                    <button
                        className={`rounded border px-2 py-1 text-sm ${
                            sortBy === 'name' ? 'border-blue-400 bg-blue-100' : 'border-gray-300'
                        }`}
                        onClick={() => setSortBy('name')}>
                        Name
                    </button>
                    <button
                        className={`rounded border px-2 py-1 text-sm ${
                            sortBy === 'uploadedAt' ? 'border-blue-400 bg-blue-100' : 'border-gray-300'
                        }`}
                        onClick={() => setSortBy('uploadedAt')}>
                        Date
                    </button>
                    <button
                        className='rounded border border-gray-300 px-2 py-1 text-sm'
                        onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
                        title='Toggle sort direction'>
                        {sortDir === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full border text-sm'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='p-2 text-left'>Name</th>
                            <th className='p-2 text-left'>Type</th>
                            <th className='p-2 text-left'>Size</th>
                            <th className='p-2 text-left'>Uploaded</th>
                            <th className='p-2 text-left'>Status</th>
                            <th className='p-2 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className='p-4 text-center text-gray-400'>
                                    No documents found.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((doc) => (
                                <tr key={doc.id} className='border-t'>
                                    <td className='max-w-xs truncate p-2 font-medium text-blue-700'>{doc.name}</td>
                                    <td className='p-2'>{doc.type}</td>
                                    <td className='p-2'>{formatBytes(doc.size)}</td>
                                    <td className='p-2'>{doc.uploadedAt.toLocaleDateString()}</td>
                                    <td className='p-2'>
                                        {doc.status === 'archived' ? (
                                            <span className='text-yellow-600'>Archived</span>
                                        ) : (
                                            <span className='text-green-600'>Active</span>
                                        )}
                                    </td>
                                    <td className='flex gap-2 p-2'>
                                        <button
                                            className='text-blue-600 hover:underline'
                                            onClick={() => handleDownload(doc.id)}>
                                            Download
                                        </button>
                                        {doc.status !== 'archived' && (
                                            <button
                                                className='text-yellow-600 hover:underline'
                                                onClick={() => handleArchive(doc.id)}>
                                                Archive
                                            </button>
                                        )}
                                        <button
                                            className='text-red-600 hover:underline'
                                            onClick={() => handleDelete(doc.id)}>
                                            Delete
                                        </button>
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

export default DocumentList;
