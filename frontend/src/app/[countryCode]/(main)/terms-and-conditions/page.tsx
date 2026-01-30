import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description: "Terms & Conditions for Quickdose.co.za",
}

export default function TermsAndConditions() {
    return (
        <div className="content-container py-12 small:py-24">
            <h1 className="text-2xl-semi mb-6">Terms & Conditions</h1>
            <p className="mb-4 text-small-regular text-ui-fg-base">Effective Date: 1 July 2025</p>

            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Welcome to Quickdose.co.za. By accessing or using our website, you agree to be bound by the terms and conditions outlined below. Please read them carefully. If you do not agree with any part of these terms, do not use our services.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">1. Eligibility & Age Restriction</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>You must be 18 years or older to use this website or purchase any products.</li>
                <li>We reserve the right to request ID verification before fulfilling an order.</li>
                <li>It is illegal under South African law to sell alcohol or vape products to anyone under the age of 18.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">2. Products & Availability</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>All products listed (including vapes, cannabis products, and alcohol) are subject to availability.</li>
                <li>Product descriptions, pricing, and images are provided for convenience and may be updated without prior notice.</li>
                <li>We do not guarantee that products will always be in stock or available for same-day delivery.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">3. Delivery</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>We currently offer same-day delivery within Rustenburg, South Africa.</li>
                <li>Delivery times are estimated but not guaranteed. Delays may occur due to traffic, weather, or other factors beyond our control.</li>
                <li>A flat delivery fee applies unless stated otherwise in a promotion or offer.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">4. Payments</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>We accept cash on delivery, instant EFT, and card payments.</li>
                <li>All payments must be made in South African Rand (ZAR).</li>
                <li>Orders will not be delivered until full payment is confirmed.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">5. Returns & Refunds</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Due to the nature of our products, we do not accept returns on vapes, cannabis items, or alcohol unless the item is defective or delivered incorrectly.</li>
                <li>If there’s an issue with your order, please contact us within 24 hours of delivery.</li>
                <li>Refunds are processed at our discretion, and proof of purchase is required.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">6. Cannabis Disclaimer</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>All cannabis products sold on Quickdose.co.za are hemp-derived and comply with South African legal limits.</li>
                <li>Products are not intended to treat or cure any medical condition and should be used responsibly.</li>
                <li>You assume all responsibility for the purchase and use of cannabis products.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">7. Limitation of Liability</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Quickdose.co.za is not responsible for any direct or indirect damages resulting from the use of our products or website.</li>
                <li>We do not guarantee that the site will be error-free or uninterrupted.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">8. Intellectual Property</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                All website content, logos, product names, and designs are the property of Quickdose and may not be copied or reproduced without permission.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">9. Privacy</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Your personal information is collected, stored, and used in accordance with our Privacy Policy. We respect your privacy and do not sell your information to third parties.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">10. Changes to Terms</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Quickdose reserves the right to update or modify these terms at any time. Changes will take effect once posted on this page.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">Contact Us</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                If you have any questions or concerns, reach out to us:
            </p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>📧 Email: quickdose.co.za@gmail.com</li>
                <li>📞 WhatsApp: +27 63 529 1651</li>
                <li>🌍 Website: <a href="https://www.quickdose.co.za" className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover">www.quickdose.co.za</a></li>
            </ul>
        </div>
    )
}
