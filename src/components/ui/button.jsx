import React, { forwardRef } from 'react';
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

/**
 * @typedef {import("react").MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>} MouseEventHandler
 * @typedef {import("react").ReactNode} ReactNode
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-text-primary hover:bg-primary-hover shadow-sm",
        destructive: "bg-accent-red text-white hover:bg-accent-red/90 shadow-sm",
        outline: "border border-border bg-transparent hover:bg-background-tertiary hover:text-text shadow-sm",
        secondary: "bg-background-tertiary text-text hover:bg-background-tertiary/80 shadow-sm",
        ghost: "hover:bg-background-tertiary hover:text-text",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-primary text-text-primary shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-lg",
        icon: "h-10 w-10 rounded-full",
        "icon-sm": "h-8 w-8 rounded-full",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

// Default animation settings
const defaultAnimations = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

const MotionButton = motion.button;
const MotionLink = motion(Link);

/**
 * @typedef ButtonProps
 * @property {string} [className]
 * @property {"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient"} [variant]
 * @property {"default" | "xs" | "sm" | "lg" | "xl" | "icon" | "icon-sm"} [size]
 * @property {"none" | "pulse" | "bounce"} [animation]
 * @property {string} [to]
 * @property {string} [href]
 * @property {object} [whileHover]
 * @property {object} [whileTap]
 * @property {object} [animate]
 * @property {object} [initial]
 * @property {object} [transition]
 * @property {ReactNode} [children]
 * @property {MouseEventHandler} [onClick]
 */

/**
 * @param {ButtonProps} props
 * @param {React.Ref<HTMLButtonElement>} ref
 */
const Button = forwardRef((
  /** @type {ButtonProps} */
  {
    className,
    variant,
    size,
    animation,
    to,
    href,
    whileHover,
    whileTap,
    animate,
    initial,
    transition,
    children,
    onClick,
    ...props
  },
  ref
) => {
  const navigate = useNavigate();

  const motionProps = {
    whileHover: whileHover || defaultAnimations.whileHover,
    whileTap: whileTap || defaultAnimations.whileTap,
    animate,
    initial,
    transition: transition || defaultAnimations.transition
  };

  const classes = cn(buttonVariants({ variant, size, animation, className }));

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  // External link
  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
        {...props}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  // Internal routing with react-router
  if (to) {
    return (
      <MotionLink
        to={to}
        className={classes}
        ref={ref}
        {...motionProps}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }

  // Regular button
  return (
    <MotionButton
      className={classes}
      ref={ref}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </MotionButton>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
