import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Plus, 
  Upload, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical, 
  Trash2, 
  Download, 
  Eye, 
  Layers, 
  Zap, 
  Monitor, 
  Activity, 
  ChevronRight,
  TrendingUp,
  Cloud,
  ExternalLink,
  Target
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Assignment {
  id: string;
  title: string;
  course: string;
  deadline: string;
  submissions: number;
  totalStudents: number;
  status: 'Active' | 'Closed' | 'Draft';
  priority: 'High' | 'Medium' | 'Low';
}

const initialAssignments: Assignment[] = [
  { id: '1', title: 'Data Structures Lab 04', course: 'CS301', deadline: '2024-04-10', submissions: 32, totalStudents: 45, status: 'Active', priority: 'High' },
  { id: '2', title: 'DBMS Normalization Quiz', course: 'CS302', deadline: '2024-04-12', submissions: 15, totalStudents: 38, status: 'Active', priority: 'Medium' },
  { id: '3', title: 'Graph Theory Implementation', course: 'MATH201', deadline: '2024-03-25', submissions: 52, totalStudents: 52, status: 'Closed', priority: 'Low' },
  { id: '4', title: 'AI Ethics Review Paper', course: 'CS405', deadline: '2024-04-20', submissions: 0, totalStudents: 30, status: 'Draft', priority: 'Medium' },
];

const FacultyAssignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);

  const handleDelete = (id: string, title: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
    toast.success(`Assignment "${title}" archived.`);
  };

  return (
    <DashboardLayout role="Faculty">
      <div className="space-y-10 max-w-[1400px] mx-auto pb-20 mt-6 px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-6">
           <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-100 rotate-6 group hover:rotate-0 transition-transform">
                 <FileText className="h-10 w-10 text-white" />
              </div>
              <div className="space-y-2">
                 <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">Assignment Vanguard</h1>
                 <p className="text-slate-400 font-bold flex items-center gap-2 uppercase tracking-widest text-[11px]">
                    <Target className="h-4 w-4 text-indigo-500" /> Managing {assignments.length} Strategic Assessments
                 </p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <Button variant="outline" className="h-16 px-8 rounded-2xl border-slate-100 font-bold text-slate-500 bg-white hover:bg-slate-50 hover:text-indigo-600">
                 Global Gradebook
              </Button>
              <Button onClick={() => toast.info("Launching Mission Brief creator...")} className="h-16 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-black px-12 shadow-2xl shadow-slate-200 transition-all active:scale-95 group">
                 <Plus className="mr-3 h-7 w-7 group-hover:rotate-90 transition-transform duration-500" /> Deploy Task
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Active Tasks', val: assignments.filter(a => a.status === 'Active').length, color: 'text-emerald-600', icon: Zap, bg: 'bg-emerald-50' },
             { label: 'Submissions', val: assignments.reduce((acc, a) => acc + a.submissions, 0), color: 'text-indigo-600', icon: Activity, bg: 'bg-indigo-50' },
             { label: 'Due Soon', val: 2, color: 'text-rose-600', icon: Clock, bg: 'bg-rose-50' },
             { label: 'Engagement', val: '86%', color: 'text-amber-600', icon: TrendingUp, bg: 'bg-amber-50' }
           ].map((s, i) => (
             <Card key={i} className="border-none shadow-sm rounded-3xl p-2 bg-white group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                   <div className={`h-12 w-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110`}>
                      <s.icon className="h-6 w-6" />
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">{s.label}</p>
                   <p className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{s.val}</p>
                </CardContent>
             </Card>
           ))}
        </div>

        <div className="space-y-6">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
              <div className="relative w-full md:w-[450px] group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                 <Input 
                   placeholder="Scan assignment manifests..." 
                   className="h-16 pl-14 bg-white border-none rounded-[1.5rem] focus-visible:ring-indigo-500 text-base font-bold shadow-xl shadow-slate-100 placeholder:text-slate-300 transition-all font-mono"
                 />
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="ghost" className="h-16 px-8 rounded-2xl font-bold text-slate-400 hover:bg-white hover:text-indigo-600 hover:shadow-xl transition-all">
                    Show Archived Missions
                 </Button>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[3rem] bg-white group hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                   <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                         <div className={`lg:w-3 ${
                           assignment.status === 'Active' ? 'bg-emerald-500' : 
                           assignment.status === 'Closed' ? 'bg-slate-300' : 'bg-amber-500'
                         }`} />
                         <div className="flex-1 p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
                            <div className="flex-1 space-y-4">
                               <div className="flex flex-wrap items-center gap-3">
                                  <Badge className="rounded-lg bg-indigo-50 text-indigo-600 border-none font-black text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-none">{assignment.course}</Badge>
                                  <Badge className={`rounded-lg border-none font-black text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-none ${
                                    assignment.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                  }`}>{assignment.status}</Badge>
                                  {assignment.priority === 'High' && <Badge className="bg-rose-50 text-rose-600 border-none rounded-lg px-3 py-1.5 font-black text-[10px] flex items-center gap-1.5"><AlertCircle className="h-3 w-3" /> URGENT</Badge>}
                               </div>
                               <h3 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{assignment.title}</h3>
                               <div className="flex flex-wrap items-center gap-10 text-[11px] font-black text-slate-300 uppercase tracking-widest">
                                  <div className="flex items-center gap-3"><Users className="h-4 w-4" /> Enrolled: {assignment.totalStudents} Cadets</div>
                                  <div className="flex items-center gap-3"><Calendar className="h-4 w-4" /> Deadline: {assignment.deadline}</div>
                               </div>
                            </div>

                            <div className="lg:w-64 space-y-3">
                               <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                  <span className="text-slate-400">Completion Manifest</span>
                                  <span className="text-slate-900">{Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</span>
                               </div>
                               <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${
                                      assignment.status === 'Active' ? 'bg-indigo-600' : 'bg-slate-200'
                                    }`} 
                                    style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                                  />
                               </div>
                               <p className="text-[10px] font-bold text-slate-400 italic text-right">{assignment.submissions} verified file-sets received.</p>
                            </div>

                            <div className="flex items-center gap-3 lg:border-l lg:border-slate-50 lg:pl-10">
                               <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-300 hover:text-indigo-600 hover:bg-white hover:shadow-lg transition-all active:scale-90">
                                  <Eye className="h-6 w-6" />
                               </Button>
                               <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-300 hover:text-blue-600 hover:bg-white hover:shadow-lg transition-all active:scale-90">
                                  <Upload className="h-6 w-6" />
                               </Button>
                               <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                     <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-300 hover:bg-white hover:shadow-lg transition-all group/opt">
                                        <MoreVertical className="h-7 w-7 transition-transform group-hover/opt:rotate-90" />
                                     </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-64 p-3 rounded-2xl border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white">
                                     <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-300 tracking-[0.25em] py-4 px-3">Mission Ops</DropdownMenuLabel>
                                     <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-indigo-50 focus:text-indigo-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Download className="h-4 w-4" /> Export Raw Submissions</DropdownMenuItem>
                                     <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-indigo-50 focus:text-indigo-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Users className="h-4 w-4" /> Bulk Grading Wizard</DropdownMenuItem>
                                     <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-indigo-50 focus:text-indigo-700 cursor-pointer font-black flex items-center gap-4 text-xs"><CheckCircle2 className="h-4 w-4" /> Close Submissions</DropdownMenuItem>
                                     <DropdownMenuSeparator className="my-2 bg-slate-50" />
                                     <DropdownMenuItem onClick={() => handleDelete(assignment.id, assignment.title)} className="py-4 px-4 rounded-xl text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Trash2 className="h-4 w-4" /> Archive Mission</DropdownMenuItem>
                                  </DropdownMenuContent>
                               </DropdownMenu>
                            </div>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}

              <div className="py-20 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-8 bg-slate-50/20 group hover:bg-indigo-50/30 hover:border-indigo-100 transition-all cursor-pointer">
                 <div className="h-24 w-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-slate-100 group-hover:text-indigo-500 group-hover:rotate-[360deg] transition-all duration-1000 group-hover:scale-110">
                    <Cloud className="h-12 w-12" />
                 </div>
                 <div className="space-y-2">
                    <p className="font-black text-slate-300 uppercase tracking-[0.4em] text-xs">Access Archived Missions</p>
                    <p className="text-slate-200 text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 justify-center">Historical data streams available for audit <ChevronRight className="h-3 w-3" /></p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyAssignments;
