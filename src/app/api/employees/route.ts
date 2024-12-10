import connectDB from "@/configs/database";
import Employee from "@/modals/employee";
import { NextResponse } from "next/server";

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

export async function GET() {
  try {
    const employees = await Employee.find();
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch employees', 
      details: (error as Error).message 
    });
  }
}

export async function POST(req: Request) {
  try {
    const employeeData = await req.json();
    const newEmployee = new Employee(employeeData);
    await newEmployee.save();
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ 
      error: 'Failed to create employee', 
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
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      throw new Error('Employee not found');
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ 
      error: 'Failed to delete employee', 
      details: (error as Error).message 
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json({ 
      error: 'Failed to update employee', 
      details: (error as Error).message 
    });
  }
}

