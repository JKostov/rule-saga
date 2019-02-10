
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from '../../components/elements';
import RuleForm from "../../components/RuleForms/RuleForm";

const AddNewRule = ({ history: { push }, companyId }) => (
  <Segment>
    <RuleForm push={push} companyId={companyId}/>
  </Segment>
);

AddNewRule.propTypes = {
  companyId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ rule, auth }) => ({
  companyId: auth.get('company')._id,
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(AddNewRule),
);
