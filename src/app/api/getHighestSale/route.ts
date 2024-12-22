import connectDB from "@/configs/database";
import Sale from "@/modals/incomes";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
    try {
        const highestSale = await Sale.findOne().sort({ amount: -1 });
        return NextResponse.json({ highestSale });
    } catch (error) {
        console.error('Error fetching highest sale:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch highest sale', 
            details: (error as Error).message 
        }, { status: 500 });
    }
}
