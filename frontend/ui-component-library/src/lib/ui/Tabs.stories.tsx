import React from "react";
import Tabs, { TabItem } from "./Tabs";

// Storybook configuration
export default {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

// Sample data
const sampleItems: TabItem[] = [
  {
    id: "home",
    label: "Home",
    content: <div className="p-4">Home content</div>,
  },
  {
    id: "profile",
    label: "Profile",
    content: <div className="p-4">Profile content</div>,
  },
  {
    id: "settings",
    label: "Settings",
    content: <div className="p-4">Settings content</div>,
  },
];

// Stories
export const Default = () => <Tabs items={sampleItems} />;

export const Pills = () => <Tabs items={sampleItems} variant="pills" />;

export const Underline = () => <Tabs items={sampleItems} variant="underline" />;

export const Small = () => (
  <Tabs items={sampleItems} variant="pills" size="sm" />
);

export const Medium = () => (
  <Tabs items={sampleItems} variant="pills" size="md" />
);

export const Large = () => (
  <Tabs items={sampleItems} variant="pills" size="lg" />
);

export const WithDisabled = () => (
  <Tabs
    items={[
      ...sampleItems,
      {
        id: "disabled",
        label: "Disabled",
        content: <div className="p-4">This tab is disabled</div>,
        disabled: true,
      },
    ]}
  />
);

export const CustomTheme = () => (
  <Tabs
    items={sampleItems}
    variant="default"
    theme={{
      primary: "#10b981",
      primary600: "#059669",
    }}
  />
);

export const AllVariants = () => (
  <div className="space-y-8 p-4">
    <div>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Default</p>
      <Tabs items={sampleItems} variant="default" />
    </div>
    <div>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Pills</p>
      <Tabs items={sampleItems} variant="pills" />
    </div>
    <div>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Underline</p>
      <Tabs items={sampleItems} variant="underline" />
    </div>
  </div>
);

export const WithOnChange = () => {
  const [activeTab, setActiveTab] = React.useState<string>("");

  return (
    <div>
      <Tabs items={sampleItems} onChange={(tabId) => setActiveTab(tabId)} />
      {activeTab && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Active tab: <strong>{activeTab}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export const AllSizes = () => (
  <div className="space-y-8 p-4">
    <div>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Small</p>
      <Tabs items={sampleItems} variant="pills" size="sm" />
    </div>
    <div>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
        Medium (Default)
      </p>
      <Tabs items={sampleItems} variant="pills" size="md" />
    </div>
    <div>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Large</p>
      <Tabs items={sampleItems} variant="pills" size="lg" />
    </div>
  </div>
);

export const RichContent = () => {
  const richItems: TabItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      content: (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Dashboard Overview
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                1,234
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                $45.2K
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                +12%
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      content: (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Analytics Report
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Detailed analytics and metrics will be displayed here.
          </p>
        </div>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      content: (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Generate Reports
          </h3>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Download Report
          </button>
        </div>
      ),
    },
  ];

  return <Tabs items={richItems} variant="pills" />;
};
