import fs from 'node:fs';
import { join } from 'node:path';
import { error } from '@sveltejs/kit';

const dbPath = join(process.cwd(), 'src', 'lib', 'data', 'enquiries.json');

export function getEnquiries() {
    try {
        const jsonString = fs.readFileSync(dbPath, 'utf-8');
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

    export function addEnquiry(newEnquiry) {
        try {
            let data;
            try {
                const jsonString = fs.readFileSync(dbPath, 'utf-8');
                data = JSON.parse(jsonString);
            } catch (readError) {
                console.error('Error reading file:', readError);
                // If file doesn't exist or is empty, initialize with empty array
                data = { enquiries: [] };
            }

            if (!data || !Array.isArray(data.enquiries)) {
                data = { enquiries: [] };
            }

            data.enquiries.unshift(newEnquiry);

            console.log('Writing updated data to file');
            fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
            return newEnquiry;
        } catch (err) {
            throw error(500, 'Failed to add new enquiry');
        }
    }

  