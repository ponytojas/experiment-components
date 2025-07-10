import React, { useEffect, useRef, useState } from "react";
import { INDEX } from "@/static";

export const SidebarIndex: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [hoverY, setHoverY] = useState<number | null>(null);
    const [scrollHoverY, setScrollHoverY] = useState<number | null>(null);

    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Track mouse position inside sidebar
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = navRef.current?.getBoundingClientRect();
        if (!rect) return;
        setHoverY(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        setHoverY(null);
    };

    // IntersectionObserver to track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            {
                rootMargin: "0px 0px -60% 0px",
                threshold: 0.1,
            }
        );

        const elements = document.querySelectorAll("section[id]");
        elements.forEach((el) => observer.observe(el));
        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);

    // Auto-scroll to active section
    useEffect(() => {
        const el = itemRefs.current[activeId ?? ""];
        if (el) {
            el.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
    }, [activeId]);

    // Scroll-based hover effect (brief and subtle)
    useEffect(() => {
        const handleScroll = () => {
            if (!activeId || !navRef.current) return;
            const activeEl = itemRefs.current[activeId];
            if (!activeEl) return;

            const navTop = navRef.current.getBoundingClientRect().top;
            const rect = activeEl.getBoundingClientRect();
            const elCenter = rect.top - navTop + rect.height / 2;
            setScrollHoverY(elCenter);

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => setScrollHoverY(null), 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [activeId]);

    // Compute scale based on hover or scroll
    const getScale = (el: HTMLDivElement | null): number => {
        if (!el) return 1;

        const rect = el.getBoundingClientRect();
        const navTop = navRef.current?.getBoundingClientRect().top || 0;
        const elCenter = rect.top - navTop + rect.height / 2;

        // 1. True hover (max 3x)
        if (hoverY != null) {
            const distance = Math.abs(hoverY - elCenter);
            const sigma = 30;
            const factor = Math.exp(-(distance ** 2) / (2 * sigma ** 2));
            return 1 + factor * 2;
        }

        // 2. Scroll hover fallback (max 1.5x)
        if (scrollHoverY != null) {
            const distance = Math.abs(scrollHoverY - elCenter);
            const sigma = 30;
            const factor = Math.exp(-(distance ** 2) / (2 * sigma ** 2));
            return 1 + factor * 0.5;
        }

        return 1;
    };

    return (
        <nav
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-4 select-none overflow-y-auto max-h-screen"
        >
            <ul>
                {INDEX.map((section) => (
                    <li key={section.id} className="mb-2">
                        <div ref={(el) => (itemRefs.current[section.id] = el)}>
                            <HoverLineWithText
                                getScale={getScale}
                                baseWidth={40}
                                text={section.title}
                                href={`#${section.id}`}
                                isActive={section.id === activeId}
                            />
                            <div className="pl-[48px] mt-1">
                                {[...Array(4)].map((_, idx) => (
                                    <HoverLineOnly key={idx} getScale={getScale} baseWidth={40} />
                                ))}
                            </div>
                        </div>
                        {section.subsections && (
                            <ul className="mr-4 mt-1 space-y-1">
                                {section.subsections.map((sub) => (
                                    <li key={sub.id}>
                                        <div ref={(el) => (itemRefs.current[sub.id] = el)}>
                                            <HoverLineWithText
                                                getScale={getScale}
                                                baseWidth={24}
                                                text={sub.title}
                                                href={`#${sub.id}`}
                                                isActive={sub.id === activeId}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// Component for section/subsection with text
const HoverLineWithText: React.FC<{
    getScale: (el: HTMLDivElement | null) => number;
    baseWidth: number;
    text: string;
    href: string;
    isActive: boolean;
}> = ({ getScale, baseWidth, text, href, isActive }) => {
    const lineRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => {
            const newScale = getScale(lineRef.current);
            setScale((prev) => Math.abs(prev - newScale) < 0.01 ? prev : newScale);
        };
        update();
        const interval = setInterval(update, 50);
        return () => clearInterval(interval);
    }, [getScale]);

    const lineWidth = baseWidth * scale;

    return (
        <div className="flex items-center transition-all duration-150">
            <div
                ref={lineRef}
                className="origin-left h-[1px] bg-gray-300 transition-transform duration-150"
                style={{
                    transform: `scaleX(${scale})`,
                    width: `${baseWidth}px`,
                }}
            />
            <a
                href={href}
                className={`transition-all duration-150 ml-2 ${isActive ? "font-bold text-accent-primary" : ""}`}
                style={{
                    marginLeft: `${lineWidth - baseWidth + 8}px`,
                }}
            >
                {text}
            </a>
        </div>
    );
};

// Decorative line (no text)
const HoverLineOnly: React.FC<{
    getScale: (el: HTMLDivElement | null) => number;
    baseWidth: number;
}> = ({ getScale, baseWidth }) => {
    const lineRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => {
            const newScale = getScale(lineRef.current);
            setScale((prev) => Math.abs(prev - newScale) < 0.01 ? prev : newScale);
        };
        update();
        const interval = setInterval(update, 50);
        return () => clearInterval(interval);
    }, [getScale]);

    return (
        <div
            ref={lineRef}
            className="origin-left h-[1px] bg-gray-300 transition-transform duration-150"
            style={{
                transform: `scaleX(${scale})`,
                width: `${baseWidth}px`,
                marginTop: "6px",
            }}
        />
    );
};