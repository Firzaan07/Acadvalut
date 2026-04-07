import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Trash2, 
  Edit2, 
  UserPlus, 
  Shield, 
  UserCheck, 
  UserX,
  User,
  MoreVertical,
  Filter
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

type UserRole = 'Admin' | 'Faculty' | 'Student';
type UserStatus = 'Active' | 'Inactive';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
}

const initialUsers: UserData[] = [
  { id: '1', name: 'Dr. Sarah Wilson', email: 'sarah.wilson@univ.edu', role: 'Faculty', status: 'Active', lastLogin: '2024-03-20 10:30 AM' },
  { id: '2', name: 'John Doe', email: 'john.doe@student.univ.edu', role: 'Student', status: 'Active', lastLogin: '2024-03-19 04:15 PM' },
  { id: '3', name: 'Alice Johnson', email: 'alice.j@admin.univ.edu', role: 'Admin', status: 'Active', lastLogin: '2024-03-20 09:00 AM' },
  { id: '4', name: 'Mark Thompson', email: 'm.thompson@univ.edu', role: 'Faculty', status: 'Inactive', lastLogin: '2024-03-15 02:45 PM' },
  { id: '5', name: 'Emma Davis', email: 'emma.d@student.univ.edu', role: 'Student', status: 'Active', lastLogin: '2024-03-20 11:20 AM' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof UserData; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof UserData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query) || 
        u.role.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, searchQuery, sortConfig]);

  const handleDeleteUser = (id: string, name: string) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success(`User ${name} has been deleted successfully.`);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
    toast.info("User status updated.");
  };

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Govern access, manage roles, and monitor user status.
            </p>
          </div>
          <Button className="shrink-0" onClick={() => toast.info("Create User modal opening...")}>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email, or role..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> View Filters
                </Button>
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  Showing {filteredAndSortedUsers.length} of {users.length} users
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <button 
                        className="flex items-center font-semibold hover:text-primary transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        User <ArrowUpDown className="ml-2 h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button 
                        className="flex items-center font-semibold hover:text-primary transition-colors"
                        onClick={() => handleSort('role')}
                      >
                        Role <ArrowUpDown className="ml-2 h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button 
                        className="flex items-center font-semibold hover:text-primary transition-colors"
                        onClick={() => handleSort('status')}
                      >
                        Status <ArrowUpDown className="ml-2 h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedUsers.length > 0 ? (
                    filteredAndSortedUsers.map((user) => (
                      <TableRow key={user.id} className="group hover:bg-slate-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-colors shadow-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900">{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                             {user.role === 'Admin' && <Shield className="h-3.5 w-3.5 text-blue-500" />}
                             {user.role === 'Faculty' && <UserCheck className="h-3.5 w-3.5 text-green-500" />}
                             {user.role === 'Student' && <User className="h-3.5 w-3.5 text-orange-500" />}
                             <span className="text-sm">{user.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'Active' ? 'default' : 'secondary'}
                            className={user.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200' : 'bg-slate-100 text-slate-800'}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" onClick={() => toast.info(`Editing ${user.name}`)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                  {user.status === 'Active' ? (
                                    <>
                                      <UserX className="mr-2 h-4 w-4" /> Deactivate Account
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="mr-2 h-4 w-4" /> Activate Account
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-red-600 w-full text-left text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete User
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete <strong>{user.name}'s</strong> account and remove their data from our servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteUser(user.id, user.name)} className="bg-red-600 hover:bg-red-700">
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-3 rounded-full bg-slate-50">
                            <Search className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-slate-500">No users found matching "{searchQuery}"</p>
                          <Button variant="link" onClick={() => setSearchQuery('')}>Clear search</Button>
                        </div>
                      </TableCell>
                    </TableRow>
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

export default AdminUsers;