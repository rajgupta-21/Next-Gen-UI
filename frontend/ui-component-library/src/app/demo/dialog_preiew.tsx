"use client";

import { useState } from "react";
import { Button, Dialog } from "../../../packages/newgen-ui/src";

export default function Dialogpreiew() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Button variant="solid" onClick={() => setOpen(true)}>
        Open Modal Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Example Dialog">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This is a preview of the dialog component. You can customize its appearance in the personalization tab.
        </p>
      </Dialog>
    </div>
  );
}
