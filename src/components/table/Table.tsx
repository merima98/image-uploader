import { useTable } from "react-table";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Td,
  Center,
  Box,
} from "@chakra-ui/react";

const Table = (props: any) => {
  const tableInstance = useTable({ columns: props.columns, data: props.data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <>
      {props.data.length ? (
        <ChakraTable variant={"simple"} size={"sm"} {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      ) : (
        <Center>
          <Box>
            <Text fontSize={20} fontWeight={"bold"} textTransform={"uppercase"}>
              No data available yet!
            </Text>
          </Box>
        </Center>
      )}
    </>
  );
};

export default Table;
