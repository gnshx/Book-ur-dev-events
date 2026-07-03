'use server';
import Event from "@/database/event.model";
import connectDB from "../mongoose";

export const getsimilareventsbyslug = async (slug: string) => {
try{
await connectDB();

const event = await Event.findOne({slug: slug});
 return await Event.find({id: {$ne: event?.id}, tags: {$ne: event?.tags}}).lean();

}catch(error){
return[];
}
}
