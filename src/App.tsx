import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationsEducation } from './components/CertificationsEducation';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CurriculumModal } from './components/CurriculumModal';
import { VisitorAuthModal } from './components/VisitorAuthModal';
import { AdminVisitorDashboard } from './components/AdminVisitorDashboard';
import { VisitorFloatingBadge } from './components/VisitorFloatingBadge';
import { ToastNotification, ToastMessage } from './components/ToastNotification';
import { getCurrentVisitor } from './services/visitorService';
import { VisitorRecord } from './types';

export default function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentVisitor, setCurrentVisitorState] = useState<VisitorRecord | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Check visitor status on initial mount
  useEffect(() => {
    const existingVisitor = getCurrentVisitor();
    if (existingVisitor) {
      setCurrentVisitorState(existingVisitor);
      setIsAuthOpen(false);
    } else {
      // Mandatory registration: Keep auth modal open
      setIsAuthOpen(true);
    }
  }, []);

  const handleVisitorRegistered = (visitor: VisitorRecord) => {
    setCurrentVisitorState(visitor);
    setIsAuthOpen(false);

    // Subtle celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#2f15ed', '#00f0ff', '#ffffff', '#10b981']
      });
    } catch {
      // ignore in environments without canvas support
    }

    // Trigger welcome toast notification
    const firstName = visitor.name ? visitor.name.split(' ')[0] : 'Visitante';
    setToast({
      id: Date.now().toString(),
      title: `Bem-vindo(a), ${firstName}! ✨`,
      message: 'Seu acesso foi liberado com sucesso. Explore projetos de IA, automação e trajetória no DEC.',
      type: 'welcome',
      duration: 6000,
    });
  };

  const handleCloseAuth = () => {
    // Only allow closing if the visitor is already registered
    if (currentVisitor) {
      setIsAuthOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020228] text-[#f1f0fa] relative selection:bg-[#2f15ed]/40 selection:text-white">
      {/* Subtle Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-50 pointer-events-none -z-20"></div>

      {/* Toast Notification */}
      <ToastNotification toast={toast} onDismiss={() => setToast(null)} />

      {/* Main Content Sections - Editorial Architecture */}
      <main className="relative">
        <HeroSection onOpenCV={() => setIsCVOpen(true)} />
        <WorkSection />
        <AboutSection />
        <ExperienceSection />
        <CertificationsEducation />
        <SkillsMatrix />
        <ContactSection onOpenCV={() => setIsCVOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Visitor & Admin Quick Bar */}
      <VisitorFloatingBadge
        currentVisitor={currentVisitor}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* Visitor Mandatory Registration Modal */}
      <VisitorAuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        onRegistered={handleVisitorRegistered}
        isRegisteredUser={Boolean(currentVisitor)}
      />

      {/* Gabriel Admin Control Dashboard */}
      <AdminVisitorDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Interactive Curriculum Modal */}
      <CurriculumModal 
        isOpen={isCVOpen} 
        onClose={() => setIsCVOpen(false)} 
      />
    </div>
  );
}

