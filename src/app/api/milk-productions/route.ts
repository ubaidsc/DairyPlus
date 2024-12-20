import connectDB from "@/configs/database";
import MilkProduction from "@/modals/milk-production";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
  try {
    const milkProductions = await MilkProduction.find();
    return NextResponse.json(milkProductions);
  } catch (error) {
    console.error('Error fetching milk productions:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch milk productions', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const milkProductionData = await req.json();
    if (!milkProductionData.cowid) {
      milkProductionData.cowid = `COW-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
    const newMilkProduction = new MilkProduction(milkProductionData);
    await newMilkProduction.save();
    return NextResponse.json(newMilkProduction, { status: 201 });
  } catch (error) {
    console.error('Error creating milk production:', error);
    return NextResponse.json({ 
      error: 'Failed to create milk production', 
      details: (error as Error).message 
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      throw new Error('ID parameter is missing');
    }
    const deletedMilkProduction = await MilkProduction.findByIdAndDelete(id);
    if (!deletedMilkProduction) {
      throw new Error('Milk production not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting milk production:', error);
    return NextResponse.json({ 
      error: 'Failed to delete milk production', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedMilkProduction = await MilkProduction.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedMilkProduction);
  } catch (error) {
    console.error('Error updating milk production:', error);
    return NextResponse.json({ 
      error: 'Failed to update milk production', 
      details: (error as Error).message 
    });
  }
}

