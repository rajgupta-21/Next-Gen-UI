"use client";
import CodeBlock from "@/components/CodeBlock";
import {
  PreviewAvatar,
  PreviewBadge,
  PreviewButton,
  PreviewCard,
  PreviewContainer,
  PreviewCTA,
  PreviewDivider,
  PreviewFeatureBox,
  PreviewFlexRow,
  PreviewFooter,
  PreviewGrid,
  PreviewHeading,
  PreviewHero,
  PreviewImage,
  PreviewInput,
  PreviewNavbar,
  PreviewQuote,
  PreviewSecondaryButton,
  PreviewSection,
  PreviewSpacer,
  PreviewStats,
  PreviewTestimonial,
  PreviewText,
} from "@/components/PreviewComp";
import {
  Box,
  Check,
  ChevronRight,
  Component as CompIcon,
  Copy,
  Edit2,
  Layout,
  Maximize2,
  RefreshCcw,
  Settings,
  Trash2
} from "lucide-react";
import { useState } from "react";

const CORE_LIBRARY_CSS = `
/* Base Reset and Utility Classes for NewGen UI Preview Components */
.btn-primary { background: #007AFF; color: #FFFFFF; padding: 0.5rem 1rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: transform 0.1s; }
.btn-primary:active { transform: scale(0.98); }
.btn-secondary { background: transparent; border: 2px solid #007AFF; color: #007AFF; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600; transition: transform 0.1s; }
.btn-secondary:active { transform: scale(0.98); }
.input-group { margin-bottom: 1rem; font-family: sans-serif; }
.input-label { display: block; margin-bottom: 0.25rem; font-weight: 600; color: #374151; }
.input-field { width: 100%; padding: 0.5rem; border: 1px solid #E5E7EB; border-radius: 0.5rem; outline: none; font-size: 14px; }
.heading-primary { font-weight: 800; margin-bottom: 1rem; font-family: sans-serif; }
.text-body { line-height: 1.5; color: #374151; font-family: sans-serif; }
.navbar { display: flex; align-items: center; justify-content: space-between; padding: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-family: sans-serif; }
.navbar-brand { font-weight: 800; font-size: 1.25rem; }
.navbar-links { display: flex; gap: 1rem; }
.navbar-link { text-decoration: none; transition: opacity 0.2s; font-weight: 500; }
.navbar-link:hover { opacity: 0.8; }
.hero { padding: 5rem 2.5rem; text-align: center; color: white; font-family: sans-serif; }
.hero-title { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; }
.hero-subtitle { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
.hero-actions { display: flex; justify-content: center; gap: 1rem; }
.container { max-width: 1200px; margin: 0 auto; width: 100%; font-family: sans-serif; }
.card { border-radius: 0.75rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); padding: 1.5rem; font-family: sans-serif; }
.card-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; border-bottom: 1px solid #E5E7EB; padding-bottom: 0.5rem; }
.grid { display: grid; }
.flex-row { display: flex; align-items: center; }
.footer { padding: 2rem; text-align: center; font-family: sans-serif; }
.section { padding: 3rem 2rem; font-family: sans-serif; }
.testimonial { padding: 1.5rem; border-left: 4px solid #007AFF; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 0 0.5rem 0.5rem 0; font-family: sans-serif; }
.testimonial-name { font-weight: 700; margin-top: 1rem; }
.testimonial-title { font-size: 0.875rem; opacity: 0.7; }
.feature-box { padding: 1.5rem; border: 1px solid #F3F4F6; border-radius: 0.75rem; text-align: center; font-family: sans-serif; transition: box-shadow 0.2s; }
.feature-box:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.cta { text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); font-family: sans-serif; }
.cta-title { font-weight: 700; margin-bottom: 0.5rem; }
.cta-subtitle { margin-bottom: 1.5rem; }
.stats { text-align: center; border-radius: 0.5rem; font-family: sans-serif; }
.stats-value { font-weight: 900; margin-bottom: 0.25rem; }
.stats-label { font-size: 0.875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.img-responsive { max-width: 100%; height: auto; display: block; }
.avatar { border: 2px solid white; border-radius: 50%; object-fit: cover; }
.badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
.quote { padding: 1.5rem; border-left: 4px solid #007AFF; font-style: italic; border-radius: 0 0.5rem 0.5rem 0; background: #F9FAFB; font-family: sans-serif; }
.quote-author { font-weight: 700; font-style: normal; display: block; margin-top: 0.5rem; font-size: 0.875rem; }
`;

// Types
interface ComponentProps {
  [key: string]: any;
}

interface ComponentData {
  id: string;
  type: string;
  props: ComponentProps;
  children: ComponentData[];
  isContainer?: boolean;
}

interface Template {
  name: string;
  desc: string;
  category: string;
  component: React.FC<any>;
  defaultProps: ComponentProps;
  editableFields: Field[];
  css: string;
  isContainer?: boolean;
}

interface Field {
  name: string;
  label: string;
  type: "text" | "color" | "textarea" | "select" | "number" | "checkbox";
  options?: string[]; // for select
}

interface NavLink {
  id: string;
  label: string;
  href: string;
}

const ReactWebsiteBuilder = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState<"properties" | "history">("properties");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [history, setHistory] = useState<{id: string, action: string, time: string, type: string}[]>([]);

  const addToHistory = (action: string, type: string) => {
    const newItem = {
      id: generateId(),
      action,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setHistory(prev => [newItem, ...prev].slice(0, 20));
  };
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProps, setEditProps] = useState<ComponentProps>({});
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<
    "top" | "bottom" | "inside" | null
  >(null);
  const [showNavLinkForm, setShowNavLinkForm] = useState(false);
  const [newNavLink, setNewNavLink] = useState({ label: "", href: "" });
  const [selectedLang, setSelectedLang] = useState<"react" | "html" | "angularjs">("react");

  // --- Preview Components ---

  // --- Templates ---

  const componentTemplates: Record<string, Template> = {
    button: {
      name: "Button",
      desc: "Interactive button",
      category: "basic",
      component: PreviewButton,
      defaultProps: {
        text: "Click Me",
        bgColor: "#007AFF",
        textColor: "#FFFFFF",
      },
      editableFields: [
        { name: "text", label: "Button Text", type: "text" },
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "textColor", label: "Text Color", type: "color" },
      ],
      css: `.btn-primary { 
  border: none; 
  padding: 10px 20px; 
  border-radius: 6px; 
  cursor: pointer; 
  font-weight: 500; 
  transition: transform 0.1s;
}
.btn-primary:active { transform: scale(0.98); }`,
    },
    secondaryButton: {
      name: "Secondary Button",
      desc: "Outlined button",
      category: "basic",
      component: PreviewSecondaryButton,
      defaultProps: {
        text: "Learn More",
        borderColor: "#007AFF",
        textColor: "#007AFF",
      },
      editableFields: [
        { name: "text", label: "Button Text", type: "text" },
        { name: "borderColor", label: "Border Color", type: "color" },
        { name: "textColor", label: "Text Color", type: "color" },
      ],
      css: `.btn-secondary {
  background: transparent;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-secondary:hover { background: rgba(0, 122, 255, 0.1); }`,
    },
    input: {
      name: "Input",
      desc: "Text input field",
      category: "basic",
      component: PreviewInput,
      defaultProps: { label: "Label", placeholder: "Type here..." },
      editableFields: [
        { name: "label", label: "Label Text", type: "text" },
        { name: "placeholder", label: "Placeholder Text", type: "text" },
      ],
      css: `.input-group { margin-bottom: 1rem; }
.input-label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;}
.input-field { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }`,
    },
    heading: {
      name: "Heading",
      desc: "Large title text",
      category: "basic",
      component: PreviewHeading,
      defaultProps: { text: "Heading", color: "#000000", fontSize: "32px" },
      editableFields: [
        { name: "text", label: "Heading Text", type: "text" },
        { name: "color", label: "Text Color", type: "color" },
        { name: "fontSize", label: "Font Size", type: "text" },
      ],
      css: `.heading-primary { margin: 0 0 1rem 0; font-weight: 700; line-height: 1.2; }`,
    },
    text: {
      name: "Text",
      desc: "Paragraph text",
      category: "basic",
      component: PreviewText,
      defaultProps: {
        text: "Start writing...",
        color: "#333333",
        fontSize: "16px",
      },
      editableFields: [
        { name: "text", label: "Text Content", type: "textarea" },
        { name: "color", label: "Text Color", type: "color" },
        { name: "fontSize", label: "Font Size", type: "text" },
      ],
      css: `.text-body { line-height: 1.6; margin-bottom: 1rem; }`,
    },
    image: {
      name: "Image",
      desc: "Basic image",
      category: "basic",
      component: PreviewImage,
      defaultProps: {
        src: "https://via.placeholder.com/600x400",
        alt: "Demo Image",
        width: "100%",
        height: "auto",
        borderRadius: "4px",
      },
      editableFields: [
        { name: "src", label: "Image URL", type: "text" },
        { name: "alt", label: "Alt Text", type: "text" },
        { name: "width", label: "Width", type: "text" },
        { name: "height", label: "Height", type: "text" },
        { name: "borderRadius", label: "Border Radius", type: "text" },
      ],
      css: `.img-responsive { max-width: 100%; height: auto; border-radius: 4px; display: block; }`,
    },
    avatar: {
      name: "Avatar",
      desc: "Circle profile image",
      category: "basic",
      component: PreviewAvatar,
      defaultProps: { src: "https://via.placeholder.com/100", size: "48px" },
      editableFields: [
        { name: "src", label: "Image URL", type: "text" },
        { name: "size", label: "Size (px)", type: "text" },
      ],
      css: `.avatar { border-radius: 50%; object-fit: cover; }`,
    },
    badge: {
      name: "Badge",
      desc: "Small status label",
      category: "basic",
      component: PreviewBadge,
      defaultProps: { text: "New", color: "#007AFF", textColor: "#FFFFFF" },
      editableFields: [
        { name: "text", label: "Badge Text", type: "text" },
        { name: "color", label: "Background Color", type: "color" },
        { name: "textColor", label: "Text Color", type: "color" },
      ],
      css: `.badge { 
  display: inline-block; 
  padding: 4px 8px; 
  border-radius: 999px; 
  font-size: 0.75rem; 
  font-weight: 700; 
  text-transform: uppercase; 
}`,
    },
    divider: {
      name: "Divider",
      desc: "Horizontal line",
      category: "layout",
      component: PreviewDivider,
      defaultProps: { color: "#E5E5EA", thickness: "1px", margin: "24px" },
      editableFields: [
        { name: "color", label: "Line Color", type: "color" },
        { name: "thickness", label: "Thickness", type: "text" },
        { name: "margin", label: "Vertical Margin", type: "text" },
      ],
      css: ``,
    },
    spacer: {
      name: "Spacer",
      desc: "Vertical space",
      category: "layout",
      component: PreviewSpacer,
      defaultProps: { height: "32px" },
      editableFields: [{ name: "height", label: "Height", type: "text" }],
      css: ``,
    },
    quote: {
      name: "Quote",
      desc: "Testimonial block",
      category: "components",
      component: PreviewQuote,
      defaultProps: {
        text: "Great design is transparent.",
        author: "Joe Sparano",
        textColor: "#555555",
        borderColor: "#007AFF",
      },
      editableFields: [
        { name: "text", label: "Quote Text", type: "textarea" },
        { name: "author", label: "Author Name", type: "text" },
        { name: "textColor", label: "Text Color", type: "color" },
        { name: "borderColor", label: "Border Color", type: "color" },
      ],
      css: `.quote { 
  border-left: 4px solid #007AFF; 
  padding-left: 1rem; 
  font-style: italic; 
  margin: 1.5rem 0; 
  color: #555;
}
.quote p { font-size: 1.1rem; margin-bottom: 0.5rem; }
.quote-author { font-size: 0.9rem; color: #888; font-weight: 600; }`,
    },
    navbar: {
      name: "Navbar",
      desc: "Top navigation bar with links",
      category: "layout",
      component: PreviewNavbar,
      isContainer: true,
      defaultProps: {
        brand: "MySite",
        bgColor: "#FFFFFF",
        textColor: "#000000",
        navLinks: [],
      },
      editableFields: [
        { name: "brand", label: "Brand Name", type: "text" },
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "textColor", label: "Text Color", type: "color" },
      ],
      css: `.navbar { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 1rem 2rem; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
  color: black;
}
.navbar-brand { font-size: 1.25rem; font-weight: 700; }
.navbar-links { display: flex; gap: 1.5rem; align-items: center; }
.navbar-link { text-decoration: none; font-weight: 500; transition: opacity 0.2s; cursor: pointer; }
.navbar-link:hover { opacity: 0.7; }
.placeholder-text { font-size: 0.8rem; color: #999; border: 1px dashed #ccc; padding: 4px 8px; border-radius: 4px;}`,
    },
    hero: {
      name: "Hero",
      desc: "Hero section with actions",
      category: "layout",
      component: PreviewHero,
      isContainer: true,
      defaultProps: {
        title: "Welcome",
        subtitle: "Build something great",
        gradientStart: "#667eea",
        gradientEnd: "#764ba2",
      },
      editableFields: [
        { name: "title", label: "Hero Title", type: "text" },
        { name: "subtitle", label: "Subtitle", type: "text" },
        { name: "gradientStart", label: "Gradient Start Color", type: "color" },
        { name: "gradientEnd", label: "Gradient End Color", type: "color" },
      ],
      css: `.hero { 
  padding: 4rem 2rem; 
  color: white; 
  text-align: center;
}
.hero-title { font-size: 3rem; margin-bottom: 1rem; font-weight: 800; }
.hero-subtitle { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem; }
.hero-actions { display: flex; justify-content: center; gap: 1rem; min-height: 40px;}
.drop-hint { border: 1px dashed rgba(255,255,255,0.4); padding: 5px 10px; border-radius:4px; font-size: 0.8rem;}`,
    },
    container: {
      name: "Container",
      desc: "Section wrapper",
      category: "layout",
      component: PreviewContainer,
      isContainer: true,
      defaultProps: { padding: "32px", bgColor: "transparent" },
      editableFields: [
        { name: "padding", label: "Padding", type: "text" },
        { name: "bgColor", label: "Background Color", type: "color" },
      ],
      css: `.container { width: 100%; max-width: 1200px; margin: 0 auto; min-height: 50px; }
.empty-container-p { border: 2px dashed #E5E5EA; border-radius: 8px; padding: 20px; text-align: center; color: #999; }`,
    },
    card: {
      name: "Card",
      desc: "Card wrapper",
      category: "components",
      component: PreviewCard,
      isContainer: true,
      defaultProps: {
        title: "Feature Card",
        showTitle: true,
        bgColor: "#FFFFFF",
      },
      editableFields: [
        { name: "title", label: "Card Title", type: "text" },
        { name: "bgColor", label: "Background Color", type: "color" },
      ],
      css: `.card { background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); padding: 1.5rem; min-height: 100px; color:black; }
.card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; }
.card-body { min-height: 40px; }`,
    },
    grid: {
      name: "Grid",
      desc: "Multi-column layout",
      category: "layout",
      component: PreviewGrid,
      isContainer: true,
      defaultProps: { columns: "3", gap: "24px" },
      editableFields: [
        { name: "columns", label: "Number of Columns", type: "number" },
        { name: "gap", label: "Gap Between Items", type: "text" },
      ],
      css: `.grid { display: grid; width: 100%; }
.grid-placeholder { background: #f0f0f0; padding: 20px; text-align: center; color: #888; border-radius: 8px; }`,
    },
    flexRow: {
      name: "Flex Row",
      desc: "Horizontal layout",
      category: "layout",
      component: PreviewFlexRow,
      isContainer: true,
      defaultProps: { justify: "flex-start", gap: "16px" },
      editableFields: [
        { name: "gap", label: "Gap Between Items", type: "text" },
        {
          name: "justify",
          label: "Justify Content",
          type: "select",
          options: [
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
          ],
        },
      ],
      css: `.flex-row { display: flex; flex-wrap: wrap; width: 100%; min-height: 50px; }`,
    },
    footer: {
      name: "Footer",
      desc: "Footer section",
      category: "layout",
      component: PreviewFooter,
      isContainer: true,
      defaultProps: {
        bgColor: "#1F2937",
        textColor: "#FFFFFF",
        copyright: "© 2024 Your Company",
      },
      editableFields: [
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "textColor", label: "Text Color", type: "color" },
        { name: "copyright", label: "Copyright Text", type: "textarea" },
      ],
      css: `.footer {
  background: inherit;
  color: inherit;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}
.footer-content { max-width: 1200px; margin: 0 auto; }`,
    },
    section: {
      name: "Section",
      desc: "Full-width content section",
      category: "layout",
      component: PreviewSection,
      isContainer: true,
      defaultProps: { bgColor: "#FFFFFF", padding: "3rem 2rem" },
      editableFields: [
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "padding", label: "Padding", type: "text" },
      ],
      css: `.section {
  width: 100%;
  min-height: 200px;
}`,
    },
    testimonial: {
      name: "Testimonial",
      desc: "Customer testimonial card",
      category: "components",
      component: PreviewTestimonial,
      defaultProps: {
        name: "John Doe",
        title: "CEO",
        content: "This product changed everything!",
        bgColor: "#F9FAFB",
        textColor: "#333333",
        borderColor: "#007AFF",
      },
      editableFields: [
        { name: "content", label: "Testimonial Text", type: "textarea" },
        { name: "name", label: "Customer Name", type: "text" },
        { name: "title", label: "Title/Role", type: "text" },
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "textColor", label: "Text Color", type: "color" },
        { name: "borderColor", label: "Border Color", type: "color" },
      ],
      css: `.testimonial {
  background: inherit;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #007AFF;
}
.testimonial-name { font-weight: 600; margin-top: 1rem; }
.testimonial-title { font-size: 0.875rem; color: #666; }`,
    },
    featureBox: {
      name: "Feature Box",
      desc: "Feature highlight with icon",
      category: "components",
      component: PreviewFeatureBox,
      defaultProps: {
        icon: "✨",
        title: "Feature",
        description: "Feature description goes here",
        bgColor: "#F9FAFB",
        titleColor: "#000000",
        descColor: "#666666",
        iconSize: "2rem",
      },
      editableFields: [
        { name: "icon", label: "Icon/Emoji", type: "text" },
        { name: "title", label: "Feature Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "iconSize", label: "Icon Size", type: "text" },
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "titleColor", label: "Title Color", type: "color" },
        { name: "descColor", label: "Description Color", type: "color" },
      ],
      css: `.feature-box {
  padding: 1.5rem;
  border-radius: 8px;
  background: #F9FAFB;
  text-align: center;
}
.feature-icon { font-size: 2rem; margin-bottom: 1rem; }
.feature-title { font-weight: 600; margin-bottom: 0.5rem; }
.feature-description { font-size: 0.875rem; color: #666; }`,
    },
    cta: {
      name: "Call to Action",
      desc: "CTA section with button",
      category: "components",
      component: PreviewCTA,
      isContainer: true,
      defaultProps: {
        title: "Ready to get started?",
        subtitle: "Join thousands of happy users",
        buttonText: "Get Started",
        bgColor: "#007AFF",
        textColor: "#FFFFFF",
        titleSize: "1.875rem",
        subtitleSize: "1rem",
        padding: "3rem",
        borderRadius: "8px",
        buttonBg: "#005ECC",
      },
      editableFields: [
        { name: "title", label: "Heading", type: "text" },
        { name: "subtitle", label: "Subtitle", type: "text" },
        { name: "buttonText", label: "Button Text", type: "text" },
        { name: "titleSize", label: "Title Size", type: "text" },
        { name: "subtitleSize", label: "Subtitle Size", type: "text" },
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "textColor", label: "Text Color", type: "color" },
        { name: "buttonBg", label: "Button Color", type: "color" },
        { name: "padding", label: "Padding", type: "text" },
        { name: "borderRadius", label: "Border Radius", type: "text" },
      ],
      css: `.cta {
  padding: 3rem 2rem;
  text-align: center;
  border-radius: 8px;
  color: inherit;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cta-title { font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem; }
.cta-subtitle { font-size: 1rem; opacity: 0.9; margin-bottom: 1.5rem; }`,
    },
    stats: {
      name: "Stats Display",
      desc: "Show key metrics",
      category: "components",
      component: PreviewStats,
      defaultProps: {
        value: "150K",
        label: "Happy Users",
        valueColor: "#007AFF",
        labelColor: "#666666",
        bgColor: "transparent",
        valueSize: "2.5rem",
        labelSize: "0.875rem",
        padding: "1rem",
        borderRadius: "8px",
      },
      editableFields: [
        { name: "value", label: "Metric Value", type: "text" },
        { name: "label", label: "Label", type: "text" },
        { name: "valueSize", label: "Value Size", type: "text" },
        { name: "labelSize", label: "Label Size", type: "text" },
        { name: "valueColor", label: "Value Color", type: "color" },
        { name: "labelColor", label: "Label Color", type: "color" },
        { name: "bgColor", label: "Background Color", type: "color" },
        { name: "padding", label: "Padding", type: "text" },
        { name: "borderRadius", label: "Border Radius", type: "text" },
      ],
      css: `.stats {
  text-align: center;
  padding: 1rem;
}
.stats-value { font-size: 2.5rem; font-weight: 700; color: #007AFF; }
.stats-label { font-size: 0.875rem; color: #666; margin-top: 0.5rem; }`,
    },
  };

  // --- Logic ---

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.effectAllowed = "copy";
  };

  const traverseAndAdd = (
    nodes: ComponentData[],
    parentId: string | null,
    newComponent: ComponentData,
  ): ComponentData[] => {
    if (!parentId) {
      return [...nodes, newComponent];
    }
    return nodes.map((node) => {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, newComponent] };
      }
      if (node.children.length > 0) {
        return {
          ...node,
          children: traverseAndAdd(node.children, parentId, newComponent),
        };
      }
      return node;
    });
  };

  const addComponent = (type: string, parentId: string | null = null) => {
    const template = componentTemplates[type];
    const newComponent: ComponentData = {
      id: generateId(),
      type,
      props: { ...template.defaultProps },
      children: [],
      isContainer: template.isContainer,
    };

    setComponents((prev) => traverseAndAdd(prev, parentId, newComponent));
    addToHistory("Added", template.name);
  };

  const handleDrop = (e: React.DragEvent, targetId: string | null = null) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(null);
    const componentType = e.dataTransfer.getData("componentType");

    if (componentType) {
      addComponent(componentType, targetId);
    }
  };

  const handleDragOver = (e: React.DragEvent, id: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(id);
  };

  const findAndUpdate = (
    nodes: ComponentData[],
    id: string,
    props: ComponentProps,
  ): ComponentData[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, props: { ...node.props, ...props } };
      }
      if (node.children.length > 0) {
        return { ...node, children: findAndUpdate(node.children, id, props) };
      }
      return node;
    });
  };

  const saveEdit = () => {
    if (editingId) {
      const comp = findComponent(components, editingId);
      setComponents((prev) => findAndUpdate(prev, editingId, editProps));
      if (comp) addToHistory("Updated", componentTemplates[comp.type].name);
      setEditingId(null);
      setEditProps({});
    }
  };

  const findAndDelete = (
    nodes: ComponentData[],
    id: string,
  ): ComponentData[] => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        children: findAndDelete(node.children, id),
      }));
  };

  const removeComponent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const comp = findComponent(components, id);
    setComponents((prev) => findAndDelete(prev, id));
    if (comp) addToHistory("Removed", componentTemplates[comp.type].name);
    if (selectedId === id) setSelectedId(null);
  };

  const findComponent = (
    nodes: ComponentData[],
    id: string,
  ): ComponentData | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findComponent(node.children, id);
      if (found) return found;
    }
    return null;
  };

  const startEditing = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const comp = findComponent(components, id);
    if (comp) {
      setEditingId(id);
      setEditProps({ ...comp.props });
    }
  };

  // --- Recursive Code Gen ---

  const generateJSXRecursive = (nodes: ComponentData[], level = 2): string => {
    return nodes
      .map((node) => {
        const tmpl = componentTemplates[node.type];
        const indent = "  ".repeat(level);

        let propsString = Object.entries(node.props)
          .map(([key, val]) => {
            if (key === "children") return "";
            if (typeof val === "string") return `${key}="${val}"`;
            return `${key}={${JSON.stringify(val)}}`;
          })
          .filter((s) => s !== "")
          .join(" ");

        if (node.children.length > 0) {
          return `${indent}<${tmpl.name.replace(/\s/g, "")} ${propsString}>
${generateJSXRecursive(node.children, level + 1)}
${indent}</${tmpl.name.replace(/\s/g, "")}>`;
        } else {
          return `${indent}<${tmpl.name.replace(/\s/g, "")} ${propsString} />`;
        }
      })
      .join("\n");
  };

  const getSubStyles = (nodes: ComponentData[]): string[] => {
    let styles: string[] = [];
    nodes.forEach((node) => {
      if (componentTemplates[node.type].css) {
        styles.push(componentTemplates[node.type].css);
      }
      if (node.children) {
        styles = [...styles, ...getSubStyles(node.children)];
      }
    });
    return styles;
  };

  const generateReactCode = () => {
    const jsxContent = generateJSXRecursive(components);
    const styleSet = new Set(getSubStyles(components));
    
    // Collect all unique component names for imports
    const usedComponentNames = new Set<string>();
    const collectNames = (nodes: ComponentData[]) => {
      nodes.forEach(node => {
        usedComponentNames.add(componentTemplates[node.type].name.replace(/\s/g, ""));
        collectNames(node.children);
      });
    };
    collectNames(components);
    
    const importList = Array.from(usedComponentNames).sort().join(", ");
    const imports = usedComponentNames.size > 0 
      ? `import { ${importList} } from "@/components/PreviewComp";`
      : "";

    const fullJsx = `"use client";
import React from "react";
${imports}

const GeneratedWebsite = () => {
  return (
    <div className="min-h-screen bg-white">
${jsxContent}
    </div>
  );
};

export default GeneratedWebsite;`;

    return {
      jsx: fullJsx,
      css: [...styleSet].join("\n\n"),
    };
  };

  // --- HTML Code Generator ---

  const generateHTMLNode = (node: ComponentData, level = 2): string => {
    const p = node.props;
    const indent = "  ".repeat(level);
    const childrenHTML =
      node.children.length > 0
        ? "\n" + node.children.map((c) => generateHTMLNode(c, level + 1)).join("\n") + "\n" + indent
        : "";

    switch (node.type) {
      case "button":
        return `${indent}<button class="btn-primary" style="background:${p.bgColor};color:${p.textColor}">${p.text}</button>`;
      case "secondaryButton":
        return `${indent}<button class="btn-secondary" style="border:2px solid ${p.borderColor};color:${p.textColor}">${p.text}</button>`;
      case "input":
        return `${indent}<div class="input-group">
${indent}  <label class="input-label">${p.label}</label>
${indent}  <input class="input-field" placeholder="${p.placeholder}" />
${indent}</div>`;
      case "heading":
        return `${indent}<h2 class="heading-primary" style="color:${p.color};font-size:${p.fontSize}">${p.text}</h2>`;
      case "text":
        return `${indent}<p class="text-body" style="color:${p.color};font-size:${p.fontSize}">${p.text}</p>`;
      case "image":
        return `${indent}<img class="img-responsive" src="${p.src}" alt="${p.alt}" style="width:${p.width};height:${p.height};border-radius:${p.borderRadius}" />`;
      case "avatar":
        return `${indent}<img class="avatar" src="${p.src}" style="width:${p.size};height:${p.size}" alt="Avatar" />`;
      case "badge":
        return `${indent}<span class="badge" style="background:${p.color};color:${p.textColor}">${p.text}</span>`;
      case "divider":
        return `${indent}<hr style="border:${p.thickness} solid ${p.color};margin:${p.margin} 0" />`;
      case "spacer":
        return `${indent}<div style="height:${p.height}"></div>`;
      case "quote":
        return `${indent}<blockquote class="quote" style="color:${p.textColor};border-color:${p.borderColor}">
${indent}  <p>${p.text}</p>
${indent}  <cite class="quote-author">${p.author}</cite>
${indent}</blockquote>`;
      case "navbar": {
        const links = (p.navLinks || []).map((l: any) =>
          `${indent}    <a class="navbar-link" href="${l.href}" style="color:${p.textColor}">${l.label}</a>`
        ).join("\n");
        return `${indent}<nav class="navbar" style="background:${p.bgColor};color:${p.textColor}">
${indent}  <span class="navbar-brand">${p.brand}</span>
${indent}  <div class="navbar-links">
${links}
${indent}  </div>
${indent}  <div>${childrenHTML}</div>
${indent}</nav>`;
      }
      case "hero":
        return `${indent}<section class="hero" style="background:linear-gradient(135deg,${p.gradientStart},${p.gradientEnd})">
${indent}  <h1 class="hero-title">${p.title}</h1>
${indent}  <p class="hero-subtitle">${p.subtitle}</p>
${indent}  <div class="hero-actions">${childrenHTML}</div>
${indent}</section>`;
      case "container":
        return `${indent}<div class="container" style="padding:${p.padding};background:${p.bgColor}">${childrenHTML}</div>`;
      case "card":
        return `${indent}<div class="card" style="background:${p.bgColor}">
${indent}  <div class="card-title">${p.title}</div>
${indent}  <div class="card-body">${childrenHTML}</div>
${indent}</div>`;
      case "grid":
        return `${indent}<div class="grid" style="grid-template-columns:repeat(${p.columns},1fr);gap:${p.gap}">${childrenHTML}</div>`;
      case "flexRow":
        return `${indent}<div class="flex-row" style="justify-content:${p.justify};gap:${p.gap}">${childrenHTML}</div>`;
      case "footer":
        return `${indent}<footer class="footer" style="background:${p.bgColor};color:${p.textColor}">
${indent}  <div class="footer-content">
${childrenHTML}
${indent}    <p>${p.copyright}</p>
${indent}  </div>
${indent}</footer>`;
      case "section":
        return `${indent}<section class="section" style="background:${p.bgColor};padding:${p.padding}">${childrenHTML}</section>`;
      case "testimonial":
        return `${indent}<div class="testimonial" style="background:${p.bgColor};color:${p.textColor};border-color:${p.borderColor}">
${indent}  <p>${p.content}</p>
${indent}  <div class="testimonial-name">${p.name}</div>
${indent}  <div class="testimonial-title">${p.title}</div>
${indent}</div>`;
      case "featureBox":
        return `${indent}<div class="feature-box" style="background:${p.bgColor}">
${indent}  <div class="feature-icon" style="font-size:${p.iconSize}">${p.icon}</div>
${indent}  <div class="feature-title" style="color:${p.titleColor}">${p.title}</div>
${indent}  <div class="feature-description" style="color:${p.descColor}">${p.description}</div>
${indent}</div>`;
      case "cta":
        return `${indent}<div class="cta" style="background:${p.bgColor};color:${p.textColor};padding:${p.padding};border-radius:${p.borderRadius}">
${indent}  <h2 class="cta-title" style="font-size:${p.titleSize}">${p.title}</h2>
${indent}  <p class="cta-subtitle" style="font-size:${p.subtitleSize}">${p.subtitle}</p>
${indent}  <button style="background:${p.buttonBg};color:${p.textColor};padding:10px 24px;border:none;border-radius:6px;cursor:pointer">${p.buttonText}</button>
${indent}  <div>${childrenHTML}</div>
${indent}</div>`;
      case "stats":
        return `${indent}<div class="stats" style="background:${p.bgColor};padding:${p.padding};border-radius:${p.borderRadius}">
${indent}  <div class="stats-value" style="color:${p.valueColor};font-size:${p.valueSize}">${p.value}</div>
${indent}  <div class="stats-label" style="color:${p.labelColor};font-size:${p.labelSize}">${p.label}</div>
${indent}</div>`;
      default:
        return `${indent}<div>${childrenHTML}</div>`;
    }
  };

  const generateHTMLCode = (): string => {
    const styleSet = new Set(getSubStyles(components));
    const customCssStr = [...styleSet].join("\n\n");
    const bodyHTML = components.map((c) => generateHTMLNode(c)).join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Created with NewGen UI</title>
  <style>
${CORE_LIBRARY_CSS.split("\n").map(l => "    " + l).join("\n")}

    /* Custom styles for this template */
${customCssStr.split("\n").map(l => "    " + l).join("\n")}
  </style>
</head>
<body style="margin: 0; padding: 0;">
${bodyHTML}
</body>
</html>`;
  };

  // --- AngularJS Code Generator ---

  const generateAngularNode = (node: ComponentData, level = 2): string => {
    const p = node.props;
    const indent = "  ".repeat(level);
    const childrenHTML =
      node.children.length > 0
        ? "\n" + node.children.map((c) => generateAngularNode(c, level + 1)).join("\n") + "\n" + indent
        : "";

    switch (node.type) {
      case "button":
        return `${indent}<button class="btn-primary" style="background:${p.bgColor};color:${p.textColor}">{{ctrl.${node.id}_text}}</button>`;
      case "secondaryButton":
        return `${indent}<button class="btn-secondary" style="border:2px solid ${p.borderColor};color:${p.textColor}">{{ctrl.${node.id}_text}}</button>`;
      case "input":
        return `${indent}<div class="input-group">
${indent}  <label class="input-label">{{ctrl.${node.id}_label}}</label>
${indent}  <input class="input-field" ng-model="ctrl.${node.id}_value" placeholder="${p.placeholder}" />
${indent}</div>`;
      case "heading":
        return `${indent}<h2 class="heading-primary" style="color:${p.color};font-size:${p.fontSize}">{{ctrl.${node.id}_text}}</h2>`;
      case "text":
        return `${indent}<p class="text-body" style="color:${p.color};font-size:${p.fontSize}">{{ctrl.${node.id}_text}}</p>`;
      case "image":
        return `${indent}<img class="img-responsive" ng-src="{{ctrl.${node.id}_src}}" alt="${p.alt}" style="width:${p.width};height:${p.height};border-radius:${p.borderRadius}" />`;
      case "avatar":
        return `${indent}<img class="avatar" ng-src="{{ctrl.${node.id}_src}}" style="width:${p.size};height:${p.size}" alt="Avatar" />`;
      case "badge":
        return `${indent}<span class="badge" style="background:${p.color};color:${p.textColor}">{{ctrl.${node.id}_text}}</span>`;
      case "divider":
        return `${indent}<hr style="border:${p.thickness} solid ${p.color};margin:${p.margin} 0" />`;
      case "spacer":
        return `${indent}<div style="height:${p.height}"></div>`;
      case "quote":
        return `${indent}<blockquote class="quote" style="color:${p.textColor};border-color:${p.borderColor}">
${indent}  <p>{{ctrl.${node.id}_text}}</p>
${indent}  <cite class="quote-author">{{ctrl.${node.id}_author}}</cite>
${indent}</blockquote>`;
      case "navbar": {
        const links = (p.navLinks || []).map((l: any) =>
          `${indent}    <a class="navbar-link" href="${l.href}" style="color:${p.textColor}">${l.label}</a>`
        ).join("\n");
        return `${indent}<nav class="navbar" style="background:${p.bgColor};color:${p.textColor}">
${indent}  <span class="navbar-brand">{{ctrl.${node.id}_brand}}</span>
${indent}  <div class="navbar-links">
${links}
${indent}  </div>
${indent}  <div>${childrenHTML}</div>
${indent}</nav>`;
      }
      case "hero":
        return `${indent}<section class="hero" style="background:linear-gradient(135deg,${p.gradientStart},${p.gradientEnd})">
${indent}  <h1 class="hero-title">{{ctrl.${node.id}_title}}</h1>
${indent}  <p class="hero-subtitle">{{ctrl.${node.id}_subtitle}}</p>
${indent}  <div class="hero-actions">${childrenHTML}</div>
${indent}</section>`;
      case "container":
        return `${indent}<div class="container" style="padding:${p.padding};background:${p.bgColor}">${childrenHTML}</div>`;
      case "card":
        return `${indent}<div class="card" style="background:${p.bgColor}">
${indent}  <div class="card-title">{{ctrl.${node.id}_title}}</div>
${indent}  <div class="card-body">${childrenHTML}</div>
${indent}</div>`;
      case "grid":
        return `${indent}<div class="grid" style="grid-template-columns:repeat(${p.columns},1fr);gap:${p.gap}">${childrenHTML}</div>`;
      case "flexRow":
        return `${indent}<div class="flex-row" style="justify-content:${p.justify};gap:${p.gap}">${childrenHTML}</div>`;
      case "footer":
        return `${indent}<footer class="footer" style="background:${p.bgColor};color:${p.textColor}">
${indent}  <div class="footer-content">
${childrenHTML}
${indent}    <p>{{ctrl.${node.id}_copyright}}</p>
${indent}  </div>
${indent}</footer>`;
      case "section":
        return `${indent}<section class="section" style="background:${p.bgColor};padding:${p.padding}">${childrenHTML}</section>`;
      case "testimonial":
        return `${indent}<div class="testimonial" style="background:${p.bgColor};color:${p.textColor};border-color:${p.borderColor}">
${indent}  <p>{{ctrl.${node.id}_content}}</p>
${indent}  <div class="testimonial-name">{{ctrl.${node.id}_name}}</div>
${indent}  <div class="testimonial-title">{{ctrl.${node.id}_title}}</div>
${indent}</div>`;
      case "featureBox":
        return `${indent}<div class="feature-box" style="background:${p.bgColor}">
${indent}  <div class="feature-icon" style="font-size:${p.iconSize}">{{ctrl.${node.id}_icon}}</div>
${indent}  <div class="feature-title" style="color:${p.titleColor}">{{ctrl.${node.id}_title}}</div>
${indent}  <div class="feature-description" style="color:${p.descColor}">{{ctrl.${node.id}_description}}</div>
${indent}</div>`;
      case "cta":
        return `${indent}<div class="cta" style="background:${p.bgColor};color:${p.textColor};padding:${p.padding};border-radius:${p.borderRadius}">
${indent}  <h2 class="cta-title" style="font-size:${p.titleSize}">{{ctrl.${node.id}_title}}</h2>
${indent}  <p class="cta-subtitle" style="font-size:${p.subtitleSize}">{{ctrl.${node.id}_subtitle}}</p>
${indent}  <button style="background:${p.buttonBg};color:${p.textColor};padding:10px 24px;border:none;border-radius:6px;cursor:pointer">{{ctrl.${node.id}_buttonText}}</button>
${indent}  <div>${childrenHTML}</div>
${indent}</div>`;
      case "stats":
        return `${indent}<div class="stats" style="background:${p.bgColor};padding:${p.padding};border-radius:${p.borderRadius}">
${indent}  <div class="stats-value" style="color:${p.valueColor};font-size:${p.valueSize}">{{ctrl.${node.id}_value}}</div>
${indent}  <div class="stats-label" style="color:${p.labelColor};font-size:${p.labelSize}">{{ctrl.${node.id}_label}}</div>
${indent}</div>`;
      default:
        return `${indent}<div>${childrenHTML}</div>`;
    }
  };

  const collectAngularScope = (nodes: ComponentData[]): string => {
    const lines: string[] = [];
    const visit = (node: ComponentData) => {
      const p = node.props;
      switch (node.type) {
        case "button": lines.push(`        this.${node.id}_text = '${p.text}';`); break;
        case "secondaryButton": lines.push(`        this.${node.id}_text = '${p.text}';`); break;
        case "input": lines.push(`        this.${node.id}_label = '${p.label}';
        this.${node.id}_value = '';`); break;
        case "heading": lines.push(`        this.${node.id}_text = '${p.text}';`); break;
        case "text": lines.push(`        this.${node.id}_text = '${p.text}';`); break;
        case "image": lines.push(`        this.${node.id}_src = '${p.src}';`); break;
        case "avatar": lines.push(`        this.${node.id}_src = '${p.src}';`); break;
        case "badge": lines.push(`        this.${node.id}_text = '${p.text}';`); break;
        case "quote": lines.push(`        this.${node.id}_text = '${p.text}';
        this.${node.id}_author = '${p.author}';`); break;
        case "navbar": lines.push(`        this.${node.id}_brand = '${p.brand}';`); break;
        case "hero": lines.push(`        this.${node.id}_title = '${p.title}';
        this.${node.id}_subtitle = '${p.subtitle}';`); break;
        case "card": lines.push(`        this.${node.id}_title = '${p.title}';`); break;
        case "footer": lines.push(`        this.${node.id}_copyright = '${p.copyright}';`); break;
        case "testimonial": lines.push(`        this.${node.id}_content = '${p.content}';
        this.${node.id}_name = '${p.name}';
        this.${node.id}_title = '${p.title}';`); break;
        case "featureBox": lines.push(`        this.${node.id}_icon = '${p.icon}';
        this.${node.id}_title = '${p.title}';
        this.${node.id}_description = '${p.description}';`); break;
        case "cta": lines.push(`        this.${node.id}_title = '${p.title}';
        this.${node.id}_subtitle = '${p.subtitle}';
        this.${node.id}_buttonText = '${p.buttonText}';`); break;
        case "stats": lines.push(`        this.${node.id}_value = '${p.value}';
        this.${node.id}_label = '${p.label}';`); break;
        default: break;
      }
      node.children.forEach(visit);
    };
    nodes.forEach(visit);
    return lines.join("\n");
  };

  const generateAngularCode = (): string => {
    const styleSet = new Set(getSubStyles(components));
    const customCssStr = [...styleSet].join("\n\n");
    const bodyHTML = components.map((c) => generateAngularNode(c)).join("\n");
    const scopeInit = collectAngularScope(components);

    return `<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Created with NewGen UI (AngularJS)</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <style>
${CORE_LIBRARY_CSS.split("\n").map(l => "    " + l).join("\n")}

    /* Custom styles for this template */
${customCssStr.split("\n").map(l => "    " + l).join("\n")}
  </style>
</head>
<body ng-controller="MainCtrl as ctrl" style="margin: 0; padding: 0;">

${bodyHTML}

  <script>
    angular.module('myApp', [])
      .controller('MainCtrl', function() {
${scopeInit}
      });
  </script>
</body>
</html>`;
  };

  const { jsx, css } = generateReactCode();

  const getActiveCode = () => {
    if (selectedLang === "html") return generateHTMLCode();
    if (selectedLang === "angularjs") return generateAngularCode();
    return `// React JSX\n${jsx}\n\n/* CSS */\n${css}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  // --- Rendering ---

  const renderComponentTree = (nodes: ComponentData[]) => {
    return nodes.map((node) => {
      const template = componentTemplates[node.type];
      const ComponentToRender = template.component;
      const isSelected = selectedId === node.id;
      const isDragOver = dragOverId === node.id;

      return (
        <div
          key={node.id}
          className={`group/item relative transition-all duration-200 outline-none
            ${isSelected ? 'ring-2 ring-blue-500 z-50' : 'hover:ring-1 hover:ring-blue-400/50'}
            ${isDragOver ? 'bg-blue-500/5 ring-2 ring-dashed ring-blue-400' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(node.id);
          }}
          onDragOver={(e) => {
            if (node.isContainer) handleDragOver(e, node.id);
          }}
          onDrop={(e) => {
            if (node.isContainer) handleDrop(e, node.id);
          }}
        >
          {isSelected && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[60]">
               {/* Selection Label */}
               <div className="absolute -top-7 left-0 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-t-lg pointer-events-auto shadow-lg shadow-blue-500/30 uppercase tracking-widest flex items-center gap-2 border-t border-x border-white/20">
                  <CompIcon size={10} className="text-white/80" />
                  {template.name}
               </div>

               {/* Action Buttons */}
               <div className="absolute top-2 right-2 flex gap-1.5 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(node.id, e);
                      setRightPanelTab("properties");
                      setIsRightPanelVisible(true);
                    }}
                    className="w-8 h-8 bg-white/95 backdrop-blur-md text-blue-600 border border-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-xl hover:scale-110 active:scale-95 group/btn"
                    title="Edit Properties"
                  >
                    <Edit2 size={14} className="group-hover/btn:rotate-12 transition-transform" />
                  </button>
                  <button
                    onClick={(e) => removeComponent(node.id, e)}
                    className="w-8 h-8 bg-red-500/95 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-all shadow-xl hover:scale-110 active:scale-95 group/btn"
                    title="Delete Component"
                  >
                    <Trash2 size={14} className="group-hover/btn:-rotate-12 transition-transform" />
                  </button>
               </div>
            </div>
          )}

          <div className={`${node.isContainer ? 'min-h-[50px]' : ''}`}>
            <ComponentToRender {...node.props}>
              {renderComponentTree(node.children)}
            </ComponentToRender>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-white font-sans overflow-hidden">
      {/* Sidebar - Component Library */}
      <div className={`bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col shadow-2xl z-20 transition-all duration-300 ease-in-out
        ${isSidebarVisible ? 'w-72' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Box size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">BUILDER</h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8">
          {[
            { id: "layout", label: "Layout", icon: <Layout size={14} /> },
            { id: "basic", label: "Typography", icon: <CompIcon size={14} /> },
            { id: "components", label: "Components", icon: <Box size={14} /> }
          ].map((cat) => (
            <div key={cat.id} className="space-y-3">
              <div className="flex items-center gap-2 px-2 text-[10px] uppercase font-black tracking-widest text-white/30">
                {cat.icon}
                <span>{cat.label}</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(componentTemplates)
                  .filter(([_, t]) => t.category === cat.id)
                  .map(([type, t]) => (
                    <div
                      key={type}
                      draggable
                      onDragStart={(e) => handleDragStart(e, type)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-grab active:cursor-grabbing"
                    >
                      <span className="text-sm font-semibold text-white/70 group-hover:text-white">{t.name}</span>
                      <ChevronRight size={14} className="text-white/20 group-hover:text-blue-500 transition-colors" />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10 bg-black/20">
            <button
              onClick={() => { if (confirm("Clear all?")) setComponents([]); }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all border border-red-500/20"
            >
              <Trash2 size={14} />
              Clear Canvas
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#0f0f11] relative overflow-hidden">
        {/* Canvas Toolbar */}
        <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                className={`p-2 rounded-lg transition-all ${isSidebarVisible ? 'bg-white/10 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}
                title={isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
             >
                <Layout size={16} />
             </button>
             <div className="flex items-center gap-2 text-xs font-bold text-white/40 tabular-nums">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Canvas Active
             </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                <button 
                    onClick={() => {
                        setIsSidebarVisible(!isSidebarVisible);
                        setIsRightPanelVisible(!isRightPanelVisible);
                    }}
                    className={`p-1.5 rounded-md transition-all ${(!isSidebarVisible && !isRightPanelVisible) ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
                >
                    <Maximize2 size={14} />
                </button>
                <button 
                    onClick={() => setIsRightPanelVisible(!isRightPanelVisible)}
                    className="p-1.5 rounded-md text-white/40 hover:text-white transition-colors"
                >
                    <Settings size={14} />
                </button>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center custom-scrollbar bg-[#0f0f11]">
          <div
            className={`w-full max-w-6xl min-h-full bg-white rounded-[1.5rem] shadow-2xl shadow-black/50 transform transition-all duration-300 origin-top mb-12
              ${dragOverId === null && dragPosition === "inside" ? 'ring-4 ring-blue-500/50 scale-[1.01]' : 'ring-1 ring-white/10'}`}
            onDragOver={(e) => handleDragOver(e, null)}
            onDrop={(e) => handleDrop(e, null)}
            onClick={() => setSelectedId(null)}
          >
            {components.length === 0 ? (
              <div className="h-full min-h-[700px] flex flex-col items-center justify-center gap-4 text-gray-300">
                <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
                    <CompIcon className="text-gray-300" size={32} />
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">Start Building</p>
                    <p className="text-sm text-gray-500">Drag components from the sidebar to the canvas</p>
                </div>
              </div>
            ) : (
              <div className="h-full bg-white text-black p-4 md:p-8 rounded-[1.5rem]">
                {renderComponentTree(components)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Properties & Code */}
      <div className={`bg-white/5 backdrop-blur-xl border-l border-white/10 flex flex-col shadow-2xl z-20 transition-all duration-300 ease-in-out
        ${isRightPanelVisible ? 'w-80' : 'w-0 translate-x-full opacity-0 overflow-hidden'}`}>
        <div className="flex border-b border-white/10">
            <button 
                onClick={() => setRightPanelTab("properties")}
                className={`flex-1 p-4 text-[10px] font-black tracking-widest uppercase transition-all
                  ${rightPanelTab === "properties" ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-500/5' : 'text-white/40 hover:text-white'}`}
            >
                Properties
            </button>
            <button 
                onClick={() => setRightPanelTab("history")}
                className={`flex-1 p-4 text-[10px] font-black tracking-widest uppercase transition-all
                  ${rightPanelTab === "history" ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-500/5' : 'text-white/40 hover:text-white'}`}
            >
                History
            </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {rightPanelTab === "properties" ? (
            /* Properties Section */
            <div className="p-6 space-y-6">
              {editingId ? (
                (() => {
                  const comp = findComponent(components, editingId);
                  const tmpl = comp ? componentTemplates[comp.type] : null;
                  if (!comp || !tmpl) return null;

                  return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white uppercase tracking-tight">Edit {tmpl.name}</h3>
                          <button onClick={() => setEditingId(null)} className="p-1 hover:bg-white/10 rounded-md transition-colors"><Trash2 size={14} className="text-white/40" /></button>
                      </div>
                      
                      <div className="space-y-4">
                        {tmpl.editableFields.map((field) => (
                          <div key={field.name} className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{field.label}</label>
                            {field.type === "textarea" ? (
                              <textarea
                                value={editProps[field.name] || ""}
                                onChange={(e) => setEditProps({ ...editProps, [field.name]: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                rows={3}
                              />
                            ) : field.type === "select" ? (
                              <select
                                value={editProps[field.name] || ""}
                                onChange={(e) => setEditProps({ ...editProps, [field.name]: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
                              >
                                {field.options?.map((opt) => (
                                  <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>
                                ))}
                              </select>
                            ) : (
                              <div className="relative group">
                                  <input
                                  type={field.type}
                                  value={editProps[field.name] || ""}
                                  onChange={(e) => setEditProps({ ...editProps, [field.name]: e.target.value })}
                                  className={`w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all
                                      ${field.type === 'color' ? 'h-10 p-1' : ''}`}
                                  />
                                  {field.type === 'color' && (
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/40 pointer-events-none group-focus-within:hidden">
                                          {editProps[field.name]}
                                      </div>
                                  )}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Navbar Links Context Menu */}
                        {comp.type === "navbar" && (
                          <div className="pt-4 mt-4 border-t border-white/10 space-y-4">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Navigation Links</label>
                            <div className="space-y-2">
                              {editProps.navLinks?.map((link: NavLink) => (
                                <div key={link.id} className="group p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between animate-in zoom-in-95 duration-200">
                                  <div className="space-y-0.5">
                                      <div className="text-xs font-bold text-white">{link.label}</div>
                                      <div className="text-[10px] text-white/40 font-mono truncate max-w-[120px]">{link.href}</div>
                                  </div>
                                  <button onClick={() => setEditProps({ ...editProps, navLinks: editProps.navLinks.filter((l: NavLink) => l.id !== link.id) })} className="p-1.5 opacity-0 group-hover:opacity-100 bg-red-500/20 text-red-500 rounded-md transition-all">
                                      <Trash2 size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="space-y-2 p-3 rounded-xl bg-black/20 border border-white/5">
                              <input
                                  placeholder="Link label"
                                  value={newNavLink.label}
                                  onChange={(e) => setNewNavLink({ ...newNavLink, label: e.target.value })}
                                  className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-white/20"
                              />
                              <input
                                  placeholder="URL path"
                                  value={newNavLink.href}
                                  onChange={(e) => setNewNavLink({ ...newNavLink, href: e.target.value })}
                                  className="w-full bg-transparent text-[10px] font-mono text-white/40 focus:outline-none placeholder:text-white/10"
                              />
                              <button
                                  onClick={() => {
                                      if (newNavLink.label && newNavLink.href) {
                                          const updatedLinks = [...(editProps.navLinks || [])];
                                          updatedLinks.push({ id: generateId(), ...newNavLink });
                                          setEditProps({ ...editProps, navLinks: updatedLinks });
                                          setNewNavLink({ label: "", href: "" });
                                      }
                                  }}
                                  className="w-full py-2 bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                              >
                                  Add Link
                              </button>
                            </div>
                          </div>
                        )}

                        <button 
                          onClick={saveEdit} 
                          className="w-full py-4 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-xl shadow-white/5 mt-8 flex items-center justify-center gap-2"
                        >
                           <Check size={14} />
                           Save Changes
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/5 rounded-2xl">
                  <Settings size={24} className="text-white/10 mb-2" />
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">Select an element on the canvas to edit its properties</p>
                </div>
              )}
            </div>
          ) : (
            /* History Section */
            <div className="p-6 space-y-4">
               <div className="flex items-center gap-2 text-white/60 mb-6">
                  <RefreshCcw size={14} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Action History</h3>
               </div>
               <div className="space-y-3">
                  {history.length === 0 ? (
                    <div className="py-12 text-center space-y-2">
                        <RefreshCcw size={20} className="text-white/10 mx-auto" />
                        <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">No activities yet</p>
                    </div>
                  ) : (
                    history.map(item => (
                      <div key={item.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-[10px] animate-in slide-in-from-top-2 duration-300">
                          <span className="text-white/40 font-mono">{item.time}</span>
                          <span className="flex items-center gap-2">
                              <span className="text-white/60">{item.action}</span>
                              <span className="text-blue-400 font-bold uppercase">{item.type}</span>
                          </span>
                      </div>
                    ))
                  )}
                  {history.length > 0 && (
                    <p className="text-center text-[10px] text-white/20 pt-4 italic">Showing last {history.length} actions</p>
                  )}
               </div>
            </div>
          )}
        </div>

        {/* Code Preview Bottom Sheet */}
        <div className="h-1/2 border-t border-white/10 bg-black/40 flex flex-col">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CompIcon size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Generated Output</span>
                </div>
                <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                >
                    {copyStatus ? <Check size={12} /> : <Copy size={12} />}
                    {copyStatus ? "Copied" : "Copy"}
                </button>
            </div>
            
            <div className="p-2 flex gap-1 border-b border-white/5 bg-black/20">
                {(["react", "html", "angularjs"] as const).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setSelectedLang(lang)}
                        className={`flex-1 py-2 rounded-md text-[9px] font-black uppercase tracking-widest transition-all
                            ${selectedLang === lang ? 'bg-white/10 text-white shadow-sm' : 'text-white/30 hover:text-white/60'}`}
                    >
                        {lang === "react" ? "React" : lang === "html" ? "HTML" : "Angular"}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 overflow-auto custom-scrollbar p-0">
                    <CodeBlock 
                        code={getActiveCode()} 
                        language={selectedLang === "react" ? "jsx" : selectedLang === "html" ? "html" : "angular"} 
                        className="rounded-none border-none text-[11px]"
                    />
                </div>
            </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        
        .component-wrapper { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        .component-wrapper:hover { box-shadow: 0 0 0 2px #3b82f6; }
        .component-wrapper.selected { box-shadow: 0 0 0 2px #3b82f6; z-index: 10; }
        .component-wrapper.drag-over { background-color: rgba(59, 130, 246, 0.05); outline: 2px dashed #3b82f6; outline-offset: -2px; }
        
        .controls-overlay { pointer-events: none; }
        .controls-actions { pointer-events: auto; }
        
        /* Transition for canvas root */
        .canvas-root { min-height: 100%; transition: all 0.3s ease; }
        
        /* Inject local variables for preview */
        ${getSubStyles(components).join("\n")}
      `}</style>
    </div>
  );
};

export default ReactWebsiteBuilder;
