import { useEffect, useState } from "react";
import {
  BookOpen, Search, Calculator, FlaskConical,
  Globe, Landmark, Dumbbell, Languages, Palette, BookText,
  ChevronRight, X,
} from "lucide-react";

interface Book {
  id: number;
  title: string;
  description?: string;
  grade_level: number;
  subject: string;
  cover_image_url?: string;
  file_url?: string;
}

const SUBJECT_THUMBNAILS: Record<string, string> = {
  mathematics:
    "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400",
  science:
    "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400",
  english:
    "https://images.pexels.com/photos/159581/pexels-photo-159581.jpeg?auto=compress&cs=tinysrgb&w=400",
  amharic:
    "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400",
  arts:
    "https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=400",
  sport:
    "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400",
  civic:
    "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=400",
  oromic:
    "https://images.pexels.com/photos/5905489/pexels-photo-5905489.jpeg?auto=compress&cs=tinysrgb&w=400",
  "social studies":
    "https://images.pexels.com/photos/207529/pexels-photo-207529.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const GRADE_COLORS: Record<number, string> = {
  1: "bg-yellow-400",
  2: "bg-green-400",
  3: "bg-blue-400",
  4: "bg-purple-400",
  5: "bg-orange-400",
  6: "bg-red-400",
};

function getSubjectThumbnail(subject: string): string {
  return (
    SUBJECT_THUMBNAILS[subject.toLowerCase()] ||
    "https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400"
  );
}

function getGradeColor(grade: number): string {
  return GRADE_COLORS[grade] || "bg-gray-400";
}

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  mathematics: <Calculator className="h-3.5 w-3.5" />,
  science:     <FlaskConical className="h-3.5 w-3.5" />,
  english:     <BookText className="h-3.5 w-3.5" />,
  amharic:     <Languages className="h-3.5 w-3.5" />,
  arts:        <Palette className="h-3.5 w-3.5" />,
  sport:       <Dumbbell className="h-3.5 w-3.5" />,
  civic:       <Landmark className="h-3.5 w-3.5" />,
  oromic:      <Languages className="h-3.5 w-3.5" />,
  "social studies": <Globe className="h-3.5 w-3.5" />,
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = ["Mathematics", "Science", "English","Oromic","civic", "Social Studies", "Arts", "Amharic", "Sport"];
  const grades = [1, 2, 3, 4, 5, 6];

  // static list of your books
  const LOCAL_BOOKS: Book[] = [
    {
      id: 1,
      title: "Grade 1 Student Book Amharic",
      description: " 1 አማርኛ የተማሪ መጽሐፍ ",
      grade_level: 1,
      subject: "Amharic",
      file_url: "/books/grade 1 sb.pdf",
    },
    
    {
      id: 3,
      title: "Grade 5 Mathematics Textbook",
      description: "5ኛ ክፍል የሂሳብ መማሪያ መጽሐፍ",
      grade_level: 5,
      subject: "Mathematics",
      file_url: "/books/Grade5_Mathematics_Textbook new.pdf",
    },
    {
      id: 4,
      title: "Grade 5 Visual & Performing Art",
      description: "ሥነ-ጥበብ የመማሪያ መጽሀፍ 5ተኛ ክፍል",
      grade_level: 5,
      subject: "Arts",
      file_url: "/books/Grade5_Visual_&_Performing_Art_Textbook new.pdf",
    },
    {
      id: 5,
      title: "Grade5_Amharic_Textbook new",
      description: "አማርኛ የመማሪያ መጽሀፍ 5ተኛ ክፍል",
      grade_level: 5,
      subject: "Amharic",
      file_url: "/books/Grade5_Amharic_Textbook new.pdf",
    },
    {
      id: 6,
      title: "Grade5_Environmental_Textbook new",
      description: "አካባቢ ሳይንስ የመማሪያ መጽሀፍ 5ተኛ ክፍል",
      grade_level: 5,
      subject: "Science",
      file_url: "/books/Grade5_Environmental_Textbook new.pdf",
    },
    {
      id: 7,
      title: "Grade5_Sport_Textbook new",
      description: " የጤናና ሰዉነት ማጎልመሻ ትምህርት የመማሪያ መጽሀፍ 5ተኛ ክፍል",
      grade_level: 5,
      subject: "sport",
      file_url: "/books/Grade5_Sport_Textbook new.pdf",
    },
    {
      id: 8,
      title: "Grade 6 Student Book Amharic",
      description: "አማርኛ የመማሪያ መጽሀፍ 6ተኛ ክፍል",
      grade_level:6,
      subject: "Amharic",
      file_url: "/books/grade 6 sb.pdf",
    },
    {
      id: 9,
      title: "Grade 1 Performing and Visual Arts Student's Book",
      description: "የ1ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ",
      grade_level: 1,
      subject: "Arts",
      file_url: "/books/የ1ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ.pdf",
    },
     {
      id: 10,
      title: "Grade 2 Performing and Visual Arts Student's Book",
      description: "የ2ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ",
      grade_level: 2,
      subject: "Arts",
      file_url: "/books/የ2ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ.pdf",
    },
     {
      id: 11,
      title: "Grade 3 Performing and Visual Arts Student's Book",
      description: "የ3ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ",
      grade_level: 3,
      subject: "Arts",
      file_url: "/books/የ3ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ.pdf",
    },
    {
      id: 12,
      title: "Grade 4 Performing and Visual Arts Student's Book",
      description: "የ4ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ",
      grade_level: 4,
      subject: "Arts",
      file_url: "/books/የ4ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ.pdf",
    },
     {
      id: 13,
      title: "Grade 5 Performing and Visual Arts Student's Book",
      description: "የ5ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ",
      grade_level: 5,
      subject: "arts",
      file_url: "/books/የ5ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ.pdf",
    },
     {
      id: 14,
      title: "Grade 6 Performing and Visual Arts Student's Book",
      description: "የ6ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ",
      grade_level: 6,
      subject: "Arts",
      file_url: "/books/የ6ኛ_ክፍል_የክወናና_የዕይታ_ጥበባት_የተማሪ_መፅሃፍ.pdf",
    },
      {
      id: 15,
      title: "Grade 4 Student Book Amharic",
      description: "አማርኛ የመማሪያ መጽሀፍ 4ተኛ ክፍል",
      grade_level: 4,
      subject: "Amharic",
      file_url: "/books/grade 4 sb.pdf",
    },
      {
      id: 16,
      title: "Grade 3 Student Book Amharic",
      description: "አማርኛ የመማሪያ መጽሀፍ 3ተኛ ክፍል",
      grade_level: 3,
      subject: "Amharic",
      file_url: "/books/grade 3 sb.pdf",
    },
      {
      id: 17,
      title: "Grade 2 Student Book Amharic",
      description: "አማርኛ የመማሪያ መጽሀፍ 2ተኛ ክፍል",
      grade_level: 2,
      subject: "Amharic",
      file_url: "/books/grade 2 sb.pdf",
    },
    {
      id: 18,
      title: "Grade 4 Student Book sport",
      description: " የጤናና ሰዉነት ማጎልመሻ ትምህርት የመማሪያ መጽሀፍ 4ተኛ ክፍል",
      grade_level: 4,
      subject: "sport",
      file_url: "/books/G4 text chapter1-3 hpe.pdf",
    },
    {
      id: 19,
      title: "Grade 3 Student Book sport",
      description: " የጤናና ሰዉነት ማጎልመሻ ትምህርት የመማሪያ መጽሀፍ 3ተኛ ክፍል",
      grade_level: 3,
      subject: "sport",
      file_url: "/books/G3 text chapter1-3 hpe.pdf",
    },
    {
      id: 20,
      title: "Grade 2 Student Book sport",
      description: " የጤናና ሰዉነት ማጎልመሻ ትምህርት የመማሪያ መጽሀፍ 2ተኛ ክፍል",
      grade_level: 2,
      subject: "sport",
      file_url: "/books/G2 text chapter1-3 hpe.pdf",
    },
    {
      id: 21,
      title: "Grade 1 Student Book hpe",
      description: " የጤናና ሰዉነት ማጎልመሻ ትምህርት የመማሪያ መጽሀፍ 1ኛ ክፍል",
      grade_level: 1,
      subject: "Arts",
      file_url: "/books/G1 text chapter1-3 hpe.pdf",
    },
    {
      id: 22,
      title: "Grade 6 Student Book sport",
      description: " የጤናና ሰዉነት ማጎልመሻ ትምህርት የመማሪያ መጽሀፍ 6ኛ ክፍል",
      grade_level: 6,
      subject: "sport",
      file_url: "/books/G6 text chapter1-3 hpe.pdf",
    },
     {
      id: 23,
      title: "Grade6_Environmental_Textbook ",
      description: "አካባቢ ሳይንስ የመማሪያ መጽሀፍ 6ተኛ ክፍል",
      grade_level: 6,
      subject: "Science",
      file_url: "/books/Grade6_Environmental_Textbook.pdf",
    },
     {
      id: 24,
      title: "Grade 6 Mathematics Textbook",
      description: "6ኛ ክፍል የሂሳብ መማሪያ መጽሐፍ",
      grade_level: 6,
      subject: "Mathematics",
      file_url: "/books/Grade6_Mathematics_Textbook new.pdf",
    },
    {
      id: 25,
      title: "civics-grade-6 Textbook",
      description: "6ኛ ክፍል የሂሳብ መማሪያ መጽሐፍ",
      grade_level: 6,
      subject: "civic",
      file_url: "/books/civics-grade-6.pdf",
    },
    {
      id: 26,
      title: "Grade 1 Mathematics Textbook",
      description: "1ኛ ክፍል የሂሳብ መማሪያ መጽሐፍ",
      grade_level: 1,
      subject: "Mathematics",
      file_url: "/books/Maths Grade 1Amaharic.pdf",
    },
    {
      id: 27,
      title: "Grade 3 Mathematics Textbook",
      description: "3ኛ ክፍል የሂሳብ መማሪያ መጽሐፍ",
      grade_level: 3,
      subject: "Mathematics",
      file_url: "/books/Maths Grade 3Amaharic.pdf",
    },
    {
      id: 28,
      title: "Grade 3_Environmental_Textbook ",
      description: "አካባቢ ሳይንስ የመማሪያ መጽሀፍ 3ተኛ ክፍል",
      grade_level: 3,
      subject: "Science",
      file_url: "/books/3ኛ ክፍል የአከባቢ ሳይንስ_merged.pdf",
    },
    {
      id: 29,
      title: "English grade 1_Textbook ",
      description: "",
      grade_level: 1,
      subject: "English",
      file_url: "/books/English grade 1.pdf",
    },
    {
      id: 30,
      title: "English grade 3_Textbook ",
      description: "",
      grade_level: 3,
      subject: "English",
      file_url: "/books/English Student’s Grade 3 .pdf",
    },
    {
      id: 31,
      title: "Oromic grade 1_Textbook ",
      description: "",
      grade_level: 1,
      subject: "Oromic",
      file_url: "/books/Grade one AO.pdf",
    },
    {
      id: 32,
      title: "Grade 2 Mathematics Textbook",
      description: "2ኛ ክፍል የሂሳብ መማሪያ መጽሐፍ",
      grade_level: 2,
      subject: "Mathematics",
      file_url: "/books/Grade 2 Student Text Book  Maths.pdf",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setBooks(LOCAL_BOOKS);
      setFilteredBooks(LOCAL_BOOKS);
      setLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, selectedGrade, selectedSubject, searchQuery]);

  function filterBooks() {
    let filtered = [...books];
    if (selectedGrade) filtered = filtered.filter((b) => b.grade_level === selectedGrade);
    if (selectedSubject) filtered = filtered.filter((b) => b.subject === selectedSubject);
    if (searchQuery)
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredBooks(filtered);
  }

  function resetFilters() {
    setSelectedGrade(null);
    setSelectedSubject(null);
    setSearchQuery("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Book Library</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore your collection of educational books for grades 1–6
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Books</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
              <select
                value={selectedGrade || ""}
                onChange={(e) => setSelectedGrade(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Grades</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject || ""}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(selectedGrade || selectedSubject || searchQuery) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredBooks.length} of {books.length} books
              </p>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Book List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`h-2 w-full ${getGradeColor(book.grade_level)}`} />
                <img
                  src={book.cover_image_url || getSubjectThumbnail(book.subject)}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-blue-600">
                      Grade {book.grade_level}
                    </span>
                    <span className="text-sm text-gray-600">{book.subject}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>
                  <a
                    href={book.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Open PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
