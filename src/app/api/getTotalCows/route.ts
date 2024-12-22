import connectDB from "@/configs/database";
import Cow from "@/modals/cow";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
    try {
        const totalCows = await Cow.countDocuments();
        return NextResponse.json({ totalCows });
    } catch (error) {
        console.error('Error fetching total cows:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch total cows', 
            details: (error as Error).message 
        }, { status: 500 });
    }
}
