import Container from "react-bootstrap/esm/Container";

import GroupListProvider from "./group-list-provider";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  return (
    <>
      <Container>
        <GroupListProvider>
          <DashboardContent />
        </GroupListProvider>
      </Container>
    </>
  );
}

export default Dashboard;
