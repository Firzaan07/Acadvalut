import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Filter, 
  MoreVertical, 
  Search,
  UserCheck,
  UserMinus,
  AlertTriangle,
  ArrowUpDown,
  Download,
  Printer,
  History,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

interface AttendanceRecord {
  id: string;
  name: string;
  rollNo: string;
  dept: string;
  present: number;
  total: number;
  percentage: number;
  status: 'Critical' | 'Warning' | 'Good';
  lastMarked: string;
}

const initialRecords: AttendanceRecord[] = [
  { id: '1', name: 'John Doe', rollNo: 'CS2021001', dept: 'CS', present: 38, total: 45, percentage: 84.4, status: 'Good', lastMarked: '2024-03-20' },
  { id: '2', name: 'Emma Davis', rollNo: 'EE2021042', dept: 'EE', present: 22, total: 35, percentage: 62.8, status: 'Critical', lastMarked: '2024-03-19' },
  { id: '3', name: 'Michael Chen', rollNo: 'CS2022015', dept: 'CS', present: 42, total: 45, percentage: 93.3, status: 'Good', lastMarked: '2024-03-20' },
  { id: '4', name: 'Sophia Wilson', rollNo: 'ME2021008', dept: 'ME', present: 28, total: 40, percentage: 70.0, status: 'Warning', lastMarked: '2024-03-18' },
  { id: '5', name: 'James Smith', rollNo: 'CS2020055', dept: 'CS', present: 36, total: 45, percentage: 80.0, status: 'Good', lastMarked: '2024-03-20' },
];

const AdminAttendance = () => {
  const [records, setRecords] = useState(initialRecords);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = records.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-6">
             <div className="h-16 w-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200">
                <Calendar className="h-8 w-8 text-white" />
             </div>
             <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">Attendance Repository</h1>
                <p className="text-slate-500 font-bold flex items-center gap-2">
                   <Clock className="h-4 w-4" /> Real-time tracking for {records.length} enrolled cohorts.
                </p>
             </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <Button variant="outline" className="h-12 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 px-6">
                <History className="mr-2 h-4 w-4" /> Global Logs
             </Button>
             <Button variant="outline" className="h-12 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 px-6">
                <Printer className="mr-2 h-4 w-4" /> Print Reports
             </Button>
             <Button onClick={() => toast.info("Exporting Data...")} className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black px-8 shadow-xl shadow-blue-100 transition-all active:scale-95">
                <Download className="mr-3 h-5 w-5" /> Export Data Set
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
           {[
             { label: 'Today Absent', val: '12%', icon: UserMinus, color: 'text-rose-600', bg: 'bg-rose-50' },
             { label: 'Peak Compliance', val: '98%', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Critical Alert', val: '04', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
             { label: 'On-Time Faculty', val: '92%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' }
           ].map((s, i) => (
             <Card key={i} className="border-none shadow-sm rounded-3xl group overflow-hidden bg-white">
                <CardContent className="p-6 flex items-center justify-between relative overflow-hidden">
                   <div className="z-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{s.label}</p>
                      <p className="text-3xl font-black text-slate-900">{s.val}</p>
                   </div>
                   <div className={`h-14 w-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center transition-all 500 duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                      <s.icon className="h-7 w-7" />
                   </div>
                   <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform 700 duration-700" />
                </CardContent>
             </Card>
           ))}
        </div>

        <div className="px-4">
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
             <CardHeader className="p-10 pb-6 border-b border-slate-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                   <div className="relative w-full lg:w-[500px]">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                      <Input 
                        placeholder="Scan registry by name or identification..." 
                        className="h-16 pl-14 bg-slate-100/40 border-none rounded-2xl focus-visible:ring-blue-600 focus-visible:bg-white text-base placeholder:text-slate-400 font-bold transition-all shadow-inner"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                   </div>
                   <div className="flex items-center gap-4">
                      <Button variant="ghost" className="h-16 px-6 rounded-2xl font-black text-slate-500 hover:bg-slate-50 group">
                         <Filter className="mr-3 h-5 w-5 text-slate-400 group-hover:text-blue-600" /> Advanced Logic
                      </Button>
                      <Tabs defaultValue="all" className="w-[300px]">
                        <TabsList className="h-16 grid grid-cols-2 bg-slate-100/50 rounded-2xl p-1 gap-1">
                          <TabsTrigger value="all" className="h-14 font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-xl">Global View</TabsTrigger>
                          <TabsTrigger value="alerts" className="h-14 font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm rounded-xl">Low Attendance</TabsTrigger>
                        </TabsList>
                      </Tabs>
                   </div>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <div className="overflow-x-auto">
                   <Table>
                      <TableHeader className="bg-slate-50/50">
                         <TableRow className="h-20 border-none">
                            <TableHead className="w-[320px] pl-10 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Identity Profile</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]"><button className="flex items-center gap-2">Registry ID <ArrowUpDown className="h-3 w-3" /></button></TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Compliance</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Marked (P/T)</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Status</TableHead>
                            <TableHead className="pr-10 text-right text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Gov Control</TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((r) => (
                          <TableRow key={r.id} className="group h-24 border-slate-50 hover:bg-slate-50/50 transition-colors">
                            <TableCell className="pl-10">
                               <div className="flex items-center gap-5">
                                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm transition-transform group-hover:scale-110 ${
                                    r.status === 'Critical' ? 'bg-rose-100 text-rose-700' : 
                                    r.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                  }`}>
                                     {r.name.charAt(0)}
                                  </div>
                                  <div className="flex flex-col">
                                     <span className="text-base font-black text-slate-800 leading-none mb-1.5 group-hover:text-blue-700 transition-colors">{r.name}</span>
                                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{r.dept} Engineering Core</span>
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell>
                               <span className="font-mono text-sm font-black text-slate-400 group-hover:text-slate-600 transition-colors">{r.rollNo}</span>
                            </TableCell>
                            <TableCell>
                               <div className="flex items-center gap-4">
                                  <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                     <div className={`h-full transition-all duration-1000 group-hover:grow ${
                                       r.percentage < 75 ? 'bg-rose-500' : r.percentage < 85 ? 'bg-amber-500' : 'bg-emerald-500'
                                     }`} style={{ width: `${r.percentage}%` }} />
                                  </div>
                                  <span className="text-sm font-black text-slate-700">{r.percentage}%</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <div className="flex items-baseline gap-1">
                                  <span className="text-lg font-black text-slate-800">{r.present}</span>
                                  <span className="text-xs font-bold text-slate-300">/ {r.total} sessions</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <Badge className={`rounded-xl px-4 py-1.5 font-black text-[10px] uppercase tracking-tighter shadow-none border-none ${
                                 r.status === 'Critical' ? 'bg-rose-100 text-rose-700' : 
                                 r.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                               }`}>
                                  {r.status} Status
                               </Badge>
                            </TableCell>
                            <TableCell className="pr-10 text-right">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all 500 duration-500">
                                  <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold text-slate-500 hover:bg-white hover:text-blue-600 hover:border-blue-200">
                                     Audit Record
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl active:bg-slate-100">
                                     <MoreVertical className="h-5 w-5 text-slate-300" />
                                  </Button>
                               </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                   </Table>
                </div>
                {filtered.length === 0 && (
                   <div className="py-40 text-center flex flex-col items-center group">
                      <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 shadow-inner">
                         <Calendar className="h-10 w-10 text-slate-200" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight">Zero matching identities</h3>
                      <p className="text-slate-400 font-bold max-w-sm mt-3 leading-relaxed">We failed to locate any attendance metrics matching your search vector.</p>
                      <Button variant="link" onClick={() => setSearchTerm('')} className="mt-8 text-blue-600 font-black text-base hover:no-underline flex items-center gap-2 group/rst">
                         Reset Search Repository <ArrowRight className="h-4 w-4 group-hover/rst:translate-x-1 transition-transform" />
                      </Button>
                   </div>
                )}
             </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAttendance;
