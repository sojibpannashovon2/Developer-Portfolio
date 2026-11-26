-- Replaces the seeded Nikhil Rajput demo content with Md Arifur Rahman's resume
-- data. The seed only runs on an empty database, so the local database (already
-- seeded with the original template content) is refreshed in place instead.
TRUNCATE testimonials, faqs, funding_links, social_links, taglines, skills, services, experiences, projects, profile RESTART IDENTITY CASCADE;
DELETE FROM github_cache;
DELETE FROM github_user_cache;
