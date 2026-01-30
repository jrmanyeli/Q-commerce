import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Refund Policy",
    description: "Refund Policy for Quickdose.co.za",
}

export default function RefundPolicy() {
    return (
        <div className="content-container py-12 small:py-24">
            <h1 className="text-2xl-semi mb-6">Refund Policy</h1>
            <p className="mb-4 text-small-regular text-ui-fg-base">Effective Date: 1 July 2025</p>

            <p className="mb-4 text-medium-regular text-ui-fg-base">
                At Quickdose, your satisfaction is important to us. Due to the nature of our products (disposable vapes, cannabis items, alcohol), we have a strict refund policy outlined below.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">1. Eligibility for Refunds</h2>
            <p className="mb-2 text-medium-regular text-ui-fg-base">Refunds are only considered if:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>The product delivered is defective, damaged, or incorrect.</li>
                <li>The order was not delivered within the promised timeframe.</li>
            </ul>
            <p className="mb-2 text-medium-regular text-ui-fg-base">We do not offer refunds or returns for:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Change of mind or incorrect ordering by the customer.</li>
                <li>Products that have been opened, used, or tampered with.</li>
                <li>Perishable items once delivered.</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">2. How to Request a Refund</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">Contact us within 24 hours of receiving your order via:</p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>WhatsApp: +27 63 529 1651</li>
                <li>Email: quickdose.co.za@gmail.com</li>
            </ul>
            <p className="mb-4 text-medium-regular text-ui-fg-base">Please provide:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Your order number</li>
                <li>Details of the issue</li>
                <li>Photographic evidence of the defect or damage (if applicable)</li>
            </ul>

            <h2 className="text-xl-semi mb-4 mt-8">3. Refund Process</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">Once we receive your refund request and verify the claim, we will:</p>
            <ul className="list-disc pl-5 mb-4 text-medium-regular text-ui-fg-base">
                <li>Approve the refund and process it within 7 business days.</li>
                <li>Provide updates throughout the process.</li>
            </ul>
            <p className="mb-4 text-medium-regular text-ui-fg-base">Refunds will be made via the original payment method.</p>

            <h2 className="text-xl-semi mb-4 mt-8">4. Non-Refundable Items</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Due to health and safety regulations, vapes, cannabis products, and alcohol are non-refundable unless defective or delivered incorrectly.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">5. Cancellation Policy</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                Orders cannot be canceled once processing or delivery has started. Please review your order carefully before confirming purchase.
            </p>

            <h2 className="text-xl-semi mb-4 mt-8">6. Contact Us</h2>
            <p className="mb-4 text-medium-regular text-ui-fg-base">
                If you have any questions about our refund policy or need assistance, contact us:
            </p>
            <ul className="list-none mb-4 text-medium-regular text-ui-fg-base">
                <li>📧 Email: quickdose.co.za@gmail.com</li>
                <li>📞 WhatsApp: +27 63 529 1651</li>
            </ul>
        </div>
    )
}
