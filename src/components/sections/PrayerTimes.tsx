import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, Moon, Sun } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface PrayerTime {
  name: string;
  time: string;
  arabic: string;
  isNext: boolean;
  isPassed: boolean;
}

interface HijriDate {
  day: number;
  month: string;
  year: number;
  monthNumber: number;
}

export const PrayerTimes: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Dubai, UAE');
  const [hijriDate, setHijriDate] = useState<HijriDate>({
    day: 15,
    month: 'Jumada al-Awwal',
    year: 1446,
    monthNumber: 5
  });

  const prayerTimes: PrayerTime[] = [
    { name: 'Fajr', time: '05:42', arabic: 'الفجر', isNext: false, isPassed: true },
    { name: 'Dhuhr', time: '12:18', arabic: 'الظهر', isNext: false, isPassed: true },
    { name: 'Asr', time: '15:35', arabic: 'العصر', isNext: false, isPassed: true },
    { name: 'Maghrib', time: '18:12', arabic: 'المغرب', isNext: true, isPassed: false },
    { name: 'Isha', time: '19:42', arabic: 'العشاء', isNext: false, isPassed: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTimeUntilNext = () => {
    const nextPrayer = prayerTimes.find(prayer => prayer.isNext);
    if (!nextPrayer) return '';
    
    const [hours, minutes] = nextPrayer.time.split(':').map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);
    
    const diff = prayerTime.getTime() - currentTime.getTime();
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hoursLeft}h ${minutesLeft}m`;
  };

  return (
    <section className="py-12 bg-gradient-to-br from-emerald-950 to-royal-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Time & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="h-5 w-5 text-gold-400 mr-2" />
                  <span className="text-gold-200">{location}</span>
                </div>
                <div className="text-4xl font-bold mb-2 font-mono">
                  {formatTime(currentTime)}
                </div>
                <div className="text-gray-300">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Prayer Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Prayer Times</h3>
                <Clock className="h-5 w-5 text-gold-400" />
              </div>
              <div className="space-y-3">
                {prayerTimes.map((prayer, index) => (
                  <div
                    key={prayer.name}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      prayer.isNext 
                        ? 'bg-gold-500/20 border border-gold-500/30' 
                        : prayer.isPassed 
                        ? 'bg-gray-500/20' 
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{prayer.name}</span>
                      <span className="text-sm text-gray-300 font-arabic">{prayer.arabic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{prayer.time}</span>
                      {prayer.isNext && (
                        <Badge variant="warning" size="sm">
                          Next
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {getTimeUntilNext() && (
                <div className="mt-4 text-center text-gold-200">
                  Next prayer in: <span className="font-semibold">{getTimeUntilNext()}</span>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Hijri Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="h-5 w-5 text-gold-400 mr-2" />
                  <span className="text-gold-200">Hijri Calendar</span>
                </div>
                <div className="text-3xl font-bold mb-2 font-arabic">
                  {hijriDate.day}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {hijriDate.month}
                </div>
                <div className="text-2xl font-bold text-gold-300 mb-4">
                  {hijriDate.year} AH
                </div>
                
                {/* Moon Phase Indicator */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                  <Moon className="h-4 w-4" />
                  <span>Waxing Crescent</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Zakat Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-gold-500/20 to-emerald-500/20 backdrop-blur-lg border-gold-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <Sun className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Zakat Reminder</h4>
                  <p className="text-gray-300 text-sm">
                    Your annual Zakat calculation is due in 45 days (Ramadan 1446)
                  </p>
                </div>
              </div>
              <Badge variant="warning">
                Due Soon
              </Badge>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};