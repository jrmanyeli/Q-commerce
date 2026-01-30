import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Download Driver App",
    description: "Download the Quickdose Driver App for Android",
}

export default function BecomeDriver() {
    return (
        <div className="content-container py-12 small:py-24">
            <div className="flex flex-col items-center text-center mb-16">
                <h1 className="text-3xl-semi mb-6">Become a Quickdose Driver</h1>
                <p className="text-medium-regular text-ui-fg-base max-w-lg mb-8">
                    Join our delivery fleet and start earning today. Download our mobile app to manage orders, track earnings, and deliver happiness.
                </p>

                <div className="flex flex-col gap-4 w-full max-w-md">
                    <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-4">
                        <h3 className="text-xl-semi">Android</h3>
                        <p className="text-small-regular text-gray-600">Download the APK directly for your Android device.</p>
                        <a
                            href="/downloads/driver-app.apk"
                            download
                            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <span>Download APK</span>
                        </a>
                        <p className="text-xs text-gray-500">Version 1.0.0 | Size: 15MB</p>
                    </div>
                </div>

                <div className="mt-12 text-left w-full max-w-2xl bg-white p-8 border border-gray-100 rounded-lg shadow-sm">
                    <h2 className="text-xl-semi mb-4">Installation Instructions (Android)</h2>
                    <ol className="list-decimal pl-5 space-y-2 text-medium-regular text-ui-fg-base">
                        <li>Download the APK file using the button above.</li>
                        <li>Once downloaded, tap to open the file on your device.</li>
                        <li>If prompted, allow installation from "Unknown Sources" in your phone settings.</li>
                        <li>Follow the on-screen instructions to complete the installation.</li>
                        <li>Open the app, sign up or log in, and start accepting orders!</li>
                    </ol>
                </div>

                <div className="mt-8 text-small-regular text-gray-500">
                    <p>Need help? Contact support on <a href="https://wa.me/27635291651" className="text-blue-600 underline">+27 63 529 1651</a></p>
                </div>
            </div>
        </div>
    )
}
