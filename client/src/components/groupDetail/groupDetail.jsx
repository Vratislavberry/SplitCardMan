import SplitCardListProvider from "./SplitCard-list-provider";
import GroupDetailContent from "./groupDetail-content";
import { useLocation } from "react-router-dom";


import Container from "react-bootstrap/esm/Container";

function GroupDetail() {
  const location = useLocation();

  // Parse the query parameters
  const params = new URLSearchParams(location.search);
  const groupId = params.get("id");
  const title = params.get("title");

  return (
    <>
      <Container>
        <h1 className="display-4 text-center">{title}</h1>
        <SplitCardListProvider id={groupId}>
          <GroupDetailContent />
        </SplitCardListProvider>
      </Container>
    </>
  );
}

export default GroupDetail;
