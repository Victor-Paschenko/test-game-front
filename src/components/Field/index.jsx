import React from "react";
import PropTypes from "prop-types";
import Cell from "../Cell";
import { socket } from "../../socket";

const Field = ({ gameId, rows, columns, round, position = [], isPrepare }) => {
  const drawColumns = (row) => {
    const _columns = [];

    const [greenRow, greenColumn] = position;

    for (let i = 0; i < columns; i++) {
      const isGreen = greenRow === row && greenColumn === i;
      _columns.push(
        <Cell
          type={isGreen ? "GREEN" : "RED"}
          onClick={() => {
            socket
              .timeout(2000)
              .emit(
                "game",
                { gameId: 0, event: "catch", position: [row, i] },
                (err, response) => {
                  if (response.status !== "ok") {
                    return console.log("There was an error!");
                  }
                }
              );
          }}
          key={`${row}_${i}`}
        />
      );
    }
    return _columns;
  };

  const drawRows = () => {
    const _rows = [];

    for (let i = 0; i < rows; i++) {
      _rows.push(<div key={`${i}_row`}>{drawColumns(i)}</div>);
    }

    return _rows;
  };

  return (
    <div>
      <div>
        Game id: {gameId}, Round: {round}
      </div>
      <div>{isPrepare ? "Preparation!" : drawRows()}</div>
    </div>
  );
};

Field.propTypes = {
  gameId: PropTypes.number,
  round: PropTypes.number,
  rows: PropTypes.number,
  columns: PropTypes.number,
  isPrepare: PropTypes.bool,
  position: PropTypes.arrayOf(PropTypes.number),
};

export default Field;
