import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, X, Loader } from "lucide-react";
import { useMembersStore, Member } from "../store/membersStore";

export default function Likes() {
  const { members, isLoading, fetchMembers } = useMembersStore();
  const [likedMembers, setLikedMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetchMembers(1);
  }, [fetchMembers]);

  useEffect(() => {
    // Simulate liked members (in real app, get from API)
    setLikedMembers(members.slice(0, 8));
  }, [members]);

  const handleLikesRemove = (id: number) => {
    setLikedMembers(likedMembers.filter((member) => member.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Loader className="w-12 h-12 text-neon-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            People Who Liked <span className="text-neon-pink">You</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {likedMembers.length} people are interested in you
          </p>
        </div>

        {/* Likes Grid */}
        {likedMembers.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {likedMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-dark-card border border-dark-border rounded-lg overflow-hidden shadow-lg hover:shadow-neon-pink transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={
                      member.photoUrl ||
                      "https://via.placeholder.com/300x400?text=No+Photo"
                    }
                    alt={member.knownAs}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {member.knownAs}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {member.city}, {member.country}
                    </p>
                  </div>

                  <p className="text-sm text-gray-300 line-clamp-2">
                    {member.bio || "No bio available"}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-dark-border">
                    <Link
                      to={`/members/${member.id}`}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-gradient-primary text-white text-sm font-bold rounded-lg hover:shadow-neon-pink transition-all"
                    >
                      <Heart className="w-4 h-4" />
                      Like Back
                    </Link>
                    <Link
                      to="/messages"
                      className="flex-1 flex items-center justify-center gap-1 py-2 border border-neon-cyan text-neon-cyan text-sm font-bold rounded-lg hover:bg-neon-cyan hover:text-dark-bg transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </Link>
                    <button
                      onClick={() => handleLikesRemove(member.id)}
                      className="px-2 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-dark-card rounded-full mb-4">
              <Heart className="w-12 h-12 text-neon-pink opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Likes Yet</h3>
            <p className="text-gray-400 mb-6">
              Complete your profile and start connecting with people you like!
            </p>
            <Link
              to="/members"
              className="inline-block px-8 py-3 bg-gradient-primary text-white font-bold rounded-lg hover:shadow-neon-pink transition-all"
            >
              Browse Members
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
