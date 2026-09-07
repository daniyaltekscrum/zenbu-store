import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Zenbu Store — Supabase Test</h1>
      {error && (
        <div className="p-4 mb-4 text-sm text-yellow-800 bg-yellow-100 rounded-lg dark:bg-yellow-900/30 dark:text-yellow-400">
          Note from Supabase: {error.message} (This is normal if the &apos;todos&apos; table is not created yet)
        </div>
      )}
      <ul className="space-y-2 list-disc list-inside">
        {todos && todos.length > 0 ? (
          todos.map((todo: { id: string | number; name?: string; title?: string }) => (
            <li key={todo.id}>{todo.name || todo.title || JSON.stringify(todo)}</li>
          ))
        ) : (
          <li className="text-muted-foreground list-none">No todos found in the database.</li>
        )}
      </ul>
    </main>
  );
}
