
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Bookmark, CheckCircle, Users } from "lucide-react";
import { courses } from "@/data/courses";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || "1");
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Course not found</h1>
          <Link to="/courses">
            <Button variant="outline">Back to Courses</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <Link to="/courses" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Courses
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
              {course.icon}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-white/70">
                <Clock size={18} className="mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-white/70">
                <Bookmark size={18} className="mr-2" />
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center text-white/70">
                <Users size={18} className="mr-2" />
                <span>2,546 students enrolled</span>
              </div>
            </div>
            
            <p className="text-lg text-white/80 mb-8">
              {course.fullDescription || course.description}
            </p>
            
            <h2 className="text-xl font-bold mb-4 gradient-text">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-8">
              {course.learningPoints?.map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle size={18} className="text-white/70 mr-2 mt-0.5" />
                  <span className="text-white/70">{point}</span>
                </div>
              ))}
            </div>
            
            <h2 className="text-xl font-bold mb-4 gradient-text">Course Content</h2>
            <div className="space-y-4 mb-8">
              {course.modules?.map((module, index) => (
                <div key={index} className="bg-accent/30 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">{module.title}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {module.lessons.map((lesson, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center">
                          <span className="w-5 h-5 rounded-full bg-white/10 text-xs flex items-center justify-center mr-3">
                            {i + 1}
                          </span>
                          <span className="text-white/80">{lesson}</span>
                        </div>
                        <span className="text-xs text-white/50">{Math.floor(5 + Math.random() * 20)} min</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Card className="bg-accent/30 border-white/10 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 gradient-text text-center">Enroll for Free</h3>
                <p className="text-white/70 mb-6 text-center">
                  Get access to all course materials and lifetime updates.
                </p>
                <Button className="w-full bg-white text-black hover:bg-white/90 mb-4">
                  Enroll Now
                </Button>
                <div className="text-center text-white/50 text-sm">
                  No credit card required
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
