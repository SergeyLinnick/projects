import React, { useState } from 'react';

// Mock initial categories
const initialCategories = [
    {
        id: '1',
        name: 'Power Tools',
        description: 'Portable power tools',
        color: '#3b82f6',
        icon: '🔧',
        customFields: ['Power', 'RPM'],
        inUse: true
    },
    {
        id: '2',
        name: 'Electrical',
        description: 'Electrical equipment',
        color: '#f59e42',
        icon: '⚡',
        customFields: ['Voltage', 'Amperage'],
        inUse: false
    },
    {
        id: '3',
        name: 'Safety Gear',
        description: 'Safety and protection',
        color: '#10b981',
        icon: '🦺',
        customFields: [],
        inUse: false
    }
];

const allIcons = ['🔧', '⚡', '🦺', '🔬', '🛠️', '🧰', '🧯', '🔩'];

export default function CategoriesManager() {
    const [categories, setCategories] = useState(initialCategories);
    const [editing, setEditing] = useState(null as null | string);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', description: '', color: '#3b82f6', icon: '🔧', customFields: '' });
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [error, setError] = useState('');

    // Open form for add or edit
    const openForm = (cat?: (typeof initialCategories)[0]) => {
        if (cat) {
            setEditing(cat.id);
            setForm({
                name: cat.name,
                description: cat.description,
                color: cat.color,
                icon: cat.icon,
                customFields: cat.customFields.join(', ')
            });
        } else {
            setEditing(null);
            setForm({ name: '', description: '', color: '#3b82f6', icon: '🔧', customFields: '' });
        }
        setShowForm(true);
        setError('');
    };

    // Save category
    const saveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return setError('Name is required');
        if (editing) {
            setCategories((cats) =>
                cats.map((cat) =>
                    cat.id === editing
                        ? {
                              ...cat,
                              name: form.name,
                              description: form.description,
                              color: form.color,
                              icon: form.icon,
                              customFields: form.customFields
                                  .split(',')
                                  .map((f) => f.trim())
                                  .filter(Boolean)
                          }
                        : cat
                )
            );
        } else {
            setCategories((cats) => [
                ...cats,
                {
                    id: (Math.random() * 100000).toFixed(0),
                    name: form.name,
                    description: form.description,
                    color: form.color,
                    icon: form.icon,
                    customFields: form.customFields
                        .split(',')
                        .map((f) => f.trim())
                        .filter(Boolean),
                    inUse: false
                }
            ]);
        }
        setShowForm(false);
        setEditing(null);
        setForm({ name: '', description: '', color: '#3b82f6', icon: '🔧', customFields: '' });
        setError('');
    };

    // Delete category
    const confirmDelete = (id: string) => {
        const cat = categories.find((c) => c.id === id);
        if (cat?.inUse) {
            setError('Cannot delete a category that is in use.');
            setDeleteId(null);
            return;
        }
        setCategories((cats) => cats.filter((c) => c.id !== id));
        setDeleteId(null);
        setError('');
    };

    return (
        <div className='categories-manager mx-auto max-w-2xl rounded border bg-white p-4 shadow'>
            <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-xl font-bold'>Equipment Categories</h2>
                <button className='rounded bg-blue-600 px-3 py-1 text-white' onClick={() => openForm()}>
                    Add Category
                </button>
            </div>
            {error && <div className='mb-2 text-red-600'>{error}</div>}
            <table className='mb-4 w-full border'>
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Color</th>
                        <th>Custom Fields</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id} className='hover:bg-gray-50'>
                            <td className='text-center text-2xl'>{cat.icon}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                                <span
                                    className='inline-block h-6 w-6 rounded-full border'
                                    style={{ background: cat.color }}></span>
                            </td>
                            <td>{cat.customFields.join(', ')}</td>
                            <td>
                                <button className='mr-2 text-green-600 hover:underline' onClick={() => openForm(cat)}>
                                    Edit
                                </button>
                                <button className='text-red-600 hover:underline' onClick={() => setDeleteId(cat.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow'>
                        <button className='absolute top-2 right-2 text-gray-500' onClick={() => setShowForm(false)}>
                            &times;
                        </button>
                        <h3 className='mb-2 text-lg font-bold'>{editing ? 'Edit' : 'Add'} Category</h3>
                        <form onSubmit={saveCategory}>
                            <div className='mb-2'>
                                <input
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Name'
                                    value={form.name}
                                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                />
                            </div>
                            <div className='mb-2'>
                                <input
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Description'
                                    value={form.description}
                                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                />
                            </div>
                            <div className='mb-2 flex items-center gap-2'>
                                <span>Icon:</span>
                                <select
                                    value={form.icon}
                                    onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                                    className='rounded border px-2 py-1'>
                                    {allIcons.map((ic) => (
                                        <option key={ic} value={ic}>
                                            {ic}
                                        </option>
                                    ))}
                                </select>
                                <span>Color:</span>
                                <input
                                    type='color'
                                    value={form.color}
                                    onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                                    className='h-8 w-8 rounded border'
                                />
                            </div>
                            <div className='mb-2'>
                                <input
                                    className='w-full rounded border px-2 py-1'
                                    placeholder='Custom Fields (comma separated)'
                                    value={form.customFields}
                                    onChange={(e) => setForm((f) => ({ ...f, customFields: e.target.value }))}
                                />
                            </div>
                            <div className='mt-4 flex gap-2'>
                                <button
                                    type='button'
                                    className='rounded bg-gray-200 px-3 py-1'
                                    onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                                <button type='submit' className='rounded bg-blue-600 px-3 py-1 text-white'>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Dialog */}
            {deleteId && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black'>
                    <div className='relative w-full max-w-md rounded bg-white p-6 shadow'>
                        <h3 className='mb-4 text-lg font-bold'>Confirm Delete</h3>
                        <p>Are you sure you want to delete this category?</p>
                        <div className='mt-4 flex gap-2'>
                            <button className='rounded bg-gray-200 px-3 py-1' onClick={() => setDeleteId(null)}>
                                Cancel
                            </button>
                            <button
                                className='rounded bg-red-600 px-3 py-1 text-white'
                                onClick={() => confirmDelete(deleteId!)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
