import { getActivities } from '@/lib/strava';

export async function GET() {
    try {
        const response = await getActivities();

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch Strava activities:', response.status, errorText);
            return Response.json({ activities: [] });
        }

        const activities = await response.json();

        console.log('Strava raw activities count:', activities.length);
        if (activities.length > 0) {
            console.log('Sample activity type:', activities[0].type);
        }

        if (!Array.isArray(activities)) {
            console.error('Strava response is not an array:', activities);
            return Response.json({ activities: [] });
        }

        // Filter for Hike and Walk
        const hikingActivities = activities
            .filter((activity: any) => activity.type === 'Hike' || activity.type === 'Walk')
            .map((activity: any) => ({
                id: activity.id,
                name: activity.name,
                distance: (activity.distance / 1000).toFixed(2), // Convert meters to km
                movingTime: activity.moving_time, // In seconds
                totalElevationGain: activity.total_elevation_gain,
                startDate: activity.start_date,
                map: activity.map?.summary_polyline,
                location: activity.location_city ? `${activity.location_city}, ${activity.location_country}` : null,
            }))
            .slice(0, 10); // Limit to 10 recent activities

        return Response.json({ activities: hikingActivities });
    } catch (error) {
        console.error('Error in Strava activities route:', error);
        return Response.json({ activities: [] });
    }
}
