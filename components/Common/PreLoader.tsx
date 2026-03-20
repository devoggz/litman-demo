"use client";
import React, { useState, useEffect } from "react";

const PreLoader = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

  return (
    loading && (
      <div
        className="fixed left-0 top-0 z-999999 flex flex-col gap-4 h-screen w-screen  items-center justify-center bg-dark-6"
        style={{
          backgroundBlendMode: "soft-light",
          backgroundImage: `url('/images/hero/pattern.svg')`,
          backgroundSize: "auto",
        }}
      >
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-bright border-t-transparent" />
        <p className="text-green-bright">Turning on the lights...</p>
      </div>
    )
  );
};

export default PreLoader;
