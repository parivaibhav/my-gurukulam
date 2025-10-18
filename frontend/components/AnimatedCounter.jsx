"use client";
import { useEffect, useState } from "react";

export default function AnimatedCounter({ count }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setValue(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [count]);

  return <span>{value.toLocaleString()}</span>;
}
