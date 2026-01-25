import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing coordinates' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lng}&aqi=no`
    );

    if (!res.ok) {
      throw new Error('Weather API failed');
    }

    const data = await res.json();
    const weather = data.current;

    return NextResponse.json({
      condition: weather.condition,
      temp: weather.temp_c,
      feelsLike: weather.feelslike_c,
      wind: weather.wind_kph,
      humidity: weather.humidity,
      lastUpdated: weather.last_updated,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
