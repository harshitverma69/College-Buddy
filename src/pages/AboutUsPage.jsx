import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar'; // Assuming you want Navbar on this page
import Footer from '@/components/Footer';   // Assuming you want Footer on this page

const AboutUsPage = () => {
  return (
    <>
      {/* <Navbar /> */} {/* Navbar is global in App.jsx */}
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-0"> {/* Removed gradient, adjusted pt-24 to pt-0 */}
        <div className="container mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-buddy-lavender font-outfit">About College Buddy</h1>
            <p className="text-xl text-gray-600 mt-2">Your All-in-One Campus Companion</p>
          </header>

          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 font-outfit mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                College Buddy is your all-in-one campus companion — from last-minute notes and PYQs 
                to how-to-bunk hacks and crisp to-do lists. We aim to simplify college life by providing
                essential tools and resources in one accessible platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 font-outfit mb-4">Who We Are</h2>
              <p className="text-gray-700 leading-relaxed">
                We are a team of passionate students who understand the daily grind of college. 
                College Buddy was born out of our own needs and experiences, with the goal of creating
                something genuinely useful for our peers. Made for students, by students.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 font-outfit mb-4">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li>Curated study materials and previous year questions (PYQs).</li>
                <li>Smart attendance management tips (aka bunking hacks!).</li>
                <li>An intuitive to-do list to keep track of assignments and deadlines.</li>
                <li>A collaborative notes library.</li>
                <li>And much more to come!</li>
              </ul>
            </section>
            <div className="text-center mt-12">
              <Link to="/" className="cta-button inline-block">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */} {/* Uncomment if you want Footer */}
    </>
  );
};

export default AboutUsPage;