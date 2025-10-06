
import React from 'react';
import { GitBranch, GitCommit, GitPullRequest, Layers, File, Folder, Terminal, Network, type LucideProps } from 'lucide-react';

export const ICONS: { [key: string]: React.ElementType<LucideProps> } = {
  'تفرع': GitBranch,
  'أساسي': GitCommit,
  'مزامنة': GitPullRequest,
  'إعداد': Layers,
  'ملفات': File,
  'مجلدات': Folder,
  'نظام': Terminal,
  'شبكة': Network,
  'default': Terminal,
};
