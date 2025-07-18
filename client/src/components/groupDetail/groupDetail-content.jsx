import { useContext, useState, useEffect } from "react";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";

// to install:
//npm install @mdi/react
//npm install @mdi/js

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
  const [textSegmentsList, setTextSegmentsList] = useState([]);

  // when data is ready, initialize SplitCardStates
  // with "current" for the first card and "unvisited" for the rest
  useEffect(() => {
    if (
      state === "ready" &&
      data?.splitCardList?.length > 0 &&
      SplitCardStates?.length === undefined
    ) {
      setSplitCardStates(
        data?.splitCardList.map((item, i) => {
          return "unvisited";
        })
      );
      setTextSegmentsList(
        data?.splitCardList.map((item) => {
          return [];
        })
      );
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
            setSplitCardStates([...(SplitCardStates || []), "visited"]);
            setTextSegmentsList([...(textSegmentsList || []), []]);
          }}
          onClose={() => setSplitCardFormData()}
          resetTextSegmentItem={() =>
            setTextSegmentsList(
              textSegmentsList.map((item, i) =>  i !== currentCardIndex ? item : [])
            )
          }
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
          delCardTextSegments={() =>
            setTextSegmentsList(
              textSegmentsList.filter((_, i) => i !== currentCardIndex)
            )
          }
        />
      ) : null}

      {state === "pending" ? <PendingItem /> : null}

      {state === "ready" && data?.splitCardList?.length > 0 ? (
        <Row>
          <SplitCardBar
            splitCardStates={SplitCardStates}
            currentCardIndex={currentCardIndex}
            setCurrentCardIndex={setCurrentCardIndex}
          />
          <SplitCardUI
            cardIndex={currentCardIndex}
            setCardIndex={setCurrentCardIndex}
            card={data?.splitCardList[currentCardIndex]}
            numOfCards={data?.splitCardList?.length}
            setShowConfig={setShowConfig}
            cardStateSaved={SplitCardStates?.[currentCardIndex]}
            changeCardState={(state) =>
              setSplitCardStates(
                SplitCardStates?.map((prevState, i) => {
                  if (i === currentCardIndex) {
                    return state;
                  }
                  else {
                    return prevState;
                  }
                })
              )
            }
            textSegmentsSaved={textSegmentsList[currentCardIndex]}
            updateTextSegments={(updSegments) => {
              setTextSegmentsList(
                textSegmentsList.map((item, i) => {
                  if (i === currentCardIndex) {
                    return updSegments;
                  } else {
                    return item;
                  }
                })
              );
            }}
          />
        </Row>
      ) : null}

      {/* no SplitCard is created yet */}
      {state === "ready" && data?.splitCardList?.length === 0 ? (
        <Row>
          <SplitCardBlank onCreateFormClose={() => setSplitCardFormData({})} />
        </Row>
      ) : null}
    </Container>
  );
}

export default GroupDetailContent;
