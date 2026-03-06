import { NextResponse } from 'next/server';

const FALLBACK_DATA = [
  {
    keywords: ['restaurant', 'dining', 'food'],
    places: [
      { title: "The Refectory Restaurant & Bistro", uri: "https://www.google.com/maps/search/?api=1&query=The+Refectory+Restaurant+Bistro+Columbus+OH" },
      { title: "Lindey's", uri: "https://www.google.com/maps/search/?api=1&query=Lindeys+Columbus+OH" },
      { title: "Hyde Park Prime Steakhouse", uri: "https://www.google.com/maps/search/?api=1&query=Hyde+Park+Prime+Steakhouse+Upper+Arlington+OH" },
      { title: "The Avenue Steak Tavern", uri: "https://www.google.com/maps/search/?api=1&query=The+Avenue+Steak+Tavern+Grandview+Heights" }
    ]
  },
  {
    keywords: ['park', 'nature', 'green'],
    places: [
      { title: "Fancyburg Park", uri: "https://www.google.com/maps/search/?api=1&query=Fancyburg+Park+Upper+Arlington+OH" },
      { title: "Northam Park", uri: "https://www.google.com/maps/search/?api=1&query=Northam+Park+Upper+Arlington+OH" },
      { title: "Scioto Mile", uri: "https://www.google.com/maps/search/?api=1&query=Scioto+Mile+Columbus+OH" },
      { title: "Whetstone Park of Roses", uri: "https://www.google.com/maps/search/?api=1&query=Whetstone+Park+of+Roses+Columbus+OH" }
    ]
  },
  {
    keywords: ['school', 'education', 'university'],
    places: [
      { title: "Upper Arlington High School", uri: "https://www.google.com/maps/search/?api=1&query=Upper+Arlington+High+School" },
      { title: "The Wellington School", uri: "https://www.google.com/maps/search/?api=1&query=The+Wellington+School+Columbus+OH" },
      { title: "The Ohio State University", uri: "https://www.google.com/maps/search/?api=1&query=The+Ohio+State+University" }
    ]
  },
  {
    keywords: ['coffee', 'cafe', 'tea'],
    places: [
      { title: "Crimson Cup Coffee Shop", uri: "https://www.google.com/maps/search/?api=1&query=Crimson+Cup+Coffee+Shop+Upper+Arlington" },
      { title: "Colin's Coffee", uri: "https://www.google.com/maps/search/?api=1&query=Colins+Coffee+Upper+Arlington" },
      { title: "Stauf's Coffee Roasters", uri: "https://www.google.com/maps/search/?api=1&query=Staufs+Coffee+Roasters+Grandview" }
    ]
  }
];

function getFallbackPlaces(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  const category = FALLBACK_DATA.find(cat => cat.keywords.some(k => lowerPrompt.includes(k)));
  return category ? category.places : FALLBACK_DATA[0].places;
}

export async function POST(req: Request) {
  let prompt = '';
  try {
    const body = await req.json();
    prompt = body.prompt || '';
    
    // Prioritize Places API keys, then fallback to others
    const apiKey = process.env.GOOGLE_PLACES_API_KEY || 
                   process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.API_KEY || 
                   process.env.GEMINI_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('API Key missing for Places route, using fallback data');
      const fallbackPlaces = getFallbackPlaces(prompt);
      return NextResponse.json({ 
        text: `(Showing curated local favorites due to missing API configuration) Here are some top recommendations based on your search for "${prompt}".`,
        links: fallbackPlaces 
      });
    }

    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.googleMapsUri,places.rating,places.userRatingCount'
      },
      body: JSON.stringify({
        textQuery: prompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('Google Places API request failed (switching to fallback data). This is expected if the API key is invalid or the Places API is not enabled.', 
        errorData.error?.message || errorData
      );
      
      // Fallback on API error
      const fallbackPlaces = getFallbackPlaces(prompt);
      return NextResponse.json({ 
        text: `Here are some top recommendations based on your search for "${prompt}".`,
        links: fallbackPlaces 
      });
    }

    const data = await response.json();
    
    if (!data.places || data.places.length === 0) {
      const fallbackPlaces = getFallbackPlaces(prompt);
      return NextResponse.json({ 
        text: `I couldn't find specific matches via the API, but here are some local favorites.`,
        links: fallbackPlaces 
      });
    }

    const links = data.places.slice(0, 5).map((place: any) => ({
      title: place.displayName?.text || 'Unknown Place',
      uri: place.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.formattedAddress)}`
    }));

    const text = `Here are some top recommendations based on your search for "${prompt}". Click the links below to view them on Google Maps.`;

    return NextResponse.json({ text, links });
  } catch (error) {
    console.error('Places API route error:', error);
    // Fallback on system error
    const fallbackPlaces = getFallbackPlaces(prompt);
    return NextResponse.json({ 
      text: `Here are some top recommendations based on your search for "${prompt}".`,
      links: fallbackPlaces 
    });
  }
}
