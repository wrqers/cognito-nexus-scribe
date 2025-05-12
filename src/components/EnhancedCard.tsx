
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 
    | "glow" 
    | "scale" 
    | "border"
    | "none";
  cardProps?: React.ComponentProps<typeof Card>;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({ 
  children, 
  className, 
  hoverEffect = "glow",
  cardProps = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverClasses = {
    glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow duration-300",
    scale: "hover:scale-[1.01] transition-transform duration-300",
    border: "hover:border-neuropen-primary transition-colors duration-300",
    none: ""
  };
  
  return (
    <Card
      className={cn(
        className,
        hoverClasses[hoverEffect],
        "transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...cardProps}
    >
      {children}
    </Card>
  );
};

export { CardContent, CardDescription, CardHeader, CardTitle, CardFooter };
