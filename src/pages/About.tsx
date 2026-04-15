import { GraduationCap, Target, Heart, Users, BookOpen, Award } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About LearnHub</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Empowering young minds through accessible and quality education
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            LearnHub is dedicated to supporting students up to Grade 6 through interactive and
            flexible learning experiences. We believe that every child deserves access to quality
            education, regardless of their background or circumstances.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our platform provides free access to educational materials including digital books,
            video tutorials, and structured learning roadmaps. Students can explore content at
            their own pace, while those seeking personalized guidance can connect with certified
            tutors through our subscription service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To create a world where every child has the opportunity to learn, grow, and reach
              their full potential through accessible education.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
            <p className="text-gray-600">
              We are committed to excellence, inclusivity, and innovation in education. Every
              decision we make is guided by what's best for our students.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Community</h3>
            <p className="text-gray-600">
              Building a supportive learning community where students, parents, and educators
              collaborate to achieve academic success.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free Digital Resources</h3>
                <p className="text-gray-600">
                  Access our extensive library of educational books, videos, and learning materials
                  covering all major subjects for grades 1-6. No registration required for basic
                  access.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Tutors</h3>
                <p className="text-gray-600">
                  Connect with experienced, certified educators for personalized one-on-one
                  tutoring sessions. Our tutors are carefully selected and trained to provide the
                  best learning experience.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Structured Learning Path</h3>
                <p className="text-gray-600">
                  Follow our expertly designed learning roadmaps that guide students through
                  curriculum in a logical, progressive manner tailored to each grade level.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Join our vibrant learning community where students can ask questions, share
                  knowledge, and support each other's educational journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 md:p-12 text-center">
          <Award className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Why Choose LearnHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-xl mb-2">Flexible Learning</h3>
              <p className="text-blue-100">
                Study anytime, anywhere at your own pace with 24/7 access to all materials
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Quality Content</h3>
              <p className="text-blue-100">
                All materials are created and reviewed by education experts and experienced
                teachers
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Affordable Access</h3>
              <p className="text-blue-100">
                Free resources for everyone, with optional premium tutoring for personalized
                support
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('auth')}
            className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
