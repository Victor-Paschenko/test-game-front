import React, { useState } from "react";
import { socket } from "../../socket";

export function GameForm() {
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket
      .timeout(2000)
      .emit("connectToGame", { gameId: 0 }, (err, response) => {
        setIsLoading(false);

        if (response.status !== "ok") {
          return console.log("There was an error!");
        }
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit" disabled={isLoading}>
        Ready
      </button>
    </form>
  );
}
