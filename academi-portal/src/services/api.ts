import axios from 'axios';

// Base API URL - hardcoded for production to bypass Vercel environment variable issues
const API_URL = import.meta.env.PROD 
  ? 'https://acadvalut-1.onrender.com/api' 
  : 'http://localhost:5000/api';

// ─────────────────────────────────────────────
// Response shape returned by our server
// ─────────────────────────────────────────────
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
  data?: T;
  total?: number;
  summary?: any;
}

// ─────────────────────────────────────────────
// Axios instance with base configuration
// ─────────────────────────────────────────────
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
});

// ─────────────────────────────────────────────
// Request Interceptor: Attach JWT token to every request
// ─────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────
// Response Interceptor: Unwrap .data and handle global errors
// ─────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data, // Return server's response body directly
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────
// Auth Service
// ─────────────────────────────────────────────
export const authService = {
  login: (credentials: { email: string; password: string }): Promise<ApiResponse> =>
    api.post('/auth/login', credentials) as unknown as Promise<ApiResponse>,

  signup: (userData: { fullName: string; email: string; password: string }): Promise<ApiResponse> =>
    api.post('/auth/signup', userData) as unknown as Promise<ApiResponse>,

  // Send Firebase Google ID token → backend verifies it → returns our JWT
  loginWithGoogle: (idToken: string): Promise<ApiResponse> =>
    api.post('/auth/google', { idToken }) as unknown as Promise<ApiResponse>,

  getMe: (): Promise<ApiResponse> =>
    api.get('/auth/me') as unknown as Promise<ApiResponse>,

  selectRole: (role: string): Promise<ApiResponse> =>
    api.put('/auth/select-role', { role }) as unknown as Promise<ApiResponse>,

  completeProfile: (profileData: Record<string, any>): Promise<ApiResponse> =>
    api.put('/auth/complete-profile', profileData) as unknown as Promise<ApiResponse>,
};

// ─────────────────────────────────────────────
// User Service (general, any role)
// ─────────────────────────────────────────────
export const userService = {
  updateProfile: (profileData: Record<string, any>): Promise<ApiResponse> =>
    api.put('/user/profile', profileData) as unknown as Promise<ApiResponse>,

  changePassword: (data: { currentPassword: string; newPassword: string }): Promise<ApiResponse> =>
    api.put('/user/change-password', data) as unknown as Promise<ApiResponse>,
};

// ─────────────────────────────────────────────
// Admin Service
// ─────────────────────────────────────────────
export const adminService = {
  getStats: (): Promise<ApiResponse> =>
    api.get('/admin/stats') as unknown as Promise<ApiResponse>,

  enrollStudent: (studentData: Record<string, any>): Promise<ApiResponse> =>
    api.post('/admin/students', studentData) as unknown as Promise<ApiResponse>,

  getAllStudents: (params?: Record<string, any>): Promise<ApiResponse> =>
    api.get('/admin/students', { params }) as unknown as Promise<ApiResponse>,

  getAllFaculty: (params?: Record<string, any>): Promise<ApiResponse> =>
    api.get('/admin/faculty', { params }) as unknown as Promise<ApiResponse>,

  getAllSubjects: (): Promise<ApiResponse> =>
    api.get('/admin/subjects') as unknown as Promise<ApiResponse>,

  getAllAssignments: (): Promise<ApiResponse> =>
    api.get('/admin/assignments') as unknown as Promise<ApiResponse>,

  updateAssignment: (id: string, data: { status?: string; facultyId?: string; subjectId?: string }): Promise<ApiResponse> =>
    api.patch(`/admin/assignments/${id}`, data) as unknown as Promise<ApiResponse>,

  deleteAssignment: (id: string): Promise<ApiResponse> =>
    api.delete(`/admin/assignments/${id}`) as unknown as Promise<ApiResponse>,

  assignStudentToFaculty: (data: { studentId: string; facultyId: string; subjectId: string; department?: string }): Promise<ApiResponse> =>
    api.post('/admin/assign', data) as unknown as Promise<ApiResponse>,

  deleteUser: (userId: string): Promise<ApiResponse> =>
    api.delete(`/admin/users/${userId}`) as unknown as Promise<ApiResponse>,

  updateUserStatus: (userId: string, status: string): Promise<ApiResponse> =>
    api.put(`/admin/users/${userId}/status`, { status }) as unknown as Promise<ApiResponse>,

  recruitFaculty: (facultyData: Record<string, any>): Promise<ApiResponse> =>
    api.post('/admin/faculty', facultyData) as unknown as Promise<ApiResponse>,

  getActivityLog: (params?: { module?: string; search?: string; limit?: number }): Promise<ApiResponse> =>
    api.get('/admin/activities', { params }) as unknown as Promise<ApiResponse>,
    
  clearActivityLog: (): Promise<ApiResponse> =>
    api.delete('/admin/activities/clear') as unknown as Promise<ApiResponse>,

  // Alias for legacy compatibility
  getSystemStats: (): Promise<ApiResponse> =>
    api.get('/admin/stats') as unknown as Promise<ApiResponse>,
};

// ─────────────────────────────────────────────
// Faculty Service
// ─────────────────────────────────────────────
export const facultyService = {
  getProfile: (): Promise<ApiResponse> =>
    api.get('/faculty/profile') as unknown as Promise<ApiResponse>,

  updateProfile: (data: Record<string, any>): Promise<ApiResponse> =>
    api.put('/faculty/profile', data) as unknown as Promise<ApiResponse>,

  getAssignedStudents: (): Promise<ApiResponse> =>
    api.get('/faculty/students') as unknown as Promise<ApiResponse>,

  getStudentMarks: (studentId: string): Promise<ApiResponse> =>
    api.get(`/faculty/marks/${studentId}`) as unknown as Promise<ApiResponse>,

  updateMarks: (studentId: string, marksData: Record<string, any>): Promise<ApiResponse> =>
    api.put(`/faculty/marks/${studentId}`, marksData) as unknown as Promise<ApiResponse>,

  updateAttendance: (studentId: string, attendanceData: Record<string, any>): Promise<ApiResponse> =>
    api.put(`/faculty/attendance/${studentId}`, attendanceData) as unknown as Promise<ApiResponse>,

  addRemark: (studentId: string, remark: string, type?: string, subjectId?: string): Promise<ApiResponse> =>
    api.post(`/faculty/remarks/${studentId}`, { remark, type, subjectId }) as unknown as Promise<ApiResponse>,
};

// ─────────────────────────────────────────────
// Student Service
// ─────────────────────────────────────────────
export const studentService = {
  getProfile: (): Promise<ApiResponse> =>
    api.get('/student/profile') as unknown as Promise<ApiResponse>,

  updateProfile: (data: Record<string, any>): Promise<ApiResponse> =>
    api.put('/student/profile', data) as unknown as Promise<ApiResponse>,

  getMarks: (): Promise<ApiResponse> =>
    api.get('/student/marks') as unknown as Promise<ApiResponse>,

  getAttendance: (): Promise<ApiResponse> =>
    api.get('/student/attendance') as unknown as Promise<ApiResponse>,

  getRemarks: (): Promise<ApiResponse> =>
    api.get('/student/remarks') as unknown as Promise<ApiResponse>,

  getEnrolledSubjects: (): Promise<ApiResponse> =>
    api.get('/student/subjects') as unknown as Promise<ApiResponse>,

  getAvailableSubjects: (): Promise<ApiResponse> =>
    api.get('/student/subjects/available') as unknown as Promise<ApiResponse>,

  enrollInSubject: (subjectId: string): Promise<ApiResponse> =>
    api.post('/student/enroll', { subjectId }) as unknown as Promise<ApiResponse>,
};

export default api;
