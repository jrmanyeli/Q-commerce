import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="border-t border-ui-border-base w-full bg-gray-50">
      <div className="content-container flex flex-col w-full">
        {/* Header */}
        <div className="py-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Quickdose.co.za</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Location */}
          <div className="flex flex-col gap-y-3">
            <span className="txt-small-plus text-black font-semibold">Location</span>
            <div className="text-sm text-gray-700 flex flex-col gap-y-2">
              <p>89 Ridder Street, Oos-Einde,</p>
              <p>Rustenburg, 2999, South Africa</p>
              <a href="mailto:quickdose.co.za@gmail.com" className="hover:text-black">
                quickdose.co.za@gmail.com
              </a>
              <a href="tel:+27635291651" className="hover:text-black">
                +27 63 529 1651
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-y-3">
            <span className="txt-small-plus text-black font-semibold">Menu</span>
            <ul className="flex flex-col gap-y-2 text-sm text-gray-700 items-start text-left">
              <li>
                <LocalizedClientLink href="/" className="hover:text-black">
                  Home
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-black">
                  Shop
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/about" className="hover:text-black">
                  About
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/contact" className="hover:text-black">
                  Contact
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink href="/become-driver" className="hover:text-black">
                  Become a Driver
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="flex flex-col gap-y-3">
            <span className="txt-small-plus text-black font-semibold">FAQ</span>
            <ul className="flex flex-col gap-y-2 text-sm text-gray-700 items-start text-left">
              <li>
                <LocalizedClientLink href="/terms-and-conditions" className="hover:text-black">
                  Terms & Conditions
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/privacy-policy" className="hover:text-black">
                  Privacy Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/shipping-policy" className="hover:text-black">
                  Shipping Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/refund-policy" className="hover:text-black">
                  Refund Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/cookie-policy" className="hover:text-black">
                  Cookie Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/accessibility-statement" className="hover:text-black">
                  Accessibility Statement
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-y-3">
            <span className="txt-small-plus text-black font-semibold">Social</span>
            <ul className="flex flex-col gap-y-2 text-sm text-gray-700">
              <li>
                <a
                  href="https://web.facebook.com/quickdose.co"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/quickdose.co.za/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 py-6">
          <Text className="text-xs text-gray-600 leading-relaxed">
            <strong>Disclaimer:</strong> In compliance with the Tobacco Products Control Act (1993), the Liquor Act, and the Cannabis for Private Purposes Act in South Africa, this website is intended for persons 18 years and older. No vape, alcohol, or cannabis-related products are sold or supplied to anyone under the age of 18. ID verification may be required upon delivery.
          </Text>
        </div>

        {/* Copyright */}
        <div className="flex w-full pb-8 justify-center text-ui-fg-muted">
          <Text className="txt-compact-small text-gray-600">
            © {new Date().getFullYear()} by Quickdose.co.za. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
