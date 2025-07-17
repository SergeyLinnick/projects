// Mock Document Storage Service
// Replace with real cloud storage integration (e.g., AWS S3, Azure Blob Storage) in the future

export interface DocumentMeta {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    uploadedAt: Date;
    status: 'active' | 'archived';
}

// Simulated in-memory store
let mockDocuments: DocumentMeta[] = [
    {
        id: '1',
        name: 'Manual.pdf',
        type: 'Manual',
        size: 1024 * 1024 * 2,
        url: '#',
        uploadedAt: new Date('2024-06-01'),
        status: 'active'
    },
    {
        id: '2',
        name: 'Warranty.jpg',
        type: 'Warranty',
        size: 1024 * 500,
        url: '#',
        uploadedAt: new Date('2024-06-10'),
        status: 'active'
    },
    {
        id: '3',
        name: 'Inspection.docx',
        type: 'Inspection Report',
        size: 1024 * 1024,
        url: '#',
        uploadedAt: new Date('2024-06-15'),
        status: 'archived'
    }
];

function generateId() {
    return Math.random().toString(36).slice(2, 10);
}

export const documentStorageService = {
    async list(): Promise<DocumentMeta[]> {
        // TODO: Add authentication/access control
        return mockDocuments;
    },
    async upload(file: File, meta: { type: string; description: string }): Promise<DocumentMeta> {
        // TODO: Add authentication, secure upload, and real storage
        // Simulate upload delay
        await new Promise((res) => setTimeout(res, 800));
        const doc: DocumentMeta = {
            id: generateId(),
            name: file.name,
            type: meta.type,
            size: file.size,
            url: URL.createObjectURL(file), // In real, get from storage provider
            uploadedAt: new Date(),
            status: 'active'
        };
        mockDocuments = [doc, ...mockDocuments];
        return doc;
    },
    async delete(id: string): Promise<void> {
        // TODO: Add authentication and secure delete
        mockDocuments = mockDocuments.filter((d) => d.id !== id);
    },
    async archive(id: string): Promise<void> {
        mockDocuments = mockDocuments.map((d) => (d.id === id ? { ...d, status: 'archived' } : d));
    },
    async download(id: string): Promise<void> {
        // TODO: Implement secure download
        const doc = mockDocuments.find((d) => d.id === id);
        if (doc) {
            // For mock, just open the URL
            window.open(doc.url, '_blank');
        } else {
            throw new Error('Document not found');
        }
    }
};
