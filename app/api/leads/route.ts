import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, bhkPreference, project, source } = await req.json();

    // Ensure required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare data for Privyr
    const payload = {
      name,
      email,
      phone,
      message: `Project: ${project}\nBHK Preference: ${bhkPreference}\nSource: ${source}`,
    };

    // SEND LEAD TO PRIVYR
    const privyrResponse = await fetch(
      "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/5xrM2juN",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!privyrResponse.ok) {
      console.error("Privyr submission failed");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
