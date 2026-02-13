 import GlassCard from '@components/core/GlassCard';
 
 interface WeatherWidgetProps {
   temp?: number;
   description?: string;
   icon?: string;
 }
 
 export default function WeatherWidget({
   temp = 22,
   description = 'Partly Cloudy',
   icon = '⛅',
 }: WeatherWidgetProps) {
   return (
     <GlassCard className="h-full min-h-[154px]">
       <div className="flex flex-col items-center justify-center gap-1 h-full w-full p-4">
         <span className="text-3xl">{icon}</span>
         <span className="font-mono text-3xl font-bold text-frost tracking-tight">
           {temp}&deg;
         </span>
         <span className="font-mono text-[10px] text-frost/40 uppercase tracking-wider">
           {description}
         </span>
       </div>
     </GlassCard>
   );
 }
