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
    const expenditures = await Expenditure.find();
    return NextResponse.json(expenditures);
  } catch (error) {
    console.error('Error fetching expenditures:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch expenditures', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const expenditureData = await req.json();
    const newExpenditure = new Expenditure(expenditureData);
    await newExpenditure.save();
    return NextResponse.json(newExpenditure, { status: 201 });
  } catch (error) {
    console.error('Error creating expenditure:', error);
    return NextResponse.json({ 
      error: 'Failed to create expenditure', 
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
    const deletedExpenditure = await Expenditure.findByIdAndDelete(id);
    if (!deletedExpenditure) {
      throw new Error('Expenditure not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting expenditure:', error);
    return NextResponse.json({ 
      error: 'Failed to delete expenditure', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedExpenditure = await Expenditure.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedExpenditure);
  } catch (error) {
    console.error('Error updating expenditure:', error);
    return NextResponse.json({ 
      error: 'Failed to update expenditure', 
      details: (error as Error).message 
    });
  }
}
