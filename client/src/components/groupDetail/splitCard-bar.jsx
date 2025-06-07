import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Button from "react-bootstrap/esm/Button";

function SplitCardBar({ splitCardStates, setCurrentCardIndex }) {
  const stateColors = {
    "correct": "success",
    "incorrect": "danger",
    "unvisited": "light",
    "visited": "secondary",
    "current": "primary",
  };
  return (
    <ButtonGroup className="px-0">
      {splitCardStates?.map((item, i) => (
        <Button onClick={() => setCurrentCardIndex(i)} key={i} variant={stateColors[item]}>{i + 1}</Button>
      ))}
    </ButtonGroup>
  );
}

export default SplitCardBar;
