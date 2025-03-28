import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function FullTableSkeleton() {
  const placeholderData = Array.from({ length: 10 }, (_, i) => ({
    name: `item-${i + 1}`,
  }));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Skeleton className="h-6 w-6 rounded" />
          </TableHead>
          <TableHead className="w-[100px]">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="cursor-pointer">
            <Skeleton className="h-6 w-36" />
          </TableHead>
          <TableHead className="hidden md:table-cell">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="hidden lg:table-cell">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="cursor-pointer text-right">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="cursor-pointer text-right">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="hidden xl:table-cell text-right">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="hidden lg:table-cell">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="hidden xl:table-cell">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="h-6 w-24" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {placeholderData.map((item) => (
          <TableRow key={item.name}>
            <TableCell>
              <Skeleton className="h-6 w-6 rounded" />{" "}
              {/* Skeleton for Checkbox */}
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-6 w-16" /> {/* Skeleton for ID */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-32" />{" "}
              {/* Skeleton for Product Name */}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-6 w-24" /> {/* Skeleton for SKU */}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <Skeleton className="h-6 w-24" /> {/* Skeleton for Category */}
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-6 w-20" /> {/* Skeleton for Quantity */}
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-6 w-24" /> {/* Skeleton for Price */}
            </TableCell>
            <TableCell className="hidden xl:table-cell text-right">
              <Skeleton className="h-6 w-24" /> {/* Skeleton for Cost */}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <Skeleton className="h-6 w-20" /> {/* Skeleton for Status */}
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              <Skeleton className="h-6 w-32" />{" "}
              {/* Skeleton for Last Updated */}
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-6 w-20" /> {/* Skeleton for Actions */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
