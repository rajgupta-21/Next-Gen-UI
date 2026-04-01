import {
  ComponentCustomization,
  ComponentName,
  darkenHex,
} from "@/contexts/ComponentCustomContext";

export type Format = "react" | "html" | "angular";

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

export function generateCode(
  component: ComponentName,
  c: ComponentCustomization,
  format: Format,
): string {
  const darker = darkenHex(c.primaryColor);
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
        return `import { Card } from '@rajgupta2509/next-gen-builder;

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
        return `import { Tabs } from '@rajgupta2509/next-gen-builder';\n\nexport default function MyTabs() {\n  return (\n    <Tabs\n      items={[\n        { id: '1', label: '${c.label} 1', content: <p>Content 1</p> },\n        { id: '2', label: '${c.label} 2', content: <p>Content 2</p> },\n      ]}\n      theme={{\n        primary: '${c.primaryColor}',\n        primary600: '${darker}',\n      }}\n    />\n  );\n}`;
      case "progress":
        return `import { Progress } from '@rajgupta2509/next-gen-builder';\n\nexport default function MyProgress() {\n  return (\n    <div className="space-y-4">\n      <Progress value={65} showLabel theme={{ primary: '${c.primaryColor}' }} />\n      <Progress value={80} variant="gradient" showLabel theme={{ primary: '${c.primaryColor}', primary600: '${darker}' }} />\n    </div>\n  );\n}`;
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
        return `import { Navbar } from '@rajgupta2509/next-gen-builder';\n\nexport default function MyNavbar() {\n  return (\n    <Navbar \n      theme={{\n        primary: '${c.primaryColor}',\n        primary600: '${darker}',\n      }}\n    />\n  );\n}`;
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
