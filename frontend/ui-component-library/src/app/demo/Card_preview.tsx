"use client";

import { Card } from "../../../packages/newgen-ui/src";

export default function Cardpreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Card
        title="Default Card"
        description="This is a preview of the card component with default styling."
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Cards are used to group related information in a flexible container.
        </p>
      </Card>
    </div>
  );
}
