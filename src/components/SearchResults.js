import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFavorites, searchSongs, addFavorites } from "../utils/actions";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const SearchResults = props => {
  const { term } = props.match.params;

  useEffect(() => {
    props.searchSongs(term);
  }, [term]);

  useEffect(() => {
    props.fetchFavorites();
  }, []);

  const rows = props.searchResults.map(row => {
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

  const handleAddFavorites = songId => {
    props.addFavorites(songId);
  };
  console.log(props);
  return (
    <div>
      <Header />
      <div className="results-list">
        <h1>
          Search Results for <em>{term}</em>
        </h1>
        {props.isSearching ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : props.searchResults.length === 0 ? (
          <p>Sorry, no results found.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Song Name</StyledTableCell>
                  <StyledTableCell align="right">Artist</StyledTableCell>
                  <StyledTableCell align="right">Duration</StyledTableCell>
                  <StyledTableCell align="right">Tempo</StyledTableCell>
                  <StyledTableCell align="right">Popularity</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {props.favoriteSongs.find(({ id }) => id == row.id) ? (
                        <CheckIcon style={{ marginRight: 10 }} />
                      ) : (
                        <AddBoxIcon
                          onClick={() => handleAddFavorites(row.id)}
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />
                      )}{" "}
                      {row.track_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.artist_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
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
                      {/* {row.popularity} */}
                    </StyledTableCell>
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
    searchResults: state.searchResults,
    isSearching: state.isSearching,
    message: state.message
  };
};

export default connect(mapStateToProps, {
  searchSongs,
  addFavorites,
  fetchFavorites
})(SearchResults);
