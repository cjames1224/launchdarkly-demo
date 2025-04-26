import { Dashboard } from "@/components/dash/Dashboard";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[250px_1fr]">
      <Sidebar />
      <Dashboard />
    </main>
  );
}
