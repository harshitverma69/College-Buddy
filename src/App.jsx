import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict if Sonner is also a component name
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider
import Index from "./pages/Index";
import StudyTips from "./pages/StudyTips";
import TodoList from "./pages/TodoList";
import NotesLibrary from "./pages/NotesLibrary";
import BunkClasses from "./pages/BunkClasses";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import FaqPage from "./pages/FaqPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <Toaster />
        <SonnerToaster /> {/* Use renamed import */}
        <BrowserRouter>
          <div className="relative flex flex-col min-h-screen">
            {/* Global Background Image - Fixed to viewport, behind everything else */}
            <div
              className="fixed inset-0 bg-[url('/d3cffc7a-f8a3-4777-b00f-7423cbbfc076.png')] bg-cover bg-center opacity-20 -z-10"
            ></div>
            
            <Navbar />
            
            <main className="flex-grow pt-20 relative z-0">
              <Routes>
                <Route path="/" element={<Index />}/>
                <Route path="/study-tips" element={<StudyTips />}/>
                <Route path="/todo" element={<TodoList />}/>
                <Route path="/notes" element={<NotesLibrary />}/>
                <Route path="/bunk-classes" element={<BunkClasses />}/>
                <Route path="/signin" element={<SignInPage />}/>
                <Route path="/signup" element={<SignUpPage />}/>
                <Route path="/about-us" element={<AboutUsPage />}/>
                <Route path="/contact-us" element={<ContactUsPage />}/>
                <Route path="/faq" element={<FaqPage />}/>
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />}/>
                <Route path="/terms-of-service" element={<TermsOfServicePage />}/>
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </main>
            
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
