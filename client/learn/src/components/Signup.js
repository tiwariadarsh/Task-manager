import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
export default function Signup() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const fun = (e) => {
  //  console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
 
  const usersubmit = async (e) =>{
    e.preventDefault();
    const {
      name,
      email,
      password,
      cpassword
    } = user ;
   const res = await fetch("/register" , {
     method : "POST",
     headers : {
        "Content-Type" : "application/json"
     },
     body : JSON.stringify ({
      name,
      email,
      password,
      cpassword
     })
   });
   const data = await res.json();
   if(res.status===422 || !data) {
     window.alert("Unsuccessful Registration");
    // console.log("Unsuccessful Registration");
   }
   else{
    window.alert("successful Registration");
   // console.log("successful Registration");
    history.push("/login");
   }

  }

  return (
    <div className="container-sm" style={{ width: "55vh" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create Account</h2>
          <Form method="POST">
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                name="name"
                placeholder="alice"
                value={user.name}
                onChange={fun}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                id="email"
                name="email"
                placeholder="alice@gmail.com"
                value={user.email}
                onChange={fun}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                 type="password"
                id="password"
                name="password"
                placeholder="abcd$123"
                value={user.password}
                onChange={fun}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="abcd$123"
                value={user.cpassword}
                onChange={fun}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="outline-secondary"
              className="w-100 my-3"
              onClick={usersubmit}
            >
              Sign Up
            </Button>
          </Form>
          <div>
            {" "}
            Already have an account <Link to="/login">Login</Link>{" "}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
