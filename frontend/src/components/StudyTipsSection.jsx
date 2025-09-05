import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, FileText, Youtube } from 'lucide-react';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const courses = [
  { id: 'btech', label: 'B.Tech' },
  { id: 'bpharm', label: 'B.Pharm' },
  { id: 'bca', label: 'BCA' },
  { id: 'bsc', label: 'BSc' },
];

const semesters = Array.from({ length: 8 }, (_, i) => ({
  value: String(i + 1),
  label: `Semester ${i + 1}`
}));

const StudyTipsSection = () => {
  const [loading, setLoading] = useState(false);
  const [pyqData, setPyqData] = useState(null);
  const [pyqError, setPyqError] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showSubjectInput, setShowSubjectInput] = useState(false);
  const [showResourceOptions, setShowResourceOptions] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
    setSelectedSemester(null);
    setSelectedSubject('');
    setShowSubjectInput(false);
    setShowResourceOptions(false);
    setSelectedResource(null);
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
    setSelectedSubject('');
    setShowSubjectInput(true);
    setShowResourceOptions(false);
    setSelectedResource(null);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowResourceOptions(true);
    } else {
      setShowResourceOptions(false);
    }
    setSelectedResource(null);
  };

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  };

  const handleLoadResources = async () => {
    if (!selectedSubject || selectedResource !== 'pyqs') return;

    setLoading(true);
    setPyqData(null);
    setPyqError(null);

    try {
      const res = await fetch(`${API_URL}/api/pyqs?subject=${selectedSubject.trim()}`);
      const data = await res.json();

      if (res.ok) {
        setPyqData(data);
      } else {
        setPyqError(data.message || "No data found");
      }
    } catch (err) {
      console.error(err);
      setPyqError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 font-outfit">
              Study <span className="text-buddy-lavender">Tips</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              Get the resources you need to ace your courses! 📚✨
            </p>
          </div>

          {/* Course selection */}
          <Card className="mb-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>What course are you doing? 🎓</CardTitle>
              <CardDescription>Select your course to find relevant study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup className="grid grid-cols-2 sm:grid-cols-4 gap-3" value={selectedCourse || ""} onValueChange={handleCourseChange}>
                {courses.map((course) => (
                  <div key={course.id}>
                    <RadioGroupItem value={course.id} id={course.id} className="peer sr-only" />
                    <Label htmlFor={course.id} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all">
                      {course.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Semester selection */}
          {selectedCourse && (
            <Card className="mb-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow animate-in fade-in">
              <CardHeader>
                <CardTitle>Which semester? 📅</CardTitle>
                <CardDescription>Select your current semester</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedSemester || ""} onValueChange={handleSemesterChange}>
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester.value} value={semester.value}>
                        {semester.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Subject Input */}
          {showSubjectInput && selectedSemester && (
            <Card className="mb-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow animate-in fade-in">
              <CardHeader>
                <CardTitle>Which Subject? 📝</CardTitle>
                <CardDescription>Enter the subject you need resources for.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="e.g., Data Structures, Organic Chemistry"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="w-full"
                />
              </CardContent>
            </Card>
          )}

          {/* Resource Type Cards */}
          {showResourceOptions && selectedSubject.trim() !== '' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in fade-in">
              <Card className={`cursor-pointer bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 ${selectedResource === 'pyqs' ? 'border-4 border-buddy-lavender' : ''}`} onClick={() => handleResourceSelect('pyqs')}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <FileText className="h-6 w-6 text-buddy-lavender" />
                  <div><CardTitle>Previous Year Questions</CardTitle></div>
                </CardHeader>
                <CardContent><p className="text-sm text-gray-600">Access past exam papers</p></CardContent>
              </Card>

              <Card className={`cursor-pointer bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 ${selectedResource === 'youtube' ? 'border-4 border-buddy-lavender' : ''}`} onClick={() => handleResourceSelect('youtube')}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <Youtube className="h-6 w-6 text-buddy-yellow" />
                  <div><CardTitle>Best YouTube Resources</CardTitle></div>
                </CardHeader>
                <CardContent><p className="text-sm text-gray-600">Curated videos for concepts</p></CardContent>
              </Card>

              <Card className={`cursor-pointer bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 ${selectedResource === 'important' ? 'border-4 border-buddy-lavender' : ''}`} onClick={() => handleResourceSelect('important')}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <BookOpen className="h-6 w-6 text-buddy-peach" />
                  <div><CardTitle>Most Important Questions</CardTitle></div>
                </CardHeader>
                <CardContent><p className="text-sm text-gray-600">Focus on key exam topics</p></CardContent>
              </Card>
            </div>
          )}

          {/* Results Box */}
          {selectedResource && selectedSubject.trim() !== '' && (
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow animate-in fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedResource === 'pyqs' && <FileText className="h-5 w-5 text-buddy-lavender" />}
                  {selectedResource === 'youtube' && <Youtube className="h-5 w-5 text-buddy-yellow" />}
                  {selectedResource === 'important' && <BookOpen className="h-5 w-5 text-buddy-peach" />}

                  {selectedResource === 'pyqs' && 'Previous Year Questions'}
                  {selectedResource === 'youtube' && 'Best YouTube Resources'}
                  {selectedResource === 'important' && 'Most Important Questions'}

                  <span className="text-base font-normal text-gray-600">
                    for {courses.find(c => c.id === selectedCourse)?.label}, Sem {selectedSemester}, Subject: {selectedSubject}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="min-h-[200px] flex items-center justify-center border-t border-gray-100">
                <div className="text-center text-gray-500">
                  {loading && <p>Loading...</p>}

                  {pyqError && <p className="text-red-500">{pyqError}</p>}

                  {pyqData && (
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">{pyqData.subject}</p>
                      <p>Semester: {pyqData.semester}</p>
                      <p>Branch: {pyqData.branch}</p>
                      <a
                        href={pyqData.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline mt-2 inline-block"
                      >
                        📄 View PDF
                      </a>
                    </div>
                  )}

                  <Button
                    className="mt-4 bg-buddy-lavender hover:bg-buddy-lavender/90"
                    onClick={handleLoadResources}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load Resources'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyTipsSection;
