import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Glyphicon, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import * as actions from "./CertificatesApi";
import * as userActions from "../users/UsersApi";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class Certificates extends Component {
    state = {certificates: null, page: 1, sizePerPage: 10, owners: {}};

    componentDidMount() {
        this.reload();
    }

    reload(page = this.state.page, sizePerPage = this.state.sizePerPage) {
        this.props.actions.loadCertificates({page: page, per_page: sizePerPage},
            certificates => this.setState({certificates, page, sizePerPage}));
    }

    delete(id) {
        this.props.actions.deleteCertificate(id, () => {
            this.reload();
        });
    }

    render() {
        const {certificates, page, sizePerPage} = this.state;
        return (
            <div>
                <Row className="vertical-middle breadcrumbs">
                    <Col xs={8}>
                        <h5>
                            <Glyphicon glyph="cog"/> Admin > Certificates
                        </h5>
                    </Col>
                    <Col xs={4} className="text-right">
                        <h4>
                            <LinkContainer exact to={`/certificate`}>
                                <Button bsStyle={'success'}><Glyphicon glyph="plus"/> Add</Button>
                            </LinkContainer>
                        </h4>
                    </Col>
                </Row>

                {certificates &&
                <BootstrapTable
                    data={certificates}
                    fetchInfo={{dataTotalSize: certificates.length}}
                    striped
                    hover
                    remote
                    pagination
                    bordered={false}
                    options={{
                        onPageChange: (page, sizePerPage) => {
                            this.reload(page, sizePerPage);
                        },
                        onSizePerPageList: sizePerPage => {
                            this.reload(this.state.page, sizePerPage);
                        },
                        page,
                        sizePerPage
                    }}
                >
                    <TableHeaderColumn
                        width="10"
                        dataFormat={(cell, row, enumObject, index) => ( (page - 1) * sizePerPage + index + 1 )}
                    >
                        Lp.
                    </TableHeaderColumn>                    
                    <TableHeaderColumn width="10" isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn width="30" dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn width="40" dataField='description'>Description</TableHeaderColumn>
                    <TableHeaderColumn width="20" dataField='id' dataFormat={(cell, row) => {
                        return (
                            <div>
                                <LinkContainer exact to={`/certificate/${row.id}`}>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Edit</Tooltip>}>
                                        <span className="text-success pointer"><i className="fas fa-edit"/></span>
                                    </OverlayTrigger>
                                </LinkContainer>
                                <span> </span>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Delete</Tooltip>}>
                                    <span className="text-danger pointer" onClick={() => this.delete(row.id)}>
                                        <i className="fas fa-trash-alt"/>
                                    </span>
                                </OverlayTrigger>
                            </div>
                        );
                    }}>Actions</TableHeaderColumn>
                </BootstrapTable>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions, ...userActions }, dispatch)
});

export default connect(undefined, mapDispatchToProps)(Certificates);
