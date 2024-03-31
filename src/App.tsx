import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "./redux/store";
import {
  //   AllocatedArrayType,
  allocate,
  deleteItem,
  increaseAmount,
  decreaseAmount,
} from "./redux/allocatedSlice";
import {
  budgetedChanged,
  moneyCalc,
  currencyUnitChanged,
} from "./redux/moneySlice";
import { nanoid } from "nanoid";

function App() {
  const allocatedBudget = useSelector(
    (state: StoreType) => state.allocatedBudget
  );
  const money = useSelector((state: StoreType) => state.moneyCalc);
  const dispatch = useDispatch();

  const [departmentField, setDepartment] = useState<string>("");
  const [amountForDepartmentField, setAmountForDepartment] = useState<number>();
  // const [currencyUnit, setCurrencyUnit] = useState<string>("");

  let array: number[] = [];
  allocatedBudget?.forEach((element) => {
    array.push(Number(element.amountForDepartment));
  });

  let totalSpent =
    array.length > 0
      ? array.reduce((sum, element) => Number(sum) + Number(element))
      : 0;
  useEffect(() => {
    // console.log(allocatedBudget.length);

    let remainingAmount: number = Number(money.budgeted) - Number(totalSpent);

    dispatch(
      moneyCalc({
        currencyUnit: money.currencyUnit,
        budgeted: money.budgeted,
        allocated: totalSpent,
        remaining: remainingAmount,
      })
    );
  }, [
    allocatedBudget,
    money.budgeted,
    dispatch,
    money.allocated,
    money.remaining,
    money.currencyUnit,
    totalSpent,
  ]);

  return (
    <Container fluid>
      <Row>
        <p className="display-5 fw-normal">Company's Budget Allocation</p>
        <Col
          lg={3}
          className="d-flex justify-content-center align-item-center mb-1 mb-lg-0 "
        >
          <Form.Group
            as={Row}
            className="mb-3  "
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4" className="">
              Budget:
            </Form.Label>
            <Col
              sm="8"
              className="d-flex flex-row align-items-center bg-info-subtle rounded-2"
            >
              {money.currencyUnit}
              <Form.Control
                className="ps-0"
                style={{ width: "80%", height: "80%" }}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  switch (Number(e.target.value) - totalSpent < 0) {
                    case true:
                      alert(
                        "you cannot reduce the budget value lower than spending"
                      );
                      // e.target.value = totalSpent.toString();
                      break;
                    case false:
                      dispatch(budgetedChanged(Number(e.target.value)));
                      break;
                  }
                }}
                defaultValue={
                  money.budgeted ? money.currencyUnit + money.budgeted : ""
                }
                max={20000}
                step={10}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col lg={3} className="mb-1 mb-lg-0">
          <Form.Control
            plaintext
            readOnly
            // defaultValue={null} //{`The remaining : $${remainder}`}
            className="border border-1 rounded-2 ps-2 bg-info-subtle"
            placeholder={`The remaining amount : ${
              money.currencyUnit + money.remaining
            }`}
          />
        </Col>
        <Col lg={3} className="mb-1 mb-lg-0">
          <Form.Control
            plaintext
            readOnly
            placeholder={`Spent so far : ${
              money.currencyUnit + money.allocated
            }`}
            className="border border-1 rounded-2 ps-2 bg-info-subtle"
          />
        </Col>
        <Col lg={3} className="d-flex flex-row align-items-start">
          <p className="pt-1 pe-2">{money.currencyUnit + " "}</p>
          <Form.Select
            aria-label="Default select example"
            className="rounded-2 "
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(currencyUnitChanged(e.target.value));
              e.target.value = "";
            }}
            id="currencyUnit"
          >
            <option value={""} className="bg-info-subtle">
              Currency Unit
            </option>
            <option value="$" className="bg-info-subtle">
              $
            </option>
            <option value="£" className="bg-info-subtle">
              £
            </option>
            <option value="€" className="bg-info-subtle">
              €
            </option>

            <option value="₦" className="bg-info-subtle">
              ₦
            </option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="h3 fw-normal ">Allocation</p>
          <Table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Allocated Budget</th>
                <th>Increase by 10</th>
                <th>Decrease by 10</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allocatedBudget.map(
                ({ id, department, amountForDepartment }) => {
                  return (
                    <tr key={id}>
                      <td>{department}</td>
                      <td>{money.currencyUnit + amountForDepartment}</td>
                      <td>
                        <Button
                          className="p-0 bg-transparent border-0 text-dark"
                          onClick={() => {
                            if (
                              Number(money.budgeted) - Number(totalSpent) <
                              0
                            ) {
                              alert(
                                "the amount entered should not be more than the amount remaining"
                              );
                              dispatch(decreaseAmount(id));
                            }
                            dispatch(increaseAmount(id));
                          }}
                        >
                          <i
                            className="bi bi-plus-lg text-white fw-bolder p-1 rounded-5"
                            style={{ backgroundColor: "green" }}
                          ></i>
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="p-0 bg-transparent border-0 text-dark"
                          onClick={() => dispatch(decreaseAmount(id))}
                        >
                          <i className="bi bi-dash-lg text-white fw-bolder p-1 bg-danger rounded-5"></i>
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="p-0 bg-transparent border-0 text-dark"
                          onClick={() => dispatch(deleteItem(id))}
                        >
                          <i className="bi bi-x-lg text-white fw-bolder p-1 bg-danger rounded-5"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <p className="h5">Change allocation</p>
        <Col lg={3} className="d-flex flex-row">
          <InputGroup.Text className="rounded-end-0">
            Department
          </InputGroup.Text>
          <Form.Select
            aria-label="Default select example"
            className="rounded-0"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setDepartment(e.target.value);
            }}
            id="department"
          >
            <option>Choose</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Transport">Transport</option>
            <option value="Human Resource">Human Resource</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
          </Form.Select>
        </Col>

        <Col lg={3} className="d-flex flex-row">
          <p className="pt-2 pe-2"> {money.currencyUnit}</p>
          <Form.Control
            type="number"
            placeholder={`Amount`}
            aria-label="Username"
            aria-describedby="basic-addon1"
            className="rounded-0 "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (
                Number(e.target.value) >
                Number(money.budgeted) - Number(totalSpent)
              ) {
                alert(
                  `the value cannot exceed the amount remaining funds ${
                    money.currencyUnit + money.remaining
                  }`
                );
                // e.target.value = "";
                setAmountForDepartment(Number(e.target.value));
              }
              setAmountForDepartment(Number(e.target.value));
            }}
            id="amount"
          />
        </Col>
        <Col lg={1}>
          <Button
            className="rounded-start-0 p-2"
            onClick={() => {
              if (amountForDepartmentField && departmentField) {
                dispatch(
                  allocate({
                    id: nanoid(),
                    department: departmentField,
                    amountForDepartment: Number(amountForDepartmentField),
                  })
                );

                setAmountForDepartment(0);
                setDepartment("");
                (document.getElementById("amount") as HTMLInputElement).value =
                  "";
                (
                  document.getElementById("department") as HTMLInputElement
                ).value = "";
              }
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
