import { TableCell, TableRow } from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';

interface DataTableEmptyProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTableEmpty<TData, TValue>({
  columns,
}: DataTableEmptyProps<TData, TValue>) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className='h-24 text-center'>
        No results.
      </TableCell>
    </TableRow>
  );
}
