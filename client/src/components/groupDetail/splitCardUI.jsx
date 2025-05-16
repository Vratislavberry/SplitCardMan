import { useState, useEffect, useContext } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

// randomly shuffles given array of objects
function shuffle(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = { ...array[i] };
    array[i] = { ...array[j] };
    array[j] = { ...temp };
  }
  return array;
}

function SplitCardUI({ cardIndex, setCardIndex, card, numOfCards }) {
  console.log(`card: ${JSON.stringify(card)}`);

  const [textSegments, setTextSegments] = useState([]);

  /** States whether the order of the segments is correct
   * true - correct, false - incorrect, null - not checked yet,
   * undefined - not visited yet
   * */
  const [SplitCardState, setSplitCardState] = useState(null);

  // Update textSegments whenever cardIndex or card changes
  useEffect(() => {
    if (card?.questionText) {
      const shuffledSegments = shuffle(
        card.questionText.split(";").map((textPart, index) => {
          return {
            id: index,
            text: textPart,
            checked: false,
            color: "secondary",
          };
        })
      );
      setTextSegments(shuffledSegments);
    }
    setSplitCardState(null);
  }, [cardIndex, card]);

  // handles click on the card segment
  // Un/checks the card segment with given id
  function handleCardSegmentClick(id) {
    const tempObject = textSegments.find((segment) => {
      return segment.id === id;
    });
    tempObject.checked = !tempObject.checked;
    // Change color of the segment to white when the user unchecks it
    if (tempObject.checked === false) {
      tempObject.color = "secondary";
    }
    setTextSegments((preValue) => {
      return [
        ...preValue.filter((segment) => {
          return segment.id !== id;
        }),
        tempObject,
      ];
    });

    setSplitCardState(null);
  }

  /***** helper functions *****/
  // returns array of SplitCardSegments that satisfy given filter function
  function getSpecifiedSegments(textSegments, myFilter) {
    return textSegments.filter(myFilter).map((segment) => (
      <Button
        onClick={() => handleCardSegmentClick(segment.id)}
        className="m-1"
        key={segment.id}
        variant={segment.color}
      >
        {segment.text}
      </Button>
    ));
  }

  // handles click on the reset button
  // sets state to null and reset SplitCardSegments
  function handleReset() {
    /*TextSegments().map((segment) => {
      return { ...segment, checked: false, color: "white" };
    });
    */
    setTextSegments((prevTextSegments) =>
      prevTextSegments.map((segment) => {
        return {...segment, checked: false, color: "secondary"};
      })
    );
    setSplitCardState(null);
  }

  // handles click on the check button
  // sets correctResult to true if all segments are checked and in correct order
  function handleCheck() {
    // change color of all incorrect segments to red and correct to green
    let iOfCheckedSegments = 0;
    for (let i = 0; i < textSegments.length; i++) {
      if (textSegments[i].checked === false) {
        continue;
      }
      if (textSegments[i].id === iOfCheckedSegments) {
        iOfCheckedSegments++;
        changeTextSegmentsElement(i, { color: "success" });
      } else {
        iOfCheckedSegments++;
        changeTextSegmentsElement(i, { color: "danger" });
      }
    }

    // check if all segments are checked and in correct order
    for (let i = 0; i < textSegments.length; i++) {
      if (textSegments[i].id !== i || textSegments[i].checked !== true) {
        setSplitCardState(false);
        return;
      }
    }
    setSplitCardState(true);
  }

  // Changes one element of the textSegments array without mutating the original array
  function changeTextSegmentsElement(id, newObject) {
    setTextSegments((preValue) => {
      return preValue.map((textSegment, index) => {
        if (index === id) {
          return { ...textSegment, ...newObject };
        }
        return textSegment;
      });
    });
  }

  console.log(textSegments);
  //console.log(card.questionText.split(";"));
  return (
    <Card>
      <Card.Body>
        {/*<Card.Title className="text-center">{card.title}</Card.Title>*/}
        <Container className="d-flex justify-content-between mb-1">
        <Card.Title>{card.title}</Card.Title>
        <Button><Icon path={mdiPlus} size={1} /></Button>
        </Container>
        <ListGroup>
          <ListGroup.Item>
            {getSpecifiedSegments(textSegments, (textSegment) => {
              return textSegment.checked === true;
            })}
          </ListGroup.Item>
          <ListGroup.Item>
            {getSpecifiedSegments(textSegments, (textSegment) => {
              return textSegment.checked === false;
            })}
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleCheck}>Check</Button>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <Button
              onClick={() => setCardIndex(cardIndex - 1)}
              disabled={cardIndex === 0}
            >
              {"<<"}
            </Button>
            <Button
              onClick={() => setCardIndex(cardIndex + 1)}
              disabled={cardIndex === numOfCards - 1}
            >
              {">>"}
            </Button>
          </ListGroup.Item>
          {SplitCardState === true && (
            <ListGroup.Item variant="success">
              You are right!
            </ListGroup.Item>
          )}
          {SplitCardState === false && (
            <ListGroup.Item variant="danger">
              You are incorrect
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default SplitCardUI;
