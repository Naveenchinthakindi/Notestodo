import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomApp({ showpopUP, setShowpopUp, id, keyid, deleteNote }) {
  console.log("customapp data ", keyid);

  const deletemethod = () => {
    deleteNote(keyid);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <Modal.Dialog>
          {/* <Modal.Header>
            <Modal.Title>Notes</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <p>You Want to Delete the Note</p>
          </Modal.Body>
          <Modal.Footer className="footer">
            <Button onClick={() => setShowpopUp(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={() => deletemethod()} variant="secondary">
              YES
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default CustomApp;
