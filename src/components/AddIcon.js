import React from "react";
import { connect } from "react-redux";
import { addFavorites } from "../utils/actions";
import { withRouter } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CheckIcon from "@material-ui/icons/Check";

const AddIcon = props => {
  const handleAdd = id => {
    localStorage.getItem("token")
      ? props.addFavorites(id)
      : props.history.push("/login", { url: props.match.url });
  };
  console.log(props);
  return props.favoriteSongs.find(({ id }) => id == props.rowid) ? (
    <CheckIcon style={{ marginRight: 10, color: "limegreen", fontSize: 18 }} />
  ) : props.actionID === props.rowid ? (
    <i className="fas fa-spinner fa-spin" style={{ marginRight: 14 }}></i>
  ) : (
    <AddBoxIcon
      onClick={() => handleAdd(props.rowid)}
      style={{
        marginRight: 10,
        cursor: "pointer",
        color: "#ED3EC9",
        fontSize: 18
      }}
    />
  );
};

const mapStateToProps = state => {
  return { actionID: state.actionID };
};

export default connect(mapStateToProps, { addFavorites })(withRouter(AddIcon));
