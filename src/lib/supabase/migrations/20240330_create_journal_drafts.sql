-- Create journal_drafts table
CREATE TABLE IF NOT EXISTS public.journal_drafts (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT,
    mood TEXT,
    goals TEXT[],
    habits TEXT[],
    gratitude TEXT[],
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Add RLS policies
ALTER TABLE public.journal_drafts ENABLE ROW LEVEL SECURITY;

-- Policy for selecting drafts
CREATE POLICY "Users can view their own drafts"
    ON public.journal_drafts
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy for inserting drafts
CREATE POLICY "Users can insert their own drafts"
    ON public.journal_drafts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for updating drafts
CREATE POLICY "Users can update their own drafts"
    ON public.journal_drafts
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy for deleting drafts
CREATE POLICY "Users can delete their own drafts"
    ON public.journal_drafts
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS journal_drafts_user_id_idx ON public.journal_drafts(user_id); 