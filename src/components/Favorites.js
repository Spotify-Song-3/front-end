import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchFavorites, deleteFavorites } from "../utils/actions";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";

import Header from "./Header";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function createData(
  id,
  track_name,
  artist_name,
  duration_ms,
  tempo,
  popularity
) {
  return { id, track_name, artist_name, duration_ms, tempo, popularity };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const Favorites = props => {
  const [favSearch, setFavSearch] = useState("");
  useEffect(() => {
    props.fetchFavorites();
  }, []);

  const rows = props.favoriteSongs.map(row => {
    let duration = Math.round(row.duration_ms / 1000)
      .toString()
      .split("");
    duration[duration.length - 2] = `:${duration[duration.length - 2]}`;
    duration = duration.reduce((acc, item) => (acc += item), "");

    return createData(
      row.id,
      row.track_name,
      row.artist_name,
      duration,
      row.tempo,
      row.popularity
    );
  });

  const classes = useStyles();

  return (
    <div className="search-results">
      <Header />
      <div className="results-list">
        <div className="results-header">
          <h1>Favorite Songs</h1>
          <input
            placeholder="search your favorites"
            name={favSearch}
            onChange={e => setFavSearch(e.target.value)}
          />
        </div>
        {props.favoriteSongs.length === 0 ? (
          <p>Search some songs and add to your favorites!</p>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Song Name</StyledTableCell>
                  <StyledTableCell>Artist</StyledTableCell>
                  {/* <StyledTableCell align="right">Duration</StyledTableCell>
                  <StyledTableCell align="right">Tempo</StyledTableCell>
                  <StyledTableCell align="right">Popularity</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .filter(row =>
                    row.track_name
                      .toLowerCase()
                      .includes(favSearch.toLowerCase())
                  )
                  .map(row => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <DeleteIcon
                          onClick={() => props.deleteFavorites(row.id)}
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />{" "}
                        {row.track_name}
                      </StyledTableCell>
                      <StyledTableCell>{row.artist_name}</StyledTableCell>
                      {/* <StyledTableCell align="right">
                      {row.duration_ms}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Math.floor(row.tempo)} BPM
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <div
                        style={{
                          height: 10,
                          background: "#e1e1e2"
                        }}
                      >
                        <div
                          style={{
                            width: row.popularity,
                            height: 10,
                            background: `rgb(220,20,60, ${Number(
                              row.popularity
                            ) / 100})`
                          }}
                        ></div>
                      </div>
                    </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    favoriteSongs: state.favoriteSongs,
    isDeleting: state.isDeleting,
    message: state.message
  };
};

export default connect(mapStateToProps, { fetchFavorites, deleteFavorites })(
  Favorites
);
