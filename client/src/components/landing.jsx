import Header from './Header';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Header />
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Smarter Learning with AI
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          An AI-powered solution that directly connects your notes to question banks,
          delivering accurate, context-specific answers to boost learning efficiency
          and academic outcomes.
        </p>
        <button className="px-6 py-3 text-lg rounded-2xl shadow-lg bg-indigo-600 text-white hover:bg-indigo-700">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="shadow-md rounded-2xl p-6 text-center bg-white">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold text-lg">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
          <p className="text-gray-600">
            Connects directly to your notes and question banks without extra steps.
          </p>
        </div>

        <div className="shadow-md rounded-2xl p-6 text-center bg-white">
          <div className="mx-auto mb-4 w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full font-bold text-lg">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">AI-Powered Accuracy</h3>
          <p className="text-gray-600">
            Provides precise, context-specific answers tailored to your material.
          </p>
        </div>

        <div className="shadow-md rounded-2xl p-6 text-center bg-white">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full font-bold text-lg">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">Boost Efficiency</h3>
          <p className="text-gray-600">
            Saves time and maximizes outcomes with faster, smarter learning.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Start using our AI-powered solution today and unlock better academic outcomes.
        </p>
        <button className="bg-white text-indigo-600 px-6 py-3 text-lg rounded-2xl hover:bg-gray-100">
          Try It Now
        </button>
      </section>

      <Footer />
    </div>
  );
}