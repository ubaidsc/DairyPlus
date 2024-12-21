import connectDB from "@/configs/database";
import Employee from "@/modals/employee";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('userName');

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    try {
        const employee = await Employee.findOne({ userName: username });
        if (!employee) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }

        return NextResponse.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch employee', 
            details: (error as Error).message 
        }, { status: 500 });
    }
}