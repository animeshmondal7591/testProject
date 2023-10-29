import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import LogoImg from "../assets/Vector.svg";
import Add from "../assets/+.svg";
import Modal from "react-bootstrap/Modal";
import Delete from "../assets/X.png";

interface arrayObj {
  nameValue: string;
  start: string;
  end: string;
}

const MainPage: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [array, setArray] = useState<arrayObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const users = JSON.parse(localStorage.getItem("objects") || "[]");
    setArray(users);
  }, [loading]);

  const ModalOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setErr(false);
    setName("");
  };

  const handleData = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    setErr(false);
  };

  const enterKey = (e: { key: string }) => {
    if (e.key === "Enter") {
      addData();
    }
  };
  const addData = () => {
    if (name.length === 0) {
      setErr(true);
    } else {
      setErr(false);
      setShow(false);
      array.push({
        nameValue: name,
        start: "",
        end: "",
      });
      setArray(array);
      setName("");
      localStorage.setItem("objects", JSON.stringify(array));
      setLoading(false);
    }
  };

  const deleteBtn = (
    val: { nameValue: string; start: string; end: string }
  ) => {
    const filteredArr = array.filter((item) => item !== val);
    localStorage.setItem("objects", JSON.stringify(filteredArr));
    setLoading(false);
  };

  return (
    <>
      <div className="container">
        <Row className="my-3 headerClass">
          <div className="px-5 py-2 d-flex justify-content-between">
            <div className="align-items-center d-flex gap-3">
              <img src={LogoImg} alt="LogoImg" className="headerClass-logo" />
              <div className="headerClass-textLeft">TIME TRACKER</div>
            </div>

            <div className="align-items-center d-flex gap-3">
              <div className="headerClass-textRight1">Total Time Spend</div>
              <div className="headerClass-textRight2">1 hr</div>
            </div>
          </div>
        </Row>
        <Row className="m-3">
          {array.length > 0 &&
            array.map((val, index) => (
              <Row key={index} className="card-main my-3 p-4">
                <Col lg="7" xl="7">
                  <div className="card-text-1">{val.nameValue}</div>
                  <div className="card-text-2">History</div>
                  {val.start === "" && (
                    <div className="card-text-3">
                      No History Found, Click on the start button to track the
                      timer
                    </div>
                  )}
                </Col>
                <Col lg="5" xl="5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="card-timer">00 : 00 : 00</div>
                    <div className="addBtn">Start</div>
                    <div
                      className="deleteLogo"
                      onClick={() => deleteBtn(val)}
                    >
                      <img src={Delete} alt="Delete" className="deleteClass" />
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
        </Row>

        <div className="d-flex justify-content-end">
          <div className="addLogo" onClick={ModalOpen}>
            <img src={Add} alt="Add" className="addClass" />
          </div>
        </div>
      </div>

      {/* modal open */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="mb-2">Enter the Task Name</div>
          <input
            type="text"
            className="form-control"
            name="text"
            onChange={handleData}
            onKeyDown={enterKey}
          />

          {err && <div className="errTxt">Please enter Task Name</div>}
          <div className="mt-3 mb-2 addBtn" onClick={addData}>
            Save
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MainPage;
