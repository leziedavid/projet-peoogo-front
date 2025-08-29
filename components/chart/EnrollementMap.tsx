'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoCoord } from '@/types/ApiReponse/StatistiquesEnrollementResponse';

interface Props {
    data: GeoCoord[];
}

export default function EnrollementMap({ data }: Props) {
    const center: LatLngTuple = [12.3714, -1.5197];

    // Icône SVG bleu générique avec effet pulse
    const getCustomIcon = () => {
        const fillColor = '#1E90FF';
        const svgPath = `
            <path d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37258 18.6274 0 12 0ZM12 16C9.23858 16 7 13.7614 7 11C7 8.23858 9.23858 6 12 6C14.7614 6 17 8.23858 17 11C17 13.7614 14.7614 16 12 16Z" fill="${fillColor}"/>`;

        return divIcon({
            className: 'custom-marker',
            html: `
                <svg width="30" height="40" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style="
                        filter: drop-shadow(0 0 6px ${fillColor}80);
                        transition: transform 0.2s ease, filter 0.2s ease;
                        cursor: pointer;
                        animation: pulse 2s infinite;
                    "
                >
                    ${svgPath}
                </svg>
                <style>
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); filter: drop-shadow(0 0 12px ${fillColor}AA); }
                        100% { transform: scale(1); }
                    }
                    .custom-marker:hover svg {
                        transform: scale(1.3);
                        filter: drop-shadow(0 0 16px ${fillColor}CC);
                    }
                </style>
            `,
            iconSize: [36, 48],
            iconAnchor: [18, 48],
            popupAnchor: [0, -48],
        });
    };

    return (
        <div style={{
            height: '500px',
            width: '100%',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}>
            <MapContainer center={center} zoom={6} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data.map((coord, index) => (
                    <Marker key={index} position={[coord.lat, coord.lng]} icon={getCustomIcon()}>
                        <Popup>
                            <strong>Point</strong><br />
                            Lat: {coord.lat.toFixed(4)}, Lng: {coord.lng.toFixed(4)}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
