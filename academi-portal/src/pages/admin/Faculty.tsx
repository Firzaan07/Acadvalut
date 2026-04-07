import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Trash2, 
  Edit2, 
  ShieldCheck, 
  UserPlus, 
  Filter,
  MoreVertical,
  Mail,
  Smartphone,
  BookOpen,
  Briefcase,
  Award,
  LayoutDashboard,
  ClipboardList,
  Activity,
  BarChart3,
  Users,
  GraduationCap,
  Loader2
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
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../../components/ui/alert-dialog';
import { toast } from 'sonner';
import { adminService } from '../../services/api';
import { RecruitFacultyModal } from '../../components/RecruitFacultyModal';

interface FacultyData {
  _id: string;
  fullName: string;
  employeeId: string;
  email: string;
  department: string;
  designation: string;
  specialization: string;
  status: 'Active' | 'On Leave' | 'Retired';
}

const AdminFaculty = () => {
  const [faculty, setFaculty] = useState<FacultyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof FacultyData; direction: 'asc' | 'desc' } | null>(null);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllFaculty();
      if (response.success) {
        setFaculty(response.data || []);
      }
    } catch (error) {
      toast.error('Failed to load faculty directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "All Students", path: "/admin/students", icon: GraduationCap },
    { label: "All Faculty", path: "/admin/faculty", icon: Users },
    { label: "Assignments", path: "/admin/assignments", icon: ClipboardList },
    { label: "Activity Log", path: "/admin/activity", icon: Activity },
    { label: "Statistics", path: "/admin/statistics", icon: BarChart3 },
  ];

  const handleSort = (key: keyof FacultyData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedFaculty = useMemo(() => {
    let result = [...faculty];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.fullName.toLowerCase().includes(query) || 
        f.employeeId.toLowerCase().includes(query) || 
        f.department.toLowerCase().includes(query) ||
        f.specialization.toLowerCase().includes(query)
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [faculty, searchQuery, sortConfig]);

  const handleDeleteFaculty = async (id: string, name: string) => {
    try {
      const response = await adminService.deleteUser(id);
      if (response.success) {
        setFaculty(faculty.filter(f => f._id !== id));
        toast.success(`Faculty member ${name} has been removed from the registry.`);
      }
    } catch (error) {
      toast.error('Failed to delete faculty member');
    }
  };

  return (
    <DashboardLayout navItems={navItems} title="Faculty Directory" role="Admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100/50 rounded-xl">
               <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Faculty Management</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Directory of academic staff, specialized researchers, and teaching faculty.
              </p>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 h-11 px-6 shadow-sm shadow-blue-200">
            <UserPlus className="mr-2 h-4 w-4" /> Recruit Faculty
          </Button>
        </div>

        <RecruitFacultyModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchFaculty} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: 'Total Faculty', value: faculty.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Active Status', value: faculty.filter(f => f.status === 'Active').length, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Specializations', value: (new Set(faculty.map(f => f.specialization))).size, icon: Award, color: 'text-violet-600', bg: 'bg-violet-50' },
             { label: 'Dept. Heads', value: faculty.filter(f => f.designation === 'Department Head').length, icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' }
           ].map((stat, i) => (
             <Card key={i} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
               <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
               </CardContent>
             </Card>
           ))}
        </div>

        <Card className="shadow-lg border-slate-100 overflow-hidden">
          <CardHeader className="pb-4 px-6 bg-white border-b border-slate-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Find by name, employee ID, or specialized field..." 
                  className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-600 focus-visible:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50 px-4">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                 </Button>
                 <Button variant="secondary" className="h-11 border-slate-200 px-4">Import Data</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto min-h-[400px]">
              <Table>
                <TableHeader className="bg-slate-50/80 sticky top-0 z-10">
                  <TableRow className="hover:bg-transparent h-14">
                    <TableHead className="w-[320px] pl-6">
                      <button className="flex items-center text-xs font-black uppercase text-slate-500 tracking-wider hover:text-blue-600 transition-colors" onClick={() => handleSort('fullName')}>
                        Profile Information {sortConfig?.key === 'fullName' && <ArrowUpDown className="ml-2 h-3.5 w-3.5" />}
                      </button>
                    </TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500 tracking-wider">Employee ID</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500 tracking-wider">Department & Role</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500 tracking-wider">Specialization</TableHead>
                    <TableHead className="text-xs font-black uppercase text-slate-500 tracking-wider">Availability</TableHead>
                    <TableHead className="text-right pr-6 text-xs font-black uppercase text-slate-500 tracking-wider">Control Panel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                        <p className="mt-2 text-slate-500 font-medium">Synchronizing faculty directory...</p>
                      </TableCell>
                    </TableRow>
                  ) : filteredAndSortedFaculty.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center text-slate-500 font-medium">
                        No faculty members matched your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedFaculty.map((member) => (
                      <TableRow key={member._id} className="group hover:bg-blue-50/30 border-slate-50 transition-colors h-16">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-4">
                             <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm transition-transform group-hover:scale-105">
                                {member.fullName.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div className="flex flex-col">
                                <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{member.fullName}</span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                   <Mail className="h-3 w-3" /> {member.email}
                                </div>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="px-2 py-0.5 font-mono text-xs font-bold text-slate-600 border-slate-200 bg-white">
                             {member.employeeId}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold text-slate-800 leading-none">{member.designation}</span>
                              <span className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">{member.department}</span>
                           </div>
                        </TableCell>
                        <TableCell>
                           <span className="text-sm text-slate-600 font-medium italic">{member.specialization}</span>
                        </TableCell>
                        <TableCell>
                           <Badge 
                             className={
                               member.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100' : 
                               member.status === 'On Leave' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100' : 
                               'bg-slate-100 text-slate-700 border-slate-200'
                             }
                           >
                              <div className={`h-1.5 w-1.5 rounded-full mr-2 ${
                                member.status === 'Active' ? 'bg-emerald-500' : 
                                member.status === 'On Leave' ? 'bg-amber-500' : 'bg-slate-500'
                              }`} />
                             {member.status}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                  <MoreVertical className="h-4 w-4 text-slate-400" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 p-1">
                                <DropdownMenuLabel className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">Actions</DropdownMenuLabel>
                                <DropdownMenuItem className="flex items-center gap-2 focus:bg-blue-50 focus:text-blue-600 cursor-pointer rounded-md">
                                  <Edit2 className="h-3.5 w-3.5" /> Edit Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-md transition-colors font-medium">
                                      <Trash2 className="h-3.5 w-3.5" /> Remove Faculty
                                    </div>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-xl font-bold">Remove Faculty Member?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently remove <strong>{member.fullName}</strong> from the database. This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() => handleDeleteFaculty(member._id, member.fullName)}
                                      >
                                        Delete Record
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminFaculty;
