import { TableCell, TableRow } from '@/components/ui/table';
import type { RowData } from '@tanstack/react-table';
import type { AnyColumnDef } from './index';

interface DataTableEmptyProps<TData extends RowData> {
  columns: AnyColumnDef<TData>[];
}

export function DataTableEmpty<TData extends RowData>({
  columns,
}: DataTableEmptyProps<TData>) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className='h-24 text-center'>
        No results.
      </TableCell>
    </TableRow>
  );
}
