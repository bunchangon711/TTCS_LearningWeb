"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner color='success' size='lg' />
    </div>
  );
};

export default Loader;
