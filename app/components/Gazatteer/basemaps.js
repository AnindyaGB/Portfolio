
export const OSM = {
    name: 'osm',
    attribution: '&copy; OpenStreetMap contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

export const ESRI = {
    name: 'esri',
    attribution: 'Tiles &copy; Esri',
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
}

export const toggleBasemap = (setBasemap) => {
    setBasemap(prev => prev.name === OSM.name
        ? ESRI
        : OSM)
}