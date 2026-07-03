import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";

/** URL-friendly slug: lowercase letters, numbers, and hyphens */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 100;

/** Serializable event shape returned by the API */
interface EventJSON {
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

interface ApiErrorResponse {
  message: string;
  error?: string;
}

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type SlugValidationResult =
  | { ok: true; slug: string }
  | { ok: false; message: string };

/**
 * Validates and normalizes a slug from the route parameter.
 * Returns a normalized lowercase slug or an error message.
 */
function validateSlug(raw: string | undefined): SlugValidationResult {
  if (raw === undefined || raw.trim() === "") {
    return { ok: false, message: "Event slug is required." };
  }

  const slug = raw.trim().toLowerCase();

  if (slug.length > MAX_SLUG_LENGTH) {
    return { ok: false, message: "Event slug is too long." };
  }

  if (!SLUG_PATTERN.test(slug)) {
    return {
      ok: false,
      message:
        "Event slug format is invalid. Use lowercase letters, numbers, and hyphens only.",
    };
  }

  return { ok: true, slug };
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
): Promise<NextResponse<{ event: EventJSON } | ApiErrorResponse>> {
  try {
    const { slug: rawSlug } = await context.params;
    const slugResult = validateSlug(rawSlug);

    if (!slugResult.ok) {
      return NextResponse.json(
        { message: slugResult.message },
        { status: 400 }
      );
    }

    await connectDB();

    const event = await Event.findOne({ slug: slugResult.slug }).lean<EventJSON>();

    if (!event) {
      return NextResponse.json(
        { message: `No event found with slug "${slugResult.slug}".` },
        { status: 404 }
      );
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/events/[slug]]", error);

    return NextResponse.json(
      {
        message: "Failed to fetch event.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
