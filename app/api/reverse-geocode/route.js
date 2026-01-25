import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing lat or lng' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${process.env.OPENCAGE_API_KEY}&language=en`
    );

    if (!res.ok) {
      console.error('OpenCage status:', res.status);
      return NextResponse.json(
        { error: 'OpenCage request failed' },
        { status: 500 }
      );
    }

    const result = await res.json(); 
    const location = result.results?.[0];

    if (!location) {
      return NextResponse.json(
        { error: 'No results found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      country: location.components.country,
      iso3: location.components['ISO_3166-1_alpha-3'],
    });
  } catch (err) {
    console.error('Reverse geocode error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
