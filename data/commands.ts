
import { Command, CommandType } from '../types';

export const gitCommands: Command[] = [
  {
    id: 'git-init',
    type: CommandType.GIT,
    category: 'إعداد',
    title: 'git init',
    short: 'إنشاء مستودع Git جديد.',
    detail: 'يقوم هذا الأمر بتهيئة مجلد جديد كمستودع Git، مما يسمح بتتبع تغييرات الملفات. ينشئ مجلدًا مخفيًا باسم .git لتخزين كل معلومات المستودع.',
    example: 'git init my-new-project'
  },
  {
    id: 'git-clone',
    type: CommandType.GIT,
    category: 'إعداد',
    title: 'git clone',
    short: 'نسخ مستودع موجود.',
    detail: 'يستخدم لإنشاء نسخة محلية من مستودع بعيد. يتم تنزيل كل تاريخ المشروع والملفات إلى جهازك.',
    example: 'git clone https://github.com/user/repo.git'
  },
  {
    id: 'git-add',
    type: CommandType.GIT,
    category: 'أساسي',
    title: 'git add',
    short: 'إضافة التغييرات إلى منطقة التجهيز.',
    detail: 'يضيف التغييرات في دليل العمل إلى منطقة التجهيز (Staging Area)، تمهيدًا لتضمينها في الـ commit التالي. يمكنك إضافة ملفات محددة أو كل التغييرات.',
    example: 'git add index.html\ngit add .'
  },
  {
    id: 'git-commit',
    type: CommandType.GIT,
    category: 'أساسي',
    title: 'git commit',
    short: 'حفظ التغييرات في المستودع.',
    detail: 'يسجل لقطة من التغييرات المجهزة في تاريخ المشروع. كل commit له معرف فريد ورسالة تصف التغييرات.',
    example: 'git commit -m "إضافة صفحة تسجيل الدخول"'
  },
  {
    id: 'git-status',
    type: CommandType.GIT,
    category: 'أساسي',
    title: 'git status',
    short: 'عرض حالة دليل العمل ومنطقة التجهيز.',
    detail: 'يعرض الملفات التي تم تعديلها، والملفات المجهزة للـ commit، والملفات التي لا يتم تتبعها بواسطة Git.',
    example: 'git status'
  },
  {
    id: 'git-branch',
    type: CommandType.GIT,
    category: 'تفرع',
    title: 'git branch',
    short: 'إدارة الفروع.',
    detail: 'يستخدم لإنشاء، سرد، أو حذف الفروع. الفروع تسمح لك بتطوير الميزات بمعزل عن الفرع الرئيسي.',
    example: 'git branch new-feature\ngit branch -d old-feature'
  },
  {
    id: 'git-checkout',
    type: CommandType.GIT,
    category: 'تفرع',
    title: 'git checkout',
    short: 'التبديل بين الفروع أو استعادة الملفات.',
    detail: 'يستخدم للتنقل بين الفروع المختلفة في المستودع. يمكن استخدامه أيضًا لاستعادة ملفات دليل العمل إلى حالتها في commit معين.',
    example: 'git checkout new-feature'
  },
  {
    id: 'git-merge',
    type: CommandType.GIT,
    category: 'تفرع',
    title: 'git merge',
    short: 'دمج فرعين معًا.',
    detail: 'يأخذ التغييرات من فرع ويدمجها في الفرع الحالي. يستخدم غالبًا لدمج فرع ميزة في الفرع الرئيسي بعد اكتمال العمل.',
    example: 'git merge feature-branch'
  },
  {
    id: 'git-push',
    type: CommandType.GIT,
    category: 'مزامنة',
    title: 'git push',
    short: 'إرسال التغييرات إلى مستودع بعيد.',
    detail: 'يقوم برفع الـ commits المحلية إلى الفرع المقابل في المستودع البعيد، مما يتيح مشاركة عملك مع الآخرين.',
    example: 'git push origin main'
  },
  {
    id: 'git-pull',
    type: CommandType.GIT,
    category: 'مزامنة',
    title: 'git pull',
    short: 'جلب التغييرات من مستودع بعيد ودمجها.',
    detail: 'يقوم بتحديث فرعك المحلي بآخر التغييرات من المستودع البعيد. هو اختصار لأمري `git fetch` متبوعًا بـ `git merge`.',
    example: 'git pull origin main'
  }
];

export const cmdCommands: Command[] = [
  {
    id: 'cmd-cd',
    type: CommandType.CMD,
    category: 'مجلدات',
    title: 'cd',
    short: 'تغيير المجلد الحالي.',
    detail: 'Change Directory. يستخدم للتنقل بين المجلدات في نظام الملفات. يمكنك الانتقال إلى مجلد فرعي، أو العودة إلى المجلد الأصل.',
    example: 'cd Documents\ncd ..'
  },
  {
    id: 'cmd-ls',
    type: CommandType.CMD,
    category: 'ملفات',
    title: 'ls / dir',
    short: 'عرض محتويات المجلد.',
    detail: 'يعرض قائمة بالملفات والمجلدات الموجودة في المجلد الحالي. `ls` هو الأمر الشائع في أنظمة Unix (Linux, macOS)، بينما `dir` يستخدم في Windows.',
    example: 'ls -l\ndir'
  },
  {
    id: 'cmd-mkdir',
    type: CommandType.CMD,
    category: 'مجلدات',
    title: 'mkdir',
    short: 'إنشاء مجلد جديد.',
    detail: 'Make Directory. يقوم بإنشاء مجلد جديد بالاسم المحدد في المسار الحالي.',
    example: 'mkdir new-folder'
  },
  {
    id: 'cmd-rm',
    type: CommandType.CMD,
    category: 'ملفات',
    title: 'rm / del',
    short: 'حذف ملف.',
    detail: 'Remove. يستخدم لحذف الملفات. `rm` هو الأمر في أنظمة Unix، و `del` في Windows. كن حذرًا عند استخدامه، حيث لا يمكن استعادة الملفات المحذوفة بسهولة.',
    example: 'rm old-file.txt\ndel old-file.txt'
  },
  {
    id: 'cmd-cp',
    type: CommandType.CMD,
    category: 'ملفات',
    title: 'cp / copy',
    short: 'نسخ ملف.',
    detail: 'Copy. يستخدم لإنشاء نسخة من ملف. `cp` في Unix، و `copy` في Windows.',
    example: 'cp source.txt destination.txt\ncopy source.txt destination.txt'
  },
  {
    id: 'cmd-mv',
    type: CommandType.CMD,
    category: 'ملفات',
    title: 'mv / move',
    short: 'نقل أو إعادة تسمية ملف.',
    detail: 'Move. يستخدم لنقل ملف من مكان لآخر، أو لإعادة تسميته. `mv` في Unix، و `move` في Windows.',
    example: 'mv old-name.txt new-name.txt\nmove file.txt C:\\Users\\User\\Documents'
  },
  {
    id: 'cmd-ping',
    type: CommandType.CMD,
    category: 'شبكة',
    title: 'ping',
    short: 'اختبار الاتصال بخادم.',
    detail: 'يرسل حزم بيانات إلى عنوان IP أو اسم نطاق محدد وينتظر الردود. يستخدم للتحقق مما إذا كان جهاز معين متصلاً بالشبكة وقابلاً للوصول.',
    example: 'ping google.com'
  },
  {
    id: 'cmd-ipconfig',
    type: CommandType.CMD,
    category: 'شبكة',
    title: 'ipconfig / ifconfig',
    short: 'عرض معلومات تكوين الشبكة.',
    detail: 'يعرض تفاصيل محولات الشبكة، بما في ذلك عنوان IP وقناع الشبكة الفرعية والبوابة الافتراضية. `ipconfig` في Windows، و `ifconfig` أو `ip addr` في Unix.',
    example: 'ipconfig /all'
  },
  {
    id: 'cmd-echo',
    type: CommandType.CMD,
    category: 'نظام',
    title: 'echo',
    short: 'عرض رسالة نصية.',
    detail: 'يستخدم لطباعة سطر نصي إلى المخرجات القياسية (عادة الشاشة). مفيد في كتابة النصوص البرمجية (scripts).',
    example: 'echo "Hello, World!"'
  },
  {
    id: 'cmd-clear',
    type: CommandType.CMD,
    category: 'نظام',
    title: 'clear / cls',
    short: 'مسح شاشة الطرفية.',
    detail: 'يقوم بتنظيف جميع النصوص من شاشة الطرفية، مما يوفر شاشة نظيفة للعمل. `clear` في Unix، و `cls` (Clear Screen) في Windows.',
    example: 'clear'
  }
];
