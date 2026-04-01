"use client";

import CodeBlock from "@/components/CodeBlock";
import {
  ALL_COMPONENTS,
  ComponentCustomization,
  ComponentName,
  buildVarStyle,
  darkenHex,
  useComponentCustom,
} from "@/contexts/ComponentCustomContext";
import { Dropdown, Input, Pagination, Progress } from "@/lib/ui";
import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Dialog,
  Tabs,
} from "../../packages/newgen-ui/src";
import LibNavbar from "../../packages/newgen-ui/src/components/Navbar";

// ─── Constants ────────────────────────────────────────────────────────────────

const COMP_LABEL: Record<ComponentName, string> = {
  button: "Button",
  card: "Card",
  navbar: "Navbar",
  dialog: "Dialog",
  carousel: "Carousel",
  dropdown: "Dropdown",
  tabs: "Tabs",
  progress: "Progress",
  pagination: "Pagination",
  input: "Input",
};

const FONT_SIZES = [
  "0.75rem",
  "0.875rem",
  "1rem",
  "1.125rem",
  "1.25rem",
  "1.5rem",
];
const FONT_WEIGHTS = [
  { label: "Light — 300", value: "300" },
  { label: "Regular — 400", value: "400" },
  { label: "Medium — 500", value: "500" },
  { label: "Semibold — 600", value: "600" },
  { label: "Bold — 700", value: "700" },
  { label: "Black — 900", value: "900" },
];
const RADIUS_OPTIONS = [
  { label: "None", value: "0" },
  { label: "XS — 2px", value: "0.125rem" },
  { label: "Small — 4px", value: "0.25rem" },
  { label: "Medium — 8px", value: "0.5rem" },
  { label: "Large — 12px", value: "0.75rem" },
  { label: "XL — 16px", value: "1rem" },
  { label: "2XL — 24px", value: "1.5rem" },
  { label: "Full pill", value: "9999px" },
];
const SHADOW_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Subtle", value: "0 1px 3px rgba(0,0,0,0.12)" },
  { label: "Medium", value: "0 4px 12px rgba(0,0,0,0.15)" },
  { label: "Strong", value: "0 8px 24px rgba(0,0,0,0.2)" },
  { label: "Spread", value: "0 0 0 4px rgba(0,0,0,0.08)" },
];
const PADDING_OPTIONS = [
  { label: "XS", value: "0.25rem 0.75rem" },
  { label: "Small", value: "0.375rem 1rem" },
  { label: "Medium", value: "0.5rem 1.25rem" },
  { label: "Large", value: "0.625rem 1.5rem" },
  { label: "XL", value: "0.75rem 2rem" },
];
const LETTER_SPACING = [
  { label: "Normal", value: "normal" },
  { label: "Tight — -0.5px", value: "-0.03em" },
  { label: "Wide — 0.5px", value: "0.03em" },
  { label: "Wider — 1px", value: "0.06em" },
  { label: "Widest — 2px", value: "0.12em" },
];
const BORDER_WIDTHS = ["0", "1px", "2px", "3px", "4px"];
const BORDER_STYLES = ["solid", "dashed", "dotted", "double"];

type Format = "react" | "html" | "angular";

// ─── Style helpers ─────────────────────────────────────────────────────────────

function solidBtnStyle(c: ComponentCustomization): React.CSSProperties {
  return {
    backgroundColor: c.primaryColor,
    color: c.textColor,
    borderRadius: c.borderRadius,
    fontSize: c.fontSize,
    fontWeight: Number(c.fontWeight) || c.fontWeight,
    letterSpacing: c.letterSpacing,
    padding: c.padding,
    boxShadow: c.shadow !== "none" ? c.shadow : undefined,
    border: `${c.borderWidth} ${c.borderStyle} ${c.primaryColor}`,
    transition: "all 0.2s",
    cursor: "pointer",
  };
}

function outlineBtnStyle(c: ComponentCustomization): React.CSSProperties {
  return {
    backgroundColor: "transparent",
    color: c.primaryColor,
    border: `${c.borderWidth || "2px"} ${c.borderStyle} ${c.primaryColor}`,
    borderRadius: c.borderRadius,
    fontSize: c.fontSize,
    fontWeight: Number(c.fontWeight) || c.fontWeight,
    letterSpacing: c.letterSpacing,
    padding: c.padding,
    transition: "all 0.2s",
    cursor: "pointer",
  };
}

function ghostBtnStyle(c: ComponentCustomization): React.CSSProperties {
  return {
    backgroundColor: "transparent",
    color: c.primaryColor,
    border: "none",
    borderRadius: c.borderRadius,
    fontSize: c.fontSize,
    fontWeight: Number(c.fontWeight) || c.fontWeight,
    letterSpacing: c.letterSpacing,
    padding: c.padding,
    transition: "all 0.2s",
    cursor: "pointer",
  };
}

// ─── Code generator ───────────────────────────────────────────────────────────

function generateCode(
  component: ComponentName,
  c: ComponentCustomization,
  format: Format,
): string {
  const darker = darkenHex(c.primaryColor);
  const styleObj = (entries: [string, string][]) =>
    entries.map(([k, v]) => `    '${k}': '${v}'`).join(",\n");
  const inlineStyle = (entries: [string, string][]) =>
    entries.map(([k, v]) => `${k}: ${v}`).join("; ");

  if (format === "react") {
    switch (component) {
      case "button":
        return `import { Button } from '@rajgupta2509/next-gen-builder';

export default function MyButton() {
  return (
    <>
      {/* Solid */}
      <Button style={{
        backgroundColor: '${c.primaryColor}',
        color: '${c.textColor}',
        borderRadius: '${c.borderRadius}',
        fontSize: '${c.fontSize}',
        fontWeight: ${c.fontWeight},
        letterSpacing: '${c.letterSpacing}',
        padding: '${c.padding}',
        boxShadow: '${c.shadow}',
        border: '${c.borderWidth} ${c.borderStyle} ${c.primaryColor}',
      }}>
        ${c.label}
      </Button>

      {/* Outline */}
      <Button variant="outline" style={{
        backgroundColor: 'transparent',
        color: '${c.primaryColor}',
        border: '2px ${c.borderStyle} ${c.primaryColor}',
        borderRadius: '${c.borderRadius}',
        fontSize: '${c.fontSize}',
        fontWeight: ${c.fontWeight},
        padding: '${c.padding}',
      }}>
        ${c.label}
      </Button>
    </>
  );
}`;
      case "card":
        return `import { Card } from '@rajgupta2509/next-gen-builder';

export default function MyCard() {
  return (
    <Card
      title="${c.label}"
      description="A short description"
      theme={{ primary: '${c.primaryColor}' }}
      style={{
        borderRadius: '${c.borderRadius}',
        boxShadow: '${c.shadow}',
        padding: '${c.padding}',
        border: '${c.borderWidth} ${c.borderStyle} ${c.primaryColor}44',
        fontSize: '${c.fontSize}',
      }}
    >
      <p>Card content here.</p>
    </Card>
  );
}`;
      case "input":
        return `import { Input } from '@rajgupta2509/next-gen-builder';

export default function MyInput() {
  return (
    <Input
      placeholder="${c.label}"
      style={{
        borderRadius: '${c.borderRadius}',
        borderColor: '${c.primaryColor}',
        borderWidth: '${c.borderWidth}',
        borderStyle: '${c.borderStyle}',
        fontSize: '${c.fontSize}',
        padding: '${c.padding}',
        boxShadow: '${c.shadow !== "none" ? c.shadow : "none"}',
      }}
    />
  );
}`;
      case "tabs":
        return `import { Tabs } from '@rajgupta2509/next-gen-builder';

export default function MyTabs() {
  return (
    <Tabs
      tabs={[
        { label: '${c.label} 1', content: <p>Content 1</p> },
        { label: '${c.label} 2', content: <p>Content 2</p> },
      ]}
      theme={{
        activeBg: '${c.primaryColor}',
        border: '${c.primaryColor}',
      }}
    />
  );
}`;
      case "progress":
        return `import { Progress } from '@rajgupta2509/next-gen-builder';

export default function MyProgress() {
  return (
    <div style={{ '--primary': '${c.primaryColor}' }}>
      <Progress value={65} showLabel color="${c.primaryColor}" />
      <Progress value={80} variant="gradient" showLabel color="${c.primaryColor}" />
    </div>
  );
}`;
      case "pagination":
        return `import { Pagination } from '@rajgupta2509/next-gen-builder';
import { useState } from 'react';

export default function MyPagination() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      theme={{
        active: '${c.primaryColor}',
        borderRadius: '${c.borderRadius}',
      }}
    />
  );
}`;
      case "dropdown":
        return `import { Dropdown } from '@rajgupta2509/next-gen-builder';

export default function MyDropdown() {
  return (
    <Dropdown
      label="${c.label}"
      items={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ]}
      theme={{
        border: '${c.primaryColor}',
        hover: '${c.primaryColor}22',
        text: '${c.textColor}',
      }}
    />
  );
}`;
      case "dialog":
        return `import { Button, Dialog } from '@rajgupta2509/next-gen-builder';
import { useState } from 'react';

export default function MyDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        style={{
          backgroundColor: '${c.primaryColor}',
          color: '${c.textColor}',
          borderRadius: '${c.borderRadius}',
          padding: '${c.padding}',
        }}
        onClick={() => setOpen(true)}
      >
        Open ${c.label}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="${c.label}">
        <p>Dialog content here.</p>
      </Dialog>
    </>
  );
}`;
      case "carousel":
        return `import { Carousel } from '@rajgupta2509/next-gen-builder';

export default function MyCarousel() {
  return (
    <Carousel
      slides={[<div>Slide 1</div>, <div>Slide 2</div>, <div>Slide 3</div>]}
      theme={{ indicator: '${c.primaryColor}' }}
      autoPlay
    />
  );
}`;
      case "navbar":
        return `// Wrap Navbar with a CSS variable override to apply your brand color:
import {Navbar} from '@rajgupta2509/next-gen-builder';

export default function MyNavbar() {
  return (
    <div style={{ '--primary': '${c.primaryColor}' }}>
      <Navbar />
    </div>
  );
}`;
    }
  }

  if (format === "html") {
    switch (component) {
      case "button":
        return `<!-- Solid button -->
<button style="${inlineStyle([
          ["background-color", c.primaryColor],
          ["color", c.textColor],
          ["border-radius", c.borderRadius],
          ["font-size", c.fontSize],
          ["font-weight", c.fontWeight],
          ["letter-spacing", c.letterSpacing],
          ["padding", c.padding],
          ["box-shadow", c.shadow],
          ["border", `${c.borderWidth} ${c.borderStyle} ${c.primaryColor}`],
          ["cursor", "pointer"],
          ["transition", "opacity 0.2s"],
        ])}">
  ${c.label}
</button>

<!-- Outline button -->
<button style="${inlineStyle([
          ["background-color", "transparent"],
          ["color", c.primaryColor],
          ["border", `2px ${c.borderStyle} ${c.primaryColor}`],
          ["border-radius", c.borderRadius],
          ["font-size", c.fontSize],
          ["font-weight", c.fontWeight],
          ["padding", c.padding],
          ["cursor", "pointer"],
        ])}">
  ${c.label}
</button>`;
      case "card":
        return `<div style="${inlineStyle([
          ["background-color", "#ffffff"],
          ["border", `${c.borderWidth} ${c.borderStyle} ${c.primaryColor}44`],
          ["border-radius", c.borderRadius],
          ["padding", c.padding],
          ["box-shadow", c.shadow],
          ["font-size", c.fontSize],
        ])}">
  <h3 style="font-weight: 700; margin-bottom: 0.5rem;">${c.label}</h3>
  <p style="color: #6b7280; font-size: 0.875rem;">A short description</p>
  <div style="margin-top: 1rem;">Card content here.</div>
</div>`;
      case "input":
        return `<input
  type="text"
  placeholder="${c.label}"
  style="${inlineStyle([
    ["border", `${c.borderWidth} ${c.borderStyle} ${c.primaryColor}`],
    ["border-radius", c.borderRadius],
    ["padding", c.padding],
    ["font-size", c.fontSize],
    ["letter-spacing", c.letterSpacing],
    ["box-shadow", c.shadow],
    ["outline", "none"],
    ["width", "100%"],
    ["box-sizing", "border-box"],
  ])}"
/>`;
      default:
        return `<style>
  :root {
    --primary: ${c.primaryColor};
    --primary-600: ${darker};
    --radius: ${c.borderRadius};
    --shadow: ${c.shadow};
  }
</style>
<!-- Include the ${COMP_LABEL[component]} component and it will pick up these variables -->`;
    }
  }

  // Angular
  switch (component) {
    case "button":
      return `<!-- my-button.component.html -->
<button
  [ngStyle]="{
    'background-color': primaryColor,
    'color': textColor,
    'border-radius': borderRadius,
    'font-size': fontSize,
    'font-weight': fontWeight,
    'letter-spacing': letterSpacing,
    'padding': padding,
    'box-shadow': shadow,
    'border': borderWidth + ' ' + borderStyle + ' ' + primaryColor,
    'cursor': 'pointer'
  }"
>
  {{ label }}
</button>

// my-button.component.ts
export class MyButtonComponent {
  primaryColor = '${c.primaryColor}';
  textColor = '${c.textColor}';
  borderRadius = '${c.borderRadius}';
  fontSize = '${c.fontSize}';
  fontWeight = '${c.fontWeight}';
  letterSpacing = '${c.letterSpacing}';
  padding = '${c.padding}';
  shadow = '${c.shadow}';
  borderWidth = '${c.borderWidth}';
  borderStyle = '${c.borderStyle}';
  label = '${c.label}';
}`;
    case "card":
      return `<!-- my-card.component.html -->
<div
  [ngStyle]="{
    'background-color': '#ffffff',
    'border': borderWidth + ' ' + borderStyle + ' ' + primaryColor + '44',
    'border-radius': borderRadius,
    'padding': padding,
    'box-shadow': shadow,
    'font-size': fontSize
  }"
>
  <h3 style="font-weight: 700; margin-bottom: 0.5rem;">{{ title }}</h3>
  <ng-content></ng-content>
</div>

// my-card.component.ts
export class MyCardComponent {
  primaryColor = '${c.primaryColor}';
  borderRadius = '${c.borderRadius}';
  padding = '${c.padding}';
  shadow = '${c.shadow}';
  fontSize = '${c.fontSize}';
  borderWidth = '${c.borderWidth}';
  borderStyle = '${c.borderStyle}';
  title = '${c.label}';
}`;
    case "input":
      return `<!-- my-input.component.html -->
<input
  type="text"
  [placeholder]="placeholder"
  [ngStyle]="{
    'border': borderWidth + ' ' + borderStyle + ' ' + borderColor,
    'border-radius': borderRadius,
    'padding': padding,
    'font-size': fontSize,
    'letter-spacing': letterSpacing,
    'box-shadow': shadow
  }"
/>

// my-input.component.ts
export class MyInputComponent {
  borderColor = '${c.primaryColor}';
  borderRadius = '${c.borderRadius}';
  borderWidth = '${c.borderWidth}';
  borderStyle = '${c.borderStyle}';
  padding = '${c.padding}';
  fontSize = '${c.fontSize}';
  letterSpacing = '${c.letterSpacing}';
  shadow = '${c.shadow}';
  placeholder = '${c.label}';
}`;
    default:
      return `// ${COMP_LABEL[component]} — Angular
// Apply color via host CSS custom property:
import { Component } from '@angular/core';

@Component({
  selector: 'app-${component}',
  template: \`<ng-content></ng-content>\`,
  styles: [\`
    :host {
      --primary: ${c.primaryColor};
      --radius: ${c.borderRadius};
      --shadow: ${c.shadow};
    }
  \`]
})
export class My${COMP_LABEL[component]}Component {}`;
  }
}

// ─── Live preview ─────────────────────────────────────────────────────────────

function LivePreview({
  component,
  c,
}: {
  component: ComponentName;
  c: ComponentCustomization;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const varStyle = buildVarStyle(c.primaryColor);

  const wrap = (children: React.ReactNode) => (
    <div
      style={varStyle}
      className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 min-h-[140px] flex items-center justify-center"
    >
      {children}
    </div>
  );

  switch (component) {
    case "button":
      return wrap(
        <div className="flex flex-wrap gap-3">
          <Button style={solidBtnStyle(c)}>{c.label}</Button>
          <Button variant="outline" style={outlineBtnStyle(c)}>
            {c.label}
          </Button>
          <Button variant="ghost" style={ghostBtnStyle(c)}>
            {c.label}
          </Button>
        </div>,
      );

    case "card":
      return wrap(
        <Card
          title={c.label}
          description="A short description"
          theme={{ primary: c.primaryColor }}
          style={{
            borderRadius: c.borderRadius,
            boxShadow: c.shadow !== "none" ? c.shadow : undefined,
            border: `${c.borderWidth} ${c.borderStyle} ${c.primaryColor}44`,
            fontSize: c.fontSize,
          }}
          className="w-full max-w-sm"
        >
          <p className="text-sm">Card content here.</p>
        </Card>,
      );

    case "navbar":
      return (
        <div
          style={varStyle}
          className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          <LibNavbar />
        </div>
      );

    case "dialog":
      return wrap(
        <>
          <Button
            style={{
              backgroundColor: c.primaryColor,
              color: c.textColor,
              borderRadius: c.borderRadius,
              padding: c.padding,
              fontSize: c.fontSize,
              fontWeight: Number(c.fontWeight) || c.fontWeight,
              boxShadow: c.shadow !== "none" ? c.shadow : undefined,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setDialogOpen(true)}
          >
            Open {c.label}
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={c.label}
          >
            <p>
              This is a customizable dialog. Your accent color is applied to the
              trigger button and dialog elements.
            </p>
          </Dialog>
        </>,
      );

    case "carousel":
      return (
        <div style={varStyle} className="rounded-xl overflow-hidden w-full">
          <Carousel
            slides={[
              <div
                key="1"
                className="h-36 flex items-center justify-center text-white font-bold rounded-lg"
                style={{
                  background: c.primaryColor,
                  fontSize: c.fontSize,
                  letterSpacing: c.letterSpacing,
                }}
              >
                Slide 1
              </div>,
              <div
                key="2"
                className="h-36 flex items-center justify-center text-white font-bold rounded-lg"
                style={{
                  background: darkenHex(c.primaryColor, 0.1),
                  fontSize: c.fontSize,
                }}
              >
                Slide 2
              </div>,
              <div
                key="3"
                className="h-36 flex items-center justify-center text-white font-bold rounded-lg"
                style={{
                  background: darkenHex(c.primaryColor, 0.2),
                  fontSize: c.fontSize,
                }}
              >
                Slide 3
              </div>,
            ]}
            theme={{ background: "#f3f4f6", indicator: c.primaryColor }}
          />
        </div>
      );

    case "dropdown":
      return wrap(
        <div style={{ minWidth: 220 }}>
          <Dropdown
            label={c.label}
            items={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            theme={{
              background: "#ffffff",
              text: c.textColor,
              border: c.primaryColor,
              hover: `${c.primaryColor}22`,
            }}
          />
        </div>,
      );

    case "tabs":
      return wrap(
        <div className="w-full">
          <Tabs
            tabs={[
              {
                label: `${c.label} 1`,
                content: (
                  <p className="text-sm mt-2 p-2">Content for {c.label} 1</p>
                ),
              },
              {
                label: `${c.label} 2`,
                content: (
                  <p className="text-sm mt-2 p-2">Content for {c.label} 2</p>
                ),
              },
              {
                label: `${c.label} 3`,
                content: (
                  <p className="text-sm mt-2 p-2">Content for {c.label} 3</p>
                ),
              },
            ]}
            theme={{
              activeBg: c.primaryColor,
              inactiveBg: "#f3f4f6",
              text: "#111111",
              border: c.primaryColor,
            }}
          />
        </div>,
      );

    case "progress":
      return wrap(
        <div className="w-full space-y-4">
          <Progress value={65} showLabel color={c.primaryColor} />
          <Progress
            value={80}
            variant="gradient"
            showLabel
            color={c.primaryColor}
          />
          <Progress
            value={45}
            variant="striped"
            animated
            showLabel
            color={c.primaryColor}
          />
        </div>,
      );

    case "pagination":
      return wrap(
        <Pagination
          currentPage={page}
          totalPages={8}
          onPageChange={setPage}
          theme={{ active: c.primaryColor, borderRadius: c.borderRadius }}
        />,
      );

    case "input":
      return wrap(
        <div className="w-full max-w-xs space-y-3">
          <Input
            placeholder={c.label}
            style={{
              borderRadius: c.borderRadius,
              borderColor: c.primaryColor,
              borderWidth: c.borderWidth,
              borderStyle: c.borderStyle,
              fontSize: c.fontSize,
              padding: c.padding,
              boxShadow: c.shadow !== "none" ? c.shadow : undefined,
            }}
          />
        </div>,
      );
  }
}

// ─── Controls per component ───────────────────────────────────────────────────

function ControlField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const sel =
  "w-full px-2 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <ControlField label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-9 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700"
        />
        <input
          type="text"
          value={value}
          onChange={(e) =>
            /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) &&
            onChange(e.target.value)
          }
          className="w-28 px-2 py-2 text-xs font-mono rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
    </ControlField>
  );
}

function Controls({
  component,
  c,
  set,
}: {
  component: ComponentName;
  c: ComponentCustomization;
  set: (v: Partial<ComponentCustomization>) => void;
}) {
  // Shared controls visible for all
  const colorControls = (
    <>
      <ColorField
        label="Primary Color"
        value={c.primaryColor}
        onChange={(v) => set({ primaryColor: v })}
      />
      <ColorField
        label="Text Color"
        value={c.textColor}
        onChange={(v) => set({ textColor: v })}
      />
    </>
  );

  const radiusControl = (
    <ControlField label="Border Radius">
      <select
        value={c.borderRadius}
        onChange={(e) => set({ borderRadius: e.target.value })}
        className={sel}
      >
        {RADIUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </ControlField>
  );

  const shadowControl = (
    <ControlField label="Shadow">
      <select
        value={c.shadow}
        onChange={(e) => set({ shadow: e.target.value })}
        className={sel}
      >
        {SHADOW_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </ControlField>
  );

  const typographyControls = (
    <>
      <ControlField label="Font Size">
        <select
          value={c.fontSize}
          onChange={(e) => set({ fontSize: e.target.value })}
          className={sel}
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </ControlField>
      <ControlField label="Font Weight">
        <select
          value={c.fontWeight}
          onChange={(e) => set({ fontWeight: e.target.value })}
          className={sel}
        >
          {FONT_WEIGHTS.map((w) => (
            <option key={w.value} value={w.value}>
              {w.label}
            </option>
          ))}
        </select>
      </ControlField>
      <ControlField label="Letter Spacing">
        <select
          value={c.letterSpacing}
          onChange={(e) => set({ letterSpacing: e.target.value })}
          className={sel}
        >
          {LETTER_SPACING.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </ControlField>
    </>
  );

  const paddingControl = (
    <ControlField label="Padding">
      <select
        value={c.padding}
        onChange={(e) => set({ padding: e.target.value })}
        className={sel}
      >
        {PADDING_OPTIONS.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </ControlField>
  );

  const borderControls = (
    <>
      <ControlField label="Border Width">
        <select
          value={c.borderWidth}
          onChange={(e) => set({ borderWidth: e.target.value })}
          className={sel}
        >
          {BORDER_WIDTHS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </ControlField>
      <ControlField label="Border Style">
        <select
          value={c.borderStyle}
          onChange={(e) => set({ borderStyle: e.target.value })}
          className={sel}
        >
          {BORDER_STYLES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </ControlField>
    </>
  );

  const labelControl = (lbl: string) => (
    <ControlField label={lbl}>
      <input
        type="text"
        value={c.label}
        onChange={(e) => set({ label: e.target.value })}
        className={sel}
      />
    </ControlField>
  );

  switch (component) {
    case "button":
      return (
        <>
          {colorControls}
          {radiusControl}
          {typographyControls}
          {paddingControl}
          {shadowControl}
          {borderControls}
          {labelControl("Button Label")}
        </>
      );
    case "card":
      return (
        <>
          {colorControls}
          {radiusControl}
          {shadowControl}
          {paddingControl}
          {borderControls}
          {labelControl("Card Title")}
        </>
      );
    case "input":
      return (
        <>
          {colorControls}
          {radiusControl}
          {typographyControls}
          {paddingControl}
          {shadowControl}
          {borderControls}
          {labelControl("Placeholder")}
        </>
      );
    case "dialog":
      return (
        <>
          {colorControls}
          {radiusControl}
          {shadowControl}
          {paddingControl}
          {labelControl("Dialog Title")}
        </>
      );
    case "tabs":
      return (
        <>
          {colorControls}
          {radiusControl}
          {typographyControls}
          {labelControl("Tab Label")}
        </>
      );
    case "progress":
      return (
        <>
          {colorControls}
          {radiusControl}
        </>
      );
    case "pagination":
      return (
        <>
          {colorControls}
          {radiusControl}
          {typographyControls}
        </>
      );
    case "carousel":
      return (
        <>
          {colorControls}
          {typographyControls}
        </>
      );
    case "dropdown":
      return (
        <>
          {colorControls}
          {radiusControl}
          {typographyControls}
          {shadowControl}
          {labelControl("Dropdown Label")}
        </>
      );
    case "navbar":
      return (
        <>
          {colorControls}
          {shadowControl}
        </>
      );
  }
}

// ─── Main panel ───────────────────────────────────────────────────────────────

export default function ComponentPersonalizationPanel() {
  const { getCustomization, setCustomization, resetCustomization } =
    useComponentCustom();
  const [selected, setSelected] = useState<ComponentName>("button");
  const [copyFormat, setCopyFormat] = useState<Format>("react");
  const [copied, setCopied] = useState(false);

  const c = getCustomization(selected);
  const code = generateCode(selected, c, copyFormat);

  const set = (v: Partial<ComponentCustomization>) =>
    setCustomization(selected, v);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Component selector */}
      <div>
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Select a Component
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {ALL_COMPONENTS.map((comp) => {
            const cc = getCustomization(comp);
            const active = comp === selected;
            return (
              <button
                key={comp}
                onClick={() => setSelected(comp)}
                className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border transition-all text-xs font-medium ${
                  active
                    ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full shadow-sm shrink-0 border border-white/30 dark:border-black/20"
                  style={{ background: cc.primaryColor }}
                />
                <span className="leading-tight text-center text-[10px]">
                  {COMP_LABEL[comp]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 pb-2 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              Customize {COMP_LABEL[selected]}
            </h3>
            <button
              onClick={() => resetCustomization(selected)}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Reset
            </button>
          </div>
          <Controls component={selected} c={c} set={set} />
        </div>

        {/* Live preview */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Live Preview
          </p>
          <LivePreview key={`${selected}-preview`} component={selected} c={c} />
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Changes reflect here and on the Components page in real time.
          </p>
        </div>
      </div>

      {/* Copy Code */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 h-16">
          <div className="flex items-center gap-6">
            {(["react", "html", "angular"] as Format[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setCopyFormat(fmt)}
                className={`text-xs font-bold uppercase tracking-widest relative h-full transition-colors ${
                  copyFormat === fmt
                    ? "text-indigo-600"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                {fmt === "react"
                  ? "React"
                  : fmt === "html"
                    ? "HTML"
                    : "Angular"}
                {copyFormat === fmt && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 bg-gray-50/30 dark:bg-gray-900/30">
          <CodeBlock
            code={code}
            language={copyFormat}
            className="border-none shadow-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
