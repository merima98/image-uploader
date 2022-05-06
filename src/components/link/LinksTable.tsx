import { useParams } from "react-router-dom";

import useLinks from "../../data/useLinks";

type Link = {
  id: number;
  link: string;
};

const LinksTable = () => {
  const params = useParams();
  const { links } = useLinks(params.id);

  return (
    <div>
      {links.map((link: Link) => {
        return <div key={link.id}>{link.link}</div>;
      })}
    </div>
  );
};

export default LinksTable;
