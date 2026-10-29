import React from 'react';
import {
  Wrench,
  Zap,
  UtensilsCrossed,
  Sparkles,
  GraduationCap,
  Hammer,
  Paintbrush,
  Cpu,
  HelpCircle,
  LucideProps,
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Wrench':
    case 'Plumber':
      return <Wrench {...props} />;
    case 'Zap':
    case 'Electrician':
      return <Zap {...props} />;
    case 'UtensilsCrossed':
    case 'Cook':
      return <UtensilsCrossed {...props} />;
    case 'Sparkles':
    case 'Maid / House Cleaning':
      return <Sparkles {...props} />;
    case 'GraduationCap':
    case 'Tutor':
      return <GraduationCap {...props} />;
    case 'Hammer':
    case 'Carpenter':
      return <Hammer {...props} />;
    case 'Paintbrush':
    case 'Painter':
      return <Paintbrush {...props} />;
    case 'Cpu':
    case 'Appliance Repair':
      return <Cpu {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
