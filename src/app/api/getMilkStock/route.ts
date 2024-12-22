import connectDB from "@/configs/database";
import MilkStock from "@/modals/milk-production";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
    try {
        const milkStocks = await MilkStock.find();
        const totalMilk = milkStocks.reduce((sum, entry) => sum + entry.totalMilk, 0);
        return NextResponse.json({ totalMilk });
    } catch (error) {
        console.error('Error fetching milk stock:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch milk stock', 
            details: (error as Error).message 
        }, { status: 500 });
    }
}
