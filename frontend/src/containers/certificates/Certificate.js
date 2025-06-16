import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Row} from "react-bootstrap";
import * as actions from "./CertificatesApi";

class Certificate extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            resource: {},
            validationErrors: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.loadCertificate(id);
        }
    }

    loadCertificate = (id) => {
        this.props.actions.loadCertificate(id, resource => this.setState({resource, previousCertificateName: resource.name}));
    }

    handleChange = (field) => (e) => {
        const {resource} = this.state;
        this.setState({resource: {...resource, [field]: e.target.value}});
    }

    saveCertificate = (e) => {
        e.preventDefault();
        const {resource} = this.state;
        const validationErrors = {};

        if (!resource.name || resource.name.length < 3)
            validationErrors.name = "name jest wymagana";
        if (!resource.description || resource.description.length < 5)
            validationErrors.description = "description jest za krótki";

        if (Object.keys(validationErrors).length > 0) {
            this.setState({validationErrors});
        } else {
            this.props.actions.saveCertificate(resource, () => {
                this.context.router.history.push('/certificates');
            });
        }
    }

    getValidationState = (field) => {
        return this.state.validationErrors[field] ? 'error' : null;
    }

    render() {
        const {resource, validationErrors, previousCertificateName} = this.state;

        return (
            <div>

                {resource && <Row className="vertical-middle breadcrumbs">
                    <Col xs={8}>
                        <h5>
                            <Glyphicon
                                glyph="cog"/> Admin > Certificates > {resource.id ?
                                <span><b>{previousCertificateName}</b> - edit</span> :
                                <span>New</span>}
                        </h5>
                    </Col>
                </Row>
                }
                {resource &&
                <Row id='form'>
                    <Col xs={12} md={6}>
                        <Form horizontal onSubmit={this.saveCertificate}>
                            <FormGroup controlId="name" validationState={this.getValidationState('name')}>
                                <Col componentClass={ControlLabel} sm={2}>name</Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="text"
                                        value={resource.name || ''}
                                        placeholder="name certyfikatu"
                                        onChange={this.handleChange('name')}
                                    />
                                    {validationErrors.name && <ControlLabel>{validationErrors.name}</ControlLabel>}
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="description" validationState={this.getValidationState('description')}>
                                <Col componentClass={ControlLabel} sm={2}>description</Col>
                                <Col sm={10}>
                                    <FormControl
                                        componentClass="textarea"
                                        value={resource.description || ''}
                                        placeholder="description certyfikatu"
                                        onChange={this.handleChange('description')}
                                    />
                                    {validationErrors.description && <ControlLabel>{validationErrors.description}</ControlLabel>}
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="user_id">
                                <Col componentClass={ControlLabel} sm={2}>User ID</Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="number"
                                        value={resource.user_id || ''}
                                        placeholder="ID użytkownika"
                                        onChange={this.handleChange('user_id')}
                                    />
                                </Col>
                            </FormGroup>

                            <Col xsOffset={2} xs={10} className='form-buttons margin10'>
                                <Button type="submit" bsStyle={'success'}>Save</Button>
                                <Button
                                    bsStyle={'warning'}
                                    onClick={() => this.context.router.history.push('/certificates')}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Form>
                    </Col>
                </Row>
                 }
            </div>
        );
    }
}

Certificate.contextTypes = {
    router: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(undefined, mapDispatchToProps)(Certificate);
