-- This schema is designed for Supabase and extends the built-in auth.users system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  profile_image_url TEXT,
  bio TEXT,
  role TEXT CHECK (role IN ('client', 'admin')) DEFAULT 'client',
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a secure RLS policy for the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a function to check if a user is an admin (security definer to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Basic policies without recursion
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Admin policy using the security definer function
CREATE POLICY "Admins can view all profiles" ON users
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" ON users
  FOR UPDATE USING (public.is_admin());

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  published BOOLEAN DEFAULT true,
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Secure the blog_posts table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts using the security definer function
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage all blog posts" ON blog_posts
  FOR ALL USING (public.is_admin());

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  price DECIMAL(10, 2),
  duration TEXT,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Secure the courses table
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);
CREATE POLICY "Only admins can modify courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User course enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT false,
  progress INTEGER DEFAULT 0,
  UNIQUE (user_id, course_id)
);

-- Secure the enrollments table
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own enrollments" ON enrollments
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all enrollments" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Admins can update all enrollments" ON enrollments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  progress INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('not-started', 'in-progress', 'completed', 'on-hold')) DEFAULT 'not-started',
  time_spent TEXT DEFAULT '0h 0m',
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Secure the projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view their own projects" ON projects
  FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Admins can view all projects" ON projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Admins can modify all projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
  time_spent TEXT DEFAULT '0h 0m',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Secure the tasks table
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view their project tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects WHERE id = tasks.project_id AND client_id = auth.uid()
    )
  );
CREATE POLICY "Admins can view all tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Admins can modify all tasks" ON tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT false
);

-- Secure the messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can mark messages as read" ON messages
  FOR UPDATE USING (auth.uid() = receiver_id);
CREATE POLICY "Admins can view all messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT CHECK (status IN ('paid', 'unpaid', 'overdue')) DEFAULT 'unpaid',
  details TEXT,
  invoice_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Secure the invoices table
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view their own invoices" ON invoices
  FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Admins can view all invoices" ON invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Admins can modify all invoices" ON invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Work sessions table for detailed activity tracking
CREATE TABLE IF NOT EXISTS work_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Secure the work_sessions table
ALTER TABLE work_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view all work sessions" ON work_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Admins can modify their work sessions" ON work_sessions
  FOR ALL USING (
    auth.uid() = admin_id OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Clients can view work sessions for their projects" ON work_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = work_sessions.project_id AND client_id = auth.uid()
    )
  );

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role, status)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'client'),
    'pending'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to set up demo data for testing
CREATE OR REPLACE FUNCTION public.setup_admin_user()
RETURNS void AS $$
DECLARE
  admin_id UUID;
BEGIN
  -- Create demo admin user with an actual password
  INSERT INTO auth.users (id, email, raw_user_meta_data, email_confirmed_at, created_at, last_sign_in_at) 
  VALUES 
    ('00000000-0000-0000-0000-000000000000', 'admin@example.com', '{"full_name":"Admin User", "role":"admin"}', now(), now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  -- Set password for admin user (password123)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, last_sign_in_at) 
  VALUES 
    ('00000000-0000-0000-0000-000000000000', 'admin@example.com', '$2a$10$GVm5ZAVupGQ8JSIBq7GXO.A0jCTvWOCn6aQRhKKqCKLCM5KvOIccu', now(), now(), now())
  ON CONFLICT (id) DO UPDATE 
  SET encrypted_password = '$2a$10$GVm5ZAVupGQ8JSIBq7GXO.A0jCTvWOCn6aQRhKKqCKLCM5KvOIccu',
      email_confirmed_at = now();
  
  admin_id := '00000000-0000-0000-0000-000000000000';
  
  -- Update admin role and status
  UPDATE users 
  SET role = 'admin',
      status = 'approved'
  WHERE id = admin_id;
END;
$$ LANGUAGE plpgsql;

-- Note: Call this function manually in the SQL editor to set up admin data
-- SELECT setup_admin_user();
