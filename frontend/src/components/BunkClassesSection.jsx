import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Clock, Coffee, Laptop, Moon, Smile, Users, Calculator } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";

const BunkClassesSection = () => {
  // State for the new calculator
  const [totalWorkingDays, setTotalWorkingDays] = useState('');
  const [lecturesPerDay, setLecturesPerDay] = useState('');
  const [lecturesAttendedSoFar, setLecturesAttendedSoFar] = useState('');
  const [daysPassedSoFar, setDaysPassedSoFar] = useState('');
  const [bunkableDaysResult, setBunkableDaysResult] = useState(null);
  const [calculationError, setCalculationError] = useState('');

  const excuses = [
    "I have a doctor's appointment.", "My laptop crashed!", "Family emergency.", "Food poisoning.",
    "Project deadline for another course.", "Alarm didn't go off.", "Stuck in traffic.",
    "Attending a family wedding.", "Severe migraine.", "Airport pickup duty."
  ];

  const generateExcuse = () => {
    const randomIndex = Math.floor(Math.random() * excuses.length);
    toast.success("Excuse Generated!", { description: excuses[randomIndex] });
  };

  const tips = [
    { id: 1, title: "Master the 75% Rule", description: "Track attendance to stay just above the minimum.", icon: <Clock className="h-5 w-5 text-buddy-lavender" /> },
    { id: 2, title: "Befriend Attendance Takers", description: "They might cover for you occasionally.", icon: <Users className="h-5 w-5 text-buddy-yellow" /> },
    { id: 3, title: "Time It Right", description: "Skip strategically around holidays.", icon: <Coffee className="h-5 w-5 text-buddy-peach" /> },
    { id: 4, title: "Be the Tech Helper", description: "Offer to help with tech for special privileges.", icon: <Laptop className="h-5 w-5 text-buddy-green" /> }
  ];

  const handleCalculateBunks = () => {
    setBunkableDaysResult(null);
    setCalculationError('');

    const numTotalWorkingDays = parseInt(totalWorkingDays);
    const numLecturesPerDay = parseInt(lecturesPerDay);
    const numLecturesAttendedSoFar = parseInt(lecturesAttendedSoFar);
    const numDaysPassedSoFar = parseInt(daysPassedSoFar);

    if (isNaN(numTotalWorkingDays) || numTotalWorkingDays <= 0 ||
        isNaN(numLecturesPerDay) || numLecturesPerDay <= 0 ||
        isNaN(numLecturesAttendedSoFar) || numLecturesAttendedSoFar < 0 ||
        isNaN(numDaysPassedSoFar) || numDaysPassedSoFar < 0) {
      setCalculationError("Please enter valid positive numbers for all fields.");
      toast.error("Invalid Input", { description: "All fields must be valid positive numbers." });
      return;
    }

    if (numDaysPassedSoFar > numTotalWorkingDays) {
      setCalculationError("Days passed cannot exceed total working days.");
      toast.error("Invalid Input", { description: "Days passed cannot exceed total working days." });
      return;
    }
    
    const lecturesScheduledSoFar = numDaysPassedSoFar * numLecturesPerDay;
    if (numLecturesAttendedSoFar > lecturesScheduledSoFar) {
      setCalculationError("Lectures attended so far cannot exceed lectures scheduled so far.");
      toast.error("Input Error", { description: `You can't attend more than ${lecturesScheduledSoFar} lectures if only ${numDaysPassedSoFar} days have passed.` });
      return;
    }

    const totalLecturesInSemester = numTotalWorkingDays * numLecturesPerDay;
    const minRequiredLecturesFor75Percent = Math.ceil(0.75 * totalLecturesInSemester);
    
    const lecturesRemainingInSemester = (numTotalWorkingDays - numDaysPassedSoFar) * numLecturesPerDay;
    
    const maxPossibleAttendance = numLecturesAttendedSoFar + lecturesRemainingInSemester;

    if (maxPossibleAttendance < minRequiredLecturesFor75Percent) {
      setBunkableDaysResult(0); // Or a specific message
      setCalculationError(`Unfortunately, even if you attend all remaining ${lecturesRemainingInSemester} lectures, you cannot reach 75% attendance. You need ${minRequiredLecturesFor75Percent} lectures in total, but can at most attend ${maxPossibleAttendance}.`);
      toast.warning("Attendance Alert", { description: "It's not possible to reach 75% attendance from your current status, even attending all future lectures." });
      return;
    }

    const lecturesCanAffordToMissFromNowOn = maxPossibleAttendance - minRequiredLecturesFor75Percent;
    const daysCanBunkFromNowOn = Math.floor(lecturesCanAffordToMissFromNowOn / numLecturesPerDay);
    
    setBunkableDaysResult(daysCanBunkFromNowOn);
    toast.success("Calculation Complete!", { description: `You can bunk approximately ${daysCanBunkFromNowOn} more full day(s).` });
  };


  return (
    <div className="container mx-auto px-4 pt-0 pb-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 font-outfit">How to <span className="text-buddy-lavender">Bunk Classes</span></h1>
        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">Your ultimate guide to skipping classes smartly. Calculate your safe bunks!</p>
      </div>

      {/* Bunk Calculator Section */}
      <Card className="max-w-lg mx-auto mb-12 bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><Calculator className="text-buddy-lavender"/>Bunk Calculator</CardTitle>
          <CardDescription>Find out how many days you can safely bunk while maintaining 75% attendance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="totalWorkingDays">Total Working Days in Semester</Label>
            <Input id="totalWorkingDays" type="number" placeholder="e.g., 90" value={totalWorkingDays} onChange={(e) => setTotalWorkingDays(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="lecturesPerDay">Lectures Per Day (Average)</Label>
            <Input id="lecturesPerDay" type="number" placeholder="e.g., 4" value={lecturesPerDay} onChange={(e) => setLecturesPerDay(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="lecturesAttendedSoFar">Total Lectures Attended So Far</Label>
            <Input id="lecturesAttendedSoFar" type="number" placeholder="e.g., 120" value={lecturesAttendedSoFar} onChange={(e) => setLecturesAttendedSoFar(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="daysPassedSoFar">Working Days Passed So Far</Label>
            <Input id="daysPassedSoFar" type="number" placeholder="e.g., 45" value={daysPassedSoFar} onChange={(e) => setDaysPassedSoFar(e.target.value)} className="mt-1" />
          </div>
          <Button onClick={handleCalculateBunks} className="w-full cta-button">Calculate Safe Bunks</Button>
          
          {calculationError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{calculationError}</AlertDescription>
            </Alert>
          )}
          {bunkableDaysResult !== null && !calculationError && (
            <Alert className="mt-4 border-green-500 bg-green-500/10">
               <Smile className="h-4 w-4 text-green-600"/>
              <AlertDescription className="text-green-700 font-medium">
                You can safely bunk approximately <span className="font-bold text-xl">{bunkableDaysResult}</span> more full day(s) and still maintain 75% attendance for the semester (assuming you attend all other remaining lectures).
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Top Tips Section (Kept) */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Tips to Bunk Like a Pro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tips.map((tip) => (
            <Card key={tip.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">{tip.icon}<CardTitle className="text-lg">{tip.title}</CardTitle></div>
              </CardHeader>
              <CardContent><CardDescription>{tip.description}</CardDescription></CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Excuse Generator (Kept) */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Emergency Excuse Generator</h2>
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Need a Quick Excuse?</CardTitle>
            <CardDescription>Get a random, believable excuse with one click!</CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <Button onClick={generateExcuse} className="bg-buddy-lavender hover:bg-buddy-lavender/80">
              <Smile className="mr-2 h-5 w-5" /> Generate Excuse
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Warning Section (Kept) */}
      <div className="max-w-2xl mx-auto">
        <Alert className="border-red-300 bg-red-500/10">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-800">
            <div className="font-bold mb-1">Don't Get Caught!</div>
            <p>Remember to balance your bunking habits. Too many absences can affect your grades and attendance requirements. Bunk responsibly!</p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default BunkClassesSection;
