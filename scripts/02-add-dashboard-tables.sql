-- Create client_dashboards table for storing dashboard content
CREATE TABLE IF NOT EXISTS client_dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,
  estate_name VARCHAR(255),
  case_id VARCHAR(50),
  current_phase INTEGER DEFAULT 1,
  progress INTEGER DEFAULT 0,
  phase_description TEXT,
  expected_completion DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create action_items table
CREATE TABLE IF NOT EXISTS action_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID NOT NULL REFERENCES client_dashboards(id) ON DELETE CASCADE,
  priority VARCHAR(20) DEFAULT 'normal',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date VARCHAR(100),
  button_text VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID NOT NULL REFERENCES client_dashboards(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500),
  date_info VARCHAR(100),
  note TEXT,
  signed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID NOT NULL REFERENCES client_dashboards(id) ON DELETE CASCADE,
  from_name VARCHAR(255),
  content TEXT NOT NULL,
  is_user BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create file_uploads table for Supabase Storage references
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(50),
  storage_path VARCHAR(500) NOT NULL,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE client_dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_dashboards
CREATE POLICY "Users can view own dashboard" ON client_dashboards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own dashboard" ON client_dashboards
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin can view/update all dashboards
CREATE POLICY "Admin can view all dashboards" ON client_dashboards
  FOR SELECT USING (auth.jwt() ->> 'email' = ANY('{admin@kinn.com}'::text[]));

CREATE POLICY "Admin can update all dashboards" ON client_dashboards
  FOR UPDATE USING (auth.jwt() ->> 'email' = ANY('{admin@kinn.com}'::text[]));

-- RLS Policies for action_items (admin access)
CREATE POLICY "Users can view own action items" ON action_items
  FOR SELECT USING (
    dashboard_id IN (SELECT id FROM client_dashboards WHERE auth.uid() = user_id)
  );

CREATE POLICY "Admin can manage action items" ON action_items
  FOR ALL USING (auth.jwt() ->> 'email' = ANY('{admin@kinn.com}'::text[]));

-- RLS Policies for documents (admin access)
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (
    dashboard_id IN (SELECT id FROM client_dashboards WHERE auth.uid() = user_id)
  );

CREATE POLICY "Admin can manage documents" ON documents
  FOR ALL USING (auth.jwt() ->> 'email' = ANY('{admin@kinn.com}'::text[]));

-- RLS Policies for messages (admin access)
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (
    dashboard_id IN (SELECT id FROM client_dashboards WHERE auth.uid() = user_id)
  );

CREATE POLICY "Admin can manage messages" ON messages
  FOR ALL USING (auth.jwt() ->> 'email' = ANY('{admin@kinn.com}'::text[]));

-- RLS Policies for file_uploads
CREATE POLICY "Users can view own files" ON file_uploads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload files" ON file_uploads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can manage files" ON file_uploads
  FOR ALL USING (auth.jwt() ->> 'email' = ANY('{admin@kinn.com}'::text[]));
