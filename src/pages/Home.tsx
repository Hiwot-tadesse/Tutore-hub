import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react'; // Only import what you use

interface Book {
  id: string;
  title: string;
  description?: string | null;
  subject: string;
  grade_level: number;
  cover_image_url?: string | null;
}

interface VideoType {
  id: string;
  title: string;
  description?: string | null;
  subject: string;
  grade_level: number;
  thumbnail_url?: string | null;
  duration: number;
}

interface LearningRoadmap {
  id: string;
  grade_level: number;
  subject: string;
  topic: string;
  sequence_order: number;
  description?: string | null;
}

interface HomeProps {
  onNavigate: (page: string) => void;
}

// Dummy data
const DUMMY_BOOKS: Book[] = [
  { id: '1', title: 'Mathematics for Grade 1', description: 'Basic math concepts for young learners.', subject: 'Math', grade_level: 1, cover_image_url: null },
  { id: '2', title: 'Science Wonders', description: 'Explore the wonders of science.', subject: 'Science', grade_level: 1, cover_image_url: null },
  { id: '3', title: 'English Basics', description: 'Learn the basics of English grammar.', subject: 'English', grade_level: 1, cover_image_url: null },
];

const DUMMY_VIDEOS: VideoType[] = [
  { id: '1', title: 'Introduction to Numbers', description: 'Learn counting and numbers.', subject: 'Math', grade_level: 1, thumbnail_url: null, duration: 180 },
  { id: '2', title: 'Plants and Animals', description: 'Introduction to biology for kids.', subject: 'Science', grade_level: 1, thumbnail_url: null, duration: 240 },
  { id: '3', title: 'Alphabet Song', description: 'Fun way to learn English alphabet.', subject: 'English', grade_level: 1, thumbnail_url: null, duration: 120 },
];

const DUMMY_ROADMAP: LearningRoadmap[] = [
  { id: '1', grade_level: 1, subject: 'Math', topic: 'Numbers', sequence_order: 1, description: 'Learn basic numbers.' },
  { id: '2', grade_level: 1, subject: 'Math', topic: 'Addition', sequence_order: 2, description: 'Start simple addition.' },
  { id: '3', grade_level: 1, subject: 'Science', topic: 'Plants', sequence_order: 1, description: 'Learn about plants.' },
];

export default function Home({ onNavigate }: HomeProps) {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<VideoType[]>([]);
  const [roadmapItems, setRoadmapItems] = useState<LearningRoadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setFeaturedBooks(DUMMY_BOOKS);
      setFeaturedVideos(DUMMY_VIDEOS);
      setRoadmapItems(DUMMY_ROADMAP);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn, Grow, and Excel with LearnHub</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
          Free educational resources for students up to Grade 6. Books, videos, and personalized tutoring to help every child succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('books')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
          >
            Explore Books <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button
            onClick={() => onNavigate('auth')}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors border-2 border-white"
          >
            Register Now
          </button>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Learning Roadmap</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            </div>
          ) : (
            roadmapItems.map((item, index) => (
              <div key={item.id} className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">{index + 1}</div>
                </div>
                <div className="ml-4 flex-1 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.topic}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-2 text-sm text-gray-500">{item.subject} • Grade {item.grade_level}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Featured Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={book.cover_image_url || 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">{book.subject} • Grade {book.grade_level}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
                  <button
                    onClick={() => onNavigate('books')}
                    className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
                  >
                    Read Now <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Featured Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnail_url || 'https://images.pexels.com/photos/8500318/pexels-photo-8500318.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-green-600 font-semibold mb-2">{video.subject} • Grade {video.grade_level}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                  <button
                    onClick={() => onNavigate('videos')}
                    className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center"
                  >
                    Watch Now <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
