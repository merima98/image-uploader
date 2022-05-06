import { useMemo } from "react";
import { useParams } from "react-router-dom";

import useLinks from "../../data/useLinks";
import Table from "../table/Table";

const LinksTable = () => {
  const params = useParams();
  const { links } = useLinks(params.id);
  console.log("Links are, ", links);
  const data = links;

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Link",
        accessor: "link",
      },
    ],
    []
  );

  return (
    <div>
      <Table data={links} columns={columns} />
    </div>
  );
};

export default LinksTable;
