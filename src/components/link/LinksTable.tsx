import { Box, Center, Spinner } from "@chakra-ui/react";
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
      {links ? (
        <Table data={links} columns={columns} />
      ) : (
        <Center mt={20}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
    </Box>
  );
};

export default LinksTable;
