import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "@/types.ts";
import { formatNumbers } from "@/lib/utils.ts";

interface OrderDetailsTableProps {
  items: OrderItem[];
}

export function OrderDetailsTable({ items }: OrderDetailsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="hidden md:table-cell">SKU</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.product.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {item.product.sku}
            </TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">
              {formatNumbers(true, item.unitPrice)}
            </TableCell>
            <TableCell className="text-right">
              {formatNumbers(true, item.unitPrice * item.quantity!!)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
