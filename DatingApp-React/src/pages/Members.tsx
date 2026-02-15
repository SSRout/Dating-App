import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMembersStore } from "../store/membersStore";
import { Heart, Search, Filter, Loader } from "lucide-react";

export default function Members() {
  const { members, isLoading, pagination, fetchMembers } = useMembersStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const filteredMembers = members.filter(
    (member) =>
      member.knownAs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">
            Browse <span className="text-neon-pink">Members</span>
          </h1>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-neon-cyan" />
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border text-white rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border text-neon-cyan rounded-lg hover:bg-opacity-80 transition-all">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader className="w-12 h-12 text-neon-pink animate-spin" />
          </div>
        ) : (
          <>
            {/* Members Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {filteredMembers.map((member) => (
                <Link
                  key={member.id}
                  to={`/members/${member.id}`}
                  className="group bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:border-neon-pink transition-all duration-300 hover:shadow-neon-pink transform hover:scale-105"
                >
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

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-neon-pink transition-colors">
                        {member.knownAs}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {member.city}, {member.country}
                      </p>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-2">
                      {member.bio || "No bio available"}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-dark-border">
                      <span className="text-xs text-gray-500">
                        {member.gender}
                      </span>
                      <Heart className="w-5 h-5 text-neon-pink hover:fill-neon-pink transition-all cursor-pointer" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {filteredMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No members found matching your search.
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-6 py-2 bg-dark-card border border-dark-border text-neon-cyan rounded-lg hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        currentPage === page
                          ? "bg-gradient-primary text-white"
                          : "bg-dark-card border border-dark-border text-gray-300 hover:border-neon-cyan"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pagination.totalPages}
                  className="px-6 py-2 bg-dark-card border border-dark-border text-neon-cyan rounded-lg hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
