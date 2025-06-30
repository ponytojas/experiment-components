import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

const locationToAngles = (lat: number, long: number) => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

const Globe = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        // Coordenadas de origen
        const lon = -0.3718140355870048;
        const lat = 30.474287030842184;

        const [initialPhi, initialTheta] = locationToAngles(lat, lon);

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 300 * 2,
            height: 300 * 2,
            phi: initialPhi,
            theta: initialTheta,
            dark: 0.9,
            diffuse: 1.9,
            mapSamples: 15000,
            mapBrightness: 8,
            baseColor: [0.4, 0.4, 0.4],
            markerColor: [0.94, 0.94, 0.94],
            glowColor: [0.09, 0.09, 0.09],
            markers: [],
            onRender: (state) => {
                state.phi = initialPhi + phi;
                state.theta = initialTheta;
                phi += 0.001;
            }
        });

        return () => globe.destroy();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: 300, height: 300, maxWidth: "100%", aspectRatio: 1 }}
        />
    );
}

export default React.memo(Globe);