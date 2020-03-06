import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFavorites, searchSongs } from "../utils/actions";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "./Header";
import AddIcon from "./AddIcon";
import Player from "./Player";

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
    minWidth: 500
  }
});

const SearchResults = props => {
  const { term } = props.match.params;

  useEffect(() => {
    props.searchSongs(term);
  }, [term]);

  useEffect(() => {
    localStorage.getItem("token") && props.fetchFavorites();
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

  return (
    <div className="search-results">
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
                  <StyledTableCell align="right" className="artist">
                    Artist
                  </StyledTableCell>
                  <StyledTableCell align="right" className="duration">
                    Duration
                  </StyledTableCell>
                  <StyledTableCell align="right" className="tempo">
                    Tempo
                  </StyledTableCell>
                  <StyledTableCell align="right" className="popularity">
                    Popularity
                  </StyledTableCell>
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
                      <Player id={row.id} />
                      <AddIcon
                        favoriteSongs={props.favoriteSongs}
                        rowid={row.id}
                      />{" "}
                      {row.track_name}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="artist">
                      {row.artist_name}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="duration">
                      {row.duration_ms}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="tempo">
                      {Math.floor(row.tempo)} BPM
                    </StyledTableCell>
                    <StyledTableCell align="right" className="popularity">
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
                            background: `rgb(237,62,201, ${Number(
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
      <footer>
        <div className="footer-content">
          <p>Song Surfer Est 2020</p>
        </div>
      </footer>
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
  fetchFavorites
})(SearchResults);
