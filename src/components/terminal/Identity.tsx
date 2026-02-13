import GlitchText from './GlitchText';

export default function Identity() {
  return (
    <div className="flex flex-col items-center text-center py-16">
      <div className="space-y-6">
        <GlitchText />

        <p className="font-body text-lg md:text-xl text-frost/60 leading-relaxed">
          Developer · Researcher · Creative
        </p>

        <p className="font-mono text-sm text-frost/30">
          {'>'} Building at the intersection of code and design_
        </p>
      </div>
    </div>
  );
}
