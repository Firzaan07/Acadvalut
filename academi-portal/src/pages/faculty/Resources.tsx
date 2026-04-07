import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Library, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Download, 
  Trash2, 
  MoreVertical, 
  Eye, 
  Upload, 
  ExternalLink, 
  Folder, 
  Book, 
  LayoutGrid, 
  LayoutList, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  TrendingUp,
  Cloud,
  Layers,
  Monitor,
  Activity,
  ArrowRight,
  MonitorCheck,
  Zap,
  Tag
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

interface Resource {
  id: string;
  title: string;
  type: 'Note' | 'Video' | 'Link' | 'Slides';
  course: string;
  date: string;
  size: string;
  downloads: number;
}

const initialResources: Resource[] = [
  { id: '1', title: 'Data Structures 101 Lecture Notes', type: 'Note', course: 'CS301', date: '2024-03-20', size: '2.4 MB', downloads: 145 },
  { id: '2', title: 'Database Normalization Explained', type: 'Video', course: 'CS302', date: '2024-03-22', size: '450 MB', downloads: 82 },
  { id: '3', title: 'Interactive SQL Playground', type: 'Link', course: 'CS302', date: '2024-03-25', size: 'N/A', downloads: 210 },
  { id: '4', title: 'Graph Theory Implementation Slides', type: 'Slides', course: 'MATH201', date: '2024-03-18', size: '8.2 MB', downloads: 64 },
];

const FacultyResources = () => {
  const [resources, setResources] = useState(initialResources);

  const handleDelete = (id: string, title: string) => {
    setResources(resources.filter(r => r.id !== id));
    toast.success(`Resource "${title}" permanently removed from vault.`);
  };

  return (
    <DashboardLayout role="Faculty">
      <div className="space-y-12 max-w-[1400px] mx-auto pb-40 mt-10 px-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
           <div className="flex items-center gap-8">
              <div className="h-24 w-24 bg-rose-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-rose-100 -rotate-3 group hover:rotate-3 transition-transform duration-500 cursor-pointer">
                 <Library className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-2">
                 <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2 italic uppercase">Resource Nexus</h1>
                 <p className="text-slate-400 font-bold flex items-center gap-3 uppercase tracking-widest text-xs">
                    <MonitorCheck className="h-4 w-4 text-rose-500" /> Digital asset management for {resources.length} courses
                 </p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="p-1 px-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-6 shadow-sm">
                 <div className="flex flex-col items-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total Assets</p>
                    <p className="text-xl font-black text-slate-900">{resources.length}</p>
                 </div>
                 <div className="h-10 w-px bg-slate-50" />
                 <div className="flex flex-col items-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Downloads</p>
                    <p className="text-xl font-black text-slate-900">1.4k</p>
                 </div>
              </div>
              <Button onClick={() => toast.info("Initializing high-speed asset ingestion...")} className="h-20 bg-slate-900 hover:bg-black text-white rounded-[2.5rem] font-black px-16 shadow-2xl shadow-slate-200 transition-all active:scale-95 group">
                 <Upload className="mr-4 h-8 w-8 group-hover:-translate-y-1 transition-transform duration-500" /> Ingest Asset
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1 space-y-4">
              <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] bg-white p-6 sticky top-24">
                 <CardHeader className="p-0 mb-8 px-2 pt-2">
                    <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Filter Repository</CardTitle>
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-rose-500 transition-colors" />
                       <Input 
                         placeholder="Scrub records..." 
                         className="h-12 pl-10 bg-slate-50 border-none rounded-xl font-bold text-slate-600 focus-visible:ring-rose-500"
                       />
                    </div>
                 </CardHeader>
                 <CardContent className="p-0 space-y-2 px-2">
                    {[
                       { label: 'All Assets', icon: LayoutGrid, count: resources.length, active: true },
                       { label: 'Lecture Notes', icon: FileText, count: 12, active: false },
                       { label: 'Visual Streams', icon: Video, count: 5, active: false },
                       { label: 'External Links', icon: LinkIcon, count: 8, active: false },
                       { label: 'Cloud Syncs', icon: Folder, count: 3, active: false }
                    ].map((item, i) => (
                       <button key={i} className={`w-full p-4 flex items-center justify-between rounded-2xl transition-all group ${
                         item.active ? 'bg-rose-50 text-rose-700' : 'bg-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                       }`}>
                          <div className="flex items-center gap-4">
                             <item.icon className={`h-5 w-5 ${item.active ? 'text-rose-600' : 'text-slate-200 group-hover:text-slate-400'}`} />
                             <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                          </div>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${item.active ? 'bg-rose-100' : 'bg-slate-100 text-slate-300'}`}>{item.count}</span>
                       </button>
                    ))}
                 </CardContent>
              </Card>
           </div>

           <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {resources.map((resource) => (
                   <Card key={resource.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[3rem] bg-white group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                      <CardContent className="p-10 flex-1 space-y-8">
                         <div className="flex items-center justify-between">
                            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-xl ${
                              resource.type === 'Note' ? 'bg-blue-500 shadow-blue-100' : 
                              resource.type === 'Video' ? 'bg-indigo-500 shadow-indigo-100' : 
                              resource.type === 'Link' ? 'bg-emerald-500 shadow-emerald-100' : 'bg-amber-500 shadow-amber-100'
                            }`}>
                               {resource.type === 'Note' && <FileText className="h-8 w-8" />}
                               {resource.type === 'Video' && <Video className="h-8 w-8" />}
                               {resource.type === 'Link' && <LinkIcon className="h-8 w-8" />}
                               {resource.type === 'Slides' && <Layers className="h-8 w-8" />}
                            </div>
                            <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-slate-50 text-slate-300 hover:bg-white hover:shadow-lg transition-all group/opt">
                                     <MoreVertical className="h-6 w-6 transition-transform group-hover/opt:rotate-90" />
                                  </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end" className="w-56 p-3 rounded-2xl border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white">
                                  <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Download className="h-4 w-4" /> Download Local</DropdownMenuItem>
                                  <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-4 text-xs"><ExternalLink className="h-4 w-4" /> Direct Share URL</DropdownMenuItem>
                                  <DropdownMenuItem className="py-4 px-4 rounded-xl focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Tag className="h-4 w-4" /> Audit Metadata</DropdownMenuItem>
                                  <DropdownMenuSeparator className="my-2 bg-slate-50" />
                                  <DropdownMenuItem onClick={() => handleDelete(resource.id, resource.title)} className="py-4 px-4 rounded-xl text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-black flex items-center gap-4 text-xs"><Trash2 className="h-4 w-4" /> Purge Asset</DropdownMenuItem>
                               </DropdownMenuContent>
                            </DropdownMenu>
                         </div>

                         <div className="space-y-3">
                            <h3 className="text-2xl font-black text-slate-800 leading-tight uppercase tracking-tight group-hover:text-rose-600 transition-colors line-clamp-2">{resource.title}</h3>
                            <div className="flex flex-wrap items-center gap-4">
                               <Badge className="bg-slate-50 text-slate-400 border-none rounded-lg font-black text-[10px] tracking-widest px-3 py-1.5">{resource.course}</Badge>
                               <Badge className={`border-none rounded-lg font-black text-[10px] tracking-widest px-3 py-1.5 ${
                                 resource.type === 'Note' ? 'bg-blue-100 text-blue-700' :
                                 resource.type === 'Video' ? 'bg-indigo-100 text-indigo-700' :
                                 resource.type === 'Link' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                               }`}>{resource.type}</Badge>
                            </div>
                         </div>

                         <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-50">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Metadata</p>
                               <p className="text-xs font-black text-slate-800">{resource.size}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Captured</p>
                               <p className="text-xs font-black text-slate-800 uppercase text-ellipsis overflow-hidden">{resource.date}</p>
                            </div>
                            <div className="space-y-1 text-right">
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Ops</p>
                               <p className="text-xs font-black text-slate-800">{resource.downloads} Pings</p>
                            </div>
                         </div>
                      </CardContent>
                      <CardFooter className="p-0 border-t border-slate-50">
                         <Button variant="ghost" className="w-full h-16 rounded-none font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 hover:bg-rose-600 hover:text-white transition-all duration-300 group/btn">
                            Access Digital Core <Zap className="ml-3 h-4 w-4 group-hover/btn:animate-pulse" />
                         </Button>
                      </CardFooter>
                   </Card>
                 ))}

                 <div className="md:col-span-2 py-32 border-4 border-dashed border-slate-50 rounded-[4rem] bg-slate-50/20 flex flex-col items-center justify-center text-center space-y-10 group hover:bg-white hover:shadow-2xl hover:border-slate-100 transition-all cursor-pointer">
                    <div className="h-32 w-32 bg-slate-50 rounded-[3rem] shadow-inner flex items-center justify-center text-slate-100 group-hover:bg-rose-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                       <Cloud className="h-16 w-16" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-4xl font-black text-slate-200 uppercase tracking-tighter group-hover:text-slate-900 transition-colors">Historical Logs Offline</h3>
                       <p className="text-slate-200 group-hover:text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">Connect to the secondary backup array to retrieve assets purged before March 2024.</p>
                       <div className="pt-6 group-hover:scale-110 transition-transform">
                          <Button className="h-14 px-12 rounded-[1.5rem] bg-slate-100 text-slate-300 group-hover:bg-rose-900 group-hover:text-white font-black text-xs uppercase tracking-[0.3em]">
                             Initiate Uplink <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyResources;
