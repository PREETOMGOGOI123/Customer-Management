import { json } from '@sveltejs/kit';
import { getEnquiries } from '$lib/server/db';

export async function GET() {
    const enquiries = getEnquiries();
    return json(enquiries);
}