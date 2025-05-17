import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { GroupListContext } from "./group-list-provider.jsx";

function GroupForm({ item, onClose }) {
  const { state, data, handlerMap } = useContext(GroupListContext);
  const [errorMsg, setErrorMsg] = useState();

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          // Prevents reloading the page - we handle submit ourselves
          e.preventDefault();
          // stops propagation of submit event to parent components
          // in some cases it can trigger another submit event.
          e.stopPropagation();
          const formData = new FormData(e.target);
          // extracts data from Modal form
          const values = Object.fromEntries(formData);

          let result = await handlerMap.handleCreate({ ...values });

          if (result.ok) {
            onClose();
          } else {
            console.log(result.error.group.message);
            setErrorMsg(result.error.group.message)
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            disabled={state === "pending"}
            required
            maxLength={50}
          />
          <Form.Text className="text-danger">
            {errorMsg}
          </Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={state === "pending"}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={state === "pending"}
          >
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default GroupForm;
