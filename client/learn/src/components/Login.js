import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function Login({mw ,setMw}) {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const fun = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const usersubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Wrong Email or Password");
      // console.log("Unsuccessful Login");
    } else {
      setMw(true);
      window.alert("Successful Login");
      //console.log(mw);
      history.push("/");
    }
  };

  return (
    <div className="container-sm" style={{ width: "55vh" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form method="POST">
            <Form.Group id="email">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                id="email"
                placeholder="alice@gmail.com"
                name="email"
                value={user.email}
                onChange={fun}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                placeholder="abcd$123"
                name="password"
                value={user.password}
                onChange={fun}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="outline-secondary"
              className="w-100 my-3"
              onClick={usersubmit}
            >
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
