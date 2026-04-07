import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Building2, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Users, 
  GraduationCap, 
  Library,
  Box,
  LayoutGrid,
  Search,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

interface DeptData {
  id: string;
  name: string;
  code: string;
  head: string;
  facultyCount: number;
  studentCount: number;
  status: 'Active' | 'Under Review';
}

const initialDepts: DeptData[] = [
  { id: '1', name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. Sarah Wilson', facultyCount: 24, studentCount: 450, status: 'Active' },
  { id: '2', name: 'Electrical Engineering', code: 'EE', head: 'Dr. Robert Brown', facultyCount: 18, studentCount: 320, status: 'Active' },
  { id: '3', name: 'Mechanical Engineering', code: 'ME', head: 'Prof. Mark Thompson', facultyCount: 20, studentCount: 380, status: 'Active' },
  { id: '4', name: 'Civil Engineering', code: 'CE', head: 'Dr. Emily Carter', facultyCount: 15, studentCount: 290, status: 'Under Review' },
];

const AdminDepartments = () => {
  const [departments, setDepartments] = useState(initialDepts);

  const handleDelete = (id: string, name: string) => {
    setDepartments(departments.filter(d => d.id !== id));
    toast.success(`${name} disbanded.`);
  };

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-4">
              <Building2 className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-2xl" />
              Administrative Units
            </h1>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl px-1">
              Architect the university ecosystem by governing departments and their leadership.
            </p>
          </div>
          <Button onClick={() => toast.info("New Unit Designer...")} className="h-14 px-8 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-xl active:scale-95 transition-all mb-1">
            <Plus className="mr-3 h-5 w-5" /> Establish New Dept
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-3xl p-2 group hover:-translate-y-1 transition-transform">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                       <LayoutGrid className="h-6 w-6" />
                    </div>
                    <Badge className="bg-white/20 text-white border-none backdrop-blur-md px-3 font-bold">Total Units</Badge>
                 </div>
                 <h3 className="text-4xl font-black mb-1">{departments.length}</h3>
                 <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Departments Active</p>
              </CardContent>
           </Card>

           {[
             { label: 'Avg Enrollment', val: '~350', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Staff Strength', val: '77', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
             { label: 'Research Funds', val: '$2.4M', icon: Library, color: 'text-violet-600', bg: 'bg-violet-50' }
           ].map((s, i) => (
             <Card key={i} className="border-slate-100 shadow-sm rounded-3xl p-1 group hover:border-slate-200 transition-all">
                <CardContent className="p-6 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 leading-none">{s.label}</p>
                      <p className="text-3xl font-black text-slate-900 leading-none">{s.val}</p>
                   </div>
                   <div className={`h-14 w-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <s.icon className="h-7 w-7" />
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {departments.map((dept) => (
             <Card key={dept.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-white">
                <div className={`h-2 w-full ${dept.status === 'Active' ? 'bg-indigo-500' : 'bg-amber-400'}`} />
                <CardHeader className="p-8 pb-4">
                   <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest px-2 py-1 bg-indigo-50 rounded-lg">{dept.code}</span>
                            {dept.status === 'Under Review' && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-2 font-black text-[9px] uppercase tracking-tighter shadow-none">Review</Badge>}
                         </div>
                         <CardTitle className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors mt-2">{dept.name}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-slate-900 active:bg-slate-50 rounded-xl transition-all">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                   </div>
                   <CardDescription className="pt-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center font-bold text-slate-400 shadow-sm">
                         {dept.head.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wide leading-none mb-1">Head of Department</span>
                         <span className="text-sm font-black text-slate-700 leading-none">{dept.head}</span>
                      </div>
                   </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-6">
                   <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-6 mb-6">
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Users className="h-3 w-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Faculty</span>
                         </div>
                         <span className="text-xl font-black text-slate-800">{dept.facultyCount}</span>
                      </div>
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <GraduationCap className="h-3 w-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Students</span>
                         </div>
                         <span className="text-xl font-black text-slate-800">{dept.studentCount}</span>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-100 font-bold text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all hover:bg-indigo-50 group/arr">
                         View Details
                         <ArrowRight className="ml-2 h-4 w-4 group-hover/arr:translate-x-1 transition-transform" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-all" onClick={() => handleDelete(dept.id, dept.name)}>
                         <Trash2 className="h-5 w-5" />
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}
           
           <button onClick={() => toast.info("Establishing Wizard...")} className="group border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-indigo-400 hover:bg-slate-50/50 transition-all cursor-pointer">
              <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-all 300 duration-500">
                 <Plus className="h-8 w-8" />
              </div>
              <div className="text-center">
                 <p className="font-black text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-widest text-xs">New Foundation</p>
                 <p className="text-slate-300 text-[10px] font-bold mt-1">Initialize Departmental Core</p>
              </div>
           </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDepartments;
