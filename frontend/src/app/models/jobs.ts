export class Job{
    JobID: number
    agency: string
    id: number
    period: string
    client: string;
    status: string; // R - Requested, A- active, F - finished 
    accepted: string; // S - sent, A - accepted, D - declined
    offer: string;
    employees: number;
    reason: string;
}