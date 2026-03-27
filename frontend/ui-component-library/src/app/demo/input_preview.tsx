"use client";

import { Input } from "@/lib/ui";
import { useState } from "react";

export default function Inputpreview() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Standard Input"
      />
      <Input
        type="email"
        placeholder="Email Input"
      />
      <Input
        type="password"
        placeholder="Password Input"
      />
    </div>
  );
}
