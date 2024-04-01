import { NextRequest, NextResponse } from 'next/server';
import {AuthRequest} from '../../../types/requests';
import {auth} from "../../../services/authService";

export async function POST(request: NextRequest) {
    try {
        console.log("REQUEST")
        console.log(request)
        const authRequest: AuthRequest = await request.json();
        const response = await auth(authRequest);
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
