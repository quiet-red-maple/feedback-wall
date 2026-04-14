-- Execute this SQL in your Supabase SQL Editor

-- Create the feedbacks table
CREATE TABLE public.feedbacks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  theme text NOT NULL,
  upvotes integer DEFAULT 0,
  "hasUpvoted" boolean DEFAULT false,
  "createdAt" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  author text NOT NULL
);

-- Create the comments table
CREATE TABLE public.comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  feedback_id uuid REFERENCES public.feedbacks(id) ON DELETE CASCADE,
  author text NOT NULL,
  content text NOT NULL,
  "createdAt" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies for feedbacks (allow public read, authenticated/public insert for demo)
CREATE POLICY "Allow public read access on feedbacks"
  ON public.feedbacks FOR SELECT USING (true);

CREATE POLICY "Allow public insert on feedbacks"
  ON public.feedbacks FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on feedbacks"
  ON public.feedbacks FOR UPDATE USING (true);

-- Create policies for comments
CREATE POLICY "Allow public read access on comments"
  ON public.comments FOR SELECT USING (true);

CREATE POLICY "Allow public insert on comments"
  ON public.comments FOR INSERT WITH CHECK (true);
