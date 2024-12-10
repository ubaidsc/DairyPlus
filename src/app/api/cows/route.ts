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
    const cows = await Cow.find();
    return NextResponse.json(cows);
  } catch (error) {
    console.error('Error fetching cows:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch cows', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const cowData = await req.json();
    if (!cowData.cowid) {
      cowData.cowid = `COW-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
    const newCow = new Cow(cowData);
    await newCow.save();
    return NextResponse.json(newCow, { status: 201 });
  } catch (error) {
    console.error('Error creating cow:', error);
    return NextResponse.json({ 
      error: 'Failed to create cow', 
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
    const deletedCow = await Cow.findByIdAndDelete(id);
    if (!deletedCow) {
      throw new Error('Cow not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting cow:', error);
    return NextResponse.json({ 
      error: 'Failed to delete cow', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedCow = await Cow.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedCow);
  } catch (error) {
    console.error('Error updating cow:', error);
    return NextResponse.json({ 
      error: 'Failed to update cow', 
      details: (error as Error).message 
    });
  }
}

