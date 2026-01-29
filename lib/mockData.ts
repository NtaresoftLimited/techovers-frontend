import productsSrc from '@/lib/products.json';

export interface Category {
    _id: string;
    title: string;
    slug: string;
    icon?: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    logo: string;
}

export interface Product {
    _id: string;
    _type: "product";
    name: string;
    price: number;
    description: string;
    slug: string;
    imageUrl: string;
    images: any[];
    category?: Category;
    brand?: Brand;
    stock?: number;
    features?: string[];
    specifications?: { label: string; value: string }[];
    faqs?: { question: string; answer: string }[];
    condition?: "new" | "excellent" | "good";
    variants?: { name: string; values: string[] }[];
    skus?: { code: string; price?: number; stock?: number; image?: { asset: { url: string } } }[];
    isDigital?: boolean;
    digitalFile?: string;
    clubPoints?: number;
    // Legacy support
    colors?: { name: string; hex: string; image?: { asset: { url: string } } }[];
    storage?: string[];
    isExpress?: boolean;
    isBestseller?: boolean;
    discountPercentage?: number;
}

export const getAllBrands = (): Brand[] => {
    return [
        { _id: "b1", name: "Apple", slug: "apple", logo: "/brands/Apple-brandpage-menu-logo-1-1.png" },
        { _id: "b2", name: "Samsung", slug: "samsung", logo: "/brands/Samsung-Logo-100x100.png" },
        { _id: "b3", name: "Sony", slug: "sony", logo: "/brands/Shop-sony-cameras-at-best-Price-in-Dubai-2.jpg" },
        { _id: "b4", name: "HP", slug: "hp", logo: "/brands/HPIoutlinelogorgb72MD-1.png" },
        { _id: "b5", name: "Microsoft", slug: "microsoft", logo: "/brands/Microsoft-2.png" },
        { _id: "b6", name: "DJI", slug: "dji", logo: "/brands/Shop-Dji-cameras-at-best-Price-in-Dubai.jpg" },
        { _id: "b7", name: "Canon", slug: "canon", logo: "/brands/shop-canon-cameras-at-best-price-in-Dubai.jpg" },
        { _id: "b8", name: "Nikon", slug: "nikon", logo: "/brands/shop-nikon-cameras-at-best-prices-in-Dubai.jpg" },
        { _id: "b9", name: "Asus", slug: "asus", logo: "/brands/asus-logo.jpg" },
        { _id: "b10", name: "Lenovo", slug: "lenovo", logo: "/brands/lenovo-logo.jpg" },
        { _id: "b11", name: "Huawei", slug: "huawei", logo: "/brands/huawei-logo.jpg" },
        { _id: "b12", name: "MSI", slug: "msi", logo: "/brands/Laptop-Brands-1by6-MSI.jpg" },
    ];
}

const CATEGORIES: Category[] = [
    { _id: "mobiles", title: "Mobiles", slug: "mobiles", icon: "/categories/mobiles.png" },
    { _id: "laptops", title: "Laptops", slug: "laptops", icon: "/categories/laptops.png" },
    { _id: "audio", title: "Audio", slug: "audio", icon: "/categories/audio.png" },
    { _id: "gaming", title: "Gaming", slug: "gaming", icon: "/categories/gaming.png" },
    { _id: "accessories", title: "Accessories", slug: "accessories" },
    { _id: "software", title: "Software", slug: "software", icon: "/categories/software.png" },
];

const productsData: Product[] = productsSrc.map(p => {
    const name = p.name.toLowerCase();

    // Categorization logic
    let category = CATEGORIES.find(c => c._id === "accessories");
    if (name.includes("iphone") || name.includes("phone")) category = CATEGORIES.find(c => c._id === "mobiles");
    if (name.includes("laptop") || name.includes("macbook")) category = CATEGORIES.find(c => c._id === "laptops");
    if (name.includes("headphone") || name.includes("earbud") || name.includes("audio") || name.includes("jbl") || name.includes("beats")) category = CATEGORIES.find(c => c._id === "audio");
    if (name.includes("playstation") || name.includes("xbox") || name.includes("ps5") || name.includes("gaming") || name.includes("controller")) category = CATEGORIES.find(c => c._id === "gaming");
    if (name.includes("software") || name.includes("license") || name.includes("antivirus")) category = CATEGORIES.find(c => c._id === "software");

    // Assign brand
    const brands = getAllBrands();
    let brand = brands.find(b => name.includes(b.name.toLowerCase()));

    // Mock Variants Logic
    let variants: { name: string; values: string[] }[] | undefined = undefined;
    let skus: { code: string; price?: number; stock?: number; image?: { asset: { url: string } } }[] | undefined = undefined;
    let isDigital = false;

    if (name.includes("iphone") || name.includes("samsung")) {
        variants = [
            { name: "Color", values: ["Graphite", "Silver", "Gold", "Blue"] },
            { name: "Storage", values: ["128GB", "256GB", "512GB"] }
        ];
        skus = [];
        const colors = ["Graphite", "Silver", "Gold", "Blue"];
        const storages = ["128GB", "256GB", "512GB"];

        colors.forEach(c => {
            storages.forEach(s => {
                skus?.push({
                    code: `${c}|${s}`,
                    price: p.price + (s === "256GB" ? 100000 : s === "512GB" ? 250000 : 0),
                    stock: Math.floor(Math.random() * 10),
                    image: { asset: { url: p.imageUrl } } // In real app, different images per color
                });
            });
        });
    } else if (name.includes("macbook")) {
        variants = [
            { name: "Chip", values: ["M1", "M2", "M3"] },
            { name: "RAM", values: ["8GB", "16GB", "32GB"] }
        ];
        skus = [];
        variants[0].values.forEach((chip: string) => {
            variants![1].values.forEach((ram: string) => {
                skus?.push({ code: `${chip}|${ram}`, price: p.price + (ram === "16GB" ? 200000 : 0), stock: 5 })
            })
        })
    }

    // Mock Digital Product
    if (name.includes("card") || name.includes("software")) {
        isDigital = true;
    }

    return {
        ...p,
        _type: "product",
        slug: (p.slug as any).current || p.slug,
        category,
        brand,
        stock: Math.floor(Math.random() * 20) + 1,
        isExpress: Math.random() > 0.3,
        isBestseller: Math.random() > 0.8,
        discountPercentage: Math.random() > 0.5 ? Math.floor(Math.random() * 25) + 5 : 0,
        features: [
            "Premium quality selection",
            "Professional grade electronics",
            "Official manufacturer warranty",
            "Next-day delivery across Tanzania"
        ],
        specifications: [
            { label: "Regional Stock", value: "Dar es Salaam Hub" },
            { label: "Quality Grade", value: "Flagship / Professional" },
            { label: "Warranty Status", value: "1 Year International" }
        ],
        faqs: [
            { question: "Is this item brand new?", answer: "Yes, TechOvers specializes in sealed, brand-new professional equipment." },
            { question: "What is Express Delivery?", answer: "Orders marked Express are shipped within 2 hours in Dar es Salaam." }
        ],
        // Legacy colors/storage for backward compat just in case
        colors: name.includes("iphone") ? [
            { name: "Gold", hex: "#E3CEB1", image: { asset: { url: "https://vibe.storage.googleapis.com/products/apple-iphone-12-pro-8228-gold-1.png" } } },
            { name: "Silver", hex: "#EBEBE3", image: { asset: { url: "https://vibe.storage.googleapis.com/products/apple-iphone-12-pro-8224-silver-1.png" } } },
            { name: "Graphite", hex: "#4E4E4E", image: { asset: { url: "https://vibe.storage.googleapis.com/products/apple-iphone-12-pro-8222-graphite-1.png" } } },
            { name: "Blue", hex: "#234157", image: { asset: { url: "https://vibe.storage.googleapis.com/products/apple-iphone-12-pro-8226-pacific-blue-1.png" } } }
        ] : [
            { name: "Default", hex: "#108561" }
        ],
        storage: name.includes("iphone") ? ["128GB", "256GB", "512GB"] : undefined,
        images: [{ asset: { url: p.imageUrl } }],

        // New Fields
        variants,
        skus,
        isDigital,
        clubPoints: Math.floor(p.price / 1000) // 1 point per 1000 TSh
    };
});

export const getAllProducts = (): Product[] => {
    return productsData;
}

export const getProductBySlug = (slug: string): Product | undefined => {
    return productsData.find(p => p.slug === slug);
}

export const getFeaturedProducts = (): Product[] => {
    return productsData.slice(0, 10);
}

export const getAllCategories = (): Category[] => {
    return CATEGORIES;
}

export const searchProducts = (term: string) => {
    const lower = term.toLowerCase();
    return productsData.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
}
