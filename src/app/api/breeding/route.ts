import connectDB from "@/configs/database";
import Breeding from "@/modals/breeding";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
  try {
    const breedings = await Breeding.find();
    return NextResponse.json(breedings);
  } catch (error) {
    console.error('Error fetching breedings:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch breedings', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const breedingData = await req.json();
    const newBreeding = new Breeding(breedingData);
    await newBreeding.save();
    return NextResponse.json(newBreeding, { status: 201 });
  } catch (error) {
    console.error('Error creating breeding:', error);
    return NextResponse.json({ 
      error: 'Failed to create breeding', 
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
    const deletedBreeding = await Breeding.findByIdAndDelete(id);
    if (!deletedBreeding) {
      throw new Error('Breeding not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting breeding:', error);
    return NextResponse.json({ 
      error: 'Failed to delete breeding', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedBreeding = await Breeding.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedBreeding);
  } catch (error) {
    console.error('Error updating breeding:', error);
    return NextResponse.json({ 
      error: 'Failed to update breeding', 
      details: (error as Error).message 
    });
  }
}

