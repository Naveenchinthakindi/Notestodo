import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomApp({ showpopUP, setShowpopUp, id, keyid, deleteNote }) {
  console.log("customapp data ", keyid);

  const deletemethod = () => {
    deleteNote(keyid);
  };

  return (
    <div
      className="modal show popup"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          {/* <button  onClick = {()=>setShowpopUp(false)}  variant="secondary"></button> */}
          <Button onClick={() => setShowpopUp(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => deletemethod()} variant="secondary">
            YES
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default CustomApp;
