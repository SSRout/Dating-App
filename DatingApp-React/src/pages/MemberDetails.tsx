import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMembersStore } from "../store/membersStore";
import { Heart, MapPin, Loader, ArrowLeft, MessageSquare } from "lucide-react";

export default function MemberDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedMember, isLoading, fetchMember, likeUser } =
    useMembersStore();

  useEffect(() => {
    if (id) {
      fetchMember(parseInt(id));
    }
  }, [id, fetchMember]);

  const handleLike = async () => {
    if (selectedMember) {
      try {
        await likeUser(selectedMember.id);
        alert("You liked this member!");
      } catch (err) {
        console.error("Failed to like member", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Loader className="w-12 h-12 text-neon-pink animate-spin" />
      </div>
    );
  }

  if (!selectedMember) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Member not found</p>
          <Link
            to="/members"
            className="text-neon-pink hover:text-neon-cyan transition-colors"
          >
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/members")}
          className="flex items-center gap-2 mb-8 px-4 py-2 text-neon-cyan hover:text-neon-pink transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Members
        </button>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Photo Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-neon-pink shadow-neon-pink h-96 md:h-full">
              <img
                src={
                  selectedMember.photoUrl ||
                  "https://via.placeholder.com/400x600?text=No+Photo"
                }
                alt={selectedMember.knownAs}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Name & Location */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {selectedMember.knownAs},{" "}
                {new Date().getFullYear() -
                  new Date(selectedMember.dob).getFullYear()}
              </h1>
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <MapPin className="w-5 h-5 text-neon-cyan" />
                <span>
                  {selectedMember.city}, {selectedMember.country}
                </span>
              </div>
              <div className="inline-block px-3 py-1 bg-dark-card border border-dark-border text-sm text-neon-cyan rounded-full">
                {selectedMember.gender}
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-bold text-neon-pink mb-2">About</h3>
              <p className="text-gray-300 leading-relaxed">
                {selectedMember.bio || "No bio provided yet."}
              </p>
            </div>

            {/* Interests */}
            {selectedMember.interests && (
              <div>
                <h3 className="text-lg font-bold text-neon-cyan mb-3">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.interests.split(",").map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-primary text-white text-sm rounded-full"
                    >
                      {interest.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-dark-card rounded-lg border border-dark-border">
              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="text-white font-bold">
                  {new Date(selectedMember.dob).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Username</p>
                <p className="text-white font-bold">
                  {selectedMember.username}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleLike}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-primary text-white font-bold rounded-lg hover:shadow-neon-pink transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                Like Member
              </button>
              <Link
                to="/messages"
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-neon-cyan text-neon-cyan font-bold rounded-lg hover:bg-neon-cyan hover:text-dark-bg transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
