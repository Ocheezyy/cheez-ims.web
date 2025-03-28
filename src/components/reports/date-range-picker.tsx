"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ReportDateRangePicker() {
  const [date, setDate] = React.useState<{
    from: Date;
    to: Date;
  }>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const [preset, setPreset] = React.useState<string>("last30");

  const handlePresetChange = (value: string) => {
    setPreset(value);

    const today = new Date();

    switch (value) {
      case "today":
        setDate({
          from: today,
          to: today,
        });
        break;
      case "yesterday": {
        const yesterday = addDays(today, -1);
        setDate({
          from: yesterday,
          to: yesterday,
        });
        break;
      }
      case "last7":
        setDate({
          from: addDays(today, -7),
          to: today,
        });
        break;
      case "last30":
        setDate({
          from: addDays(today, -30),
          to: today,
        });
        break;
      case "thisMonth":
        setDate({
          from: new Date(today.getFullYear(), today.getMonth(), 1),
          to: today,
        });
        break;
      case "lastMonth": {
        const firstDayLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1,
        );
        const lastDayLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0,
        );
        setDate({
          from: firstDayLastMonth,
          to: lastDayLastMonth,
        });
        break;
      }
      case "thisQuarter": {
        const quarter = Math.floor(today.getMonth() / 3);
        const firstDayQuarter = new Date(today.getFullYear(), quarter * 3, 1);
        setDate({
          from: firstDayQuarter,
          to: today,
        });
        break;
      }
      case "thisYear":
        setDate({
          from: new Date(today.getFullYear(), 0, 1),
          to: today,
        });
        break;
      case "lastYear":
        setDate({
          from: new Date(today.getFullYear() - 1, 0, 1),
          to: new Date(today.getFullYear() - 1, 11, 31),
        });
        break;
    }
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Select value={preset} onValueChange={handlePresetChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="thisMonth">This month</SelectItem>
              <SelectItem value="lastMonth">Last month</SelectItem>
              <SelectItem value="thisQuarter">This quarter</SelectItem>
              <SelectItem value="thisYear">This year</SelectItem>
              <SelectItem value="lastYear">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(value) => {
                if (value?.from && value?.to) {
                  setDate({ from: value.to, to: value.to });
                  setPreset("custom");
                }
              }}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
