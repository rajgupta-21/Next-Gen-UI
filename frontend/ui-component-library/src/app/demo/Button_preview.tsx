"use client";

import { Button } from "../../../packages/newgen-ui/src";

export default function Buttonpreview() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button variant="solid">Primary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  );
}
