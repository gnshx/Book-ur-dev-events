import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    secure: true,
});
function normalizeMode(mode: string): string {
    const lower = mode.toLowerCase();

    if (lower.includes("hybrid")) return "hybrid";
    if (lower.includes("online")) return "online";
    if (lower.includes("offline")) return "offline";

    return lower;
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ events }, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to fetch events",
                error: error instanceof Error ? error.message : "Unknown",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // Read body ONLY ONCE
        const formData = await req.formData();

        const body: Record<string, unknown> = {};

        for (const [key, value] of formData.entries()) {
            if (key === "image") continue;

            if (body[key] !== undefined) {
                if (!Array.isArray(body[key])) {
                    body[key] = [body[key]];
                }

                (body[key] as unknown[]).push(value);
            } else {
                body[key] = value;
            }
        }

     const tags =
  typeof body.tags === "string"
    ? body.tags
        .split("\n")
        .map(tag => tag.trim())
        .filter(Boolean)
    : body.tags;

const agenda =
  typeof body.agenda === "string"
    ? body.agenda
        .split("\n")
        .map(item => item.trim())
        .filter(Boolean)
    : body.agenda;
    
        if (typeof body.mode === "string") {
            body.mode = normalizeMode(body.mode);
        }

        if (body.organiser && !body.organizer) {
            body.organizer = body.organiser;
            delete body.organiser;
        }

        const file = formData.get("image") as File | null;

        if (!file || file.size === 0) {
            return NextResponse.json(
                { message: "Image file is required." },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        console.log("Cloudinary URL:", process.env.CLOUDINARY_URL);
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "dev_event_images",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) return reject(error);

                    resolve(result);
                }
            );

            stream.end(buffer);
        });

        body.image = uploadResult.secure_url;

        console.log(body);

        const createdEvent = await Event.create({ ...body, tags, agenda });

        return NextResponse.json(
            {
                message: "Event created successfully",
                event: createdEvent,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code: number }).code === 11000
        ) {
            return NextResponse.json(
                {
                    message: "An event with that title already exists.",
                },
                { status: 409 }
            );
        }

        if (error instanceof Error && error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    error: error.message,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: "Event creation failed",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}