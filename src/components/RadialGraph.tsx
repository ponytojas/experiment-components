import React from 'react';

const RadialGraph: React.FC = () => {
    const center = { x: 150, y: 150 };
    const radiusLevels = [0, 40, 100, 120]; // niveles radiales
    const intermediateCount = 6;
    const externalCount = 12;

    const randomOffset = (base: number, delta: number) =>
        base + (Math.random() * 2 - 1) * delta;

    const polarToCartesian = (r: number, angleDeg: number) => {
        const angleRad = (angleDeg * Math.PI) / 180;
        return {
            x: center.x + r * Math.cos(angleRad),
            y: center.y + r * Math.sin(angleRad),
        };
    };

    const intermediateNodes = Array.from({ length: intermediateCount }, (_, i) => {
        const angle = randomOffset(i * (360 / intermediateCount), 20);
        return {
            angle,
            pos: polarToCartesian(radiusLevels[1], angle),
        };
    });

    const externalNodes = Array.from({ length: externalCount }, (_, i) => {
        const angle = randomOffset(i * (360 / externalCount), 15);
        return {
            angle,
            pos: polarToCartesian(radiusLevels[2], angle),
        };
    });

    return (
        <div className="flex justify-center items-center w-full h-full">
            <svg width={300} height={300} className="text-white not-so-slow-rotate">
                {radiusLevels.slice(1).map((r, i) => (
                    <circle
                        key={`circle-${i}`}
                        cx={center.x}
                        cy={center.y}
                        r={r}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={0.5}
                        className="opacity-30"
                    />
                ))}

                {intermediateNodes.map((node, i) => (
                    <line
                        key={`line-center-${i}`}
                        x1={center.x}
                        y1={center.y}
                        x2={node.pos.x}
                        y2={node.pos.y}
                        stroke="currentColor"
                        strokeWidth={0.5}
                    />
                ))}

                {intermediateNodes.map((mid, i) => {
                    const leftChild = externalNodes[(2 * i) % externalCount];
                    const rightChild = externalNodes[(2 * i + 1) % externalCount];
                    return (
                        <React.Fragment key={`branch-${i}`}>
                            <line
                                x1={mid.pos.x}
                                y1={mid.pos.y}
                                x2={leftChild.pos.x}
                                y2={leftChild.pos.y}
                                stroke="currentColor"
                                strokeWidth={0.5}
                            />
                            <line
                                x1={mid.pos.x}
                                y1={mid.pos.y}
                                x2={rightChild.pos.x}
                                y2={rightChild.pos.y}
                                stroke="currentColor"
                                strokeWidth={0.5}
                            />
                        </React.Fragment>
                    );
                })}

                <circle cx={center.x} cy={center.y} r={6} fill="currentColor" />

                {intermediateNodes.map((node, i) => (
                    <circle key={`mid-${i}`} cx={node.pos.x} cy={node.pos.y} r={4} fill="currentColor" />
                ))}

                {externalNodes.map((node, i) => (
                    <circle key={`ext-${i}`} cx={node.pos.x} cy={node.pos.y} r={3} fill="currentColor" />
                ))}
            </svg>
        </div>
    );
};

export default RadialGraph;