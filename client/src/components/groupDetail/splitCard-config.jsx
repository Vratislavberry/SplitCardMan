import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

function SplitCardConfig({ onClose, setSplitCardFormData}) {
  return (
    <Offcanvas onHide={onClose} show={true} placement="bottom">
        <Button onClick={() => {setSplitCardFormData({}); onClose()}} className="m-1">Create</Button>
        <Button className="m-1">Update</Button>
        <Button className="m-1">Delete</Button>
    </Offcanvas>
  );
}

export default SplitCardConfig;
