import React from "react";
import { Button } from "./ui/button";
import { UseMutateFunction } from "@tanstack/react-query";

interface SessionExpireModalProps {
  mutate: UseMutateFunction<void, unknown, void, unknown>;
  logoutLoading: boolean;
}

const SessionExpireModal = ({
  mutate,
  logoutLoading,
}: SessionExpireModalProps) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-black/25">
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
        <h2 className="mb-4 font-semibold md:text-xl">
          Session expired! Please log in again...
        </h2>
        <Button onClick={() => mutate()} disabled={logoutLoading}>
          LogIn
        </Button>
      </div>
    </section>
  );
};

export default SessionExpireModal;
