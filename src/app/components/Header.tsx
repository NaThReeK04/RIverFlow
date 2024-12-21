"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaEnvelope, FaGlobe } from "react-icons/fa";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";

export default function Header() {
    const { user } = useAuthStore();

    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <FaHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Questions",
            link: "/questions",
            icon: <FaGlobe className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
    ];

    if (user)
        navItems.push({
            name: "Profile",
            link: `/users/${user.$id}/${slugify(user.name)}`,
            icon: <FaEnvelope className="h-4 w-4 text-neutral-500 dark:text-white" />,
        });

    return (
        <div className="relative w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
