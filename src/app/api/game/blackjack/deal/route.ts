import { NextRequest, NextResponse } from 'next/server';
import { deal } from 'services/blackjackService';
import { DealRequest } from 'types/requests';

export async function POST(request: NextRequest) {
    try {
        const dealRequest: DealRequest = await request.json();
        const response = await deal(dealRequest);
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
