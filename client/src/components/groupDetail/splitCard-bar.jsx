import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Button from "react-bootstrap/esm/Button";

function SplitCardBar({ splitCardStates }) {
  const stateColors = {
    true: "success",
    false: "danger",
    undefined: "light",
    null: "secondary",
  };
  return (
    <ButtonGroup className="px-0">
      {splitCardStates?.map((item, i) => (
        <Button variant={stateColors[item]}>{i + 1}</Button>
      ))}
    </ButtonGroup>
  );
}

export default SplitCardBar;
