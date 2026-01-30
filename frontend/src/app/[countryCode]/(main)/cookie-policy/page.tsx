import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Cookie Policy",
    description: "Cookie Policy for Quickdose.co.za",
}

export default function CookiePolicy() {
    return (
        <div className="content-container py-12 small:py-24">
            <h1 className="text-2xl-semi mb-6">Cookie Policy</h1>
            <p className="mb-4 text-small-regular text-ui-fg-base">Effective Date: 1 July 2025</p>

            <p className="mb-4 text-medium-regular text-ui-fg-base">
                This Cookie Policy explains how Quickdose.co.za (“we”, “us”, “our”) uses cookies and similar technologies on our website to enhance your experience.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">1. What Are Cookies?</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They help the site remember your preferences, improve functionality, and collect anonymous analytics data.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li className="mb-2"><strong>Essential Cookies:</strong> Necessary for website operation (e.g., shopping cart, login sessions). These cannot be disabled.</li>
                <li className="mb-2"><strong>Performance Cookies:</strong> Collect anonymous data on how visitors use the site to help us improve.</li>
                <li className="mb-2"><strong>Functional Cookies:</strong> Remember your preferences (language, region, etc.) to provide a personalized experience.</li>
                <li className="mb-2"><strong>Advertising Cookies:</strong> Used to deliver relevant ads and track ad performance (third-party cookies).</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">3. How We Use Cookies</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">We use cookies to:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Enable website functionality and security</li>
                <li>Improve site performance and user experience</li>
                <li>Analyse website traffic and usage patterns</li>
                <li>Personalise content and offers</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">4. Your Cookie Choices</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">Most browsers allow you to manage or disable cookies via settings. You can:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Block or delete cookies</li>
                <li>Set preferences for specific websites</li>
                <li>Use “incognito” or “private” browsing modes</li>
            </ul>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Please note that disabling some cookies may affect website functionality or limit your user experience.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">5. Third-Party Cookies</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We may allow third-party services (like Google Analytics or social media platforms) to place cookies on your device. These third parties have their own privacy policies and cookie practices.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">6. Changes to This Policy</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We may update this Cookie Policy occasionally. Changes will be posted here with a new effective date.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">7. Contact Us</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                If you have questions about our use of cookies, contact us:
            </p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>📧 Email: quickdose.co.za@gmail.com</li>
                <li>📞 WhatsApp: +27 63 529 1651</li>
            </ul>
        </div>
    )
}
