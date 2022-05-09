import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import useLinks from "../../data/useLinks";
import Table from "../table/Table";

const LinksTable = () => {
  const params = useParams();
  const { links } = useLinks(params.id);

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
    <Box>
      <Table data={links} columns={columns} />
    </Box>
  );
};

export default LinksTable;
