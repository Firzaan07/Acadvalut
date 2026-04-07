import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  CreditCard, 
  Search, 
  ArrowUpDown, 
  MoreVertical, 
  Download, 
  Receipt, 
  History, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Filter, 
  Printer, 
  IdCard, 
  Wallet,
  Calendar
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

interface FeeRecord {
  id: string;
  name: string;
  rollNo: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  category: 'Tuition' | 'Exam' | 'Hostel' | 'Other';
}

const initialFees: FeeRecord[] = [
  { id: '1', name: 'John Doe', rollNo: 'CS2021001', amount: 45000, dueDate: '2024-04-15', status: 'Paid', category: 'Tuition' },
  { id: '2', name: 'Emma Davis', rollNo: 'EE2021042', amount: 12000, dueDate: '2024-03-30', status: 'Pending', category: 'Exam' },
  { id: '3', name: 'Michael Chen', rollNo: 'CS2022015', amount: 45000, dueDate: '2024-04-15', status: 'Paid', category: 'Tuition' },
  { id: '4', name: 'Sophia Wilson', rollNo: 'ME2021008', amount: 25000, dueDate: '2024-03-10', status: 'Overdue', category: 'Hostel' },
  { id: '5', name: 'James Smith', rollNo: 'CS2020055', amount: 45000, dueDate: '2024-04-15', status: 'Pending', category: 'Tuition' },
];

const AdminFees = () => {
  const [fees, setFees] = useState(initialFees);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = fees.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-8 animate-in fade-in duration-1000">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className="h-16 w-16 bg-emerald-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200 rotation-12 transition-transform hover:rotate-0">
                <Wallet className="h-8 w-8 text-white" />
             </div>
             <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">Finance Dashboard</h1>
                <p className="text-slate-500 font-bold flex items-center gap-2">
                   <Clock className="h-4 w-4" /> Real-time liquidity monitor for academic year 2024-25.
                </p>
             </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <Button variant="outline" className="h-14 px-8 rounded-3xl border-slate-200 font-black text-slate-600 hover:bg-slate-50 group">
                <History className="mr-3 h-5 w-5 text-slate-400 group-hover:text-emerald-600" /> Audit Logs
             </Button>
             <Button onClick={() => toast.info("Opening Invoice Designer...")} className="h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black px-10 shadow-xl shadow-emerald-100 transition-all active:scale-95 group">
                <Plus className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform" /> Create Bill
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Total Revenue', val: '$1.24M', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Outstanding', val: '$84K', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
             { label: 'Collections', val: '92%', icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Pending Apps', val: '142', icon: Receipt, color: 'text-amber-600', bg: 'bg-amber-50' }
           ].map((s, i) => (
             <Card key={i} className="border-none shadow-sm rounded-3xl group overflow-hidden bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-7 flex items-center justify-between relative overflow-hidden">
                   <div className="z-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 leading-none">{s.label}</p>
                      <p className="text-3xl font-black text-slate-900 leading-none">{s.val}</p>
                   </div>
                   <div className={`h-14 w-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm border border-white/50`}>
                      <s.icon className="h-7 w-7" />
                   </div>
                   <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-slate-50/50 rounded-full group-hover:scale-150 transition-transform duration-1000" />
                </CardContent>
             </Card>
           ))}
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-3xl">
           <CardHeader className="p-12 pb-8 border-b border-white/40">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                 <div className="relative w-full lg:w-[600px]">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300" />
                    <Input 
                      placeholder="Identify payee via ID, name or unique reference..." 
                      className="h-20 pl-16 bg-white/80 border-none rounded-[2rem] focus-visible:ring-emerald-600 focus-visible:bg-white text-lg placeholder:text-slate-400 font-bold transition-all shadow-inner"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center gap-4">
                    <Button variant="ghost" className="h-20 px-8 rounded-[2rem] font-black text-slate-500 hover:bg-white group border border-transparent hover:border-slate-100 transition-all">
                       <Filter className="mr-4 h-6 w-6 text-slate-400 group-hover:text-emerald-600" /> Refined Logic
                    </Button>
                    <div className="h-12 w-[2px] bg-slate-100 mx-2 invisible lg:visible" />
                    <Button variant="outline" size="icon" className="h-20 w-20 rounded-[2rem] border-none bg-white shadow-sm text-slate-400 hover:text-emerald-600 hover:scale-105 active:scale-95 transition-all">
                       <Printer className="h-8 w-8" />
                    </Button>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <div className="overflow-x-auto min-h-[500px]">
                 <Table>
                    <TableHeader className="bg-slate-50/20">
                       <TableRow className="h-24 border-none hover:bg-transparent pointer-events-none">
                          <TableHead className="w-[400px] pl-12 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Transaction Profile</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] pointer-events-auto"><button className="flex items-center gap-2 hover:text-emerald-600 transition-colors">Amount Due <ArrowUpDown className="h-4 w-4" /></button></TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Deadline</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Category</TableHead>
                          <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Governance Status</TableHead>
                          <TableHead className="pr-12 text-right text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Gov Control</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((f) => (
                        <TableRow key={f.id} className="group h-28 border-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 rounded-3xl">
                          <TableCell className="pl-12">
                             <div className="flex items-center gap-6">
                                <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center font-black text-xl shadow-inner transition-all duration-700 group-hover:rotate-[360deg] ${
                                  f.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                                  f.status === 'Overdue' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                   {f.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-xl font-black text-slate-900 leading-none mb-2 group-hover:text-emerald-700 transition-colors">{f.name}</span>
                                   <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{f.rollNo} Registry</span>
                                </div>
                             </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                                <span className="text-2xl font-black text-slate-900 group-hover:scale-110 transition-transform origin-left">
                                   ${f.amount.toLocaleString()}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Currency: USD</span>
                             </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-slate-300" />
                                <span className={`text-sm font-black ${f.status === 'Overdue' ? 'text-rose-600 animate-pulse' : 'text-slate-700'}`}>{f.dueDate}</span>
                             </div>
                          </TableCell>
                          <TableCell>
                             <Badge variant="outline" className="rounded-xl px-4 py-1 border-slate-100 font-bold text-slate-500 uppercase text-[10px] tracking-widest bg-white shadow-sm">{f.category}</Badge>
                          </TableCell>
                          <TableCell>
                             <Badge className={`rounded-[1rem] px-6 py-2.5 font-black text-[10px] uppercase tracking-widest shadow-none border-none ${
                               f.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                               f.status === 'Overdue' ? 'bg-rose-100 text-rose-700 ring-4 ring-rose-50' : 'bg-amber-100 text-amber-700'
                             }`}>
                                {f.status} Deployment
                             </Badge>
                          </TableCell>
                          <TableCell className="pr-12 text-right">
                             <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-0 transition-all duration-700">
                                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-white hover:shadow-lg transition-all active:scale-90">
                                   <Download className="h-6 w-6" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-slate-50/50 text-slate-400 hover:bg-white hover:shadow-lg transition-all group/opt">
                                       <MoreVertical className="h-7 w-7 transition-transform group-hover/opt:rotate-90" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-72 p-3 rounded-2xl border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
                                     <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] py-4 px-4">Financial Actions</DropdownMenuLabel>
                                     <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer font-black flex items-center gap-4 text-sm"><IdCard className="h-5 w-5" /> Detailed Statement</DropdownMenuItem>
                                     <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer font-black flex items-center gap-4 text-sm"><CheckCircle2 className="h-5 w-5" /> Mark as Verified</DropdownMenuItem>
                                     <DropdownMenuSeparator className="my-3 bg-slate-50" />
                                     <DropdownMenuItem onClick={() => toast.info(`Issuing alert to ${f.name}`)} className="py-4 px-4 rounded-xl text-rose-500 focus:bg-rose-50 focus:text-rose-600 cursor-pointer font-black flex items-center gap-4 text-sm"><AlertCircle className="h-5 w-5" /> Enforce Penalty</DropdownMenuItem>
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
                 <div className="py-60 text-center flex flex-col items-center group">
                    <div className="h-32 w-32 bg-slate-50/80 rounded-[3rem] flex items-center justify-center mb-10 border border-slate-100 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-1000 shadow-inner">
                       <CreditCard className="h-14 w-14 text-slate-200" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Zero matching transactions</h3>
                    <p className="text-slate-400 font-bold max-w-sm mt-4 text-lg leading-relaxed px-10">We failed to locate any payables or receivables matching your current filter vector.</p>
                    <Button variant="link" onClick={() => setSearchTerm('')} className="mt-12 text-emerald-600 font-black text-xl hover:no-underline group/rst flex items-center gap-3">
                       Purge Filter State <Receipt className="h-6 w-6 group-hover/rst:translate-x-2 transition-transform" />
                    </Button>
                 </div>
              )}
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminFees;
