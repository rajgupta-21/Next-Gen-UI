"use client";

import { Tabs } from "../../../packages/newgen-ui/src";

export default function Tabspreview() {
  return (
    <div className="w-full">
      <Tabs
        tabs={[
          { label: "Tab 1", content: <p className="text-sm p-4 text-gray-600 dark:text-gray-400">Content for Tab 1</p> },
          { label: "Tab 2", content: <p className="text-sm p-4 text-gray-600 dark:text-gray-400">Content for Tab 2</p> },
          { label: "Tab 3", content: <p className="text-sm p-4 text-gray-600 dark:text-gray-400">Content for Tab 3</p> },
        ]}
      />
    </div>
  );
}
