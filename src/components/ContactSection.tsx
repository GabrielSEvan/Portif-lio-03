import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  FileText, 
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenCV: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCV }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2f15ed', '#2310c8', '#170ba4', '#9d90ff', '#ffffff']
    });

    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section 
      id="contato" 
      className="py-32 lg:py-40 relative border-b border-[#170ba4]/50 bg-[#020228]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[#170ba4]/40 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff] mb-5">
              <span className="text-[#2f15ed] font-bold">[ 06 ]</span>
              <span>CANAL DE CONTATO DIRETO</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Vamos <span className="font-serif-accent italic font-normal text-gradient-accent">Conversar</span> & <br />
              Construir Parcerias
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-md font-normal leading-relaxed">
            Aberto para novas oportunidades, projetos desafiadores, conexões profissionais e conversas sobre liderança, gestão de processos e inteligência artificial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Coluna Esquerda: Informações Diretas */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#070448] border border-[#170ba4] space-y-8">
              <div className="flex items-center justify-between font-mono-code text-xs text-zinc-400 border-b border-[#0c0580] pb-4">
                <span className="text-[#2f15ed] font-bold">INFORMAÇÕES DE CONTATO</span>
                <span className="text-[#9d90ff]">DISPONÍVEL</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00005c] border border-[#170ba4] flex items-center justify-center text-[#9d90ff] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono-code text-zinc-400 block mb-1">E-MAIL PRINCIPAL</span>
                    <span className="text-sm sm:text-base font-bold text-white break-all">{personalInfo.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00005c] border border-[#170ba4] flex items-center justify-center text-[#9d90ff] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono-code text-zinc-400 block mb-1">LOCALIZAÇÃO</span>
                    <span className="text-sm sm:text-base font-bold text-white">{personalInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00005c] border border-[#170ba4] flex items-center justify-center text-[#9d90ff] shrink-0 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono-code text-zinc-400 block mb-1">ORGANIZAÇÃO / LOTAÇÃO</span>
                    <span className="text-sm sm:text-base font-bold text-white">Exército Brasileiro • DEC</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação Rápida */}
              <div className="pt-6 border-t border-[#0c0580] flex flex-col gap-3">
                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00005c] hover:bg-[#0c0580] border border-[#170ba4] text-xs font-mono-code text-zinc-200 hover:text-white transition-all active:scale-95"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">E-MAIL COPIADO COM SUCESSO!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#9d90ff]" />
                      <span>COPIAR ENDEREÇO DE E-MAIL</span>
                    </>
                  )}
                </button>

                <button
                  id="contact-cv-modal-btn"
                  onClick={onOpenCV}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white text-xs font-mono-code font-bold shadow-md shadow-[#2f15ed]/25 transition-all active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>VISUALIZAR CURRÍCULO COMPLETO</span>
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Mensagem */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#070448] border border-[#170ba4]">
              <div className="flex items-center justify-between font-mono-code text-xs text-zinc-400 border-b border-[#0c0580] pb-4 mb-8">
                <span className="text-[#2f15ed] font-bold">FORMULÁRIO DE CONTATO DIRETO</span>
                <span>RESPOSTA RÁPIDA</span>
              </div>

              {submitted ? (
                <div className="text-center py-14 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#00005c] border border-[#2f15ed] text-[#9d90ff] flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Mensagem Registrada com Sucesso!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Obrigado pelo contato, <strong className="text-white">{formData.name}</strong>. Retornarei em breve no e-mail fornecido.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-6 py-3 rounded-xl bg-[#00005c] hover:bg-[#0c0580] text-xs font-mono-code text-zinc-200 border border-[#170ba4] transition-all"
                  >
                    ENVIAR OUTRA MENSAGEM
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono-code text-zinc-300 uppercase tracking-wider mb-2.5">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Carlos Silva"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#00005c] border border-[#170ba4] text-white text-sm focus:outline-none focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] transition-all placeholder:text-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-zinc-300 uppercase tracking-wider mb-2.5">
                        Seu E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seuemail@empresa.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#00005c] border border-[#170ba4] text-white text-sm focus:outline-none focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] transition-all placeholder:text-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-zinc-300 uppercase tracking-wider mb-2.5">
                      Assunto / Proposta
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ex: Oportunidade profissional / Projeto de Gestão ou IA"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#00005c] border border-[#170ba4] text-white text-sm focus:outline-none focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] transition-all placeholder:text-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-zinc-300 uppercase tracking-wider mb-2.5">
                      Sua Mensagem *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Escreva sua mensagem ou detalhes do contato..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#00005c] border border-[#170ba4] text-white text-sm focus:outline-none focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] transition-all resize-none placeholder:text-zinc-500"
                    ></textarea>
                  </div>

                  <button
                    id="submit-contact-form"
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white font-mono-code font-bold text-xs sm:text-sm tracking-wider shadow-md shadow-[#2f15ed]/25 transition-all duration-200 active:scale-95"
                  >
                    <span>ENVIAR MENSAGEM</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
