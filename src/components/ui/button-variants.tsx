import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
        secondary: "bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        success: "bg-success text-success-foreground shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4 text-sm",
        lg: "h-14 rounded-2xl px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
