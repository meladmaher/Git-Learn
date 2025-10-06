import React from 'react';
import { GitBranch, GitCommit, GitPullRequest, Layers, File, Folder, Terminal, Network, Wrench, List, Star, type LucideProps } from 'lucide-react';

export const ICONS: { [key: string]: React.ElementType<LucideProps> } = {
  'الكل': List,
  'المفضلة': Star,
  'تفرع': GitBranch,
  'أساسي': GitCommit,
  'مزامنة': GitPullRequest,
  'إعداد': Layers,
  'ملفات': File,
  'مجلدات': Folder,
  'نظام': Terminal,
  'شبكة': Network,
  'أدوات مساعدة': Wrench,
  'default': Terminal,
};
