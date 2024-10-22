
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Login(props: any) {
    const handleClose = () => props.onClose(); // Call parent function to close
  
    return (
      <>
        <Modal show={props.show} onHide={handleClose} centered >
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-center title-cont"><div><img src="src\assets\logofinal.png" height={40} ></img></div> <h4>
                Sign in with StayHub Account</h4></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Button variant="primary" type='submit' >
              Login
            </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default Login;
