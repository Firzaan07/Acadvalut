import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Trash2, 
  Edit2, 
  BookOpen, 
  Tags, 
  Filter,
  MoreVertical,
  Code,
  Atom,
  Settings2,
  Cpu,
  Bookmark,
  FileText,
  Users
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '../../components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../../components/ui/alert-dialog';
import { toast } from 'sonner';

interface SubjectData {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  faculty: string;
}

const initialSubjects: SubjectData[] = [
  { id: '1', code: 'CS301', name: 'Data Structures & Algorithms', department: 'Computer Science', credits: 4, type: 'Core', faculty: 'Prof. Alice Johnson' },
  { id: '2', code: 'EE402', name: 'Microcontrollers', department: 'Electrical Engineering', credits: 3, type: 'Core', faculty: 'Dr. Robert Brown' },
  { id: '3', code: 'CS102', name: 'Intro to Python Coding', department: 'Computer Science', credits: 2, type: 'Elective', faculty: 'Dr. Sarah Wilson' },
  { id: '4', code: 'ME201', name: 'Thermodynamics Lab', department: 'Mechanical Engineering', credits: 2, type: 'Lab', faculty: 'Mark Thompson' },
  { id: '5', code: 'CS505', name: 'Artificial Intelligence', department: 'Computer Science', credits: 4, type: 'Core', faculty: 'Dr. Sarah Wilson' },
];

const AdminSubjects = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>(initialSubjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof SubjectData; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof SubjectData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedSubjects = useMemo(() => {
    let result = [...subjects];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.code.toLowerCase().includes(query) || 
        s.department.toLowerCase().includes(query)
      );
    }

    if (sortConfig) {
      result.sort((a, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [subjects, searchQuery, sortConfig]);

  const handleDeleteSubject = (id: string, name: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    toast.success(`${name} has been removed from curriculum.`);
  };

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100/50 rounded-xl shadow-sm border border-violet-100">
               <BookOpen className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Curriculum Registry</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base font-medium">
                Manage academic courses, credits, and syllabus distribution.
              </p>
            </div>
          </div>
          <Button onClick={() => toast.info("New Course Designer...")} className="bg-violet-600 hover:bg-violet-700 h-11 px-8 rounded-xl shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95">
            <Plus className="mr-2 h-5 w-5" /> Design Subject
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[ 
             { label: 'Courses Active', value: subjects.length, icon: FileText, color: 'text-violet-600', bg: 'bg-violet-50/50' },
             { label: 'Lab Sessions', value: 3, icon: Cpu, color: 'text-amber-600', bg: 'bg-amber-50/50' },
             { label: 'Elective Selection', value: 12, icon: Tags, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
             { label: 'Core Curricula', value: 45, icon: Atom, color: 'text-indigo-600', bg: 'bg-indigo-50/50' }
           ].map((stat, i) => (
             <Card key={i} className="border border-slate-100 shadow-sm bg-white overflow-hidden group">
               <CardContent className="p-5 flex items-center justify-between">
                  <div className="z-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3 group-hover:text-slate-600 transition-colors">{stat.label}</p>
                    <p className="text-3xl font-black text-slate-900 flex items-baseline gap-1">
                       {stat.value}
                       <span className="text-xs text-slate-400 font-bold tracking-tight">/ Q1</span>
                    </p>
                  </div>
                  <div className={`h-14 w-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center border border-white shadow-sm ring-4 ring-slate-50 group-hover:rotate-12 transition-transform`}>
                    <stat.icon className="h-7 w-7" />
                  </div>
               </CardContent>
             </Card>
           ))}
        </div>

        <Card className="shadow-2xl shadow-slate-200/50 border-none overflow-hidden rounded-3xl">
          <CardHeader className="pb-6 px-8 bg-white border-b border-slate-50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="relative w-full lg:w-[480px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <Input 
                  placeholder="Seach by subject name, unique code, or domain..." 
                  className="pl-12 h-14 bg-slate-50/50 border-none rounded-2xl focus-visible:ring-violet-600 focus-visible:bg-white transition-all text-base placeholder:text-slate-400 shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="ghost" className="h-14 px-6 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 hover:text-violet-600">
                    <Filter className="mr-3 h-5 w-5" /> Filter by Type
                 </Button>
                 <Button variant="outline" className="h-14 px-6 rounded-2xl border-slate-200 font-bold text-slate-700 hover:border-violet-600 transition-all active:scale-95 shadow-sm">
                    Bulk Import
                 </Button>
                 <div className="h-10 w-[1px] bg-slate-100 mx-2" />
                 <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl text-slate-400 hover:bg-slate-100 active:bg-slate-200">
                    <Settings2 className="h-6 w-6" />
                 </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/40">
                  <TableRow className="hover:bg-transparent h-16 pointer-events-none">
                    <TableHead className="w-[380px] pl-10">
                      <button className="flex items-center text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] pointer-events-auto hover:text-violet-600 transition-colors" onClick={() => handleSort('name')}>
                        Subject Profile {sortConfig?.key === 'name' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                      </button>
                    </TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Unique Code</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Category</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Credit Hours</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Assigned Faculty</TableHead>
                    <TableHead className="text-right pr-10 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Management</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedSubjects.map((subject) => (
                    <TableRow key={subject.id} className="group hover:bg-violet-50/30 border-slate-50 transition-all h-20">
                      <TableCell className="pl-10">
                        <div className="flex items-center gap-5">
                           <div className="h-12 w-12 rounded-[1.25rem] bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm group-hover:border-violet-300 group-hover:bg-violet-50 transition-all duration-500">
                              {subject.type === 'Core' ? <Bookmark className="h-5 w-5 text-violet-500" /> : subject.type === 'Lab' ? <Cpu className="h-5 w-5 text-amber-500" /> : <Tags className="h-5 w-5 text-emerald-500" />}
                           </div>
                           <div className="flex flex-col">
                              <span className="font-bold text-slate-800 text-base leading-tight group-hover:text-violet-900 transition-colors">{subject.name}</span>
                              <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest mt-1 group-hover:text-violet-400 transition-colors">{subject.department}</span>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="px-3 py-1 font-mono text-xs font-black tracking-widest text-slate-500 border-slate-200 bg-white shadow-sm rounded-lg group-hover:border-violet-200 group-hover:text-violet-600 transition-colors">
                           {subject.code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <Badge 
                           className={
                             subject.type === 'Core' ? 'bg-violet-100 text-violet-700 hover:bg-violet-200 border-none px-3 font-bold' : 
                             subject.type === 'Lab' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-none px-3 font-bold' : 
                             'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3 font-bold'
                           }
                         >
                           {subject.type}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700 group-hover:bg-violet-100 group-hover:text-violet-700 transition-colors">{subject.credits}</span>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 truncate overflow-hidden group-hover:bg-violet-200 group-hover:text-violet-700 transition-colors">
                               {subject.faculty.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{subject.faculty}</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                          <Button variant="outline" size="icon" className="h-10 w-10 border-slate-200 rounded-xl hover:text-violet-600 hover:border-violet-200 hover:bg-white active:scale-95 transition-all shadow-sm" onClick={() => toast.info(`Editing ${subject.name}`)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:text-slate-900">
                                <MoreVertical className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-none shadow-2xl">
                              <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em] py-3 px-3">Subject Parameters</DropdownMenuLabel>
                              <DropdownMenuItem className="py-3 px-3 rounded-xl focus:bg-violet-50 focus:text-violet-700 cursor-pointer font-bold flex items-center gap-3">
                                 <FileText className="h-4 w-4" /> Syllabus Configuration
                              </DropdownMenuItem>
                              <DropdownMenuItem className="py-3 px-3 rounded-xl focus:bg-violet-50 focus:text-violet-700 cursor-pointer font-bold flex items-center gap-3">
                                 <Users className="h-4 w-4 shadow-sm" /> Enrollment Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="my-2 bg-slate-50" />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button className="flex items-center w-full px-3 py-3 text-sm font-black text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all outline-none gap-3 active:scale-[0.98]">
                                    <Trash2 className="h-4 w-4" /> Remove from Registry
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-[2.5rem] p-10 border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
                                  <AlertDialogHeader className="pb-4">
                                    <AlertDialogTitle className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Eliminate course from <br/> academic registry?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-slate-500 pt-4 text-base font-medium leading-relaxed">
                                      Attention: Removing <strong>{subject.name} ({subject.code})</strong> will immediately de-enroll all active students and purge historical grade data for this term.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="pt-10 flex gap-3">
                                    <AlertDialogCancel className="h-14 flex-1 border-none bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all text-base">Retain Course</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteSubject(subject.id, subject.name)} className="h-14 flex-1 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 shadow-xl shadow-rose-200 active:scale-95 transition-all text-base">
                                      Purge Registry
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredAndSortedSubjects.length === 0 && (
              <div className="py-40 text-center flex flex-col items-center">
                 <div className="h-28 w-28 bg-violet-50/50 border border-violet-100 rounded-[2.5rem] flex items-center justify-center mb-10 group shadow-inner">
                    <Search className="h-12 w-12 text-violet-200 group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <h3 className="font-black text-slate-800 text-2xl tracking-tighter">No subjects found</h3>
                 <p className="text-slate-400 font-bold max-w-sm mt-3 px-10 leading-relaxed">We couldn't locate any records matching your criteria. Try resetting the curriculum filters.</p>
                 <Button variant="link" onClick={() => setSearchQuery('')} className="mt-8 text-violet-600 font-black text-base hover:no-underline hover:text-violet-700 group flex items-center gap-2">
                    <Plus className="h-5 w-5" /> All Subjects
                 </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSubjects;
