import { Award, Zap, Star, Shield, Target, TrendingUp, Heart, CheckCircle, Code } from 'lucide-react';
import React from 'react';

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

export const BADGES: Record<string, BadgeDefinition> = {
  'first_post': {
    id: 'first_post',
    name: 'Icebreaker',
    description: 'Published their first community discussion.',
    icon: Target,
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-50 dark:bg-blue-500/10'
  },
  'helpful': {
    id: 'helpful',
    name: 'Problem Solver',
    description: 'Received 10+ upvotes on a single discussion.',
    icon: CheckCircle,
    colorClass: 'text-emerald-500',
    bgClass: 'bg-emerald-50 dark:bg-emerald-500/10'
  },
  'rising_star': {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Reached a reputation score of 50.',
    icon: Star,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-50 dark:bg-amber-500/10'
  },
  'pro_contributor': {
    id: 'pro_contributor',
    name: 'Pro Contributor',
    description: 'Reached a reputation score of 200.',
    icon: TrendingUp,
    colorClass: 'text-orange-500',
    bgClass: 'bg-orange-50 dark:bg-orange-500/10'
  },
  'expert': {
    id: 'expert',
    name: 'Subject Expert',
    description: 'Reached a reputation score of 500.',
    icon: Zap,
    colorClass: 'text-purple-500',
    bgClass: 'bg-purple-50 dark:bg-purple-500/10'
  },
  'veteran': {
    id: 'veteran',
    name: 'Nexus Veteran',
    description: 'Published over 50 discussions.',
    icon: Shield,
    colorClass: 'text-slate-700 dark:text-slate-300',
    bgClass: 'bg-slate-200 dark:bg-slate-700'
  },
  'beloved': {
    id: 'beloved',
    name: 'Community Favorite',
    description: 'Received a total of 100+ likes.',
    icon: Heart,
    colorClass: 'text-rose-500',
    bgClass: 'bg-rose-50 dark:bg-rose-500/10'
  },
  'developer': {
    id: 'developer',
    name: 'Core Developer',
    description: 'Verified Nexus Developer.',
    icon: Code,
    colorClass: 'text-[#518231]',
    bgClass: 'bg-[#518231]/10'
  }
};

export function getBadge(id: string): BadgeDefinition | null {
  return BADGES[id] || null;
}
