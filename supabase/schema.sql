
-- This schema is designed for Supabase and extends the built-in auth system

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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a secure RLS policy for the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Basic policies without recursion
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Admin policy that doesn't cause recursion
CREATE POLICY "Admins can view all profiles" ON users
  FOR SELECT USING (
    auth.jwt() -> 'role' = 'admin' OR
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = auth.users.id AND auth.users.role = 'service_role'
    )
  );

CREATE POLICY "Admins can update all profiles" ON users
  FOR UPDATE USING (
    auth.jwt() -> 'role' = 'admin' OR
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = auth.users.id AND auth.users.role = 'service_role'
    )
  );

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
  start_date DATE,
  due_date DATE,
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

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to set up demo data for testing
-- This can be removed in production
CREATE OR REPLACE FUNCTION public.setup_demo_data()
RETURNS void AS $$
DECLARE
  admin_id UUID;
  client1_id UUID;
  client2_id UUID;
  course1_id UUID;
  course2_id UUID;
  project1_id UUID;
BEGIN
  -- Create admin user (you'll need to create this user through Supabase Auth UI/API first)
  INSERT INTO auth.users (id, email, raw_user_meta_data) 
  VALUES 
    ('00000000-0000-0000-0000-000000000000', 'admin@example.com', '{"full_name":"Admin User"}')
  ON CONFLICT (id) DO NOTHING;
  
  admin_id := '00000000-0000-0000-0000-000000000000';
  
  -- Update admin role
  UPDATE users 
  SET role = 'admin' 
  WHERE id = admin_id;
  
  -- Create client users
  INSERT INTO auth.users (id, email, raw_user_meta_data) 
  VALUES 
    ('11111111-1111-1111-1111-111111111111', 'jane@example.com', '{"full_name":"Jane Cooper"}'),
    ('22222222-2222-2222-2222-222222222222', 'wade@example.com', '{"full_name":"Wade Warren"}')
  ON CONFLICT (id) DO NOTHING;
  
  client1_id := '11111111-1111-1111-1111-111111111111';
  client2_id := '22222222-2222-2222-2222-222222222222';
  
  -- Create sample courses
  INSERT INTO courses (id, title, description, level, price, duration)
  VALUES 
    (uuid_generate_v4(), 'Business Development Masterclass', 'Learn essential business development skills.', 'intermediate', 499.99, '8 weeks'),
    (uuid_generate_v4(), 'Digital Marketing Fundamentals', 'Master the basics of digital marketing.', 'beginner', 299.99, '6 weeks')
  RETURNING id INTO course1_id, course2_id;
  
  -- Create sample project
  INSERT INTO projects (client_id, title, description, start_date, due_date, progress, status)
  VALUES 
    (client1_id, 'E-commerce Website', 'Building a complete e-commerce platform with payment processing and inventory management.', '2023-05-20', '2023-07-25', 65, 'in-progress')
  RETURNING id INTO project1_id;
  
  -- Create sample tasks
  INSERT INTO tasks (project_id, title, status, time_spent)
  VALUES 
    (project1_id, 'Homepage design', 'completed', '8h 30m'),
    (project1_id, 'Product catalog implementation', 'completed', '12h 45m'),
    (project1_id, 'Shopping cart functionality', 'in-progress', '6h 10m');
    
  -- Create sample invoices
  INSERT INTO invoices (client_id, amount, date, due_date, status, invoice_number)
  VALUES 
    (client1_id, 500, '2023-01-15', '2023-02-15', 'paid', 'INV-001'),
    (client1_id, 750, '2023-02-20', '2023-03-20', 'paid', 'INV-002'),
    (client2_id, 1200, '2023-03-05', '2023-04-05', 'unpaid', 'INV-003');
    
  -- Create sample messages
  INSERT INTO messages (sender_id, receiver_id, text)
  VALUES 
    (client1_id, admin_id, 'Hi, I had a question about the e-commerce feature we discussed.'),
    (admin_id, client1_id, 'Hello Jane, I''d be happy to answer your question. What specifically about the e-commerce feature were you wondering about?');
END;
$$ LANGUAGE plpgsql;

-- Note: Call this function manually in the SQL editor to set up demo data
-- SELECT setup_demo_data();
