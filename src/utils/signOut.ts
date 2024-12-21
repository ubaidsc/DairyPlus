"use server"
import { signOut } from "@/auth";
export async function LogOut() {
   return await signOut();
}