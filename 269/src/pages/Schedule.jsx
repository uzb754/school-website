import React, { useState } from 'react';
import { Clock, User, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import scheduleData from '../../../schedule.json';

export default function Schedule() {
  const [selectedShift, setSelectedShift] = useState('shift_1');
  const [selectedClass, setSelectedClass] = useState('1-A');

  const currentShiftData = scheduleData[selectedShift];
  const currentClasses = currentShiftData.classes;
  const currentTeachers = currentShiftData.teachers;
  const currentRooms = currentShiftData.rooms;
  const currentScheduleMap = currentShiftData.schedule;

  const weekDays = [
    { key: 'DUSHANBA', label: 'Dushanba' },
    { key: 'SESHANBA', label: 'Seshanba' },
    { key: 'CHORSHANBA', label: 'Chorshanba' },
    { key: 'PAYSHANBA', label: 'Payshanba' },
    { key: 'JUMA', label: 'Juma' },
    { key: 'SHANBA', label: 'Shanba' }
  ];

  const timeSlots = [
    { num: 1, time: selectedShift === 'shift_1' ? '08:00 - 08:45' : '13:30 - 14:15' },
    { num: 2, time: selectedShift === 'shift_1' ? '08:50 - 09:35' : '14:20 - 15:05' },
    { num: 3, time: selectedShift === 'shift_1' ? '09:40 - 10:25' : '15:10 - 15:55' },
    { num: 4, time: selectedShift === 'shift_1' ? '10:35 - 11:20' : '16:05 - 16:50' },
    { num: 5, time: selectedShift === 'shift_1' ? '11:25 - 12:10' : '16:55 - 17:40' },
    { num: 6, time: selectedShift === 'shift_1' ? '12:15 - 13:00' : '17:45 - 18:30' },
    { num: 7, time: selectedShift === 'shift_1' ? '13:05 - 13:50' : '—' },
  ];

  const classSchedule = currentScheduleMap[selectedClass] || Array(6).fill(Array(7).fill('—'));
  const teacherName = currentTeachers[selectedClass] || "O'qituvchi";
  const roomNumber = currentRooms[selectedClass] || '';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-[#1D1D1F] font-sans antialiased">
      <div className="bg-white/85 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200/70 shadow-sm text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-blue-600 text-xs font-medium relative z-10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>269-umumiy o'rta ta'lim maktabi (2026-2027 o'quv yili)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] relative z-10">269-umumiy o'rta talim maktabining <br /> dars jadvali </h1>
        
        <div className="flex justify-center gap-3 pt-2 relative z-10">
          {['shift_1', 'shift_2'].map((shift) => (
            <button
              key={shift}
              onClick={() => {
                setSelectedShift(shift);
                const firstCls = shift === 'shift_1' ? '1-A' : '3-B';
                setSelectedClass(firstCls);
              }}
              className={`px-6 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                selectedShift === shift
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {shift === 'shift_1' ? '1-Smena' : '2-Smena'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-2 max-w-4xl mx-auto relative z-10">
          {currentClasses.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                selectedClass === cls 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200/70 shadow-sm space-y-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-5 gap-4 min-w-[850px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-base shadow-xs">
              {selectedClass}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1D1D1F] tracking-tight">{selectedClass} sinfi dars jadvali</h2>
              <p className="text-xs text-slate-400 font-light flex items-center gap-2 pt-0.5">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <User className="w-3.5 h-3.5 text-blue-600" /> Sinf rahbari: {teacherName}
                </span>
                {roomNumber && (
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-medium">
                    <MapPin className="w-3 h-3" /> {roomNumber}-xona
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-light bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
            Maktab O'IBDO': <strong className="font-medium text-[#1D1D1F]">D.G. Alimatova</strong>
          </div>
        </div>

        <table className="w-full min-w-[850px] border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/70">
              <th className="p-3 text-left font-medium text-slate-400 w-14">#</th>
              <th className="p-3 text-left font-medium text-slate-400 w-32">Vaqt</th>
              {weekDays.map(day => (
                <th key={day.key} className="p-3 text-center font-semibold text-[#1D1D1F] text-xs uppercase tracking-wider border-l border-slate-100 bg-slate-50/80 rounded-t-xl">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {timeSlots.map((slot, slotIdx) => (
              <tr key={slot.num} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-blue-600 text-base border-r border-slate-100/60 text-center">{slot.num}</td>
                <td className="p-4 text-slate-500 font-light flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {slot.time}
                </td>
                
                {weekDays.map((day, dayIdx) => {
                  const subject = classSchedule[dayIdx]?.[slotIdx] || '—';
                  const isFree = subject === '—';

                  return (
                    <td key={day.key} className="p-4 border-l border-slate-100 align-top">
                      <div className={`p-3 rounded-2xl border transition-all ${
                        isFree 
                          ? 'bg-transparent border-transparent opacity-30 text-center py-6 text-slate-300' 
                          : 'bg-slate-50/80 border-slate-200/60 shadow-xs hover:border-blue-200 hover:bg-white hover:shadow-md'
                      }`}>
                        <div className="font-semibold text-[#1D1D1F] text-[13px] tracking-tight">
                          {subject}
                        </div>
                        {!isFree && (
                          <div className="text-[10px] text-slate-400 font-light pt-1 mt-1 border-t border-slate-200/40 flex items-center justify-between">
                            <span>{selectedClass} sinfi</span>
                            <span className="text-blue-600 font-medium">{slot.num}-soat</span>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-light">
          <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Dars jadvali Xojimurodov Jaloliddin tomonidan taxrirlandi
          </div>
          <p>269-umumiy o'rta ta'lim maktabi</p>
        </div>
      </div>
    </div>
  );
}