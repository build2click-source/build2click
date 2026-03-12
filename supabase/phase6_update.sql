-- 1. Alter the submissions table, dropping the constraint and changing type
ALTER TABLE public.submissions DROP CONSTRAINT submissions_calculated_type_check;
ALTER TABLE public.submissions ALTER COLUMN calculated_type TYPE text USING calculated_type::text;

-- 2. Add duration_seconds column
ALTER TABLE public.submissions ADD COLUMN duration_seconds int4;
