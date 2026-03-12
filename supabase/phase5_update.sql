-- 1. Add username to profiles
ALTER TABLE public.profiles ADD COLUMN username text;

-- 2. Update the handle_new_user trigger to extract the username from metadata if provided during signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username, role)
  values (
    new.id, 
    new.email, 
    -- Grab the username from raw_user_meta_data if we passed it in during signUp()
    (new.raw_user_meta_data->>'username')::text, 
    'USER'
  );
  return new;
end;
$$ language plpgsql security definer;
