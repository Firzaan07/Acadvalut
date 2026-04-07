import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Settings, 
  Shield, 
  Database, 
  Globe, 
  Bell, 
  Smartphone, 
  Zap, 
  Lock, 
  Users, 
  Mail, 
  Activity, 
  Cloud, 
  Monitor, 
  Terminal, 
  Key, 
  Fingerprint, 
  Cpu, 
  Server, 
  Clock, 
  Save, 
  Eraser, 
  RotateCcw,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  Layers,
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('platform');

  const handleSave = () => {
    toast.success("Synchronizing Configuration Matrix...", {
      description: "Vault core settings updated across cluster nodes.",
    });
  };

  const menuItems = [
    { id: 'platform', icon: Globe, label: 'Platform Core', desc: 'Unified branding, localization, and DNS config.' },
    { id: 'security', icon: Shield, label: 'Cyber Security', desc: 'Auth protocols, MFA, and firewall policies.' },
    { id: 'database', icon: Database, label: 'Nexus Hub', desc: 'Redis clustering, SQL replication, and migration ops.' },
    { id: 'comms', icon: Bell, label: 'Signal Comms', desc: 'SMTP relays, push notification webhooks, and SMS clusters.' },
    { id: 'logs', icon: Activity, label: 'Ops Log', desc: 'Real-time telemetry and error monitoring streams.' }
  ];

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-12 max-w-[1400px] mx-auto pb-40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-6">
           <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-100 rotate-12 group hover:rotate-0 transition-transform cursor-pointer">
                 <Settings className="h-10 w-10 text-white animate-spin-slow" />
              </div>
              <div className="space-y-1">
                 <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2">Vault Apex Config</h1>
                 <p className="text-slate-400 font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Fingerprint className="h-4 w-4 text-emerald-500" /> Admin Override Mode : Active Node 07
                 </p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => toast.info("Resetting local state to cluster defaults...")} className="h-16 px-8 rounded-2xl border-2 border-slate-100 font-black text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
                 <RotateCcw className="mr-3 h-5 w-5" /> Rollback
              </Button>
              <Button onClick={handleSave} className="h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-black px-12 shadow-2xl shadow-emerald-200 transition-all active:scale-95 group">
                 <Save className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" /> Commit Changes
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-3 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-6 flex flex-col items-start gap-4 rounded-[2rem] transition-all duration-500 group ${
                    activeTab === item.id 
                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300 -translate-y-1' 
                    : 'bg-white hover:bg-slate-50 text-slate-500 border border-slate-100 hover:border-slate-300'
                  }`}
                >
                   <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                     activeTab === item.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-slate-900'
                   }`}>
                      <item.icon className="h-6 w-6" />
                   </div>
                   <div className="text-left space-y-1">
                      <p className="font-black text-sm uppercase tracking-widest">{item.label}</p>
                      <p className={`text-[10px] font-bold leading-tight ${activeTab === item.id ? 'text-slate-400' : 'text-slate-300'}`}>
                         {item.desc}
                      </p>
                   </div>
                </button>
              ))}
              
              <div className="mt-10 p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100/50 space-y-4">
                 <p className="text-[10px] font-black uppercase text-emerald-800 tracking-widest flex items-center gap-2">
                    <Zap className="h-3 w-3" /> System Health
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <p className="text-[10px] font-bold text-emerald-600">CLUSTER STATUS</p>
                       <p className="text-[10px] font-black text-emerald-800">OPTIMAL</p>
                    </div>
                    <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[94%]" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-9">
              <Card className="border-none shadow-[0_40px_100px_-30px_rgba(0,0,0,0.05)] rounded-[3rem] bg-white overflow-hidden p-0">
                 <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 leading-none mb-2 capitalize tracking-tight">{activeTab} Interface</h2>
                       <p className="text-slate-400 text-sm font-bold flex items-center gap-2">Adjust system-wide parameters for the {activeTab} sub-module.</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-600 border-none font-black text-[10px] uppercase tracking-widest p-3 rounded-xl flex items-center gap-2">
                       <Monitor className="h-4 w-4" /> Live Connection
                    </Badge>
                 </div>

                 <CardContent className="p-10">
                    {activeTab === 'platform' && (
                      <div className="space-y-10">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4 group">
                               <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-600">Platform Identity</Label>
                               <div className="relative">
                                  <Monitor className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200" />
                                  <Input 
                                    defaultValue="AcadVault Enterprise Portal" 
                                    className="h-16 pl-16 bg-slate-50 border-none rounded-2xl font-black text-slate-800 focus-visible:ring-emerald-500 transition-all"
                                  />
                               </div>
                            </div>
                            <div className="space-y-4 group">
                               <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-600">Base Origin URL</Label>
                               <div className="relative">
                                  <Globe className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200" />
                                  <Input 
                                    defaultValue="https://portal.acadvault.edu" 
                                    className="h-16 pl-16 bg-slate-50 border-none rounded-2xl font-black text-slate-800 focus-visible:ring-emerald-500 transition-all"
                                  />
                               </div>
                            </div>
                         </div>

                         <div className="p-8 border-2 border-slate-50 rounded-[2rem] space-y-8">
                            <div className="flex items-center justify-between">
                               <div className="space-y-1">
                                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                     <Layers className="h-4 w-4 text-emerald-500" /> Global Maintenance Protocol
                                  </h3>
                                  <p className="text-slate-400 text-xs font-bold leading-relaxed pr-8">Force redirect all incoming traffic to the "Station Down" splash screen across all regions.</p>
                               </div>
                               <Switch className="data-[state=checked]:bg-rose-500" />
                            </div>
                            <div className="h-px bg-slate-50" />
                            <div className="flex items-center justify-between">
                               <div className="space-y-1">
                                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                     <Mail className="h-4 w-4 text-emerald-500" /> Academic Auto-Enrolley
                                  </h3>
                                  <p className="text-slate-400 text-xs font-bold leading-relaxed pr-8">Permit students to auto-enroll via verified institutional email domains without manual triage.</p>
                               </div>
                               <Switch defaultChecked className="data-[state=checked]:bg-emerald-500" />
                            </div>
                         </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                      <div className="space-y-10">
                         <div className="p-8 bg-rose-50/30 border-2 border-rose-50 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
                            <div className="h-20 w-20 bg-rose-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-rose-200 shrink-0">
                               <Shield className="h-10 w-10" />
                            </div>
                            <div className="flex-1 space-y-2 text-center md:text-left">
                               <h3 className="text-xl font-black text-rose-900 uppercase tracking-tight">Security Hardening Status</h3>
                               <p className="text-rose-700/60 font-bold text-xs">Environment is currently running under "High Alert" security policies. 3 Unauthorized attempts neutralized in the last 24h.</p>
                            </div>
                            <Button className="h-12 bg-rose-900 text-white rounded-xl px-8 font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shrink-0">
                               Leak Check
                            </Button>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                               { label: 'Session TTL', value: '48H', icon: Clock },
                               { label: 'MFA REQUIRED', value: 'YES', icon: Fingerprint },
                               { label: 'KEY ROTATION', value: '30D', icon: Key }
                            ].map((stat, i) => (
                               <div key={i} className="p-8 border-2 border-slate-50 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-emerald-100 transition-colors group">
                                  <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                                     <stat.icon className="h-6 w-6" />
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                                     <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                    )}

                    {activeTab !== 'platform' && activeTab !== 'security' && (
                       <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                             <Terminal className="h-10 w-10" />
                          </div>
                          <div className="space-y-2">
                             <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest italic">Encrypted Module</h3>
                             <p className="text-slate-200 text-xs font-bold font-mono">INTERFACE_REQUEST_SENT :: WAITING_FOR_APEX_KEY ...</p>
                          </div>
                       </div>
                    )}
                 </CardContent>
                 
                 <div className="p-10 border-t border-slate-50 bg-slate-50/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
                          <Activity className="h-6 w-6 text-emerald-500" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-wider leading-none mb-1">Last Deployment Successful</p>
                          <p className="text-slate-400 text-[10px] font-bold">Node 0x82f handled 2.4k requests without latency spikes.</p>
                       </div>
                    </div>
                    <Button variant="ghost" className="h-12 rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] hover:text-emerald-600 hover:bg-emerald-50 group">
                       View Registry Logs <ArrowRight className="ml-3 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
