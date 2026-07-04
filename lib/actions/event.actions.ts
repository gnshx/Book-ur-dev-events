'use server';
import Event from "@/database/event.model";
import connectDB from "../mongoose";

export interface EventData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllEvents(): Promise<EventData[]> {
  await connectDB();
  return Event.find({}).sort({ createdAt: -1 }).lean<EventData[]>();
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  await connectDB();
  return Event.findOne({ slug }).lean<EventData>();
}

export const getsimilareventsbyslug = async (slug: string) => {
try{
await connectDB();

const event = await Event.findOne({slug: slug});
 return await Event.find({id: {$ne: event?.id}, tags: {$ne: event?.tags}}).lean();

}catch(error){
return[];
}
}
