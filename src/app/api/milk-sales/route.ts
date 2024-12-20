import connectDB from "@/configs/database";
import MilkSales from "@/modals/milk-sales";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
  try {
    const milkSales = await MilkSales.find();
    return NextResponse.json(milkSales);
  } catch (error) {
    console.error('Error fetching milk sales:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch milk sales', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const milkSalesData = await req.json();
    if (!milkSalesData.milkSalesId) {
      milkSalesData.milkSalesId = `SALE-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
    const newMilkSales = new MilkSales(milkSalesData);
    await newMilkSales.save();
    return NextResponse.json(newMilkSales, { status: 201 });
  } catch (error) {
    console.error('Error creating milk sales:', error);
    return NextResponse.json({ 
      error: 'Failed to create milk sales', 
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
    const deletedMilkSales = await MilkSales.findByIdAndDelete(id);
    if (!deletedMilkSales) {
      throw new Error('Milk sales not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting milk sales:', error);
    return NextResponse.json({ 
      error: 'Failed to delete milk sales', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedMilkSales = await MilkSales.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedMilkSales);
  } catch (error) {
    console.error('Error updating milk sales:', error);
    return NextResponse.json({ 
      error: 'Failed to update milk sales', 
      details: (error as Error).message 
    });
  }
}

