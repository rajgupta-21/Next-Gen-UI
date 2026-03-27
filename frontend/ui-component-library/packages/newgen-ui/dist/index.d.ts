import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline" | "ghost" | "gradient";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    theme?: {
        primary?: string;
        primary600?: string;
        primaryHover?: string;
    };
};
declare function Button({ children, variant, size, isLoading, leftIcon, rightIcon, className, theme, disabled, ...rest }: ButtonProps): react_jsx_runtime.JSX.Element;

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    footer?: React.ReactNode;
    variant?: "default" | "bordered" | "elevated" | "glass";
    theme?: {
        primary?: string;
        primary600?: string;
        accent?: string;
    };
};
declare function Card({ title, description, footer, variant, className, children, theme, style, ...rest }: React.PropsWithChildren<CardProps>): react_jsx_runtime.JSX.Element;

interface CarouselProps {
    slides: React.ReactNode[];
    theme?: {
        background?: string;
        indicator?: string;
        inactiveIndicator?: string;
    };
    className?: string;
}
declare function Carousel({ slides, theme, className, }: CarouselProps): react_jsx_runtime.JSX.Element;

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    theme?: {
        primary?: string;
        primary600?: string;
        accent?: string;
        background?: string;
    };
    className?: string;
}
declare function Dialog({ open, onClose, title, children, theme, className, }: DialogProps): react_jsx_runtime.JSX.Element;

interface DropdownItem {
    label: string;
    value: string;
    onClick?: () => void;
}
interface DropdownProps {
    label: string;
    items: DropdownItem[];
    theme?: {
        background?: string;
        text?: string;
        border?: string;
        hover?: string;
    };
    className?: string;
}
declare function Dropdown({ label, items, theme, className, }: DropdownProps): react_jsx_runtime.JSX.Element;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    theme?: {
        primary?: string;
        primary600?: string;
        background?: string;
        text?: string;
        border?: string;
    };
    className?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

type LibNavbarProps = {
    brand?: React.ReactNode;
    links?: {
        href: string;
        label: string;
    }[];
    theme?: {
        primary?: string;
        primary600?: string;
    };
    className?: string;
};
declare function LibNavbar({ brand, links, theme, className, }: LibNavbarProps): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    theme?: {
        primary?: string;
        primary600?: string;
    };
    className?: string;
}
declare function Pagination({ currentPage, totalPages, onPageChange, theme, className, }: PaginationProps): react_jsx_runtime.JSX.Element;

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "gradient" | "striped";
    showLabel?: boolean;
    animated?: boolean;
    theme?: {
        primary?: string;
        primary600?: string;
        background?: string;
    };
};
declare function Progress({ value, max, size, variant, showLabel, animated, className, theme, ...rest }: ProgressProps): react_jsx_runtime.JSX.Element;

type TabItem = {
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
};
type TabsProps = {
    items: TabItem[];
    defaultTab?: string;
    variant?: "default" | "pills" | "underline";
    size?: "sm" | "md" | "lg";
    onChange?: (tabId: string) => void;
    className?: string;
    theme?: {
        primary?: string;
        primary600?: string;
    };
};
declare function Tabs({ items, defaultTab, variant, size, onChange, className, theme, }: TabsProps): react_jsx_runtime.JSX.Element;

type ThemeConfig = {
    primary?: string;
    primary600?: string;
    accent?: string;
    mode?: "light" | "dark" | "system";
};
declare function ThemeProvider({ theme, children, }: React.PropsWithChildren<{
    theme?: ThemeConfig;
}>): react_jsx_runtime.JSX.Element;

export { Button, ButtonProps, Card, CardProps, Carousel, CarouselProps, Dialog, DialogProps, Dropdown, DropdownItem, DropdownProps, Input, InputProps, LibNavbarProps, LibNavbar as Navbar, Pagination, PaginationProps, Progress, ProgressProps, TabItem, Tabs, TabsProps, ThemeConfig, ThemeProvider };
