 import { useState } from 'react';
 import GlassCard from '@components/core/GlassCard';
 
 interface MapWidgetProps {
   city?: string;
   lat?: number;
   lng?: number;
   mapImageUrl?: string;
 }
 
 export default function MapWidget({
   city = 'HONG KONG',
   lat = 22.3033,
   lng = 114.1795,
   mapImageUrl,
 }: MapWidgetProps) {
   const [isHovered, setIsHovered] = useState(false);

   // Map URL is built at build time in Astro frontmatter and passed via mapImageUrl
   const hasMap = !!mapImageUrl;
 
   return (
     <GlassCard className="group cursor-default overflow-hidden h-full min-h-[320px]">
       <div
         className="relative w-full h-full"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
       >
         {hasMap ? (
           <img
             src={mapImageUrl}
             alt={`Map showing ${city}`}
             className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
               isHovered ? 'grayscale-0 opacity-80' : 'grayscale opacity-40'
             }`}
             loading="lazy"
           />
         ) : (
           <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
             <span className="font-mono text-xs text-frost/20">MAP — NO TOKEN</span>
           </div>
         )}
 
         {/* Gradient overlay to hide Mapbox watermark */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-charcoal/90 to-transparent pointer-events-none z-[1]" />

        {/* Location badge */}
         <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
           <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan" />
           </span>
           <div className="flex flex-col">
             <span className="text-[10px] font-mono text-frost/40 uppercase">Currently in</span>
             <span className="text-sm font-display font-bold text-frost tracking-widest">{city}</span>
           </div>
         </div>
       </div>
     </GlassCard>
   );
 }
