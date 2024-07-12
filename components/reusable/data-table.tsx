import { chartColors, nameFormatter } from "@/lib/utils";
import { RxDotFilled } from "react-icons/rx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type tableDataType = {
  label: string;
  amount: number;
  fill: string;
}[];

export default function DataTable({
  transactionData,
}: {
  transactionData: tableDataType;
}) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="flex gap-2 px-4 py-2 items-center">
              <RxDotFilled
                color={`${chartColors[index]}`}
                className="scale-150"
              />
              {nameFormatter(item.label)}
            </TableCell>
            <TableCell className="text-right px-4 py-2">
              {item.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
