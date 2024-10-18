import { json } from "@sveltejs/kit";
import { getEnquiries, addEnquiry, deleteEnquiry } from '$lib/server/db';

export async function GET() {
    const enquiries = getEnquiries();
    return json(enquiries);
}

export async function POST({ request }) {
    try {
        const newEnquiry = await request.json();
        if (!newEnquiry || typeof newEnquiry !== 'object') {
            throw new Error('Invalid enquiry data');
        }

        const createdEnquiry = addEnquiry(newEnquiry);
        return json(createdEnquiry, { status: 201 });
    } catch (err) {
        return json({ error: 'Failed to create enquiry', details: err.message }, { status: 500 });
    }
}

