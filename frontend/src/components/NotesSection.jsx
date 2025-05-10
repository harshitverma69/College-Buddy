import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Book } from "lucide-react";
import NoteCard from "@/components/NoteCard";
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
    const [notes, setNotes] = useState(initialNotes);
    const [courseFilter, setCourseFilter] = useState("All");
    const [semesterFilter, setSemesterFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    // Form state for uploading notes
    const [noteTitle, setNoteTitle] = useState("");
    const [noteSubject, setNoteSubject] = useState("");
    const [noteCourse, setNoteCourse] = useState("");
    const [noteSemester, setNoteSemester] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };
    // Handle note upload
    const handleUpload = () => {
        const newNote = {
            id: notes.length + 1,
            title: noteTitle,
            subject: noteSubject,
            uploader: "You",
            course: noteCourse,
            semester: noteSemester,
            likes: 0,
            liked: false,
        };
        setNotes([newNote, ...notes]);
        // Reset form fields
        setNoteTitle("");
        setNoteSubject("");
        setNoteCourse("");
        setNoteSemester("");
        setSelectedFile(null);
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
    return (<div className="container mx-auto px-4 pt-0 pb-12"> {/* Adjusted pt-24 to pt-0 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-outfit">📚 Notes Library</h1>
          <p className="text-gray-600 mt-2">Share and discover student notes</p>
        </div>
        
        <Dialog>
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Note Title</Label>
                <Input id="title" placeholder="e.g. Data Structures Cheat Sheet" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g. Computer Science" value={noteSubject} onChange={(e) => setNoteSubject(e.target.value)}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={noteCourse} onValueChange={setNoteCourse}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course"/>
                    </SelectTrigger>
                    <SelectContent>
                      {courseOptions.slice(1).map((course) => (<SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={noteSemester} onValueChange={setNoteSemester}>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester"/>
                    </SelectTrigger>
                    <SelectContent>
                      {semesterOptions.slice(1).map((semester) => (<SelectItem key={semester} value={semester}>
                          {semester}
                        </SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">Upload File</Label>
                <Input id="file" type="file" onChange={handleFileChange} className="cursor-pointer"/>
                <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, PPT (Max: 10MB)</p>
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button type="submit" onClick={handleUpload} disabled={!noteTitle || !noteSubject || !noteCourse || !noteSemester || !selectedFile}>
                <Upload className="mr-2 h-4 w-4"/> Upload Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm"> {/* Changed background opacity */}
        <div>
          <Label htmlFor="course-filter">Course</Label>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger id="course-filter">
              <SelectValue placeholder="Filter by course"/>
            </SelectTrigger>
            <SelectContent>
              {courseOptions.map((course) => (<SelectItem key={course} value={course}>
                  {course}
                </SelectItem>))}
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
              {semesterOptions.map((semester) => (<SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="search">Search Subject</Label>
          <Input id="search" placeholder="Search by title or subject..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
      </div>
      
      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredNotes.length > 0 ? (filteredNotes.map(note => (<NoteCard key={note.id} note={note} onLike={() => toggleLike(note.id)}/>))) : (<div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm"> {/* Changed background */}
            <Book size={48} className="text-gray-400 mb-4"/>
            <h3 className="text-xl font-semibold text-gray-700">No notes found</h3>
            <p className="text-gray-500 text-center mt-2">
              Try adjusting your filters or upload some notes to get started!
            </p>
          </div>)}
      </div>
    </div>);
};
export default NotesSection;
