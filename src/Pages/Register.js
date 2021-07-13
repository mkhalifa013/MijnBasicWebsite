import React, { useState} from "react";
import {Button,Card,CardFooter,CardBody,CardGroup,Col,Container,Form,Input,InputGroup,InputGroupAddon,InputGroupText,Row,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { callApi } from "../utils";

const Reg = (props) => {
    const [username, SetUsername] = useState('')
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null);
    const history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const data = await callApi("/auth/local/register", "POST", {
        username: username,
        email: email,
        password: password,
      });

      if (!data) {
        throw "Cannot login. Please try again.";
      }

      history.push("/overzicht");
    } catch (err) {
      setErrorMsg(err);
    }
  };

    return (
      <div className="container ctn mb-5 pb-5 mt-5">
        <Container>
          <Row className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3 mt-2">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <div class="row" className="mb-2 pageheading">
                      <div class="col-sm-12 btn btn-primary">Sign Up</div>
                    </div>

                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        value={username}
                        placeholder="Name"
                        onChange={e => SetUsername(e.target.value)}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        value={email}
                        placeholder="Enter Email"
                        onChange={e => SetEmail(e.target.value)}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <Input
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={e => SetPassword(e.target.value)}
                      />
                    </InputGroup>
                    <Button>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
};




export default Reg;
