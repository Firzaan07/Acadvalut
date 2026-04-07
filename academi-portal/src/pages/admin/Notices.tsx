import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Bell, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Eye, 
  Edit, 
  Megaphone, 
  Calendar, 
  Pin, 
  Flag, 
  Users, 
  Target,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { toast } from 'sonner';

interface NoticeData {
  id: string;
  title: string;
  category: 'Academic' | 'Administrative' | 'Event' | 'Holiday';
  date: string;
  author: string;
  priority: 'High' | 'Medium' | 'Low';
  target: 'All' | 'Faculty' | 'Students';
  status: 'Published' | 'Draft';
}

const initialNotices: NoticeData[] = [
  { id: '1', title: 'Annual Cultural Fest 2024 Dates Announced', category: 'Event', date: '2024-03-25', author: 'Admin Office', priority: 'Medium', target: 'All', status: 'Published' },
  { id: '2', title: 'Mid-Semester Break Schedule', category: 'Holiday', date: '2024-03-20', author: 'Registrar', priority: 'High', target: 'All', status: 'Published' },
  { id: '3', title: 'New Faculty Recruitment Guidelines', category: 'Administrative', date: '2024-03-18', author: 'HR Dept', priority: 'Low', target: 'Faculty', status: 'Published' },
  { id: '4', title: 'Semester End Examination Revised Timeline', category: 'Academic', date: '2024-03-22', author: 'Exam Controller', priority: 'High', target: 'Students', status: 'Draft' },
  { id: '5', title: 'Guest Lecture on Quantum Computing', category: 'Academic', date: '2024-04-02', author: 'CS Dept', priority: 'Medium', target: 'Students', status: 'Published' },
];

const AdminNotices = () => {
  const [notices, setNotices] = useState(initialNotices);

  const handleDelete = (id: string, title: string) => {
    setNotices(notices.filter(n => n.id !== id));
    toast.success(`Notice "${title}" archived.`);
  };

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-10 max-w-[1400px] mx-auto pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-6">
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-100 rotate-3 group hover:rotate-0 transition-transform">
                 <Megaphone className="h-8 w-8 text-white" />
              </div>
              <div>
                 <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">Bulletin Commander</h1>
                 <p className="text-slate-500 font-bold flex items-center gap-2">
                    <Pin className="h-4 w-4 text-amber-500" /> Broadcasting critical intel to {initialNotices.length} active channels.
                 </p>
              </div>
           </div>
           <Button onClick={() => toast.info("Composing Official Dispatch...")} className="h-16 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-black px-12 shadow-2xl shadow-slate-200 transition-all active:scale-95 group">
              <Plus className="mr-3 h-7 w-7 group-hover:rotate-90 transition-transform duration-500" /> New Broadcast
           </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Active Alerts', val: notices.filter(n => n.status === 'Published').length, color: 'text-amber-600', bg: 'bg-amber-100' },
             { label: 'High Priority', val: notices.filter(n => n.priority === 'High').length, color: 'text-rose-600', bg: 'bg-rose-100' },
             { label: 'Scheduled', val: notices.filter(n => n.status === 'Draft').length, color: 'text-blue-600', bg: 'bg-blue-100' }
           ].map((s, i) => (
             <Card key={i} className="border-none shadow-sm rounded-3xl p-2 bg-white hover:shadow-lg transition-shadow overflow-hidden group">
                <CardContent className="p-6 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">{s.label}</p>
                      <p className="text-4xl font-black text-slate-900 leading-none tracking-tighter">{s.val}</p>
                   </div>
                   <div className={`h-14 w-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-12`}>
                      <Bell className="h-7 w-7" />
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>

        <div className="space-y-6">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
              <div className="relative w-full md:w-[450px]">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                 <Input 
                   placeholder="Scrutinize archives for specific bulletins..." 
                   className="h-16 pl-14 bg-white border-slate-100 rounded-[1.5rem] focus-visible:ring-amber-500 text-base font-bold shadow-sm placeholder:text-slate-300 transition-all"
                 />
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="outline" className="h-16 px-8 rounded-2xl border-slate-100 font-bold text-slate-500 bg-white hover:bg-slate-50 hover:text-amber-600">
                    Category Filter
                 </Button>
                 <Button size="icon" variant="ghost" className="h-16 w-16 rounded-2xl bg-white text-slate-300 hover:text-slate-900 border border-slate-100">
                    <FileText className="h-6 w-6" />
                 </Button>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {notices.map((notice) => (
                <Card key={notice.id} className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white group hover:-translate-x-2 transition-transform duration-500 overflow-hidden">
                   <CardContent className="p-0 flex flex-col lg:flex-row">
                      <div className={`lg:w-3 ${
                        notice.priority === 'High' ? 'bg-rose-500' : 
                        notice.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1 p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                         <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                               <Badge className="rounded-lg bg-slate-50 text-slate-500 border-none font-black text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-none">{notice.category}</Badge>
                               <Badge className={`rounded-lg border-none font-black text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-none ${
                                 notice.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                               }`}>{notice.status}</Badge>
                               {notice.priority === 'High' && <Badge className="bg-rose-50 text-rose-600 border-none rounded-lg px-3 py-1.5 font-black text-[10px] flex items-center gap-1.5"><Flag className="h-3 w-3" /> URGENT</Badge>}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-amber-600 transition-colors uppercase tracking-tight">{notice.title}</h3>
                            <div className="flex flex-wrap items-center gap-6 text-[11px] font-black text-slate-300 uppercase tracking-widest">
                               <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-1.5 rounded-full"><Users className="h-3.5 w-3.5" /> Target: {notice.target}</div>
                               <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-1.5 rounded-full"><Calendar className="h-3.5 w-3.5" /> Published: {notice.date}</div>
                               <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-1.5 rounded-full"><Clock className="h-3.5 w-3.5" /> Intel by: {notice.author}</div>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 lg:border-l lg:border-slate-50 lg:pl-10">
                            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-300 hover:text-amber-600 hover:bg-white hover:shadow-lg transition-all active:scale-90">
                               <Eye className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-300 hover:text-blue-600 hover:bg-white hover:shadow-lg transition-all active:scale-90">
                               <Edit className="h-6 w-6" />
                            </Button>
                            <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-300 hover:bg-white hover:shadow-lg transition-all group/opt">
                                     <MoreVertical className="h-7 w-7 transition-transform group-hover/opt:rotate-90" />
                                  </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end" className="w-64 p-3 rounded-2xl border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white">
                                  <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-300 tracking-[0.25em] py-4 px-3">Dispatch Ops</DropdownMenuLabel>
                                  <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-amber-50 focus:text-amber-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Pin className="h-4 w-4" /> Toggle Global Pin</DropdownMenuItem>
                                  <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-amber-50 focus:text-amber-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Target className="h-4 w-4" /> Modify Target Cohort</DropdownMenuItem>
                                  <DropdownMenuSeparator className="my-2 bg-slate-50" />
                                  <DropdownMenuItem onClick={() => handleDelete(notice.id, notice.title)} className="py-4 px-4 rounded-xl text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Trash2 className="h-4 w-4" /> Archive Bulletin</DropdownMenuItem>
                               </DropdownMenuContent>
                            </DropdownMenu>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
              
              <button onClick={() => toast.info("Bulletins Refreshing...")} className="group py-12 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center gap-6 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-700 cursor-pointer">
                 <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-[360deg] transition-all 1000 duration-1000 shadow-inner">
                    <Target className="h-10 w-10" />
                 </div>
                 <div className="text-center space-y-2">
                    <p className="font-black text-slate-300 group-hover:text-amber-600 transition-colors uppercase tracking-[0.4em] text-xs">Load Historical Data</p>
                    <p className="text-slate-200 text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 justify-center">Access global message repository <ArrowRight className="h-3 w-3" /></p>
                 </div>
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminNotices;
