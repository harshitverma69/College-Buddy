import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Book, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import NoteCard from "@/components/NoteCard";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data for initial notes
const initialNotes = [
    {
        id: 1,
        title: "Data Structures Fundamentals",
        subject: "Computer Science",
        uploader: "Prof. Smith",
        course: "B.Tech",
        semester: "3",
        likes: 24,
        liked: false,
    },
    {
        id: 2,
        title: "Organic Chemistry Notes",
        subject: "Chemistry",
        uploader: "John Doe",
        course: "BSc",
        semester: "2",
        likes: 18,
        liked: true,
    },
    {
        id: 3,
        title: "Calculus Complete Guide",
        subject: "Mathematics",
        uploader: "Jane Davis",
        course: "B.Tech",
        semester: "1",
        likes: 32,
        liked: false,
    },
    {
        id: 4,
        title: "Digital Electronics",
        subject: "Electronics",
        uploader: "Mike Johnson",
        course: "BCA",
        semester: "4",
        likes: 15,
        liked: false,
    },
];

// Course and semester options
const courseOptions = ["All", "B.Tech", "B.Pharm", "BCA", "BSc", "Other"];
const semesterOptions = ["All", "1", "2", "3", "4", "5", "6", "7", "8"];

const NotesSection = () => {
    const { isAuthenticated } = useAuth();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseFilter, setCourseFilter] = useState("All");
    const [semesterFilter, setSemesterFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    
    // Form state for uploading notes
    const [noteTitle, setNoteTitle] = useState("");
    const [noteSubject, setNoteSubject] = useState("");
    const [noteCourse, setNoteCourse] = useState("");
    const [noteSemester, setNoteSemester] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState({ type: '', message: '' });
    const [showUploadDialog, setShowUploadDialog] = useState(false);

    // Fetch notes from backend
    const fetchNotes = async () => {
        try {
            setLoading(true);
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/api/notes`);
            if (response.ok) {
                const data = await response.json();
                // Transform backend data to match frontend format
                const transformedNotes = data.notes.map(note => ({
                    id: note._id,
                    title: note.title,
                    subject: note.subject,
                    uploader: note.uploader,
                    course: note.course,
                    semester: note.semester,
                    likes: note.likes,
                    liked: false, // This would need user authentication to determine
                    fileUrl: note.fileUrl,
                    fileName: note.fileName,
                    createdAt: note.createdAt
                }));
                setNotes(transformedNotes);
            } else {
                console.error('Failed to fetch notes');
                // Fallback to mock data if backend is not available
                setNotes(initialNotes);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            // Fallback to mock data if backend is not available
            setNotes(initialNotes);
        } finally {
            setLoading(false);
        }
    };

    // Load notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                setUploadMessage({ type: 'error', message: 'File size must be less than 10MB' });
                setSelectedFile(null);
                return;
            }
            // Check file type
            const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
            if (!allowedTypes.includes(file.type)) {
                setUploadMessage({ type: 'error', message: 'Only PDF, DOCX, and PPT files are allowed' });
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setUploadMessage({ type: '', message: '' });
        }
    };

    // Handle note upload
    const handleUpload = async () => {
        if (!isAuthenticated) {
            setUploadMessage({ type: 'error', message: 'Please login to upload notes' });
            return;
        }

        try {
            setUploading(true);
            setUploadMessage({ type: '', message: '' });

            const formData = new FormData();
            formData.append('title', noteTitle);
            formData.append('subject', noteSubject);
            formData.append('course', noteCourse);
            formData.append('semester', noteSemester);
            formData.append('file', selectedFile);
            formData.append('uploader', 'You'); // This should come from auth context
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await fetch(`${API_URL}/api/notes/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const result = await response.json();
            
            // Add the new note to the local state
            const newNote = {
                id: result.note._id,
                title: result.note.title,
                subject: result.note.subject,
                uploader: result.note.uploader,
                course: result.note.course,
                semester: result.note.semester,
                likes: result.note.likes,
                liked: false,
                fileUrl: result.note.fileUrl,
                fileName: result.note.fileName,
                createdAt: result.note.createdAt
            };
            
            setNotes([newNote, ...notes]);
            
            // Reset form fields
            setNoteTitle("");
            setNoteSubject("");
            setNoteCourse("");
            setNoteSemester("");
            setSelectedFile(null);
            
            // Show success message
            setUploadMessage({ type: 'success', message: 'Note uploaded successfully!' });
            
            // Close dialog after a delay
            setTimeout(() => {
                setShowUploadDialog(false);
                setUploadMessage({ type: '', message: '' });
            }, 2000);
            
        } catch (error) {
            console.error('Upload error:', error);
            setUploadMessage({ type: 'error', message: error.message || 'Failed to upload note. Please try again.' });
        } finally {
            setUploading(false);
        }
    };

    // Filter notes based on selected filters and search
    const filteredNotes = notes.filter(note => {
        const matchesCourse = courseFilter === "All" || note.course === courseFilter;
        const matchesSemester = semesterFilter === "All" || note.semester === semesterFilter;
        const matchesSearch = searchQuery === "" ||
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCourse && matchesSemester && matchesSearch;
    });

    // Handle like/unlike
    const toggleLike = (id) => {
        setNotes(notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    liked: !note.liked,
                    likes: note.liked ? note.likes - 1 : note.likes + 1
                };
            }
            return note;
        }));
    };

    return (
        <div className="container mx-auto px-4 pt-0 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 font-outfit">📚 Notes Library</h1>
                    <p className="text-gray-600 mt-2">Share and discover student notes</p>
                </div>
                
                {isAuthenticated ? (
                    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                        <DialogTrigger asChild>
                            <Button className="mt-4 md:mt-0 bg-buddy-lavender hover:bg-[hsl(var(--buddy-lavender))/90]">
                                <Upload className="mr-2 h-4 w-4"/> Upload Notes
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Upload Study Notes</DialogTitle>
                                <DialogDescription>
                                    Share your notes with other students in your course
                                </DialogDescription>
                            </DialogHeader>
                            
                            {uploadMessage.message && (
                                <Alert className={uploadMessage.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
                                    {uploadMessage.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                    <AlertDescription className={uploadMessage.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                                        {uploadMessage.message}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Note Title *</Label>
                                    <Input 
                                        id="title" 
                                        placeholder="e.g. Data Structures Cheat Sheet" 
                                        value={noteTitle} 
                                        onChange={(e) => setNoteTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject *</Label>
                                    <Input 
                                        id="subject" 
                                        placeholder="e.g. Computer Science" 
                                        value={noteSubject} 
                                        onChange={(e) => setNoteSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="course">Course *</Label>
                                        <Select value={noteCourse} onValueChange={setNoteCourse}>
                                            <SelectTrigger id="course">
                                                <SelectValue placeholder="Select course"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courseOptions.slice(1).map((course) => (
                                                    <SelectItem key={course} value={course}>
                                                        {course}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="semester">Semester *</Label>
                                        <Select value={noteSemester} onValueChange={setNoteSemester}>
                                            <SelectTrigger id="semester">
                                                <SelectValue placeholder="Select semester"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {semesterOptions.slice(1).map((semester) => (
                                                    <SelectItem key={semester} value={semester}>
                                                        {semester}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="file">Upload File *</Label>
                                    <Input 
                                        id="file" 
                                        type="file" 
                                        onChange={handleFileChange} 
                                        className="cursor-pointer"
                                        accept=".pdf,.docx,.ppt,.pptx"
                                        required
                                    />
                                    <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, PPT (Max: 10MB)</p>
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-end">
                                <Button 
                                    type="submit" 
                                    onClick={handleUpload} 
                                    disabled={!noteTitle || !noteSubject || !noteCourse || !noteSemester || !selectedFile || uploading}
                                    className="w-full"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2 h-4 w-4"/>
                                            Upload Note
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <div className="mt-4 md:mt-0 text-center">
                        <p className="text-gray-600 mb-2">Login to upload notes</p>
                        <Button variant="outline" className="bg-buddy-lavender hover:bg-[hsl(var(--buddy-lavender))/90]">
                            Sign In
                        </Button>
                    </div>
                )}
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div>
                    <Label htmlFor="course-filter">Course</Label>
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger id="course-filter">
                            <SelectValue placeholder="Filter by course"/>
                        </SelectTrigger>
                        <SelectContent>
                            {courseOptions.map((course) => (
                                <SelectItem key={course} value={course}>
                                    {course}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="semester-filter">Semester</Label>
                    <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                        <SelectTrigger id="semester-filter">
                            <SelectValue placeholder="Filter by semester"/>
                        </SelectTrigger>
                        <SelectContent>
                            {semesterOptions.map((semester) => (
                                <SelectItem key={semester} value={semester}>
                                    {semester}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="search">Search Notes</Label>
                    <Input 
                        id="search" 
                        placeholder="Search by title or subject..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            
            {/* Notes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {loading ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                        <Loader2 size={48} className="text-gray-400 mb-4 animate-spin"/>
                        <h3 className="text-xl font-semibold text-gray-700">Loading notes...</h3>
                        <p className="text-gray-500 text-center mt-2">
                            Please wait while we fetch your notes
                        </p>
                    </div>
                ) : filteredNotes.length > 0 ? (
                    filteredNotes.map(note => (
                        <NoteCard key={note.id} note={note} onLike={() => toggleLike(note.id)}/>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                        <Book size={48} className="text-gray-400 mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-700">No notes found</h3>
                        <p className="text-gray-500 text-center mt-2">
                            {searchQuery || courseFilter !== "All" || semesterFilter !== "All" 
                                ? "Try adjusting your filters or search terms"
                                : "Be the first to upload some notes to get started!"
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesSection;
