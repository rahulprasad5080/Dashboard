import { Button } from "./ui/button";
import { FileDown, UserPlus } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between items-center rounded-t-2xl border-b bg-white px-8 py-6 pb-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">Sales overview</h1>
        <p className="text-muted-foreground text-sm">Your current sales summary and activity.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <FileDown className="w-4 h-4" />
          Export report
        </Button>
        <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
          <UserPlus className="w-4 h-4" />
          Invite
        </Button>
      </div>
    </div>
  );
}