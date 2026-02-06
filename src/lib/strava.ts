interface StravaAccessTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_at: number;
}

const getAccessToken = async (): Promise<string> => {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Missing Strava environment variables');
    }

    const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }),
        cache: 'no-cache',
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching Strava token:', response.status, errorText);
        throw new Error(`Failed to fetch Strava access token: ${response.status} ${errorText}`);
    }

    const data: StravaAccessTokenResponse = await response.json();
    return data.access_token;
};

export const getActivities = async (perPage = 30) => {
    const accessToken = await getAccessToken();

    // Fetch activities (hike, walk)
    return fetch(
        `https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { revalidate: 3600 },
        }
    );
};

export const getHikingActivities = async (limit = 100) => {
    try {
        const response = await getActivities(limit);
        if (!response.ok) return [];

        const activities = await response.json();
        if (!Array.isArray(activities)) return [];

        return activities
            .filter(
                (activity: any) => activity.type === 'Hike' || activity.type === 'Walk'
            )
            .map((activity: any) => ({
                id: activity.id,
                name: activity.name,
                distance: (activity.distance / 1000).toFixed(2), // Convert meters to km
                movingTime: activity.moving_time, // In seconds
                totalElevationGain: activity.total_elevation_gain,
                startDate: activity.start_date,
                map: activity.map?.summary_polyline,
                location: activity.location_city
                    ? `${activity.location_city}, ${activity.location_country}`
                    : null,
            }));
    } catch (error) {
        console.error('Error fetching Strava activities:', error);
        return [];
    }
};
