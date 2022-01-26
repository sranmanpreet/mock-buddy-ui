export interface Mock {
    id?: string;
    name: string;
    route: string;
    method: string;
    headers: Array<MockHeader>;
    bodyType: string;
    body: string;
    contentType: string;
    status: string;
}

export interface MockHeader {
    key: string;
    value: string;
}