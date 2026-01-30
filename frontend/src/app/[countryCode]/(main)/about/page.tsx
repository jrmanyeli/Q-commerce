import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us",
    description: "About Quickdose - Your lifestyle, delivered.",
}

export default function About() {
    return (
        <div className="content-container py-12 small:py-24">
            {/* Our Story Section */}
            <div className="mb-16 max-w-2xl text-left">
                <h1 className="text-3xl-semi mb-6">Our Story</h1>
                <p className="text-medium-regular text-ui-fg-base mb-4">
                    Quickdose started as a bold idea in a small Rustenburg apartment: what if getting your favorite vape or party essentials could be as easy as ordering takeout? Tired of delays, overpriced middlemen, and out-of-stock frustrations, we created Quickdose.co.za to deliver a new experience—convenient, fast, and personal.
                </p>
                <p className="text-medium-regular text-ui-fg-base mb-4">
                    What began with a handful of vapes and a single delivery scooter quickly grew into Rustenburg’s go-to hub for nicotine-free disposable vapes, hemp-based cannabis, and curated lifestyle goods—all backed by a local team that delivers with heart.
                </p>
                <p className="text-medium-regular text-ui-fg-base font-semibold">
                    Today, we’re proud to serve hundreds of customers across Rustenburg with deliveries in under 45 minutes, because we know: when you want it, you want it now.
                </p>
            </div>

            {/* Our Values Section */}
            <div className="mb-16">
                <h2 className="text-2xl-semi mb-8 text-left">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg-semi mb-2">Speed</h3>
                        <p className="text-small-regular text-ui-fg-subtle">We deliver fast—because waiting isn’t part of the plan.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg-semi mb-2">Reliability</h3>
                        <p className="text-small-regular text-ui-fg-subtle">Count on us for consistent quality and on-time delivery, every time.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg-semi mb-2">Transparency</h3>
                        <p className="text-small-regular text-ui-fg-subtle">Clear pricing, honest products, no surprises.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg-semi mb-2">Innovation</h3>
                        <p className="text-small-regular text-ui-fg-subtle">We stay ahead with the latest products and smarter delivery solutions.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg-semi mb-2">Community</h3>
                        <p className="text-small-regular text-ui-fg-subtle">Proudly rooted in Rustenburg—built by locals, for locals.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg-semi mb-2">Responsibility</h3>
                        <p className="text-small-regular text-ui-fg-subtle">We follow the law, verify ages, and promote safe, adult use.</p>
                    </div>
                </div>
            </div>

            {/* Our Philosophy Section - with tech abstract background hint */}
            <div className="relative overflow-hidden bg-ui-bg-subtle rounded-xl p-8 md:p-16 text-left">
                {/* Abstract background decorative element */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-2xl-semi mb-6">Our Philosophy</h2>
                    <p className="text-medium-regular text-ui-fg-base mb-6">
                        At Quickdose, we believe access to lifestyle essentials should be easy, fast, and hassle-free. Whether it’s your favorite vape, cannabis product, or a chilled bottle for the weekend—we’re here to bring it to your door without delay or drama.
                    </p>
                    <p className="text-medium-regular text-ui-fg-base mb-8">
                        We value speed without compromise, quality you can trust, and a local touch that understands your vibe. Every product we offer and every delivery we make reflects our promise:
                    </p>
                    <p className="text-xl-semi italic text-ui-fg-interactive">
                        Your lifestyle. Delivered. Instantly.
                    </p>
                </div>
            </div>
        </div>
    )
}
