import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { error } from '@sveltejs/kit';

const dbPath = join(process.cwd(), 'src', 'lib', 'data', 'enquiry.json');

export function getEnquiries() {
    try {
        const jsonString = readFileSync(dbPath, 'utf-8');
        const data = JSON.parse(jsonString);
        if (!data || !data.enquiries) {
            throw new Error('Invalid data structure');
        }
        return data.enquiries;
    } catch (err) {
        console.error('Error reading enquiry data:', err);
        throw error(500, 'Failed to load enquiry data');
    }
}
