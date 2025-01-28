import { Spinner as RBSSpinner } from "react-bootstrap";

export function Spinner() {
  return (
    <>
      <RBSSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </RBSSpinner>
      <br />
    </>
  );
}
