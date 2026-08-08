import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const textInput = formData.get('text_input') as string | null;
  const audioFile = formData.get('audio_file') as File | null;

  const flaskFormData = new FormData();

  if (textInput) {
    flaskFormData.append('text_input', textInput);
  }

  if (audioFile) {
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const blob = new Blob([buffer], { type: audioFile.type });
    flaskFormData.append('audio_file', blob, audioFile.name);
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/analyze-symptoms`;
    console.log("Fetching from Flask URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: flaskFormData as any,
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Flask response as JSON. Raw response:", responseText);
      return NextResponse.json({
        success: false,
        error: "Flask returned non-JSON response",
        status: response.status,
        body: responseText.substring(0, 1000)
      }, { status: 403 });
    }

    if (data.response) {
      const result =
        typeof data.response === "string"
          ? data.response.trim()
          : JSON.stringify(data.response);

      return NextResponse.json({
        success: true,
        result,
        transcript: data.transcript || null,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Flask returned no response.",
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error contacting Flask app:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to reach Flask server',
    }, { status: 500 });
  }
}

