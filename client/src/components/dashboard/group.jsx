import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GroupListContext } from "./group-list-provider";

function Group({ id, title }) {
  const navigate = useNavigate();
  const { data } = useContext(GroupListContext);
  return (
    <Col
      sm="4"
      className="d-flex justify-content-center text-center my-2 mx-sm-0"
    >
      <Button
        className="w-100 w-sm-auto"
        onClick={() => navigate(`/groupDetail?id=${id}&title=${title}`)}
      >
        {title}
      </Button>
    </Col>
  );

  /*
  return (
    <Accordion.Item eventKey={categoryId} style={{ width: "100%" }}>
      <Accordion.Header className="p-0">
        <Stack direction="horizontal" gap={2}>
          <div>{data?.categoryMap[categoryId].name}</div>
          <div>{sum.toLocaleString("cs")}</div>
        </Stack>
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          {itemList?.map((item) => {
            return (
              <TransactionItem
                item={item}
                setTransactionItemFormData={setTransactionItemFormData}
                setTransactionItemDeleteDialog={setTransactionItemDeleteDialog}
              />
            );
          })}
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
  */
}

export default Group;
