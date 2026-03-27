"use client";

import { Dropdown } from "@/lib/ui";

export default function Dropdownpreview() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <Dropdown
        label="Select an Option"
        items={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
          { label: "Option 3", value: "3" },
        ]}
      />
    </div>
  );
}
