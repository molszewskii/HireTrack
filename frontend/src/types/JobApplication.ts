export interface JobApplication{
    id: number;
    company_name: string;
    position: string;
    status: string;
    applied_date: string;
    offer_url?: string;
    notes?: string;
    }