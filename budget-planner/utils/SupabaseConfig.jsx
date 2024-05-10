import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://axpsxpmbeqnowgtwgtrw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cHN4cG1iZXFub3dndHdndHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzMjM4OTUsImV4cCI6MjAzMDg5OTg5NX0.lMeKbKj5eJ-WwGRSKwaK_uDlOyWEm6JTZ-qQjCP2MTU"
);
