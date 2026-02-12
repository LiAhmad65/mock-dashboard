import Navbar from "@/app/components/navbar/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden pt-16">{children}</main>
    </div>
  );
}
