import { useTable } from "react-table";

const Table = (props: any) => {
  const tableInstance = useTable({ columns: props.columns, data: props.data });
  return <div>table component</div>;
};

export default Table;
