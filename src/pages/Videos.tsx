import { useEffect, useState } from 'react';
import { Video as VideoIcon, Play, Search, Filter, Clock } from 'lucide-react';

interface VideoType {
  id: string;
  title: string;
  description?: string | null;
  subject: string;
  grade_level: number;
  thumbnail_url?: string | null;
  duration: number;
}

export default function Videos() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies'];
  const grades = [1, 2, 3, 4, 5, 6];

  // Dummy video data
  const DUMMY_VIDEOS: VideoType[] = [
    { id: '1', title: 'Introduction to Numbers', description: 'Learn counting and numbers.', subject: 'Mathematics', grade_level: 1, thumbnail_url: null, duration: 180 },
    { id: '2', title: 'Plants and Animals', description: 'Introduction to biology for kids.', subject: 'Science', grade_level: 1, thumbnail_url: null, duration: 240 },
    { id: '3', title: 'Alphabet Song', description: 'Fun way to learn English alphabet.', subject: 'English', grade_level: 1, thumbnail_url: null, duration: 120 },
    { id: '4', title: 'Simple Subtraction', description: 'Learn basic subtraction.', subject: 'Mathematics', grade_level: 2, thumbnail_url: null, duration: 200 },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setVideos(DUMMY_VIDEOS);
      setFilteredVideos(DUMMY_VIDEOS);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, selectedGrade, selectedSubject, searchQuery]);

  function filterVideos() {
    let filtered = [...videos];

    if (selectedGrade) filtered = filtered.filter(v => v.grade_level === selectedGrade);
    if (selectedSubject) filtered = filtered.filter(v => v.subject === selectedSubject);
    if (searchQuery) {
      filtered = filtered.filter(
        v => v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             v.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
  }

  function resetFilters() {
    setSelectedGrade(null);
    setSelectedSubject(null);
    setSearchQuery('');
  }

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 text-center">
        <VideoIcon className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Library</h1>
        <p className="text-xl text-green-100 max-w-2xl mx-auto">
          Watch engaging educational videos designed for visual learners
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Videos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
              <select
                value={selectedGrade || ''}
                onChange={(e) => setSelectedGrade(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Grades</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject || ''}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          {(selectedGrade || selectedSubject || searchQuery) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredVideos.length} of {videos.length} videos
              </p>
              <button onClick={resetFilters} className="text-sm text-green-600 hover:text-green-700 font-medium">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <VideoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnail_url || 'https://images.pexels.com/photos/8500318/pexels-photo-8500318.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group cursor-pointer hover:bg-opacity-50 transition-all">
                    <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDuration(video.duration)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-green-600">Grade {video.grade_level}</span>
                    <span className="text-sm text-gray-600">{video.subject}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{video.description}</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
