import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Rocket, 
  Search, 
  Filter, 
  BookMarked, 
  Plus, 
  ChevronRight, 
  Target, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Users, 
  Calendar, 
  Globe, 
  Monitor, 
  Fingerprint, 
  Activity, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  Award,
  BookOpen
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
import { toast } from 'sonner';

interface OpenCourse {
  id: string;
  code: string;
  name: string;
  faculty: string;
  department: string;
  credits: number;
  availableSeats: number;
  totalSeats: number;
}

const availableCourses: OpenCourse[] = [
  { id: '1', code: 'CS501', name: 'Quantum Machine Learning', faculty: 'Dr. Sarah Chen', department: 'Computer Science', credits: 4, availableSeats: 5, totalSeats: 30 },
  { id: '2', code: 'ART204', name: 'Digital Renaissance', faculty: 'Prof. Julian Vane', department: 'Fine Arts', credits: 3, availableSeats: 12, totalSeats: 25 },
  { id: '3', code: 'BIO108', name: 'Synthetic Genomics', faculty: 'Dr. Elena Rossi', department: 'Biology', credits: 4, availableSeats: 0, totalSeats: 40 },
  { id: '4', code: 'ECON330', name: 'Algorithmic Game Theory', faculty: 'Prof. Mike Ross', department: 'Economics', credits: 3, availableSeats: 18, totalSeats: 35 },
];

const StudentEnrollSubjects = () => {
  const [courses, setCourses] = useState(availableCourses);

  const handleEnroll = (id: string, name: string) => {
    toast.success("Enrollment Synchronized!", {
      description: `Course "${name}" is now pending administrative verified approval.`,
    });
  };

  return (
    <DashboardLayout role="Student">
      <div className="space-y-12 max-w-[1400px] mx-auto pb-40 mt-10 px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-slate-900 rounded-[3rem] p-12 shadow-2xl shadow-slate-300 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />
           
           <div className="relative z-10 flex items-center gap-10">
              <div className="h-28 w-28 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-black/20 rotate-12 group hover:rotate-0 transition-transform duration-700">
                 <Rocket className="h-14 w-14 text-white animate-pulse" />
              </div>
              <div className="space-y-4">
                 <h1 className="text-6xl font-black text-white tracking-tighter leading-none mb-2 italic">ENROLLMENT NEXUS</h1>
                 <p className="text-indigo-300 font-bold flex items-center gap-3 uppercase tracking-widest text-[11px]">
                    <Sparkles className="h-4 w-4 text-emerald-400" /> Forge your academic trajectory for Semester Fall 2024
                 </p>
              </div>
           </div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
              <div className="p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] flex items-center gap-8 px-10">
                 <div className="text-center">
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest leading-none mb-3">Enrolled Credits</p>
                    <p className="text-4xl font-black text-white leading-none">12 <span className="text-lg text-white/40">/ 18</span></p>
                 </div>
                 <div className="h-10 w-px bg-white/10" />
                 <div className="text-center">
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest leading-none mb-3">Target GPA</p>
                    <p className="text-4xl font-black text-emerald-400 leading-none">3.9</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-4 space-y-6">
              <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] bg-white p-8">
                 <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Manifest Search</CardTitle>
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                       <Input 
                         placeholder="Scrub subjects..." 
                         className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-black text-slate-800 focus-visible:ring-indigo-500"
                       />
                    </div>
                 </CardHeader>
                 <CardContent className="p-0 space-y-3">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-2 mb-4 italic">Sub-Sector Departments</p>
                    {['Computer Science', 'Fine Arts', 'Biology', 'Economics', 'Applied Physics', 'Quantum Ethics'].map((dept, i) => (
                       <button key={i} className={`w-full p-4 flex items-center justify-between rounded-2xl transition-all group ${
                         i === 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                       }`}>
                          <span className="text-xs font-black uppercase tracking-widest">{dept}</span>
                          <CheckCircle2 className={`h-4 w-4 ${i === 0 ? 'text-indigo-500 opacity-100' : 'opacity-0 group-hover:opacity-30'}`} />
                       </button>
                    ))}
                 </CardContent>
              </Card>

              <div className="p-10 bg-indigo-600 rounded-[3rem] text-white space-y-8 relative overflow-hidden group shadow-2xl shadow-indigo-200">
                 <Zap className="absolute top-0 right-0 h-40 w-40 text-white/5 -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="space-y-2 relative z-10">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Fast-Track Advisor</h3>
                    <p className="text-indigo-100 font-bold text-xs leading-relaxed opacity-80">System analytics recommend "Advanced Data Ethics" based on your 2023 performance metrics.</p>
                 </div>
                 <Button className="w-full h-14 bg-white text-indigo-600 hover:bg-black hover:text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all relative z-10 group/adv">
                    Auto-Generate Path <Sparkles className="ml-2 h-4 w-4 group-hover/adv:rotate-12" />
                 </Button>
              </div>
           </div>

           <div className="lg:col-span-8 space-y-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[3rem] bg-white group hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row">
                   <div className="p-10 flex-1 space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="space-y-2">
                            <div className="flex items-center gap-3">
                               <Badge className="bg-slate-100 text-slate-400 border-none font-black text-[10px] uppercase px-3 py-1.5 rounded-lg">{course.code}</Badge>
                               <Badge className="bg-indigo-50 text-indigo-600 border-none font-black text-[10px] uppercase px-3 py-1.5 rounded-lg flex items-center gap-2">
                                  <Award className="h-3 w-3" /> {course.credits} Credits Units
                               </Badge>
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                         </div>
                         <div className="flex flex-col items-center md:items-end">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 italic">Instructor Core</p>
                            <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
                               <div className="h-6 w-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                  <Users className="h-3 w-3 text-white" />
                               </div>
                               <span className="text-xs font-black text-slate-700">{course.faculty}</span>
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Department Nexus</p>
                            <p className="text-xs font-black text-slate-900 uppercase">{course.department}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Engagement Rate</p>
                            <p className="text-xs font-black text-slate-900 uppercase">92% Positive</p>
                         </div>
                         <div className="space-y-4 md:col-span-2">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                               <span className="text-slate-400">Survival Capacity</span>
                               <span className={course.availableSeats < 10 ? 'text-rose-600' : 'text-emerald-600'}>
                                  {course.availableSeats} Units Remaining
                               </span>
                            </div>
                            <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                               <div 
                                 className={`h-full rounded-full ${course.availableSeats === 0 ? 'bg-slate-200' : 'bg-indigo-600'}`} 
                                 style={{ width: `${(course.availableSeats / course.totalSeats) * 100}%` }}
                               />
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="md:w-64 bg-slate-50 border-l border-slate-100 p-10 flex flex-col items-center justify-center gap-6 group-hover:bg-indigo-50 transition-colors">
                      <Button 
                        disabled={course.availableSeats === 0}
                        onClick={() => handleEnroll(course.id, course.name)}
                        className={`w-full h-16 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-xl ${
                          course.availableSeats === 0 
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                          : 'bg-indigo-600 text-white hover:bg-black shadow-indigo-100 hover:shadow-black/20'
                        }`}
                      >
                         {course.availableSeats === 0 ? 'Manifest Closed' : 'INITIATE ENROLL'}
                      </Button>
                      <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                         View Curriculum Brief <ArrowRight className="h-3 w-3" />
                      </button>
                   </div>
                </Card>
              ))}

              <div className="py-24 border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center text-center space-y-10 group hover:border-indigo-100 hover:bg-indigo-50/20 transition-all cursor-pointer">
                 <div className="h-28 w-28 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-slate-100 group-hover:text-indigo-500 group-hover:rotate-[360deg] transition-all duration-1000 group-hover:scale-110">
                    <Monitor className="h-14 w-14" />
                 </div>
                 <div className="space-y-3">
                    <h3 className="text-4xl font-black text-slate-200 uppercase tracking-tighter group-hover:text-slate-900 transition-colors italic">Access Deep Archives</h3>
                    <p className="text-slate-200 group-hover:text-slate-400 font-bold max-w-sm mx-auto leading-relaxed uppercase text-[10px] tracking-widest">Loading global course repository from previous cycles...</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentEnrollSubjects;