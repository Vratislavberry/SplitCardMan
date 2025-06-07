import { useContext, useMemo, useState, useEffect } from "react";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// to install:
//npm install @mdi/react
//npm install @mdi/js
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import { SplitCardListContext } from "./splitCard-list-provider";
import PendingItem from "../pending-item";
import SplitCardUI from "./splitCardUI";
import SplitCardForm from "./splitCard-form";
import SplitCardDeleteForm from "./splitCard-delete-form";
import SplitCardBlank from "./splitCard-blank";
import SplitCardConfig from "./splitCard-config";
import SplitCardBar from "./splitCard-bar";

function GroupDetailContent() {
  const { state, data } = useContext(SplitCardListContext);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const [SplitCardFormData, setSplitCardFormData] = useState();
  const [SplitCardDeleteFormData, setSplitCardDeleteFormData] = useState();
  const [SplitCardStates, setSplitCardStates] = useState();

  useEffect(() => {
    if (
      state === "ready" &&
      data?.splitCardList?.length > 0 &&
      SplitCardStates?.length === undefined
    ) {
      console.log(`davam na unvisited, stav: ${state}`);
      setSplitCardStates(
        data?.splitCardList.map((item, i) => {
          return i === 0 ? "current" : "unvisited";
        })
      );
    } else {
      console.log(`pusteno a neproslo, stav: ${state}`);
    }
  }, [state]);

  return (
    <Container>
      {!!showConfig ? (
        <SplitCardConfig
          onClose={() => setShowConfig(false)}
          setSplitCardFormData={setSplitCardFormData}
          setSplitCardDeleteFormData={setSplitCardDeleteFormData}
          currentCard={data?.splitCardList[currentCardIndex]}
        />
      ) : null}

      {!!SplitCardFormData ? (
        <SplitCardForm
          item={SplitCardFormData}
          switchToNewCard={() => {
            setCurrentCardIndex(data?.splitCardList?.length);
            setSplitCardStates([...(SplitCardStates || []), "current"]);
          }}
          onClose={() => setSplitCardFormData()}
        />
      ) : null}

      {!!SplitCardDeleteFormData ? (
        <SplitCardDeleteForm
          item={SplitCardDeleteFormData}
          onClose={() => setSplitCardDeleteFormData()}
          isLastCard={data?.splitCardList?.length - 1 === currentCardIndex}
          switchToPrevCard={() => setCurrentCardIndex(currentCardIndex - 1)}
          setSplitCardStates={() =>
            setSplitCardStates(
              SplitCardStates.filter((_, i) => i !== currentCardIndex)
            )
          }
        />
      ) : null}

      {state === "pending" ? <PendingItem /> : null}

      {state === "ready" && data?.splitCardList?.length > 0 ? (
        <Row>
          <SplitCardBar
            splitCardStates={SplitCardStates}
            setCurrentCardIndex={setCurrentCardIndex}
          />
          <SplitCardUI
            cardIndex={currentCardIndex}
            setCardIndex={setCurrentCardIndex}
            card={data?.splitCardList[currentCardIndex]}
            numOfCards={data?.splitCardList?.length}
            setShowConfig={setShowConfig}
            changeCardState={(state) =>
              setSplitCardStates(
                SplitCardStates?.map((prevState, i) => {
                  if (i === currentCardIndex) {
                    return state;
                  } else if (
                    prevState === "current" &&
                    i !== currentCardIndex
                  ) {
                    return "visited";
                  } else {
                    return prevState;
                  }
                })
              )
            }
          />
        </Row>
      ) : null}

      {/* no SplitCard is created yet */}
      {state === "ready" && data?.splitCardList == 0 ? (
        <Row>
          <SplitCardBlank onCreateFormClose={() => setSplitCardFormData({})} />
        </Row>
      ) : null}
    </Container>
  );

  {
    /*
  const dashboardData = useMemo(() => {
    const result = {
      sum: 0,
      revenues: 0,
      expenses: 0,
      revenueMap: {},
      expenseMap: {},
    };

    data?.itemList?.forEach((item) => {
      result.sum += item.amount;
      if (item.amount < 0) {
        result.expenses += item.amount;
        if (!result.expenseMap[item.categoryId]) {
          result.expenseMap[item.categoryId] = { sum: 0, expenseList: [] };
        }
        result.expenseMap[item.categoryId].sum += item.amount;
        result.expenseMap[item.categoryId].expenseList.push(item);
      } else {
        result.revenues += item.amount;
        if (!result.revenueMap[item.categoryId]) {
          result.revenueMap[item.categoryId] = { sum: 0, revenueList: [] };
        }
        result.revenueMap[item.categoryId].sum += item.amount;
        result.revenueMap[item.categoryId].revenueList.push(item);
      }
    });

    return result;
  }, [data]);


  return (
    <Card className="border-0 ">
      {!!transactionItemFormData ? (
        <TransactionItemForm
          item={transactionItemFormData}
          onClose={() => setTransactionItemFormData()}
        />
      ) : null}
      {!!transactionItemDeleteDialog ? (
        <TransactionItemDeleteDialog
          item={transactionItemDeleteDialog}
          onClose={() => setTransactionItemDeleteDialog()}
        />
      ) : null}

      <Card.Header
        className="sticky-top "
        bsPrefix="bg-white"
        style={{ top: "56px", padding: "8px" }}
      >
        <Stack direction="horizontal" gap={3}>
          <div>
            <Form.Control
              size="lg"
              type="month"
              placeholder="Small text"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
          <div className="ms-auto">
            <Button
              variant="success"
              size="sm"
              disable={state === "pending"}
              p={2}
              onClick={() => setTransactionItemFormData({})}
            >
              <Icon path={mdiCashPlus} size={0.8} /> Add transation
            </Button>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
        {state === "pending"
          ? [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
          : null}
        {state === "ready" ? (
          <div>
            <Stack className={"px-1 py-2"}>
              <div
                className={`ms-auto ${
                  dashboardData.sum < 0 ? "text-danger" : "text-success"
                }`}
                style={{
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon path={mdiSigma} size={1.1} />
                &nbsp;
                {`${dashboardData.sum.toLocaleString("cs")} Kč`}
              </div>
            </Stack>
            <Card className="border-0">
              <Card.Body>
                <Card.Title>
                  <Stack direction="horizontal" gap={1}>
                    Expenses
                    <div
                      className="ms-auto"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {`${dashboardData.expenses.toLocaleString("cs")} Kč`}
                    </div>
                  </Stack>
                </Card.Title>
                <Card.Text>
                  <Accordion>
                    {Object.keys(dashboardData.expenseMap).map((categoryId) => {
                      return (
                        <CategoryDetail
                          key={categoryId}
                          categoryId={categoryId}
                          sum={dashboardData.expenseMap[categoryId].sum}
                          itemList={
                            dashboardData.expenseMap[categoryId].expenseList
                          }
                          setTransactionItemFormData={
                            setTransactionItemFormData
                          }
                          setTransactionItemDeleteDialog={
                            setTransactionItemDeleteDialog
                          }
                        />
                      );
                    })}
                  </Accordion>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="border-0">
              <Card.Body>
                <Card.Title>
                  <Stack direction="horizontal" gap={1}>
                    Revenues
                    <div
                      className="ms-auto"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {`${dashboardData.revenues.toLocaleString("cs")} Kč`}
                    </div>
                  </Stack>
                </Card.Title>
                <Card.Text>
                  <Accordion>
                    {Object.keys(dashboardData.revenueMap).map((categoryId) => {
                      return (
                        <CategoryDetail
                          key={categoryId}
                          categoryId={categoryId}
                          sum={dashboardData.revenueMap[categoryId].sum}
                          itemList={
                            dashboardData.revenueMap[categoryId].revenueList
                          }
                          setTransactionItemFormData={
                            setTransactionItemFormData
                          }
                          setTransactionItemDeleteDialog={
                            setTransactionItemDeleteDialog
                          }
                        />
                      );
                    })}
                  </Accordion>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
  */
  }
}

export default GroupDetailContent;
