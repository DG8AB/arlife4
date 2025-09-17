-- Create admin settings table for contact form configuration
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact form settings
INSERT INTO admin_settings (setting_key, setting_value) VALUES 
('contact_form_config', '{"buttons_disabled": true, "post_url": ""}')
ON CONFLICT (setting_key) DO NOTHING;

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on both tables
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_settings (allow all operations for now)
CREATE POLICY "Allow all operations on admin_settings" ON admin_settings FOR ALL USING (true);

-- Create policies for contact_messages (allow all operations for now)
CREATE POLICY "Allow all operations on contact_messages" ON contact_messages FOR ALL USING (true);
