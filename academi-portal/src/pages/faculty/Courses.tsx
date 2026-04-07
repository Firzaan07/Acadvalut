import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  BookOpen, 
  Search, 
  Grid, 
  List, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Layers, 
  BadgeCheck, 
  ExternalLink, 
  Plus,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: string;
  students: number;
  schedule: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}

const initialCourses: Course[] = [
  { id: '1', code: 'CS301', name: 'Advanced Data Structures', department: 'Computer Science', semester: 'Sem 5', students: 45, schedule: 'Mon, Wed 10:00 AM', status: 'Active' },
  { id: '2', code: 'CS302', name: 'Database Management Systems', department: 'Computer Science', semester: 'Sem 5', students: 38, schedule: 'Tue, Thu 02:00 PM', status: 'Active' },
  { id: '3', code: 'MATH201', name: 'Discrete Mathematics', department: 'Mathematics', semester: 'Sem 3', students: 52, schedule: 'Fri 09:00 AM', status: 'Completed' },
  { id: '4', code: 'CS405', name: 'Artificial Intelligence', department: 'Computer Science', semester: 'Sem 7', students: 30, schedule: 'Mon 01:00 PM', status: 'Upcoming' },
];

const FacultyCourses = () => {
  const [courses] = useState(initialCourses);

  return (
    <DashboardLayout role="Faculty">
      <div className="space-y-10 max-w-[1400px] mx-auto pb-20 mt-6 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
                 <BookMarked className="h-8 w-8" />
              </div>
              <div>
                 <h1 className="text-3xl font-black text-slate-900 tracking-tighter">My Curriculum Nexus</h1>
                 <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Academic Year 2024-25</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                 <Input 
                   placeholder="Scout courses..." 
                   className="pl-10 h-14 w-[280px] bg-slate-50 border-none rounded-xl font-bold text-slate-600 focus-visible:ring-blue-500"
                 />
              </div>
              <Button onClick={() => toast.info("Initializing course proposal wizard...")} className="h-14 px-8 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                 <Plus className="mr-2 h-4 w-4" /> Propose Course
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {courses.map((course) => (
             <Card key={course.id} className="border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] bg-white group hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <CardHeader className="p-8 pb-4">
                   <div className="flex items-center justify-between mb-6">
                      <Badge className={`rounded-lg px-3 py-1.5 border-none font-black text-[10px] uppercase tracking-widest ${
                        course.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                        course.status === 'Upcoming' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                         {course.status}
                      </Badge>
                      <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-300 hover:bg-blue-600 hover:text-white transition-all">
                         <ExternalLink className="h-5 w-5" />
                      </button>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{course.code}</p>
                      <CardTitle className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight line-clamp-2">{course.name}</CardTitle>
                   </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6 flex-1">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Layers className="h-3 w-3" /> Dept
                         </p>
                         <p className="text-xs font-black text-slate-800 uppercase line-clamp-1">{course.department}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl space-y-1 text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 justify-end">
                            <BadgeCheck className="h-3 w-3" /> Cohort
                         </p>
                         <p className="text-xs font-black text-slate-800 uppercase">{course.semester}</p>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs">
                         <span className="font-bold text-slate-400 flex items-center gap-2"><User className="h-4 w-4" /> Enrolled Cadets</span>
                         <span className="font-black text-slate-900">{course.students} / 60</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-blue-600 rounded-full shadow-lg shadow-blue-200" 
                           style={{ width: `${(course.students / 60) * 100}%` }}
                         />
                      </div>
                   </div>

                   <div className="flex items-center gap-3 p-4 bg-blue-50/30 rounded-2xl text-blue-700">
                      <Clock className="h-4 w-4 shrink-0" />
                      <p className="text-[11px] font-black uppercase tracking-tight">{course.schedule}</p>
                   </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                   <Button variant="outline" className="w-full h-14 rounded-xl border-2 border-slate-50 font-black text-xs uppercase tracking-[0.2em] group/btn hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                      Enter Lecture Space <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                   </Button>
                </CardFooter>
             </Card>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyCourses;
