export interface Project {
    id: number;
    name: string;
    budget: number;
    status: 'Open' | 'Closed' | 'Abandoned';
}
