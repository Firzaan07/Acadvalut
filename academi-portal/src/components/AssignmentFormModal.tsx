import React, { useState, useEffect, useMemo } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Loader2, Search, GraduationCap, Users, BookOpen, Calendar, CheckCircle2, History } from "lucide-react";
import { adminService } from "../services/api";
import { toast } from "sonner";

interface AssignmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AssignmentFormModal = ({ isOpen, onClose, onSuccess }: AssignmentFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  const [students, setStudents] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [studentSearch, setStudentSearch] = useState("");
  const [facultySearch, setFacultySearch] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    facultyId: "",
    subjectId: "",
    department: "",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: "Pending"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const loadInitialData = async () => {
    try {
      setDataLoading(true);
      const [studentsRes, facultyRes, subjectsRes] = await Promise.all([
        adminService.getAllStudents(),
        adminService.getAllFaculty(),
        adminService.getAllSubjects()
      ]);

      if (studentsRes.success) setStudents(studentsRes.data || []);
      if (facultyRes.success) setFaculty(facultyRes.data || []);
      if (subjectsRes.success) {
        console.log("SUBJECTS LOADED:", subjectsRes.data);
        setSubjects(subjectsRes.data || []);
      }
    } catch (error) {
      console.error("DATA LOAD ERROR:", error);
      toast.error("Failed to load records from database");
    } finally {
      setDataLoading(false);
    }
  };

  const filteredStudents = useMemo(() => 
    students.filter(s => 
      s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) || 
      s.studentId.toLowerCase().includes(studentSearch.toLowerCase())
    ).slice(0, 5), 
  [students, studentSearch]);

  const filteredFaculty = useMemo(() => 
    faculty.filter(f => 
      f.fullName.toLowerCase().includes(facultySearch.toLowerCase()) || 
      f.employeeId.toLowerCase().includes(facultySearch.toLowerCase())
    ).slice(0, 5), 
  [faculty, facultySearch]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.studentId) newErrors.studentId = "Please select a student";
    if (!formData.facultyId) newErrors.facultyId = "Please select a faculty member";
    if (!formData.subjectId) newErrors.subjectId = "Please select a subject";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicit debug log
    console.log("SUBMITTING ASSIGNMENT:", {
      studentId: formData.studentId,
      facultyId: formData.facultyId,
      subjectId: formData.subjectId,
      department: formData.department
    });

    if (!validate()) {
      toast.error("Form validation failed. Please select Student, Faculty, and Subject.");
      return;
    }

    setLoading(true);
    try {
      const selectedStudent = students.find(s => s._id === formData.studentId);
      const response = await adminService.assignStudentToFaculty({
        studentId: formData.studentId,
        facultyId: formData.facultyId,
        subjectId: formData.subjectId,
        department: selectedStudent?.department
      });

      if (response.success) {
        toast.success(response.message || "Assignment linked successfully");
        onSuccess();
        onClose();
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create assignment link");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      facultyId: "",
      subjectId: "",
      department: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Pending"
    });
    setStudentSearch("");
    setFacultySearch("");
    setErrors({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-white p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-8 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <History className="h-32 w-32 rotate-12" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
               <CheckCircle2 className="h-6 w-6 text-blue-400" />
            </div>
            Create New Assignment
          </DialogTitle>
          <DialogDescription className="text-slate-400 mt-2 font-medium">
            Link a student to a faculty member for academic supervision and record keeping.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {dataLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
               <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
               <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Hydrating database records...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter flex items-center gap-2">
                    <GraduationCap className="h-3 w-3 text-blue-500" /> Select Student
                  </Label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      placeholder="Search name or ID..."
                      className={`pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-sm ${errors.studentId ? "border-red-500 ring-red-500" : ""}`}
                      value={studentSearch}
                      onChange={(e) => {
                        setStudentSearch(e.target.value);
                        if (formData.studentId) setFormData({...formData, studentId: ""});
                      }}
                    />
                    {studentSearch && !formData.studentId && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map(s => (
                            <div 
                              key={s._id} 
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                              onClick={() => {
                                console.log("SELECTED STUDENT:", s._id);
                                setFormData({...formData, studentId: s._id, department: s.department});
                                setStudentSearch(s.fullName);
                              }}
                            >
                              <p className="font-bold text-sm text-slate-900">{s.fullName}</p>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{s.studentId} • {s.department}</p>
                            </div>
                          ))
                        ) : <p className="p-4 text-xs text-slate-500 italic">No students found matching "{studentSearch}"</p>}
                      </div>
                    )}
                  </div>
                  {errors.studentId && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.studentId}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter flex items-center gap-2">
                    <Users className="h-3 w-3 text-indigo-500" /> Select Faculty
                  </Label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <Input
                      placeholder="Search name or ID..."
                      className={`pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all shadow-sm ${errors.facultyId ? "border-red-500 ring-red-500" : ""}`}
                      value={facultySearch}
                      onChange={(e) => {
                        setFacultySearch(e.target.value);
                        if (formData.facultyId) setFormData({...formData, facultyId: ""});
                      }}
                    />
                    {facultySearch && !formData.facultyId && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                        {filteredFaculty.length > 0 ? (
                          filteredFaculty.map(f => (
                            <div 
                              key={f._id} 
                              className="px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                              onClick={() => {
                                console.log("SELECTED FACULTY:", f._id);
                                setFormData({...formData, facultyId: f._id});
                                setFacultySearch(f.fullName);
                              }}
                            >
                              <p className="font-bold text-sm text-slate-900">{f.fullName}</p>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{f.employeeId} • {f.department}</p>
                            </div>
                          ))
                        ) : <p className="p-4 text-xs text-slate-500 italic">No faculty found matching "{facultySearch}"</p>}
                      </div>
                    )}
                  </div>
                  {errors.facultyId && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.facultyId}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter flex items-center gap-2">
                  <BookOpen className="h-3 w-3 text-violet-500" /> Academic Subject
                </Label>
                <Select 
                  onValueChange={(v) => {
                    console.log("SELECTED SUBJECT:", v);
                    setFormData({...formData, subjectId: v});
                  }} 
                  value={formData.subjectId}
                >
                  <SelectTrigger className={`h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all ${errors.subjectId ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Link with an existing subject registry..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl overflow-hidden shadow-2xl border-slate-100 z-[9999]">
                    {subjects.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500 italic">
                        No active subjects found in registry.
                      </div>
                    ) : (
                      subjects.map(s => (
                        <SelectItem key={s._id} value={s._id} className="py-3 px-4 focus:bg-violet-50 focus:text-violet-700 cursor-pointer">
                          <div className="flex flex-col gap-0.5">
                             <span className="font-bold text-sm">{s.name}</span>
                             <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">{s.code} • {s.department}</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {errors.subjectId && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.subjectId}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-amber-500" /> Assignment Date
                  </Label>
                  <Input
                    type="text"
                    readOnly
                    className="h-11 bg-slate-100 border-none font-bold text-slate-600 cursor-default"
                    value={formData.date}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter flex items-center gap-2">
                    Assignment Status
                  </Label>
                  <Select 
                    onValueChange={(v) => setFormData({...formData, status: v})} 
                    value={formData.status}
                  >
                    <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending" className="text-amber-600 font-bold">Pending Approval</SelectItem>
                      <SelectItem value="In Progress" className="text-blue-600 font-bold">In Progress</SelectItem>
                      <SelectItem value="Completed" className="text-emerald-600 font-bold">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </form>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 gap-3">
          <Button variant="ghost" onClick={onClose} className="font-black uppercase text-[10px] tracking-widest text-slate-500 hover:bg-slate-200 px-6">
            Discard
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading || dataLoading}
            className="bg-slate-900 hover:bg-black text-white px-8 h-12 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-200"
          >
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...</> : "Commit Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
