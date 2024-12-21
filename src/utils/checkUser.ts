"use server";
import { auth } from "@/auth";


const checkUser=async()=>{
    const session = await auth();
    if (session?.user) {
        console.log(session, 'session.user-------------------------');
        return session.user;
    }else{
        return false;
    }
}
export default checkUser;