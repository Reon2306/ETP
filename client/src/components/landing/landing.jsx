import { useCallback, useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './footer';
import { ArrowRight } from "lucide-react";
import { Brain, BookOpen, FileText, Zap, BarChart3 } from "lucide-react";
import { ServerContext } from '../../context/ServerContext';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/home';

export default function LandingPage() {
  const {account} = useContext(ServerContext);
  const navigate=useNavigate();
  useEffect(()=>{if(account)navigate("dashboard")},[account]);
  return (
    <>
      <Header />
      <section id="home" className="relative overflow-hidden py-20 md:py-32 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Master Your Studies with <span className="text-blue-700">AI-Powered</span> Answers
              </h1>
              <p className="text-lg text-gray-500">
                Upload your notes and question banks. Get instant, accurate answers with AI-powered search. Study smarter, not harder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/signup">
                  <button className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 w-full sm:w-auto flex items-center justify-center">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
                <a href="#about">
                  <button className="px-6 py-3 border border-blue-700 text-blue-700 rounded-lg font-medium hover:bg-blue-50 w-full sm:w-auto">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-24 h-24 text-blue-700 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500">Your study companion awaits</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="about" className="py-20 bg-gray-100/100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Powerful Features for Better Learning
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Everything you need to ace your exams and master your subjects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: FileText,
              title: "Upload Notes & Questions",
              desc: "Easily upload your study notes and question banks in multiple formats"
            }, {
              icon: Zap,
              title: "AI-Powered Search",
              desc: "Intelligent search finds accurate answers from your notes instantly"
            }, {
              icon: BarChart3,
              title: "Customizable Answers",
              desc: "Choose answer length and include diagrams for comprehensive understanding"
            }, {
              icon: Brain,
              title: "Smart Highlighting",
              desc: "Exact answers are highlighted in your notes for quick reference"
            }, {
              icon: BookOpen,
              title: "PDF Export",
              desc: "Export your answers to PDF for offline study and sharing"
            }, {
              icon: Zap,
              title: "Save Favorites",
              desc: "Bookmark important answers and questions for quick access later"
            }].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-700 transition">
                  <Icon className="w-12 h-12 text-blue-700 mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Study Experience?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of students already using StudyAI to ace their exams</p>
          <a href="/signup" className="flex justify-center">
            <button className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 flex items-center justify-center">
              Get Started Today <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}