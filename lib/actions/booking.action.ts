'use server';
import connectDB  from "@/lib/mongoose";
import Booking from "@/database/booking.model";

export const createBooking =async ({eventid,slug,email} :{ eventid:string,slug:string,email:string})=>{
try{
await connectDB();
 (await Booking.create({eventid,slug,email}));

return { success: true, message: "Booking created successfully" };
}
catch{
    console.error("Error creating booking");
    return { success: false, message: "Error creating booking" };
}
}