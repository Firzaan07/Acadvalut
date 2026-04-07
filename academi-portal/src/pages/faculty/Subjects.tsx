import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  BookMarked, 
  Search, 
  Layers, 
  MoreVertical, 
  ChevronRight, 
  Users, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const FacultySubjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const subjects = [
    { 
      id: 1, 
      code: "CS101", 
      name: "Data Structures", 
      students: 45, 
      avgMarks: 82, 
      attendance: 94, 
      performance: "Excellent" 
    },
    { 
      id: 2, 
      code: "CS302", 
      name: "Algorithm Design", 
      students: 38, 
      avgMarks: 76, 
      attendance: 88, 
      performance: "Good" 
    },
    { 
      id: 3, 
      code: "CS405", 
      name: "Network Security", 
      students: 22, 
      avgMarks: 89, 
      attendance: 91, 
      performance: "Excellent" 
    },
  ];

  return (
    <DashboardLayout title="My Handled Subjects" role="Faculty">
      <div className="space-y-6">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card p-6 bg-card border-border shadow-sm group hover:border-primary/50 transition-all flex flex-col justify-between h-40">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/20 p-2.5 rounded-xl text-primary font-bold group-hover:scale-110 transition-transform">
                <BookMarked className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tight py-0.5 border-primary/20 bg-primary/5 text-primary">Active Session</Badge>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-1">Subjects Handled</p>
              <h3 className="text-3xl font-heading font-black text-foreground">03</h3>
            </div>
          </div>

          <div className="stat-card p-6 bg-card border-border shadow-sm group hover:border-primary/50 transition-all flex flex-col justify-between h-40">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 font-bold group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tight py-0.5 border-emerald-600/20 bg-emerald-600/5 text-emerald-600">Total Enrollment</Badge>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-1">Students Taught</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-heading font-black text-foreground">105</h3>
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" /> +12% growth</span>
              </div>
            </div>
          </div>

          <div className="stat-card p-6 bg-card border-border shadow-sm group hover:border-primary/50 transition-all flex flex-col justify-between h-40">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 font-bold group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tight py-0.5 border-blue-600/20 bg-blue-600/5 text-blue-600">Performance Avg</Badge>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-1">Class Average Marks</p>
              <h3 className="text-3xl font-heading font-black text-foreground">82.3%</h3>
            </div>
          </div>
        </div>

        {/* Filter & Table Section */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search subject code or name..." 
              className="pl-10 h-10 border-border bg-background transition-all focus:ring-1 focus:ring-primary font-semibold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 border-border font-bold text-foreground text-xs uppercase tracking-widest">
              <Layers className="mr-2 h-4 w-4 text-primary" /> Filter by Term
            </Button>
          </div>
        </div>

        <div className="stat-card p-0 overflow-hidden border border-border bg-card">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-b border-border">
                <TableHead className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject Code</TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject Name</TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest text-muted-foreground text-center">Enrolled</TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest text-muted-foreground text-center">Avg Marks</TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest text-muted-foreground text-center">Avg Attendance</TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest text-muted-foreground">Performance</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((sub) => (
                <TableRow key={sub.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                  <TableCell className="font-heading font-bold text-primary tracking-tight">{sub.code}</TableCell>
                  <TableCell className="font-heading font-black text-foreground">{sub.name}</TableCell>
                  <TableCell className="text-center font-bold text-muted-foreground tracking-widest font-mono text-xs">{sub.students}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-black text-foreground tracking-tight">{sub.avgMarks}%</span>
                      <div className="w-16 bg-muted h-1 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-primary h-full transition-all" style={{ width: `${sub.avgMarks}%` }}></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-black text-emerald-600 tracking-tight">{sub.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`font-black uppercase text-[9px] px-2 py-0.5 ${sub.performance === "Excellent" ? "bg-emerald-600/10 text-emerald-600 border-emerald-600/20" : "bg-blue-600/10 text-blue-600 border-blue-600/20"}`}>
                      {sub.performance}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right p-4">
                    <Button variant="ghost" size="sm" className="font-bold text-xs text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20">
                      View Dashboard <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultySubjects;
