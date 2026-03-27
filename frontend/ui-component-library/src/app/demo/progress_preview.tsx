"use client";

import { Progress } from "@/lib/ui";

export default function Progresspreview() {
  return (
    <div className="w-full space-y-6">
      <Progress value={65} showLabel />
      <Progress value={80} variant="gradient" showLabel />
      <Progress value={45} variant="striped" animated showLabel />
    </div>
  );
}
