
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "@/data/courses";

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
            Free Courses
          </h1>
          <p className="text-lg text-white/70">
            Access expert knowledge and proven strategies through these free courses designed
            to help you launch and scale your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id}
              className={`bg-accent/30 border-accent hover:border-white/30 transition-all duration-300 card-hover ${
                course.featured ? "relative overflow-hidden" : ""
              }`}
            >
              {course.featured && (
                <div className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                  {course.icon}
                </div>
                <CardTitle className="text-xl gradient-text">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  {course.description}
                </p>
                <div className="flex justify-between text-sm text-white/50">
                  <span>{course.lessons} lessons</span>
                  <span>{course.duration}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/courses/${course.id}`} className="w-full">
                  <Button variant="ghost" className="w-full justify-between group">
                    <span>{course.buttonText}</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Courses;
