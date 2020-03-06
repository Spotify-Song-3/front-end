import React from "react";
import { connect } from "react-redux";
import { deleteFavorites } from "../utils/actions";

import DeleteIcon from "@material-ui/icons/Delete";

const AddIcon = props => {
  return props.actionID === props.rowid ? (
    <i className="fas fa-spinner fa-spin" style={{ marginRight: 14 }}></i>
  ) : (
    <DeleteIcon
      onClick={() => props.deleteFavorites(props.rowid)}
      style={{
        marginRight: 10,
        cursor: "pointer",
        color: "crimson",
        fontSize: 18
      }}
    />
  );
};

const mapStateToProps = state => {
  return { actionID: state.actionID };
};

export default connect(mapStateToProps, { deleteFavorites })(AddIcon);
