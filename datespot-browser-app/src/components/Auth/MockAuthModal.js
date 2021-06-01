import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class AuthModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'initial',
            loginValue: '',
            newUserNameValue: ''
        }

        // Method binds
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleClickSignup = this.handleClickSignup.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.handleChangeCreateNew = this.handleChangeCreateNew.bind(this);
        this.handleSubmitCreateNew = this.handleSubmitCreateNew.bind(this);
    }

    

    // Button click handlers
    handleClickLogin() {
        this.setState({
            viewMode: 'login'
        })
    }

    handleClickSignup() {
        this.setState({
            viewMode: 'signup'
        })
    }

    handleChangeLogin(e) {
        this.setState({loginValue: e.target.value})
    }

    handleSubmitLogin(e) {
        e.preventDefault();
        this.props.onSubmitLogin(this.state.loginValue);
    }

    handleChangeCreateNew(e) {
        
        this.setState({newUserNameValue: e.target.value})
    }

    handleSubmitCreateNew(e) {
        e.preventDefault();
        this.setState({
            newUserId: "new user id that would have come from server"
        })
        this.props.onCreateNewUser(this.state.newUserNameValue);
    }

    Initial = () => {
        return (
            <div>
                <Button variant="outline-secondary"
                    onClick={this.handleClickLogin}
                >
                    Login
                </Button>
                <Button variant="outline-secondary"
                    onClick={this.handleClickSignup}
                >
                    New user
                </Button>
            </div>
            
        )
    }

    LoginExisting = () => {
        return (
            <Form
                onSubmit={this.handleSubmitLogin}
            >
                <Form.Group controlId="mockLoginSignupForm.ControlInput1">
                    <Form.Label>Enter user ID of an existing mock user</Form.Label>
                    <Form.Control type="input" placeholder="user ID hex string" onChange={this.handleChangeLogin}/>
                    
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        )
    }

    CreateNew = () => {

        return (
            <Form
                onSubmit={this.handleSubmitCreateNew}
            >
                <Form.Group controlId="mockSignupForm.ControlInput1">
                    <Form.Label>Enter display name for new user</Form.Label>
                    <Form.Control type="input" placeholder="name" onChange={this.handleChangeCreateNew} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

    ViewMode = () => {
        switch(this.state.viewMode) {
            case 'login':
                return (
                    <this.LoginExisting />
                );
            case 'signup':
                return (
                    <this.CreateNew />
                );
            default:
                return (
                    <this.Initial />
                )
        }
    }

    render() {
        return (
            <Modal.Dialog
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login / Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <this.ViewMode />
                    

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>

            </Modal.Dialog>
        )
    }
}