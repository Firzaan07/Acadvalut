import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar, 
  MoreVertical, 
  ArrowUpDown, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Users, 
  Filter, 
  Settings2, 
  Download, 
  Award,
  ShieldCheck
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
import { toast } from 'sonner';

interface ExamData {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  candidates: number;
}

const initialExams: ExamData[] = [
  { id: '1', name: 'Mid-Term Assessment 2024', subject: 'Data Structures', date: '2024-04-05', time: '10:00 AM', duration: '2 Hours', venue: 'Hall A', status: 'Scheduled', candidates: 120 },
  { id: '2', name: 'Final Theory Exam', subject: 'Microcontrollers', date: '2024-05-15', time: '02:00 PM', duration: '3 Hours', venue: 'Block C-102', status: 'Scheduled', candidates: 85 },
  { id: '3', name: 'Viva Voce (Practical)', subject: 'Python Lab', date: '2024-03-25', time: '09:00 AM', duration: '15 Mins/Student', venue: 'CS Lab 2', status: 'In Progress', candidates: 45 },
  { id: '4', name: 'Monthly Quiz 3', subject: 'Thermodynamics', date: '2024-03-20', time: '11:00 AM', duration: '1 Hour', venue: 'Room 305', status: 'Completed', candidates: 92 },
  { id: '5', name: 'Project Presentation', subject: 'AI Ethics', date: '2024-04-10', time: '10:00 AM', duration: '20 Mins', venue: 'Main Seminar Hall', status: 'Scheduled', candidates: 30 },
];

const AdminExams = () => {
  const [exams, setExams] = useState(initialExams);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = exams.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-8">
             <div className="h-20 w-20 bg-rose-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-rose-200 rotate-6 transition-transform hover:rotate-0 translate-y-2">
                <FileText className="h-10 w-10 text-white" />
             </div>
             <div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-3">Examination Center</h1>
                <p className="text-slate-500 font-bold text-lg flex items-center gap-3">
                   <ShieldCheck className="h-5 w-5 text-rose-500" /> Overseeing rigorous academic evaluatory standards.
                </p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" className="h-16 px-10 rounded-[2rem] font-black text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                <Calendar className="mr-3 h-6 w-6" /> Scheduler
             </Button>
             <Button onClick={() => toast.info("Opening Exam Configuration Wizard...")} className="h-16 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-black px-12 shadow-2xl transition-all active:scale-95 group">
                <Plus className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform" /> Draft Exam
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <Card className="border-none shadow-xl shadow-slate-100 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <CardContent className="p-8">
                 <div className="flex justify-between items-start mb-10">
                    <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-sm">
                       <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">Global Status</div>
                 </div>
                 <h3 className="text-5xl font-black mb-2 tracking-tighter tracking-widest">{exams.length}</h3>
                 <p className="text-white/70 font-bold text-sm uppercase tracking-widest leading-none">Cycles Configured</p>
              </CardContent>
           </Card>

           {[
             { label: 'Active Halls', val: '08', icon: BookOpen, color: 'text-rose-600', bg: 'bg-rose-50' },
             { label: 'Total Examinees', val: '1.2K', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
             { label: 'Completion Rate', val: '74%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           ].map((s, i) => (
             <Card key={i} className="border-none shadow-xl shadow-slate-100 rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 leading-none">{s.label}</p>
                      <p className="text-4xl font-black text-slate-900 leading-none">{s.val}</p>
                   </div>
                   <div className={`h-16 w-16 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform 700 duration-700 shadow-sm border border-white`}>
                      <s.icon className="h-8 w-8" />
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3.5rem] overflow-hidden bg-white/80 backdrop-blur-3xl">
           <CardHeader className="p-12 pb-8 border-b border-slate-50">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                 <div className="relative w-full xl:w-[700px]">
                    <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-7 w-7 text-slate-200" />
                    <Input 
                      placeholder="Locate exam via name, subject or venue code..." 
                      className="h-24 pl-20 bg-slate-50 border-none rounded-[2.5rem] focus-visible:ring-rose-600 focus-visible:bg-white text-xl placeholder:text-slate-300 font-bold transition-all shadow-inner"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center gap-4">
                    <Button variant="ghost" className="h-24 px-10 rounded-[2.5rem] font-black text-slate-400 hover:bg-white border border-transparent hover:border-slate-100 group transition-all">
                       <Filter className="mr-4 h-7 w-7 text-slate-200 group-hover:text-rose-600" /> Filter Engine
                    </Button>
                    <div className="h-16 w-[1px] bg-slate-100 mx-2" />
                    <Button size="icon" variant="outline" className="h-24 w-24 rounded-[2.5rem] border-none bg-slate-50 shadow-sm text-slate-300 hover:text-rose-600 hover:scale-105 active:scale-95 transition-all">
                       <Settings2 className="h-8 w-8" />
                    </Button>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <div className="overflow-x-auto min-h-[600px]">
                 <Table>
                    <TableHeader className="bg-slate-50/50">
                       <TableRow className="h-28 border-none hover:bg-transparent pointer-events-none">
                          <TableHead className="w-[450px] pl-12 text-[11px] font-black uppercase text-slate-300 tracking-[0.5em]">Examination Profile</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-300 tracking-[0.5em] pointer-events-auto"><button className="flex items-center gap-3 hover:text-rose-600 transition-colors">Timestamp <ArrowUpDown className="h-4 w-4" /></button></TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-300 tracking-[0.5em]">Location</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-300 tracking-[0.5em]">Enrolled</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-300 tracking-[0.5em]">Live Status</TableHead>
                          <TableHead className="pr-12 text-right text-[11px] font-black uppercase text-slate-300 tracking-[0.5em]">Command</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((e) => (
                        <TableRow key={e.id} className="group h-32 border-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-100/40 transition-all 700 duration-700">
                          <TableCell className="pl-12">
                             <div className="flex items-center gap-8">
                                <div className={`h-20 w-20 rounded-[2rem] flex items-center justify-center shadow-inner transition-all 1000 duration-1000 group-hover:rotate-[360deg] ${
                                  e.status === 'In Progress' ? 'bg-amber-100' : e.status === 'Completed' ? 'bg-emerald-100' : 'bg-slate-100'
                                }`}>
                                   {e.status === 'In Progress' ? <Clock className="h-10 w-10 text-amber-600 animate-spin-slow" /> : e.status === 'Completed' ? <CheckCircle2 className="h-10 w-10 text-emerald-600" /> : <BookOpen className="h-10 w-10 text-slate-400" />}
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-rose-700 transition-colors">{e.name}</span>
                                   <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="rounded-lg px-3 py-0.5 border-slate-100 font-black text-[10px] uppercase tracking-widest text-slate-300 bg-white group-hover:border-rose-100 group-hover:text-rose-400 transition-colors">{e.subject}</Badge>
                                      <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">• {e.duration}</span>
                                   </div>
                                </div>
                             </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col gap-1.5">
                                <span className="text-lg font-black text-slate-800 leading-none">{e.date}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                   <Clock className="h-3 w-3" /> {e.time}
                                </span>
                             </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-slate-100" />
                                <span className="text-base font-black text-slate-600 group-hover:text-slate-900 transition-colors">{e.venue}</span>
                             </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-slate-800">{e.candidates}</span>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Units</span>
                             </div>
                          </TableCell>
                          <TableCell>
                             <Badge className={`rounded-2xl px-8 py-3 font-black text-[11px] uppercase tracking-[0.2em] shadow-none border-none ${
                               e.status === 'In Progress' ? 'bg-amber-100 text-amber-700 ring-8 ring-amber-50' : 
                               e.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                               e.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
                             }`}>
                                {e.status}
                             </Badge>
                          </TableCell>
                          <TableCell className="pr-12 text-right">
                             <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transform translate-x-20 group-hover:translate-x-0 transition-all 700 duration-700">
                                <Button variant="ghost" size="icon" className="h-16 w-16 rounded-[1.5rem] bg-slate-50 text-slate-300 hover:text-rose-600 hover:bg-white hover:shadow-xl hover:scale-110 active:scale-90 transition-all">
                                   <Download className="h-7 w-7" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-16 w-16 rounded-[1.5rem] bg-slate-50/50 text-slate-300 hover:bg-white hover:shadow-xl transition-all group/opt">
                                       <MoreVertical className="h-8 w-8 transition-transform group-hover/opt:rotate-90" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-80 p-4 rounded-[2.5rem] border-none shadow-[0_48px_96px_-16px_rgba(0,0,0,0.3)] bg-white/95 backdrop-blur-xl">
                                     <DropdownMenuLabel className="text-[11px] font-black uppercase text-slate-300 tracking-[0.3em] py-5 px-5">Administrative Command</DropdownMenuLabel>
                                     <DropdownMenuItem className="py-5 px-6 rounded-2xl focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-5 text-sm transition-all"><Settings2 className="h-6 w-6" /> Reconfigure Exam</DropdownMenuItem>
                                     <DropdownMenuItem className="py-5 px-6 rounded-2xl focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-5 text-sm transition-all"><Users className="h-6 w-6" /> Management Candidates</DropdownMenuItem>
                                     <DropdownMenuSeparator className="my-4 bg-slate-50" />
                                     <DropdownMenuItem onClick={() => toast.info(`Archiving ${e.name}`)} className="py-5 px-6 rounded-2xl text-rose-600 focus:bg-rose-100 focus:text-rose-700 cursor-pointer font-black flex items-center gap-5 text-sm transition-all"><AlertCircle className="h-6 w-6" /> Emergency Cancellation</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                             </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                 </Table>
              </div>
              {filtered.length === 0 && (
                 <div className="py-80 text-center flex flex-col items-center group">
                    <div className="h-36 w-36 bg-slate-50 rounded-[3.5rem] flex items-center justify-center mb-12 border border-slate-100 group-hover:scale-125 group-hover:rotate-[720deg] transition-all 1000 duration-1000 shadow-inner">
                       <FileText className="h-16 w-16 text-slate-100" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter">Negative scan results</h3>
                    <p className="text-slate-400 font-bold max-w-md mt-6 text-xl leading-relaxed px-12">The examination registry contains zero entities matching your diagnostic search parameters.</p>
                    <Button variant="link" onClick={() => setSearchTerm('')} className="mt-16 text-rose-600 font-black text-2xl hover:no-underline group/rst flex items-center gap-4 transition-all">
                       Flush Filter Buffer <Settings2 className="h-7 w-7 group-hover/rst:rotate-180 transition-transform 700 duration-700" />
                    </Button>
                 </div>
              )}
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminExams;
