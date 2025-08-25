'use client';


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoCoord } from '@/types/ApiReponse/StatistiquesEnrollementResponse';

interface Props {
    data: GeoCoord[];
}

export default function EnrollementMap({ data }: Props) {
    const center: LatLngTuple = [5.3478, -4.0031]; // Exemple : Abidjan

    // Icône personnalisée (rouge, taille 24px)
    const customIcon = divIcon({
        className: '',
        html: `<div style="color: red; font-size: 24px;">📍</div>`, // simple emoji en rouge
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });

    return (
        <div className="h-[500px] w-full rounded-xl overflow-hidden">
            <MapContainer center={center} zoom={7} scrollWheelZoom className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((coord, index) => (
                    <Marker key={index} position={[coord.lat, coord.lng]} icon={customIcon}>
                        <Popup>
                            <strong>Enrôlement</strong><br />
                            Lat: {coord.lat.toFixed(4)}, Lng: {coord.lng.toFixed(4)}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
