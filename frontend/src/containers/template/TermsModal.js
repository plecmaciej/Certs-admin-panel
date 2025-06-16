import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideTermsModal } from './AppTemplateActions';

const TermsModal = ({ show, hideTermsModal }) => (
    <Modal show={show} onHide={hideTermsModal}>
        <Modal.Header closeButton>
            <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><strong>1. Acceptance of Terms</strong></p>
            <p>By using this application, you agree to be bound by these terms...</p>
            <p><strong>2. User Responsibilities</strong></p>
            <p>You are responsible for the accuracy of data entered...</p>
            <p><strong>3. Data Usage</strong></p>
            <p>We may store and process your data in accordance with our privacy policy...</p>
            {/* full terms here */}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={hideTermsModal}>Close</Button>
        </Modal.Footer>
    </Modal>
);

const mapStateToProps = (state) => ({
    show: state.appState.termsModalVisible
});

export default connect(mapStateToProps, { hideTermsModal })(TermsModal);
