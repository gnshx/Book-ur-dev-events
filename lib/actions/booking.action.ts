'use server';
import connectDB from "@/lib/mongoose";
import Booking from "@/database/booking.model";

export async function getRegistrationCountByEventId(
  eventId: string
): Promise<number> {
  await connectDB();
  return Booking.countDocuments({ eventId });
}

export const createBooking = async ({
  eventid,
  email,
}: {
  eventid: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();
    await Booking.create({ eventId: eventid, email });

    return { success: true, message: "Booking created successfully" };
  } catch (error) {
    console.error("Error creating booking", error);
    return { success: false, message: "Error creating booking" };
  }
};