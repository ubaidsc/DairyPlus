import connectDB from "@/configs/database";
import Expenditure from "@/modals/expenditure";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
    try {
        const highestExpenditure = await Expenditure.findOne().sort({ amount: -1 });
        return NextResponse.json({ highestExpenditure });
    } catch (error) {
        console.error('Error fetching highest expenditure:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch highest expenditure', 
            details: (error as Error).message 
        }, { status: 500 });
    }
}
