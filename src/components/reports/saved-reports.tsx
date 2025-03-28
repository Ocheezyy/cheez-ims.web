import { useState } from "react";
import {
  Calendar,
  Download,
  FileText,
  MoreHorizontal,
  Pencil,
  Star,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const savedReports = [
  {
    id: "REP-001",
    name: "Monthly Sales Summary",
    category: "Sales",
    created: "2023-03-15",
    lastRun: "2023-06-30",
    scheduled: true,
    frequency: "Monthly",
    favorite: true,
  },
  {
    id: "REP-002",
    name: "Inventory Aging Analysis",
    category: "Inventory",
    created: "2023-02-10",
    lastRun: "2023-06-28",
    scheduled: true,
    frequency: "Weekly",
    favorite: true,
  },
  {
    id: "REP-003",
    name: "Supplier Performance Review",
    category: "Suppliers",
    created: "2023-04-05",
    lastRun: "2023-06-25",
    scheduled: true,
    frequency: "Monthly",
    favorite: false,
  },
  {
    id: "REP-004",
    name: "Product Profitability Analysis",
    category: "Financial",
    created: "2023-05-12",
    lastRun: "2023-06-20",
    scheduled: false,
    frequency: "",
    favorite: false,
  },
  {
    id: "REP-005",
    name: "Low Stock Items Report",
    category: "Inventory",
    created: "2023-01-20",
    lastRun: "2023-06-29",
    scheduled: true,
    frequency: "Daily",
    favorite: true,
  },
  {
    id: "REP-006",
    name: "Sales by Channel",
    category: "Sales",
    created: "2023-03-28",
    lastRun: "2023-06-15",
    scheduled: false,
    frequency: "",
    favorite: false,
  },
  {
    id: "REP-007",
    name: "Quarterly Financial Summary",
    category: "Financial",
    created: "2023-04-01",
    lastRun: "2023-06-30",
    scheduled: true,
    frequency: "Quarterly",
    favorite: true,
  },
];

export function SavedReports() {
  const [reports, setReports] = useState(savedReports);

  const toggleFavorite = (id: string) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, favorite: !report.favorite } : report,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-medium">Saved Reports</h3>
          <p className="text-sm text-muted-foreground">
            Access your saved and scheduled reports
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
          <CardDescription>
            View, run, and manage your saved reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Report Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden md:table-cell">Last Run</TableHead>
                <TableHead className="hidden lg:table-cell">Schedule</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(report.id)}
                    >
                      <Star
                        className={`h-4 w-4 ${report.favorite ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                      />
                      <span className="sr-only">
                        {report.favorite
                          ? "Remove from favorites"
                          : "Add to favorites"}
                      </span>
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-muted/50">
                      {report.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(report.created).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(report.lastRun).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {report.scheduled ? (
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{report.frequency}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Not scheduled
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Run
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            You have {reports.length} saved reports, with{" "}
            {reports.filter((r) => r.scheduled).length} on a schedule.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
