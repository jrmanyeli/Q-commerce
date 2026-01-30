import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Quickdose.co.za",
}

export default function PrivacyPolicy() {
    return (
        <div className="content-container py-12 small:py-24">
            <h1 className="text-2xl-semi mb-6">Privacy Policy</h1>
            <p className="mb-4 text-small-regular text-ui-fg-base">Effective Date: 1 July 2025</p>

            <p className="mb-4 text-medium-regular text-ui-fg-base">
                At Quickdose.co.za (“we”, “us”, or “our”), your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website or use our services.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">1. Information We Collect</h2>
            <p className="mb-2 text-medium-regular text-ui-fg-base">We collect personal information that you voluntarily provide to us, including but not limited to:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Name, email address, phone number, and delivery address</li>
                <li>Payment details (processed securely via our payment gateway)</li>
                <li>Age verification information</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer support</li>
            </ul>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We may also collect non-personal information automatically through cookies and analytics, such as your IP address, browser type, and browsing behavior to improve our services.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">2. How We Use Your Information</h2>
            <p className="mb-2 text-medium-regular text-ui-fg-base">We use your information to:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Process and fulfill your orders</li>
                <li>Communicate order status, promotions, and updates</li>
                <li>Verify your age and comply with legal requirements</li>
                <li>Improve our website, products, and services</li>
                <li>Prevent fraud and unauthorized transactions</li>
                <li>Respond to customer inquiries and support requests</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">3. Sharing Your Information</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">We do not sell, rent, or trade your personal information to third parties.</p>
            <p className="mb-2 text-medium-regular text-ui-fg-base">Your information may be shared with:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Trusted service providers who assist us with delivery, payment processing, and customer support</li>
                <li>Legal authorities if required by law or to protect our rights</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">4. Data Security</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We implement industry-standard security measures to protect your data from unauthorized access, loss, or misuse. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">5. Your Rights</h2>
            <p className="mb-2 text-medium-regular text-ui-fg-base">You have the right to:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data where applicable</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent to process your data (subject to legal and contractual obligations)</li>
            </ul>
            <p className="mb-4 text-medium-regular text-ui-fg-base">To exercise these rights, please contact us using the details below.</p>

            <h2 className="text-xl-semi mb-4 mt-8">6. Cookies</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage or disable cookies in your browser settings, but some features of the site may not function properly.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">7. Children’s Privacy</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Our services are intended for adults 18 years and older. We do not knowingly collect data from minors. If you believe we have inadvertently collected information from someone under 18, please contact us immediately.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">8. Changes to This Policy</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We may update this Privacy Policy occasionally to reflect changes in laws, technology, or business practices. Updates will be posted on this page with a revised effective date.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">Contact Us</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                If you have any questions or concerns about your privacy or this policy, please contact us:
            </p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>📧 Email: quickdose.co.za@gmail.com</li>
                <li>📞 WhatsApp: +27 63 529 1651</li>
                <li>🌍 Website: <a href="https://www.quickdose.co.za" className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover">www.quickdose.co.za</a></li>
            </ul>
        </div>
    )
}
