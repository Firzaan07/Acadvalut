import React, { useState, useEffect } from "react";
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
import { Switch } from "./ui/switch";
import { Loader2, Mail, User, BookOpen, Briefcase, Hash, Calendar } from "lucide-react";
import { adminService } from "../services/api";
import { toast } from "sonner";

interface FacultyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DEPARTMENTS = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Management"];
const ROLES = ["Professor", "Associate Professor", "Assistant Professor", "Department Head"];
const SUGGESTIONS: Record<string, string[]> = {
  "Computer Science": ["Artificial Intelligence", "Data Structures", "Cybersecurity", "Machine Learning"],
  "Electrical Engineering": ["Power Systems", "Control Systems", "Microelectronics"],
  "Mechanical Engineering": ["Thermodynamics", "Robotics", "Fluid Mechanics"],
  "Civil Engineering": ["Structural Engineering", "Environmental Engineering", "Geotechnical Engineering"],
  "Management": ["Operations Management", "Business Analytics", "Human Resources"]
};

export const RecruitFacultyModal = ({ isOpen, onClose, onSuccess }: FacultyFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
    specialization: "",
    status: "Active",
    joiningDate: new Date().toISOString().split("T")[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.designation) newErrors.designation = "Role is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await adminService.recruitFaculty(formData);
      if (response.success) {
        toast.success(response.message || "Faculty recruited successfully");
        onSuccess();
        onClose();
        resetForm();
      } else {
        toast.error(response.message || "Failed to recruit faculty");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      employeeId: "",
      department: "",
      designation: "",
      specialization: "",
      status: "Active",
      joiningDate: new Date().toISOString().split("T")[0]
    });
    setErrors({});
  };

  const genEmployeeId = () => {
    const id = "FAC" + Math.floor(100 + Math.random() * 900);
    setFormData({ ...formData, employeeId: id });
  };

  const handleDeptChange = (val: string) => {
    setFormData({ ...formData, department: val, specialization: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-slate-900 text-white">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-400" />
            Recruit New Faculty
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter the details of the new faculty member to add them to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold uppercase text-[10px] tracking-widest pl-1">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Dr. John Doe"
                className={`pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all ${errors.fullName ? "border-red-500 ring-red-500" : ""}`}
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-bold uppercase text-[10px] tracking-widest pl-1">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="email"
                placeholder="j.doe@univ.edu"
                className={`pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all ${errors.email ? "border-red-500 ring-red-500" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold uppercase text-[10px] tracking-widest pl-1">Employee ID</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="FAC001"
                    className={`pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all ${errors.employeeId ? "border-red-500 ring-red-500" : ""}`}
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  />
                </div>
                <Button type="button" variant="outline" className="h-11 px-3 border-slate-200" onClick={genEmployeeId} title="Auto-generate">
                  <Loader2 className={`h-4 w-4 text-blue-500 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
              {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-bold uppercase text-[10px] tracking-widest pl-1">Joining Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold uppercase text-[10px] tracking-widest pl-1">Department</Label>
              <Select onValueChange={handleDeptChange} value={formData.department}>
                <SelectTrigger className={`h-11 bg-slate-50 border-slate-200 ${errors.department ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select Dept." />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-bold uppercase text-[10px] tracking-widest pl-1">Role</Label>
              <Select onValueChange={(v) => setFormData({...formData, designation: v})} value={formData.designation}>
                <SelectTrigger className={`h-11 bg-slate-50 border-slate-200 ${errors.designation ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-bold uppercase text-[10px] tracking-widest pl-1">Specialization</Label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Artificial Intelligence"
                className={`pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all ${errors.specialization ? "border-red-500 ring-red-500" : ""}`}
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                list="specialization-suggestions"
              />
              <datalist id="specialization-suggestions">
                {(SUGGESTIONS[formData.department] || []).map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
            {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 tracking-tight">Active Status</span>
              <span className="text-xs text-slate-500">Enable profile immediately?</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={formData.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50" : "bg-slate-200 text-slate-600 border-slate-300"}>
                {formData.status}
              </Badge>
              <Switch 
                checked={formData.status === "Active"} 
                onCheckedChange={(checked) => setFormData({...formData, status: checked ? "Active" : "On Leave"})} 
              />
            </div>
          </div>
        </form>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-200 gap-2">
          <Button variant="ghost" onClick={onClose} className="hover:bg-slate-200 font-bold text-slate-600">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-8 shadow-lg shadow-blue-200"
          >
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Recruiting...</> : "Recruit Faculty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};