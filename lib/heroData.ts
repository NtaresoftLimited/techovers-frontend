export interface HeroBanner {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    link: string;
    buttonText?: string;
    color?: string; // For text/overlay color
}

export const HERO_DATA = {
    // Left Zone (Large Slider) - 50% width on Desktop
    mainSlider: [
        {
            id: "main-1",
            image: "/hero_banner_tech_premium_1769607154175.png", // Use absolute path in actual deployed app, but relative for Next.js public
            title: "Next-Gen Apple Performance",
            subtitle: "Experience the power of M3 chips.",
            link: "/products/apple-macbook-pro-16-m3-max",
            buttonText: "Shop MacBook",
            color: "white"
        },
        {
            id: "main-2",
            image: "/techovers_hero_banner_1769604666419.png",
            title: "Premium Tech Ecosystem",
            subtitle: "Upgrade your workflow today.",
            link: "/all-categories",
            buttonText: "Explore Now",
            color: "white"
        }
    ],

    // Middle Zone (Medium Slider) - 25% width on Desktop
    sideSlider: [
        {
            id: "side-1",
            image: "/banner_laptops.png",
            title: "Laptop Deals",
            subtitle: "Up to 20% Off",
            link: "/category/laptops",
            color: "black"
        },
        {
            id: "side-2",
            image: "/gadget_placeholder_1769608856421.png",
            title: "New Gadgets",
            subtitle: "Trending Now",
            link: "/category/accessories",
            color: "white"
        }
    ],

    // Right Zone (Stacked) - 25% width on Desktop
    topRightSlider: [
        {
            id: "tr-1",
            image: "/banner_audio.png",
            title: "Pro Audio",
            subtitle: "Immersive Sound",
            link: "/category/audio",
            color: "white"
        }
    ],
    bottomRightSlider: [
        {
            id: "br-1",
            image: "/techovers_instagram_check_1769604239035.webp",
            title: "Join the Club",
            subtitle: "Earn Points",
            link: "/register",
            color: "#108561"
        }
    ]
};
