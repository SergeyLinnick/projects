import React, { useRef, useState } from 'react';

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const DOCUMENT_TYPES = ['Manual', 'Warranty', 'Inspection Report', 'Service Record', 'Other'];

function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

interface UploadFile {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'done' | 'error';
    error?: string;
    type: string;
    description: string;
}

const DocumentUpload: React.FC = () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (fileList: FileList) => {
        const newFiles: UploadFile[] = [];
        Array.from(fileList).forEach((file) => {
            let error = '';
            if (!ALLOWED_TYPES.includes(file.type)) {
                error = 'Unsupported file type';
            } else if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                error = `File too large (max ${MAX_FILE_SIZE_MB}MB)`;
            }
            newFiles.push({
                file,
                progress: 0,
                status: error ? 'error' : 'pending',
                error,
                type: DOCUMENT_TYPES[0],
                description: ''
            });
        });
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const startUpload = (idx: number) => {
        setFiles((prev) =>
            prev.map((f, i) => (i === idx ? { ...f, status: 'uploading', progress: 0, error: undefined } : f))
        );
        // Mock upload
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30 + 10;
            setFiles((prev) =>
                prev.map((f, i) =>
                    i === idx
                        ? {
                              ...f,
                              progress: Math.min(progress, 100),
                              status: progress >= 100 ? 'done' : 'uploading'
                          }
                        : f
                )
            );
            if (progress >= 100) clearInterval(interval);
        }, 400);
    };

    const removeFile = (idx: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const updateFileMeta = (idx: number, field: 'type' | 'description', value: string) => {
        setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));
    };

    return (
        <div className='mx-auto max-w-2xl rounded-lg border bg-white p-4 shadow-md'>
            <h2 className='mb-2 text-lg font-semibold'>Upload Documents</h2>
            <div
                className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                } mb-4 cursor-pointer`}
                onClick={() => inputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}>
                <input
                    type='file'
                    multiple
                    ref={inputRef}
                    className='hidden'
                    onChange={onFileChange}
                    accept={ALLOWED_TYPES.join(',')}
                />
                <p className='text-gray-600'>
                    Drag and drop files here, or <span className='text-blue-600 underline'>browse</span>
                </p>
                <p className='mt-1 text-xs text-gray-400'>PDF, images, Word docs. Max {MAX_FILE_SIZE_MB}MB each.</p>
            </div>
            {files.length > 0 && (
                <div className='space-y-4'>
                    {files.map((f, idx) => (
                        <div
                            key={idx}
                            className='relative flex flex-col items-center gap-3 rounded border bg-gray-50 p-3 md:flex-row'>
                            <div className='min-w-0 flex-1'>
                                <div className='flex items-center gap-2'>
                                    <span className='max-w-xs truncate font-medium text-gray-700'>{f.file.name}</span>
                                    <span className='text-xs text-gray-400'>({formatBytes(f.file.size)})</span>
                                    {f.status === 'done' && (
                                        <span className='ml-2 text-xs font-semibold text-green-600'>Uploaded</span>
                                    )}
                                    {f.status === 'error' && (
                                        <span className='ml-2 text-xs font-semibold text-red-600'>{f.error}</span>
                                    )}
                                </div>
                                <div className='mt-2 flex gap-2'>
                                    <select
                                        className='rounded border px-2 py-1 text-sm'
                                        value={f.type}
                                        onChange={(e) => updateFileMeta(idx, 'type', e.target.value)}>
                                        {DOCUMENT_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type='text'
                                        className='flex-1 rounded border px-2 py-1 text-sm'
                                        placeholder='Description'
                                        value={f.description}
                                        onChange={(e) => updateFileMeta(idx, 'description', e.target.value)}
                                    />
                                </div>
                                {f.status === 'uploading' && (
                                    <div className='mt-2 h-2 w-full rounded bg-gray-200'>
                                        <div
                                            className='h-2 rounded bg-blue-500'
                                            style={{ width: `${f.progress}%` }}></div>
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                {f.status === 'pending' && !f.error && (
                                    <button
                                        className='rounded bg-blue-600 px-3 py-1 text-sm text-white'
                                        onClick={() => startUpload(idx)}>
                                        Upload
                                    </button>
                                )}
                                <button
                                    className='text-xs text-red-500 hover:underline'
                                    onClick={() => removeFile(idx)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentUpload;
