import connectDB from "@/configs/database";
import Health from "@/modals/health";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
  try {
    const healthRecords = await Health.find();
    return NextResponse.json(healthRecords);
  } catch (error) {
    console.error('Error fetching health records:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch health records', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const healthData = await req.json();
    const newHealthRecord = new Health(healthData);
    await newHealthRecord.save();
    return NextResponse.json(newHealthRecord, { status: 201 });
  } catch (error) {
    console.error('Error creating health record:', error);
    return NextResponse.json({ 
      error: 'Failed to create health record', 
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
    const deletedHealthRecord = await Health.findByIdAndDelete(id);
    if (!deletedHealthRecord) {
      throw new Error('Health record not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting health record:', error);
    return NextResponse.json({ 
      error: 'Failed to delete health record', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedHealthRecord = await Health.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedHealthRecord);
  } catch (error) {
    console.error('Error updating health record:', error);
    return NextResponse.json({ 
      error: 'Failed to update health record', 
      details: (error as Error).message 
    });
  }
}

