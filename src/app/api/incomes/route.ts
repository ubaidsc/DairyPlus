import connectDB from "@/configs/database";
import Income from "@/modals/incomes";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
  try {
    const incomes = await Income.find();
    return NextResponse.json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch incomes', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const incomeData = await req.json();
    const newIncome = new Income(incomeData);
    await newIncome.save();
    return NextResponse.json(newIncome, { status: 201 });
  } catch (error) {
    console.error('Error creating income:', error);
    return NextResponse.json({ 
      error: 'Failed to create income', 
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
    const deletedIncome = await Income.findByIdAndDelete(id);
    if (!deletedIncome) {
      throw new Error('Income not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting income:', error);
    return NextResponse.json({ 
      error: 'Failed to delete income', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedIncome = await Income.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedIncome);
  } catch (error) {
    console.error('Error updating income:', error);
    return NextResponse.json({ 
      error: 'Failed to update income', 
      details: (error as Error).message 
    });
  }
}
