import { useEffect, useState } from "react";
import { BookOpen, Search, Filter, ExternalLink } from "lucide-react";

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

function getGradeBorderColor(grade: number): string {
  const borders: Record<number, string> = {
    1: "border-yellow-400",
    2: "border-green-400",
    3: "border-blue-400",
    4: "border-purple-400",
    5: "border-orange-400",
    6: "border-red-400",
  };
  return borders[grade] || "border-gray-300";
}

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
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium">Educational Resource Hub</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Digital Book Library
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Explore our collection of educational books for grades 1–6
          </p>
          <div className="flex justify-center items-center gap-10">
            <div className="text-center">
              <p className="text-4xl font-extrabold">{books.length}</p>
              <p className="text-blue-200 text-sm mt-1">Books</p>
            </div>
            <div className="w-px h-10 bg-white/25" />
            <div className="text-center">
              <p className="text-4xl font-extrabold">6</p>
              <p className="text-blue-200 text-sm mt-1">Grades</p>
            </div>
            <div className="w-px h-10 bg-white/25" />
            <div className="text-center">
              <p className="text-4xl font-extrabold">{subjects.length}</p>
              <p className="text-blue-200 text-sm mt-1">Subjects</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Filter Panel ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Filter Books</h2>
            </div>
            {(selectedGrade || selectedSubject || searchQuery) && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {filteredBooks.length} of {books.length} books
                </span>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or description…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition"
            />
          </div>

          {/* Grade pills */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Grade Level</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGrade(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  selectedGrade === null
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                }`}
              >
                All
              </button>
              {grades.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    selectedGrade === grade
                      ? `${getGradeColor(grade)} text-white border-transparent shadow-sm`
                      : `bg-white text-gray-600 border-gray-300 hover:${getGradeBorderColor(grade)}`
                  }`}
                >
                  Grade {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Subject chips */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Subject</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubject(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  selectedSubject === null
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
              >
                All Subjects
              </button>
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    selectedSubject === subject
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Book Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-200 rounded-full w-full" />
                  <div className="h-3 bg-gray-200 rounded-full w-5/6" />
                  <div className="h-10 bg-gray-200 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4">
              <BookOpen className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
            <button
              onClick={resetFilters}
              className="text-blue-600 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail with overlaid badges */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.cover_image_url || getSubjectThumbnail(book.subject)}
                    alt={book.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {book.subject}
                  </span>
                  <span
                    className={`absolute top-3 right-3 ${getGradeColor(book.grade_level)} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}
                  >
                    Grade {book.grade_level}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  {book.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">
                      {book.description}
                    </p>
                  )}
                  <a
                    href={book.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all"
                  >
                    <BookOpen className="h-4 w-4" />
                    Open Book
                    <ExternalLink className="h-3 w-3 opacity-70" />
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
