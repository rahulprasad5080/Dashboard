import { Calendar as CalendarIcon, Filter as FilterIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

// DateRange type for react-day-picker
interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

function formatRange(range: DateRange) {
  if (!range?.from || !range?.to) return "Pick a date range";
  const from = range.from.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const to = range.to.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${from} – ${to}`;
}

export default function FilterBar() {
  const [date, setDate] = useState<DateRange>({ from: undefined, to: undefined });
  const [tab, setTab] = useState("default");

  // Handler to ensure setDate always receives a valid DateRange
  function handleRangeSelect(selected: DateRange | undefined) {
    setDate(selected ?? { from: undefined, to: undefined });
  }

  function handleClear() {
    setDate({ from: undefined, to: undefined });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      {/* Segmented control */}
      <Tabs value={tab} onValueChange={setTab} className="w-auto">
        <TabsList className="border border-input bg-white rounded-lg overflow-hidden p-0 h-10 min-w-[320px]">
          <TabsTrigger value="default" className="rounded-none border-r border-input h-10 px-4 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-foreground font-medium">Default</TabsTrigger>
          <TabsTrigger value="saved" className="rounded-none border-r border-input h-10 px-4 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-foreground font-medium">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              Saved view
            </span>
          </TabsTrigger>
          <TabsTrigger value="sdr" className="rounded-none h-10 px-4 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-foreground font-medium">SDR view</TabsTrigger>
          <Button size="icon" variant="ghost" className="rounded-none h-10 px-3 border-l border-input">
            <Plus className="w-4 h-4" />
          </Button>
        </TabsList>
      </Tabs>

      {/* Date range and filter */}
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 min-w-[220px] justify-start">
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">{formatRange(date)}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="p-4 bg-white rounded-xl shadow-lg w-auto min-w-[350px]">
            <div className="flex flex-col items-center">
              <Calendar
                mode="range"
                defaultMonth={date.from}
                numberOfMonths={2}
                selected={date}
                onSelect={handleRangeSelect}
                required={false}
                className="rounded-lg border shadow-sm bg-white"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}