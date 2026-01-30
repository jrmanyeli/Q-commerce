import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Shipping Policy",
    description: "Shipping Policy for Quickdose.co.za",
}

export default function ShippingPolicy() {
    return (
        <div className="content-container py-12 small:py-24">
            <h1 className="text-2xl-semi mb-6">Shipping Policy</h1>
            <p className="mb-4 text-small-regular text-ui-fg-base">Effective Date: 1 July 2025</p>

            <p className="mb-4 text-medium-regular text-ui-fg-base">
                At Quickdose, we’re committed to delivering your orders quickly and reliably. Please read our shipping policy to understand how we handle delivery and what you can expect.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">1. Delivery Areas</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>We currently offer same-day delivery exclusively within Rustenburg, South Africa.</li>
                <li>Orders outside Rustenburg are not supported at this time.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">2. Delivery Times</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Orders placed before 6 PM on business days are typically delivered within 45 minutes to a few hours, depending on location and traffic.</li>
                <li>Delivery times are estimated and may vary due to external factors such as weather, traffic, or high demand.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">3. Delivery Fees</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>A flat delivery fee of R60 applies to all deliveries unless otherwise stated in promotions or offers.</li>
                <li>Free delivery may be offered during special promotions.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">4. Order Processing</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Once your order is confirmed and payment is received, we begin preparing it immediately.</li>
                <li>You will receive a confirmation message with estimated delivery time via WhatsApp or SMS.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">5. Delivery Requirements</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>You or an authorized person must be available at the delivery address to receive the order.</li>
                <li>A valid ID may be requested upon delivery to verify age, especially for age-restricted products like alcohol and vapes.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">6. Failed Deliveries</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>If no one is available to accept the delivery, the order may be returned to our facility.</li>
                <li>Additional delivery attempts may incur extra charges.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">7. Shipping Restrictions</h2>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>We do not ship internationally or outside the specified delivery zone.</li>
                <li>Certain products may be subject to legal or regulatory shipping restrictions.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">8. Contact</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                For questions or concerns about your delivery, please contact us:
            </p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>📧 Email: quickdose.co.za@gmail.com</li>
                <li>📞 WhatsApp: +27 63 529 1651</li>
            </ul>
        </div>
    )
}
