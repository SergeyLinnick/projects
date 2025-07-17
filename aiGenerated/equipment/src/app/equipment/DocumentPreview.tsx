import React from 'react';

interface DocumentPreviewProps {
    file: {
        name: string;
        url: string;
        type: string;
    };
    style?: React.CSSProperties;
}

const isImage = (type: string) => type.startsWith('image/');
const isPDF = (type: string) => type === 'application/pdf';
const isText = (type: string) => type.startsWith('text/');

const fallbackIcon = (
    <div className='flex h-32 w-32 flex-col items-center justify-center rounded bg-gray-100'>
        <span className='text-4xl text-gray-400'>📄</span>
        <span className='mt-2 text-xs text-gray-500'>No Preview</span>
    </div>
);

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ file, style }) => {
    if (isImage(file.type)) {
        return (
            <img
                src={file.url}
                alt={file.name}
                className='max-h-64 max-w-full rounded object-contain shadow'
                style={style}
            />
        );
    }
    if (isPDF(file.type)) {
        return <iframe src={file.url} title={file.name} className='h-64 w-full rounded shadow' style={style} />;
    }
    if (isText(file.type)) {
        // For mock, just show a placeholder
        return (
            <div className='max-h-64 overflow-auto rounded border bg-gray-50 p-4' style={style}>
                <span className='text-xs text-gray-500'>Text preview not available in mock</span>
            </div>
        );
    }
    return fallbackIcon;
};

export default DocumentPreview;
