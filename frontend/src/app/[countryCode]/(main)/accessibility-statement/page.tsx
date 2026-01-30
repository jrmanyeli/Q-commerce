import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Accessibility Statement",
    description: "Accessibility Statement for Quickdose.co.za",
}

export default function AccessibilityStatement() {
    return (
        <div className="content-container py-12 small:py-24">
            <h1 className="text-2xl-semi mb-6">Accessibility Statement</h1>
            <p className="mb-4 text-small-regular text-ui-fg-base">Effective Date: 1 July 2025</p>

            <p className="mb-4 text-medium-regular text-ui-fg-base">
                At Quickdose.co.za, we are committed to making our website accessible to everyone, including people with disabilities. We strive to ensure that all users have equal access to our products, services, and information.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">Our Commitment</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We aim to follow best practices and standards for web accessibility, including the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA where possible.
            </p>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Our website is designed to be navigable via keyboard, screen readers, and other assistive technologies.
            </p>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We continually review and update our site to improve accessibility.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">Feedback and Assistance</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                If you encounter any barriers while using our website or have suggestions on how we can improve accessibility, please contact us:
            </p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>📧 Email: quickdose.co.za@gmail.com</li>
                <li>📞 WhatsApp: +27 63 529 1651</li>
            </ul>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                We will do our best to assist you promptly and accommodate your needs.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">Limitations</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                While we work hard to ensure accessibility, some third-party content or older site components may not yet fully comply. We appreciate your understanding as we improve.
            </p>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Thank you for visiting Quickdose.co.za — your lifestyle, delivered quickly and accessibly.
            </p>
        </div>
    )
}
