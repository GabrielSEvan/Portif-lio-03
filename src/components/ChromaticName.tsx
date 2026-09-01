import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  Magnet, 
  Waves, 
  Sparkles, 
  Sliders, 
  Eye, 
  Activity, 
  Check, 
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react';

interface ChromaticNameProps {
  firstName: string;
  lastName: string;
}

interface EffectConfig {
  magnetic: boolean;
  liquidSvg: boolean;
  variableFont: boolean;
  chromaticShift: boolean;
  canvasRefraction: boolean;
  intensity: number; // 0.5 to 1.5
}

interface MouseState {
  x: number; // container relative x
  y: number; // container relative y
  screenX: number;
  screenY: number;
  speed: number;
  isHovered: boolean;
  lastMoveTime: number;
}

interface LetterPhysics {
  x: number;
  y: number;
  weight: number;
  slant: number;
  tracking: number;
  redX: number;
  redY: number;
  cyanX: number;
  cyanY: number;
}

// Single Character with Magnetic, Variable Font & Chromatic Physics
const MagneticChar: React.FC<{
  char: string;
  index: number;
  total: number;
  mouseState: MouseState;
  config: EffectConfig;
  isSerif?: boolean;
  baseWeight?: number;
}> = ({
  char,
  index,
  total,
  mouseState,
  config,
  isSerif = false,
  baseWeight = 800
}) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [physics, setPhysics] = useState<LetterPhysics>({
    x: 0,
    y: 0,
    weight: baseWeight,
    slant: 0,
    tracking: 0,
    redX: 0,
    redY: 0,
    cyanX: 0,
    cyanY: 0,
  });

  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePhysics = () => {
      if (!spanRef.current) return;
      
      const rect = spanRef.current.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      // Calculate vector from character center to mouse screen position
      const dx = mouseState.screenX - charCenterX;
      const dy = mouseState.screenY - charCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const influenceRadius = 180 * config.intensity;
      const isInRange = mouseState.isHovered && dist < influenceRadius && dist > 0;

      let targetX = 0;
      let targetY = 0;
      let targetWeight = baseWeight;
      let targetSlant = isSerif ? -6 : 0;
      let targetRedX = 0;
      let targetRedY = 0;
      let targetCyanX = 0;
      let targetCyanY = 0;

      if (isInRange) {
        // Proximity normalized: 1 at center, 0 at outer boundary
        const proximity = Math.pow(1 - dist / influenceRadius, 1.4);

        // 1. Magnetic Attraction Physics
        if (config.magnetic) {
          const maxPull = 22 * config.intensity;
          targetX = (dx / dist) * maxPull * proximity;
          targetY = (dy / dist) * maxPull * proximity;
        }

        // 2. Variable Font weight & slant calculation
        if (config.variableFont) {
          if (isSerif) {
            // Fraunces / Garamond: weight 300 -> 900, slant variation
            targetWeight = Math.min(900, Math.max(300, baseWeight + proximity * 450 * config.intensity));
            targetSlant = -6 + (dx / influenceRadius) * 16 * config.intensity;
          } else {
            // Space Grotesk / Jakarta: weight 600 -> 900
            targetWeight = Math.min(900, Math.max(400, baseWeight + proximity * 300 * config.intensity));
          }
        }

        // 3. Chromatic Optical Split per letter
        if (config.chromaticShift) {
          const shift = 10 * proximity * config.intensity;
          const angle = Math.atan2(dy, dx);
          targetRedX = Math.cos(angle) * shift;
          targetRedY = Math.sin(angle) * shift * 0.7;
          targetCyanX = -Math.cos(angle) * shift;
          targetCyanY = -Math.sin(angle) * shift * 0.7;
        }
      }

      // Smooth physics lerp
      setPhysics((prev) => {
        const lerpFactor = mouseState.isHovered ? 0.25 : 0.12;
        return {
          x: prev.x + (targetX - prev.x) * lerpFactor,
          y: prev.y + (targetY - prev.y) * lerpFactor,
          weight: Math.round(prev.weight + (targetWeight - prev.weight) * lerpFactor),
          slant: prev.slant + (targetSlant - prev.slant) * lerpFactor,
          tracking: 0,
          redX: prev.redX + (targetRedX - prev.redX) * lerpFactor,
          redY: prev.redY + (targetRedY - prev.redY) * lerpFactor,
          cyanX: prev.cyanX + (targetCyanX - prev.cyanX) * lerpFactor,
          cyanY: prev.cyanY + (targetCyanY - prev.cyanY) * lerpFactor,
        };
      });
    };

    updatePhysics();
  }, [mouseState, config, baseWeight, isSerif]);

  if (char === ' ') {
    return <span className="inline-block w-3 sm:w-5">&nbsp;</span>;
  }

  const textShadowStyle = config.chromaticShift && (Math.abs(physics.redX) > 0.3 || Math.abs(physics.cyanX) > 0.3)
    ? `${physics.redX.toFixed(1)}px ${physics.redY.toFixed(1)}px 0px rgba(255, 46, 99, 0.85),
       ${physics.cyanX.toFixed(1)}px ${physics.cyanY.toFixed(1)}px 0px rgba(0, 240, 255, 0.85),
       0px 0px 18px rgba(47, 21, 237, 0.4)`
    : 'none';

  return (
    <span
      ref={spanRef}
      className={`inline-block select-none will-change-transform ${
        isSerif ? 'font-variable-serif italic' : 'font-variable-heading'
      }`}
      style={{
        transform: `translate3d(${physics.x.toFixed(2)}px, ${physics.y.toFixed(2)}px, 0px)`,
        fontWeight: physics.weight,
        fontVariationSettings: isSerif
          ? `'wght' ${physics.weight}, 'slnt' ${physics.slant.toFixed(1)}, 'WONK' 1`
          : `'wght' ${physics.weight}`,
        textShadow: textShadowStyle,
        transition: 'transform 0.05s ease-out',
      }}
    >
      {char}
    </span>
  );
};

export const ChromaticName: React.FC<ChromaticNameProps> = ({ firstName, lastName }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const feDispMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const feTurbRef = useRef<SVGFETurbulenceElement | null>(null);

  // Effect configuration state
  const [config, setConfig] = useState<EffectConfig>({
    magnetic: true,
    liquidSvg: true,
    variableFont: true,
    chromaticShift: true,
    canvasRefraction: true,
    intensity: 1.0,
  });

  const [showControls, setShowControls] = useState(false);

  // Mouse tracking state
  const [mouseState, setMouseState] = useState<MouseState>({
    x: 0,
    y: 0,
    screenX: 0,
    screenY: 0,
    speed: 0,
    isHovered: false,
    lastMoveTime: 0,
  });

  const prevMousePos = useRef({ x: 0, y: 0, time: 0 });
  const displacementScale = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const ripples = useRef<Array<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }>>([]);

  // Mouse Move Handler with Speed & Position Calculation
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    // Calculate cursor velocity (speed in px/ms)
    const dt = Math.max(1, now - prevMousePos.current.time);
    const dx = e.clientX - prevMousePos.current.x;
    const dy = e.clientY - prevMousePos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = Math.min(distance / dt, 5); // Clamped speed

    prevMousePos.current = { x: e.clientX, y: e.clientY, time: now };

    setMouseState({
      x,
      y,
      screenX: e.clientX,
      screenY: e.clientY,
      speed,
      isHovered: true,
      lastMoveTime: now,
    });

    // Add occasional fluid ripple on rapid movement
    if (speed > 0.8 && ripples.current.length < 8) {
      ripples.current.push({
        x,
        y,
        radius: 5,
        maxRadius: 100 + speed * 25,
        alpha: 0.6,
      });
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouseState(prev => ({
      ...prev,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      screenX: e.clientX,
      screenY: e.clientY,
      isHovered: true,
      lastMoveTime: performance.now(),
    }));
  };

  const handleMouseLeave = () => {
    setMouseState(prev => ({
      ...prev,
      isHovered: false,
      speed: 0,
    }));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Trigger strong ripple wave on click
    ripples.current.push({
      x,
      y,
      radius: 10,
      maxRadius: 180,
      alpha: 0.9,
    });
  };

  // SVG feDisplacementMap & feTurbulence Dynamic Update Loop
  useEffect(() => {
    let phase = 0;

    const animateFilter = () => {
      phase += 0.015;

      if (feDispMapRef.current && feTurbRef.current) {
        if (config.liquidSvg && mouseState.isHovered) {
          // Dynamic scale based on mouse speed & intensity
          const targetScale = (6 + mouseState.speed * 16) * config.intensity;
          displacementScale.current += (targetScale - displacementScale.current) * 0.15;
          
          const freqX = 0.018 + Math.sin(phase) * 0.005;
          const freqY = 0.024 + Math.cos(phase * 0.8) * 0.006;
          
          feTurbRef.current.setAttribute('baseFrequency', `${freqX.toFixed(4)} ${freqY.toFixed(4)}`);
          feDispMapRef.current.setAttribute('scale', displacementScale.current.toFixed(2));
        } else {
          // Smoothly decay to 0 when not hovered or disabled
          displacementScale.current += (0 - displacementScale.current) * 0.1;
          feDispMapRef.current.setAttribute('scale', displacementScale.current.toFixed(2));
        }
      }

      // Canvas Liquid & Refraction Render Loop
      if (canvasRef.current && config.canvasRefraction) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Render Interactive Optical Refraction Lens under Cursor
          if (mouseState.isHovered) {
            const grad = ctx.createRadialGradient(
              mouseState.x, mouseState.y, 5,
              mouseState.x, mouseState.y, 140 * config.intensity
            );
            grad.addColorStop(0, 'rgba(0, 240, 255, 0.28)');
            grad.addColorStop(0.35, 'rgba(47, 21, 237, 0.22)');
            grad.addColorStop(0.7, 'rgba(255, 46, 99, 0.12)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(mouseState.x, mouseState.y, 140 * config.intensity, 0, Math.PI * 2);
            ctx.fill();

            // Concentric Refraction Wave Ring
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(mouseState.x, mouseState.y, 45 + Math.sin(phase * 3) * 6, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Update & Render Fluid Ripples
          for (let i = ripples.current.length - 1; i >= 0; i--) {
            const r = ripples.current[i];
            r.radius += 3.5;
            r.alpha *= 0.94;

            if (r.alpha < 0.02 || r.radius > r.maxRadius) {
              ripples.current.splice(i, 1);
              continue;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha.toFixed(3)})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Secondary chromatic ring
            ctx.beginPath();
            ctx.arc(r.x, r.y, Math.max(0, r.radius - 6), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 46, 99, ${(r.alpha * 0.7).toFixed(3)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animateFilter);
    };

    animationFrameId.current = requestAnimationFrame(animateFilter);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [mouseState.isHovered, mouseState.speed, config]);

  // Split names into individual characters for Magneto & Variable Font processing
  const firstLetters = useMemo(() => firstName.split(''), [firstName]);
  const lastLetters = useMemo(() => lastName.split(''), [lastName]);

  return (
    <div className="relative inline-block py-3 group">
      
      {/* SVG Dynamic Displacement Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="liquid-optical-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={feTurbRef}
              type="fractalNoise"
              baseFrequency="0.022 0.03"
              numOctaves="3"
              result="fluidNoise"
            />
            <feDisplacementMap
              ref={feDispMapRef}
              in="SourceGraphic"
              in2="fluidNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative cursor-pointer select-none p-4 -m-4 rounded-3xl transition-all duration-300"
        title="Interaja com o mouse: Efeito Magneto + Distorção Líquida + Fontes Variáveis"
      >
        {/* WebGL/2D Canvas Refraction & Ripple Overlay */}
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-90 rounded-3xl"
        />

        {/* Outer Container with optional SVG feDisplacementMap filter */}
        <div 
          className={`relative z-10 ${config.liquidSvg && displacementScale.current > 0.5 ? 'filter-liquid-distortion' : ''}`}
        >
          {/* First Name Line (GABRIEL SILVA) with Individual Magnetic Characters */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-display text-white tracking-tight leading-[1.02] flex flex-wrap items-baseline">
            {firstLetters.map((char, i) => (
              <MagneticChar
                key={`first-${i}`}
                char={char}
                index={i}
                total={firstLetters.length}
                mouseState={mouseState}
                config={config}
                baseWeight={800}
              />
            ))}
          </h1>

          {/* Last Name Line (Evangelista) in Variable Serif with Accent Gradient */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[1.05] mt-1 text-gradient-accent flex flex-wrap items-baseline">
            {lastLetters.map((char, i) => (
              <MagneticChar
                key={`last-${i}`}
                char={char}
                index={i}
                total={lastLetters.length}
                mouseState={mouseState}
                config={config}
                isSerif={true}
                baseWeight={500}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Telemetry & Physics Status Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div 
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070448] border border-[#170ba4] text-[11px] font-mono-code text-[#9d90ff] transition-all duration-300 ${
            mouseState.isHovered ? 'border-[#2f15ed] shadow-md shadow-[#2f15ed]/20' : 'opacity-80'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${mouseState.isHovered ? 'bg-emerald-400 animate-ping' : 'bg-[#2f15ed]'}`}></span>
          <span className="font-bold">
            {mouseState.isHovered ? 'FÍSICA ÓPTICA ATIVA' : 'PASSE O MOUSE NO NOME'}
          </span>
          {mouseState.isHovered && (
            <span className="hidden sm:inline-block text-zinc-400 pl-1 border-l border-[#0c0580]">
              VEL: {mouseState.speed.toFixed(1)}px/ms
            </span>
          )}
          {config.liquidSvg && mouseState.isHovered && (
            <span className="hidden md:inline-block text-zinc-400 pl-1 border-l border-[#0c0580]">
              SVG DISP: {displacementScale.current.toFixed(0)}px
            </span>
          )}
        </div>

        {/* Toggle Panel Button */}
        <button
          id="toggle-optical-controls"
          onClick={() => setShowControls(!showControls)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-code transition-all active:scale-95 ${
            showControls 
              ? 'bg-[#2f15ed] text-white font-bold' 
              : 'bg-[#00005c] hover:bg-[#070448] text-zinc-300 border border-[#170ba4]'
          }`}
          title="Abrir painel de calibração dos efeitos ópticos"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>CALIBRAR EFEITOS [{showControls ? 'FECHAR' : 'AJUSTAR'}]</span>
        </button>
      </div>

      {/* Floating Effect Calibration Panel */}
      {showControls && (
        <div className="mt-3 p-5 rounded-2xl bg-[#00005c] border border-[#170ba4] shadow-2xl space-y-4 max-w-xl animate-in fade-in slide-in-from-top-2 duration-200 z-30">
          <div className="flex items-center justify-between border-b border-[#0c0580] pb-3 text-xs font-mono-code text-zinc-300">
            <span className="text-[#9d90ff] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2f15ed]" />
              PARÂMETROS DOS EFEITOS ÓPTICOS & FÍSICOS
            </span>
            <button
              onClick={() => setConfig({
                magnetic: true,
                liquidSvg: true,
                variableFont: true,
                chromaticShift: true,
                canvasRefraction: true,
                intensity: 1.0,
              })}
              className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
              title="Restaurar padrão"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESTAURAR</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono-code">
            {/* Magneto Toggle */}
            <button
              onClick={() => setConfig(prev => ({ ...prev, magnetic: !prev.magnetic }))}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                config.magnetic 
                  ? 'bg-[#070448] border-[#2f15ed] text-white' 
                  : 'bg-[#00005c] border-[#170ba4]/60 text-zinc-400'
              }`}
            >
              <span className="flex items-center gap-2">
                <Magnet className="w-4 h-4 text-[#2f15ed]" />
                <span>1. Efeito Magneto (Letras)</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${config.magnetic ? 'bg-[#2f15ed] text-white' : 'bg-[#0c0580] text-zinc-400'}`}>
                {config.magnetic ? 'ATIVO' : 'OFF'}
              </span>
            </button>

            {/* SVG Displacement Toggle */}
            <button
              onClick={() => setConfig(prev => ({ ...prev, liquidSvg: !prev.liquidSvg }))}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                config.liquidSvg 
                  ? 'bg-[#070448] border-[#2f15ed] text-white' 
                  : 'bg-[#00005c] border-[#170ba4]/60 text-zinc-400'
              }`}
            >
              <span className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-[#00f0ff]" />
                <span>2. Distorção SVG Liquid</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${config.liquidSvg ? 'bg-[#2f15ed] text-white' : 'bg-[#0c0580] text-zinc-400'}`}>
                {config.liquidSvg ? 'ATIVO' : 'OFF'}
              </span>
            </button>

            {/* Variable Fonts Toggle */}
            <button
              onClick={() => setConfig(prev => ({ ...prev, variableFont: !prev.variableFont }))}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                config.variableFont 
                  ? 'bg-[#070448] border-[#2f15ed] text-white' 
                  : 'bg-[#00005c] border-[#170ba4]/60 text-zinc-400'
              }`}
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#9d90ff]" />
                <span>3. Fontes Variáveis (Peso/Slnt)</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${config.variableFont ? 'bg-[#2f15ed] text-white' : 'bg-[#0c0580] text-zinc-400'}`}>
                {config.variableFont ? 'ATIVO' : 'OFF'}
              </span>
            </button>

            {/* Chromatic Shift Toggle */}
            <button
              onClick={() => setConfig(prev => ({ ...prev, chromaticShift: !prev.chromaticShift }))}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                config.chromaticShift 
                  ? 'bg-[#070448] border-[#2f15ed] text-white' 
                  : 'bg-[#00005c] border-[#170ba4]/60 text-zinc-400'
              }`}
            >
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#ff2e63]" />
                <span>4. Dispersão Cromática RGB</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${config.chromaticShift ? 'bg-[#2f15ed] text-white' : 'bg-[#0c0580] text-zinc-400'}`}>
                {config.chromaticShift ? 'ATIVO' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Intensity Slider */}
          <div className="pt-2 border-t border-[#0c0580]">
            <div className="flex justify-between items-center text-xs font-mono-code text-zinc-300 mb-2">
              <span>INTENSIDADE GERAL DA FÍSICA:</span>
              <span className="text-[#9d90ff] font-bold">{(config.intensity * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.0"
              step="0.1"
              value={config.intensity}
              onChange={(e) => setConfig(prev => ({ ...prev, intensity: parseFloat(e.target.value) }))}
              className="w-full h-1.5 bg-[#070448] rounded-lg appearance-none cursor-pointer accent-[#2f15ed]"
            />
          </div>
        </div>
      )}

    </div>
  );
};
