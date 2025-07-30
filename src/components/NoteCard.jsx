import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const NoteCard = ({ note, onLike }) => {
    return (<Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] bg-white/80 backdrop-blur-sm"> {/* Added translucent background */}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">{note.title}</CardTitle>
        </div>
        <p className="text-sm text-gray-500 mt-1">{note.subject}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-buddy-blue bg-opacity-30">
            {note.course}
          </Badge>
          <Badge variant="outline" className="bg-buddy-yellow bg-opacity-30">
            Semester {note.semester}
          </Badge>
        </div>
        <p className="text-xs text-gray-500">
          Uploaded by <span className="font-semibold">{note.uploader}</span>
        </p>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-gray-600">
            <Eye className="mr-1 h-4 w-4"/> View
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Download className="mr-1 h-4 w-4"/> Download
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={onLike} className={`gap-1 ${note.liked ? 'text-red-500' : 'text-gray-500'}`}>
          <Heart className={`h-4 w-4 ${note.liked ? 'fill-current' : ''}`}/>
          {note.likes}
        </Button>
      </CardFooter>
    </Card>);
};
export default NoteCard;
