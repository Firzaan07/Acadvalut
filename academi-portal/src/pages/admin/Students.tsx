import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Trash2, 
  Edit2, 
  GraduationCap, 
  UserPlus, 
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  IdCard,
  MapPin,
  Mail,
  Smartphone,
  LayoutDashboard,
  ClipboardList,
  Activity,
  BarChart3,
  Users
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
import EnrollStudentModal from '../../components/EnrollStudentModal';
import { adminService } from '../../services/api';

interface StudentData {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  department: string;
  semester: number;
  status: 'Active' | 'On Leave' | 'Graduated';
  gpa: number;
}

const initialStudents: StudentData[] = [
  { id: '1', name: 'John Doe', rollNumber: 'CS2021001', email: 'john.d@univ.edu', department: 'Computer Science', semester: 6, status: 'Active', gpa: 3.8 },
  { id: '2', name: 'Emma Davis', rollNumber: 'EE2021042', email: 'e.davis@univ.edu', department: 'Electrical Engineering', semester: 4, status: 'Active', gpa: 3.5 },
  { id: '3', name: 'Michael Chen', rollNumber: 'CS2022015', email: 'm.chen@univ.edu', department: 'Computer Science', semester: 2, status: 'Active', gpa: 3.9 },
  { id: '4', name: 'Sophia Wilson', rollNumber: 'ME2021008', email: 's.wilson@univ.edu', department: 'Mechanical Engineering', semester: 6, status: 'On Leave', gpa: 3.2 },
  { id: '5', name: 'James Smith', rollNumber: 'CS2020055', email: 'j.smith@univ.edu', department: 'Computer Science', semester: 8, status: 'Graduated', gpa: 3.7 },
];

const AdminStudents = () => {
  const [students, setStudents] = useState<StudentData[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof StudentData; direction: 'asc' | 'desc' } | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "All Students", path: "/admin/students", icon: GraduationCap },
    { label: "All Faculty", path: "/admin/faculty", icon: Users },
    { label: "Assignments", path: "/admin/assignments", icon: ClipboardList },
    { label: "Activity Log", path: "/admin/activity", icon: Activity },
    { label: "Statistics", path: "/admin/statistics", icon: BarChart3 },
  ];

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await adminService.getAllStudents();
      if (response.success && response.data) {
        // Map backend User model to StudentData interface
        const mappedStudents: StudentData[] = response.data.map((s: any) => ({
          id: s._id,
          name: s.fullName,
          rollNumber: s.studentId || s.rollNumber || 'N/A',
          email: s.email,
          department: s.department || 'Unassigned',
          semester: s.semester || 1,
          status: s.status as any,
          gpa: s.gpa || 0
        }));
        setStudents(mappedStudents);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
      toast.error("Could not refresh student list");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  React.useEffect(() => {
    fetchStudents();
  }, []);

  const handleSort = (key: keyof StudentData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.rollNumber.toLowerCase().includes(query) || 
        s.department.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query)
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
  }, [students, searchQuery, sortConfig]);

  const handleDeleteStudent = (id: string, name: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast.success(`${name}'s enrollment has been cancelled.`);
  };

  return (
    <DashboardLayout navItems={navItems} title="Student Registry" role="Admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
               <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Student Registry</h1>
              <p className="text-muted-foreground mt-1">
                Centralized student lifecycle management and records.
              </p>
            </div>
          </div>
          <Button onClick={() => setIsEnrollModalOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Enroll Student
          </Button>
        </div>

        <EnrollStudentModal 
          isOpen={isEnrollModalOpen} 
          onClose={() => setIsEnrollModalOpen(false)} 
          onSuccess={fetchStudents}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Card className="bg-emerald-50/50 border-emerald-100">
              <CardContent className="p-4 flex items-center gap-4">
                 <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
                 <div>
                    <div className="text-2xl font-bold text-emerald-950">{students.filter(s => s.status === 'Active').length}</div>
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Active Students</div>
                 </div>
              </CardContent>
           </Card>
           <Card className="bg-blue-50/50 border-blue-100">
              <CardContent className="p-4 flex items-center gap-4">
                 <div className="p-2 bg-blue-100 rounded-lg"><Clock className="h-5 w-5 text-blue-600" /></div>
                 <div>
                    <div className="text-2xl font-bold text-blue-950">{(students.map(s => s.gpa).reduce((a, b) => a + b, 0) / students.length).toFixed(2)}</div>
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Average GPA</div>
                 </div>
              </CardContent>
           </Card>
           <Card className="bg-amber-50/50 border-amber-100">
              <CardContent className="p-4 flex items-center gap-4">
                 <div className="p-2 bg-amber-100 rounded-lg"><MapPin className="h-5 w-5 text-amber-600" /></div>
                 <div>
                    <div className="text-2xl font-bold text-amber-950">3</div>
                    <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Departments</div>
                 </div>
              </CardContent>
           </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3 px-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-[400px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter by name, ID, or email..." 
                  className="pl-10 h-10 ring-offset-background border-slate-200 focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" className="border-slate-200">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                 </Button>
                 <Button variant="outline" className="border-slate-200">Export PDF</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[300px] h-12">
                      <button className="flex items-center font-bold text-slate-700 hover:text-primary transition-colors pl-4" onClick={() => handleSort('name')}>
                        Full Name {sortConfig?.key === 'name' && <ArrowUpDown className="ml-2 h-3.5 w-3.5" />}
                      </button>
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">Roll/ID</TableHead>
                    <TableHead className="font-bold text-slate-700">Department</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Semester</TableHead>
                    <TableHead className="font-bold text-slate-700">Academic Standing</TableHead>
                    <TableHead className="text-right pr-6 font-bold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedStudents.map((student) => (
                    <TableRow key={student.id} className="group hover:bg-slate-50/50 border-slate-100 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full border bg-white flex items-center justify-center font-bold text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div className="flex flex-col">
                              <span className="font-semibold text-slate-900 leading-none">{student.name}</span>
                              <span className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                 <Mail className="h-3 w-3" /> {student.email}
                              </span>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-[10px] tracking-tighter bg-slate-100">
                           {student.rollNumber}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium">{student.department}</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 rounded bg-slate-100 text-xs font-bold text-slate-700">Sem {student.semester}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                           <Badge 
                             className={
                               student.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                               student.status === 'On Leave' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : 
                               'bg-blue-100 text-blue-700 hover:bg-blue-100'
                             }
                           >
                             {student.status}
                           </Badge>
                           <div className="flex flex-col h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${(student.gpa / 4.0) * 100}%` }}></div>
                           </div>
                           <span className="text-xs font-bold">{student.gpa}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-primary" onClick={() => toast.info(`Viewing ${student.name}`)}>
                            <IdCard className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Student Portal</DropdownMenuLabel>
                              <DropdownMenuItem><Clock className="mr-2 h-4 w-4" /> View Attendance</DropdownMenuItem>
                              <DropdownMenuItem><Smartphone className="mr-2 h-4 w-4" /> Send Notification</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-50 hover:text-red-700 w-full text-left text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" /> Revoke Enrollment
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-red-600">Withdraw Student?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Proceeding will permanently delete <strong>{student.name}</strong> from the official registry. This involves financial and academic implications.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteStudent(student.id, student.name)} className="bg-red-600 hover:bg-red-700">
                                      Confirm Withdrawal
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredAndSortedStudents.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center">
                 <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-slate-300" />
                 </div>
                 <h3 className="font-bold text-slate-800 text-lg">No students found</h3>
                 <p className="text-muted-foreground">Try adjusting your filters or search keywords.</p>
                 <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2 text-primary">Clear all filters</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminStudents;
