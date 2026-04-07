import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  TrendingUp, 
  Target, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Activity, 
  Flame, 
  Star, 
  ShieldCheck, 
  ArrowUpRight, 
  Layers, 
  BarChart3, 
  PieChart, 
  ChevronRight,
  Monitor
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';

const StudentProgress = () => {
  const semesterProgress = 72;
  const attendanceRate = 94;
  const currentGPA = 3.82;

  const subjects = [
    { name: 'Advanced Data Structures', code: 'CS301', score: 88, status: 'On Track', color: 'bg-indigo-600' },
    { name: 'Database Systems', code: 'CS302', score: 92, status: 'Excellent', color: 'bg-emerald-500' },
    { name: 'Quantum Ethics', code: 'QE101', score: 75, status: 'Needs Focus', color: 'bg-amber-500' },
    { name: 'Discrete Mathematics', code: 'MA201', score: 84, status: 'On Track', color: 'bg-blue-600' },
  ];

  return (
    <DashboardLayout role="Student">
      <div className="space-y-12 max-w-[1400px] mx-auto pb-40 mt-10 px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-100 rotate-6 group hover:rotate-0 transition-transform duration-500">
                 <TrendingUp className="h-10 w-10 text-white animate-bounce-slow" />
              </div>
              <div className="space-y-1">
                 <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-1 italic">PROGRESS RADAR</h1>
                 <p className="text-slate-400 font-bold flex items-center gap-2 uppercase tracking-widest text-[10px]">
                    <Activity className="h-4 w-4 text-emerald-500" /> Continuous Performance Monitoring :: Active Cycle
                 </p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <Button variant="outline" className="h-16 px-8 rounded-2xl border-slate-100 font-black text-slate-400 hover:bg-slate-50 hover:text-slate-900">
                 Download Transcript
              </Button>
              <Button className="h-16 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-black px-12 shadow-2xl shadow-slate-200 transition-all active:scale-95">
                 Generate Insight Report
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[3rem] bg-white overflow-hidden p-10 group hover:shadow-2xl transition-all duration-500">
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Ranking</p>
                    <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black">#12</div>
                 </div>
                 <div className="text-center space-y-2">
                    <p className="text-6xl font-black text-slate-900 tracking-tighter italic">3.82</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weighted GPA Nexus</p>
                 </div>
                 <div className="pt-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase mb-3">
                       <span className="text-slate-300">Target Range</span>
                       <span className="text-emerald-500">4.0 Goal</span>
                    </div>
                    <Progress value={95} className="h-3 bg-slate-50" indicatorClassName="bg-emerald-500 shadow-lg shadow-emerald-100" />
                 </div>
              </div>
           </Card>

           <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[3rem] bg-indigo-600 overflow-hidden p-10 group hover:-translate-y-2 transition-all duration-500">
              <div className="space-y-10 relative z-10">
                 <div className="flex items-center justify-between text-indigo-200">
                    <p className="text-[10px] font-black uppercase tracking-widest">Cycle Velocity</p>
                    <Flame className="h-6 w-6 animate-pulse" />
                 </div>
                 <div className="space-y-4">
                    <p className="text-5xl font-black text-white tracking-tighter leading-tight italic uppercase">High <br/> Momentum</p>
                    <p className="text-indigo-200 font-bold text-xs opacity-80 leading-relaxed">Your submission rate is 40% faster than the department average this month.</p>
                 </div>
                 <Button variant="ghost" className="w-full h-14 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] border border-white/10 transition-all">
                    View Speed Metrics
                 </Button>
              </div>
              <Activity className="absolute bottom-0 right-0 h-48 w-48 text-white/5 -mb-20 -mr-16 rotate-12" />
           </Card>

           <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[3rem] bg-white overflow-hidden p-10 group hover:shadow-2xl transition-all duration-500">
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagement Rate</p>
                    <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                       <ShieldCheck className="h-5 w-5" />
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                    <p className="text-6xl font-black text-slate-900 tracking-tighter italic">94%</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Attendance Score</p>
                 </div>
                 <div className="pt-4 flex items-center justify-center gap-2">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1.5 font-black text-[10px]">ELITE RADIUS</Badge>
                    <Badge className="bg-slate-50 text-slate-300 border-none px-3 py-1.5 font-black text-[10px]">NO INFRACTIONS</Badge>
                 </div>
              </div>
           </Card>
        </div>

        <div className="space-y-8">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic flex items-center gap-3">
                 <Layers className="h-6 w-6 text-indigo-600" /> Active Course Trajectories
              </h2>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Real-time sync established</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjects.map((sub, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100/50 border border-transparent hover:border-indigo-50 transition-all group overflow-hidden relative">
                   <div className="relative z-10 flex items-center justify-between mb-8">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{sub.code}</p>
                         <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase italic">{sub.name}</h3>
                      </div>
                      <div className="text-right">
                         <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{sub.score}%</p>
                         <p className="text-[10px] font-black text-slate-300 uppercase mt-1 tracking-widest">{sub.status}</p>
                      </div>
                   </div>
                   <div className="relative z-10 space-y-4">
                      <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${sub.color}`} style={{ width: `${sub.score}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(j => (
                               <div key={j} className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                                  {j}
                               </div>
                            ))}
                            <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">
                               +4
                            </div>
                         </div>
                         <button className="text-[10px] font-black text-slate-300 hover:text-indigo-600 uppercase tracking-widest flex items-center gap-2 transition-colors">
                            Deep Audit <ArrowUpRight className="h-3 w-3" />
                         </button>
                      </div>
                   </div>
                   <Monitor className="absolute -bottom-10 -right-10 h-32 w-32 text-slate-50 group-hover:text-indigo-50/50 transition-colors duration-500" />
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[4rem] p-16 text-center space-y-10 group hover:bg-white hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 cursor-pointer">
           <div className="h-24 w-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center mx-auto text-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-1000">
              <Star className="h-10 w-10 fill-current" />
           </div>
           <div className="space-y-4">
              <h3 className="text-4xl font-black text-slate-300 uppercase tracking-tighter italic group-hover:text-slate-900 transition-colors">Career Propulsion Suite</h3>
              <p className="text-slate-200 group-hover:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed uppercase text-[10px] tracking-widest">Unlock predictive AI insights based on your academic footprint. Predictive modeling for 2025 internships now available.</p>
              <div className="pt-6">
                 <Button className="h-16 px-16 rounded-[2rem] bg-indigo-50 text-indigo-300 group-hover:bg-black group-hover:text-white font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl shadow-indigo-100/10">
                    Propel Career Profile <ChevronRight className="ml-2 h-4 w-4" />
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProgress;