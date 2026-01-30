"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"

const CartLoginBar = ({ customer }: { customer: any }) => {
  const pathname = usePathname()
  
  // Only show on cart page when user is not logged in
  if (customer || !pathname?.includes("/cart")) {
    return null
  }

  return (
    <div className="bg-ui-bg-subtle border-b border-ui-border-base">
      <div className="content-container">
        <div className="flex items-center justify-between py-3">
          <div>
            <Heading level="h2" className="txt-large font-medium">
              Already have an account?
            </Heading>
            <Text className="txt-small text-ui-fg-subtle mt-1">
              Sign in for a better experience.
            </Text>
          </div>
          <div>
            <LocalizedClientLink href="/account">
              <Button variant="secondary" className="h-10" data-testid="cart-login-bar-sign-in-button">
                Sign in
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartLoginBar
