import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { GameForm } from "./components/GameForm";
import Field from "./components/Field";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [round, setRound] = useState(0);
  const [position, setPosition] = useState([]);
  const [isPrepare, setIsPrepare] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onRoundStart({ round, position }) {
      setRound(round);
      setPosition(position);
      setIsPrepare(false);
      setWinner(null);
    }

    function onPrepare() {
      setPosition([]);
      setIsPrepare(true);
    }

    function onGameEnd(game) {
      const { winner } = game;
      setWinner(winner);
    }

    socket.on("roundStart", onRoundStart);
    socket.on("prepare", onPrepare);
    socket.on("gameEnd", onGameEnd);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="App">``
      <ConnectionState isConnected={isConnected} />
      <GameForm />
      {winner ? (
        `${winner.id} ${winner.count} by ${(winner.totalTime / winner.count).toFixed(2)} ms`
      ) : (
        <Field
          gameId={0}
          rows={3}
          columns={3}
          round={round}
          isPrepare={isPrepare}
          position={position}
        />
      )}
    </div>
  );
}
