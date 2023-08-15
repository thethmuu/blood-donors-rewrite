import Navbar from "@/components/dashboard/Navbar";

import QueryProvider from "@/providers/QueryProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <main className="flex flex-col w-full h-full">
        <Navbar />
        {children}
      </main>
    </QueryProvider>
  );
}
