import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Contact Quickdose",
}

export default function Contact() {
    return (
        <div className="content-container py-12 small:py-24 text-left">
            <h1 className="text-2xl-semi mb-6">Contact Us</h1>
            <p className="text-medium-regular text-ui-fg-base mb-4">
                We'd love to hear from you.
            </p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>📧 Email: quickdose.co.za@gmail.com</li>
                <li>📞 WhatsApp: +27 63 529 1651</li>
            </ul>
        </div>
    )
}
