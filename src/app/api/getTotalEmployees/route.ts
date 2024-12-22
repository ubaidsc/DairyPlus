import connectDB from "@/configs/database";
import Employee from "@/modals/employee";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
    try {
        const totalEmployees = await Employee.countDocuments();
        return NextResponse.json({ totalEmployees });
    } catch (error) {
        console.error('Error fetching total employees:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch total employees', 
            details: (error as Error).message 
        }, { status: 500 });
    }
}
