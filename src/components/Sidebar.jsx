import { Home, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <div className=" bg-[#4a74ff] text-white p-4 transition-all duration-300 w-[15%]  sm:block">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <Button variant="ghost" className="flex items-center space-x-2">
          <Home size={20} />
          <span>Home</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <FileText size={20} />
          <span>Documents</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Settings size={20} />
          <span>Settings</span>
        </Button>
      </nav>
    </div>
  );
}
