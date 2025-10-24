import { Mail, Phone, MapPin } from "lucide-react";
import Header from "./Header";
export default function Footer() {
    return (
        <section id="contact" className="py-20 bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black">
                        Contact Us
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Have questions or feedback? Reach out and we’ll get back to you quickly.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Email */}
                    <div className="bg-white p-8 rounded-xl shadow border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition">
                        <Mail className="w-10 h-10 text-blue-700 mb-4" />
                        <h3 className="font-semibold text-black mb-2">Email</h3>
                        <p className="text-gray-500">support@reiken.com</p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white p-8 rounded-xl shadow border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition">
                        <Phone className="w-10 h-10 text-blue-700 mb-4" />
                        <h3 className="font-semibold text-black mb-2">Phone</h3>
                        <p className="text-gray-500">+91 6841694152</p>
                    </div>

                    {/* Address */}
                    <div className="bg-white p-8 rounded-xl shadow border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition">
                        <MapPin className="w-10 h-10 text-blue-700 mb-4" />
                        <h3 className="font-semibold text-black mb-2">Address</h3>
                        <p className="text-gray-500">SJEC Vamanjoor</p>
                    </div>
                </div>

                {/* Optional Contact Form */}
                <div className="mt-12 bg-white p-8 rounded-xl shadow border border-gray-200 max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-black mb-4">Send Us a Message</h3>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition flex items-center justify-center"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
