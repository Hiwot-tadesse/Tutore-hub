/*
  # Online Tutoring Platform Schema

  ## Overview
  This migration creates the complete database schema for an online tutoring platform
  supporting students up to grade 6.

  ## New Tables
  
  ### 1. `profiles`
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `grade_level` (integer) - Student's grade (1-6)
  - `is_tutor` (boolean) - Whether user is a certified tutor
  - `has_subscription` (boolean) - Active subscription status
  - `created_at` (timestamptz) - Account creation timestamp
  
  ### 2. `books`
  - `id` (uuid, primary key)
  - `title` (text) - Book title
  - `description` (text) - Book description
  - `subject` (text) - Subject (Math, Science, English, etc.)
  - `grade_level` (integer) - Target grade level
  - `cover_image_url` (text) - Book cover image
  - `pdf_url` (text) - PDF download link
  - `is_featured` (boolean) - Featured on homepage
  - `created_at` (timestamptz)
  
  ### 3. `videos`
  - `id` (uuid, primary key)
  - `title` (text) - Video title
  - `description` (text) - Video description
  - `subject` (text) - Subject area
  - `grade_level` (integer) - Target grade level
  - `thumbnail_url` (text) - Video thumbnail
  - `video_url` (text) - Video streaming URL
  - `duration` (integer) - Duration in seconds
  - `is_featured` (boolean) - Featured on homepage
  - `created_at` (timestamptz)
  
  ### 4. `learning_roadmap`
  - `id` (uuid, primary key)
  - `grade_level` (integer) - Grade level
  - `subject` (text) - Subject
  - `topic` (text) - Topic name
  - `sequence_order` (integer) - Order in roadmap
  - `description` (text) - Topic description
  - `created_at` (timestamptz)
  
  ### 5. `tutoring_sessions`
  - `id` (uuid, primary key)
  - `student_id` (uuid) - References profiles
  - `tutor_id` (uuid) - References profiles
  - `subject` (text) - Session subject
  - `scheduled_time` (timestamptz) - Session date/time
  - `duration` (integer) - Duration in minutes
  - `status` (text) - scheduled, completed, cancelled
  - `meeting_link` (text) - Video call link
  - `notes` (text) - Session notes
  - `created_at` (timestamptz)
  
  ### 6. `community_posts`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References profiles
  - `title` (text) - Post title
  - `content` (text) - Post content
  - `category` (text) - Post category
  - `created_at` (timestamptz)
  
  ### 7. `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `status` (text) - new, read, replied
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for books, videos, and learning roadmap
  - Authenticated users can read profiles
  - Users can update their own profile
  - Only authenticated users can create tutoring sessions
  - Community posts require authentication
  - Contact messages are public to create, admin only to read
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  grade_level integer CHECK (grade_level >= 1 AND grade_level <= 6),
  is_tutor boolean DEFAULT false,
  has_subscription boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  grade_level integer NOT NULL CHECK (grade_level >= 1 AND grade_level <= 6),
  cover_image_url text,
  pdf_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Books are publicly readable"
  ON books FOR SELECT
  TO public
  USING (true);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  grade_level integer NOT NULL CHECK (grade_level >= 1 AND grade_level <= 6),
  thumbnail_url text,
  video_url text NOT NULL,
  duration integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videos are publicly readable"
  ON videos FOR SELECT
  TO public
  USING (true);

-- Create learning_roadmap table
CREATE TABLE IF NOT EXISTS learning_roadmap (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level integer NOT NULL CHECK (grade_level >= 1 AND grade_level <= 6),
  subject text NOT NULL,
  topic text NOT NULL,
  sequence_order integer NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE learning_roadmap ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learning roadmap is publicly readable"
  ON learning_roadmap FOR SELECT
  TO public
  USING (true);

-- Create tutoring_sessions table
CREATE TABLE IF NOT EXISTS tutoring_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  tutor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  scheduled_time timestamptz NOT NULL,
  duration integer DEFAULT 60,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  meeting_link text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tutoring_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
  ON tutoring_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id OR auth.uid() = tutor_id);

CREATE POLICY "Subscribers can create sessions"
  ON tutoring_sessions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.has_subscription = true
    )
  );

CREATE POLICY "Users can update their own sessions"
  ON tutoring_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id OR auth.uid() = tutor_id)
  WITH CHECK (auth.uid() = student_id OR auth.uid() = tutor_id);

-- Create community_posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view community posts"
  ON community_posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON community_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON community_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_books_grade_level ON books(grade_level);
CREATE INDEX IF NOT EXISTS idx_books_subject ON books(subject);
CREATE INDEX IF NOT EXISTS idx_videos_grade_level ON videos(grade_level);
CREATE INDEX IF NOT EXISTS idx_videos_subject ON videos(subject);
CREATE INDEX IF NOT EXISTS idx_roadmap_grade_level ON learning_roadmap(grade_level);
CREATE INDEX IF NOT EXISTS idx_tutoring_sessions_student ON tutoring_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_tutoring_sessions_tutor ON tutoring_sessions(tutor_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_user ON community_posts(user_id);