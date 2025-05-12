
import React from 'react';
import { AnimatedWrapper } from './AnimatedWrapper';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  backgroundElements?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description,
  actions,
  backgroundElements = true
}) => {
  return (
    <section className="mb-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <AnimatedWrapper type="slide-up">
          <h1 className="text-3xl font-bold text-gradient mb-2 relative">
            {title}
            {backgroundElements && (
              <>
                <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-gradient-to-br from-neuropen-accent-purple/30 to-transparent blur-md parallax-element"></div>
                <div className="absolute right-1/4 bottom-0 h-6 w-6 rounded-full bg-gradient-to-br from-neuropen-accent-blue/20 to-transparent blur-sm parallax-element"></div>
              </>
            )}
          </h1>
          {description && <p className="text-neuropen-muted">{description}</p>}
        </AnimatedWrapper>
        
        {actions && (
          <AnimatedWrapper type="fade-in" delay={0.4}>
            <div className="flex gap-4">
              {actions}
            </div>
          </AnimatedWrapper>
        )}
      </div>
    </section>
  );
};
