import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Heart, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const NoteCard = ({ note, onLike }) => {
    const { isAuthenticated } = useAuth();
    const [downloading, setDownloading] = useState(false);
    const [viewing, setViewing] = useState(false);

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    // Handle file download
    const handleDownload = async () => {
        if (!note.fileUrl) {
            alert('No file available for download');
            return;
        }

        try {
            setDownloading(true);
            
            // Record download in backend
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${note.id}/download`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Download the file
            const link = document.createElement('a');
            link.href = note.fileUrl;
            link.download = note.fileName || `${note.title}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('Download error:', error);
            // Fallback: direct download
            const link = document.createElement('a');
            link.href = note.fileUrl;
            link.download = note.fileName || `${note.title}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } finally {
            setDownloading(false);
        }
    };

    // Handle file view
    const handleView = () => {
        if (!note.fileUrl) {
            alert('No file available for viewing');
            return;
        }

        try {
            setViewing(true);
            window.open(note.fileUrl, '_blank');
        } catch (error) {
            console.error('View error:', error);
            alert('Failed to open file. Please try downloading instead.');
        } finally {
            setViewing(false);
        }
    };

    // Handle like/unlike
    const handleLike = () => {
        if (!isAuthenticated) {
            alert('Please login to like notes');
            return;
        }
        onLike();
    };

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
                        {note.title}
                    </CardTitle>
                </div>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                    {note.subject}
                </p>
            </CardHeader>
            
            <CardContent className="pb-3">
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="bg-buddy-blue bg-opacity-30 text-buddy-blue border-buddy-blue">
                        {note.course}
                    </Badge>
                    <Badge variant="outline" className="bg-buddy-yellow bg-opacity-30 text-buddy-yellow border-buddy-yellow">
                        Semester {note.semester}
                    </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>Uploaded by <span className="font-semibold text-gray-700">{note.uploader}</span></span>
                    </div>
                    
                    {note.createdAt && (
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{formatDate(note.createdAt)}</span>
                        </div>
                    )}
                    
                    {note.fileName && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                📎 {note.fileName}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
            
            <CardFooter className="border-t pt-3 flex justify-between">
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-gray-600 hover:bg-gray-50"
                        onClick={handleView}
                        disabled={!note.fileUrl || viewing}
                    >
                        {viewing ? (
                            <div className="flex items-center gap-1">
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                Viewing...
                            </div>
                        ) : (
                            <>
                                <Eye className="mr-1 h-4 w-4"/>
                                View
                            </>
                        )}
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-gray-600 hover:bg-gray-50"
                        onClick={handleDownload}
                        disabled={!note.fileUrl || downloading}
                    >
                        {downloading ? (
                            <div className="flex items-center gap-1">
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                Downloading...
                            </div>
                        ) : (
                            <>
                                <Download className="mr-1 h-4 w-4"/>
                                Download
                            </>
                        )}
                    </Button>
                </div>
                
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLike} 
                    className={`gap-1 transition-colors ${
                        note.liked 
                            ? 'text-red-500 hover:text-red-600' 
                            : 'text-gray-500 hover:text-red-500'
                    }`}
                    disabled={!isAuthenticated}
                >
                    <Heart className={`h-4 w-4 ${note.liked ? 'fill-current' : ''}`}/>
                    <span className="min-w-[20px] text-center">{note.likes}</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default NoteCard;
