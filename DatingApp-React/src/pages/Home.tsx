import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Heart, Sparkles, Users, MessageSquare } from "lucide-react";

export default function Home() {
  const { token } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-30 animate-pulse-glow" />
            <Heart className="relative w-24 h-24 text-neon-pink mx-auto animate-float" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold">
            Find Your{" "}
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Perfect Match
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect, chat, and discover meaningful relationships with people who
            share your interests.
          </p>

          {!token ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-primary text-white text-lg font-bold rounded-lg hover:shadow-neon-pink transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan text-lg font-bold rounded-lg hover:bg-neon-cyan hover:text-dark-bg transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/members"
              className="inline-block px-8 py-4 bg-gradient-primary text-white text-lg font-bold rounded-lg hover:shadow-neon-pink transition-all duration-300 transform hover:scale-105"
            >
              Browse Members
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-dark-bg to-dark-card py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-neon-pink">DateMatch?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-dark-card border border-dark-border rounded-lg hover:border-neon-pink transition-all hover:shadow-neon-pink group">
              <Users className="w-12 h-12 text-neon-pink group-hover:scale-110 transition-transform mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Browse Profiles
              </h3>
              <p className="text-gray-400">
                Explore beautiful profiles and discover people who match your
                interests and values.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-dark-card border border-dark-border rounded-lg hover:border-neon-cyan transition-all hover:shadow-neon-cyan group">
              <MessageSquare className="w-12 h-12 text-neon-cyan group-hover:scale-110 transition-transform mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Connect & Chat
              </h3>
              <p className="text-gray-400">
                Start conversations and build meaningful connections with people
                you like.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-dark-card border border-dark-border rounded-lg hover:border-neon-purple transition-all hover:shadow-neon-purple group">
              <Sparkles className="w-12 h-12 text-neon-purple group-hover:scale-110 transition-transform mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Show Interest
              </h3>
              <p className="text-gray-400">
                Like profiles, receive likes, and let people know you're
                interested in them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!token && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-primary rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Find Your Match?
            </h2>
            <p className="text-lg text-gray-100 mb-8">
              Join thousands of singles looking for love today!
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-dark-bg text-neon-pink font-bold rounded-lg hover:bg-opacity-80 transition-all"
            >
              Create Account Now
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
