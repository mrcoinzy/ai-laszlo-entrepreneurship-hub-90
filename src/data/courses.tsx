
import React from 'react';
import { BookOpen, BarChart, Target } from 'lucide-react';

export const courses = [
  {
    id: '1',
    title: 'Business Fundamentals',
    description: 'Learn the core principles of starting and growing a successful business.',
    icon: <BookOpen size={24} className="text-purple-500" />,
    buttonText: 'Start Course',
    featured: false
  },
  {
    id: '2',
    title: 'Marketing Strategies',
    description: 'Discover effective marketing techniques to attract and retain customers.',
    icon: <BarChart size={24} className="text-blue-500" />,
    buttonText: 'Explore Course',
    featured: true
  },
  {
    id: '3',
    title: 'Goal Setting Masterclass',
    description: 'Develop a clear roadmap to achieve your business and personal objectives.',
    icon: <Target size={24} className="text-green-500" />,
    buttonText: 'Begin Learning',
    featured: false
  }
];
