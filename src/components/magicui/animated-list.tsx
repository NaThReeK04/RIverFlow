"use client";

import { useEffect, useMemo, useState, ReactElement } from "react";
import gsap from "gsap";
import React from "react";

export const AnimatedList = React.memo(
    ({
        className,
        children,
        delay = 1000,
    }: {
        className?: string;
        children: React.ReactNode;
        delay?: number;
    }) => {
        const [index, setIndex] = useState(0);
        const childrenArray = React.Children.toArray(children);

        useEffect(() => {
            const interval = setInterval(() => {
                setIndex(prevIndex => (prevIndex + 1) % childrenArray.length);
            }, delay);

            return () => clearInterval(interval);
        }, [childrenArray.length, delay]);

        const itemsToShow = useMemo(
            () => childrenArray.slice(0, index + 1).reverse(),
            [index, childrenArray]
        );

        return (
            <div className={`flex flex-col items-center gap-4 ${className}`}>
                <div>
                    {itemsToShow.map((item, i) => (
                        <AnimatedListItem key={(item as ReactElement).key} index={i}>
                            {item}
                        </AnimatedListItem>
                    ))}
                </div>
            </div>
        );
    }
);

AnimatedList.displayName = "AnimatedList";

// GSAP-based AnimatedListItem component
export function AnimatedListItem({ children, index }: { children: React.ReactNode, index: number }) {
    const itemRef = React.useRef(null);

    useEffect(() => {
        if (itemRef.current) {
            gsap.fromTo(
                itemRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1, // Delay to stagger animations
                    ease: "back.out(1.7)", // Smooth easing
                }
            );

            return () => {
                gsap.to(itemRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                });
            };
        }
    }, [index]);

    return (
        <div ref={itemRef} className="mx-auto w-full">
            {children}
        </div>
    );
}

