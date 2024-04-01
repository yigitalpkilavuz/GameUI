import { NextRequest, NextResponse } from 'next/server';
import { ActionRequest } from 'types/requests';
import { action } from 'services/blackjackService';

export async function POST(request: NextRequest) {
    try {
        const actionRequest: ActionRequest = await request.json();
        const response = await action(actionRequest);
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
