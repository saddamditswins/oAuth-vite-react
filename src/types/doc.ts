export interface IDoc {
    file: File,
    document_typ: string
}

export interface IDocGet {
    filepath: string
}

interface DocumentMetadata {
    totalCount: number;
    totalPages: number;
}

export interface IDocument {
    _id: string;
    user_id: string;
    filepath: string;
    name: string;
    upload_date: string;
    filesize: string;
    document_type: string;
    mimetype: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export interface IDocumentResponse {
    list: IDocument[];
    metadata: DocumentMetadata;
}
