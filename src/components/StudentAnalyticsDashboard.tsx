import React, { useMemo } from 'react';
import { ExamSubmission, StudentUser } from '../types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Brain, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

interface StudentAnalyticsDashboardProps {
  submissions: ExamSubmission[];
  students: StudentUser[];
}

export const StudentAnalyticsDashboard: React.FC<StudentAnalyticsDashboardProps> = ({
  submissions,
  students
}) => {
  // If there are no submissions yet, create representative mock data so the charts are visibly rich and informative
  const isDemo = submissions.length === 0;

  // Active dataset: either real submissions or demo submissions
  const activeSubmissions = useMemo<ExamSubmission[]>(() => {
    if (submissions.length > 0) return submissions;
    // Mock sample dataset based on real students
    return [
      {
        id: 'demo-1',
        username: 'ahmad7a',
        studentName: 'Ahmad Fauzan',
        studentClass: '7A',
        tokenUsed: 'RASIO7WNR',
        submittedAt: new Date(Date.now() - 3600000).toISOString(),
        durationSpentMinutes: 58,
        totalScore: 90,
        correctCount: 18,
        totalQuestions: 20,
        answers: {},
        scoreByLevel: {
          pemahaman: { correct: 2, total: 2, score: 100 },
          aplikasi: { correct: 9, total: 10, score: 90 },
          penalaran: { correct: 7, total: 8, score: 88 }
        },
        syncedToSheet: true
      },
      {
        id: 'demo-2',
        username: 'anisa7a',
        studentName: 'Anisa Nur Aini',
        studentClass: '7A',
        tokenUsed: 'RASIO7WNR',
        submittedAt: new Date(Date.now() - 7200000).toISOString(),
        durationSpentMinutes: 65,
        totalScore: 85,
        correctCount: 17,
        totalQuestions: 20,
        answers: {},
        scoreByLevel: {
          pemahaman: { correct: 2, total: 2, score: 100 },
          aplikasi: { correct: 8, total: 10, score: 80 },
          penalaran: { correct: 7, total: 8, score: 88 }
        },
        syncedToSheet: true
      },
      {
        id: 'demo-3',
        username: 'aditya7b',
        studentName: 'Aditya Saputra',
        studentClass: '7B',
        tokenUsed: 'RASIO7WNR',
        submittedAt: new Date(Date.now() - 5400000).toISOString(),
        durationSpentMinutes: 72,
        totalScore: 75,
        correctCount: 15,
        totalQuestions: 20,
        answers: {},
        scoreByLevel: {
          pemahaman: { correct: 2, total: 2, score: 100 },
          aplikasi: { correct: 8, total: 10, score: 80 },
          penalaran: { correct: 5, total: 8, score: 63 }
        },
        syncedToSheet: true
      },
      {
        id: 'demo-4',
        username: 'bunga7b',
        studentName: 'Bunga Lestari',
        studentClass: '7B',
        tokenUsed: 'RASIO7WNR',
        submittedAt: new Date(Date.now() - 1800000).toISOString(),
        durationSpentMinutes: 50,
        totalScore: 95,
        correctCount: 19,
        totalQuestions: 20,
        answers: {},
        scoreByLevel: {
          pemahaman: { correct: 2, total: 2, score: 100 },
          aplikasi: { correct: 10, total: 10, score: 100 },
          penalaran: { correct: 7, total: 8, score: 88 }
        },
        syncedToSheet: true
      },
      {
        id: 'demo-5',
        username: 'deni7b',
        studentName: 'Deni Kurniawan',
        studentClass: '7B',
        tokenUsed: 'RASIO7WNR',
        submittedAt: new Date(Date.now() - 900000).toISOString(),
        durationSpentMinutes: 78,
        totalScore: 65,
        correctCount: 13,
        totalQuestions: 20,
        answers: {},
        scoreByLevel: {
          pemahaman: { correct: 1, total: 2, score: 50 },
          aplikasi: { correct: 7, total: 10, score: 70 },
          penalaran: { correct: 5, total: 8, score: 63 }
        },
        syncedToSheet: false
      }
    ];
  }, [submissions]);

  // Aggregate Metrics
  const totalStudents = students.length || 16;
  const completedCount = activeSubmissions.length;
  const notCompletedCount = Math.max(0, totalStudents - completedCount);
  const completionPercentage = Math.round((completedCount / totalStudents) * 100);

  const averageScore = useMemo(() => {
    if (activeSubmissions.length === 0) return 0;
    const sum = activeSubmissions.reduce((acc, s) => acc + s.totalScore, 0);
    return Math.round(sum / activeSubmissions.length);
  }, [activeSubmissions]);

  const maxScore = useMemo(() => {
    if (activeSubmissions.length === 0) return 0;
    return Math.max(...activeSubmissions.map(s => s.totalScore));
  }, [activeSubmissions]);

  const minScore = useMemo(() => {
    if (activeSubmissions.length === 0) return 0;
    return Math.min(...activeSubmissions.map(s => s.totalScore));
  }, [activeSubmissions]);

  const avgDuration = useMemo(() => {
    if (activeSubmissions.length === 0) return 0;
    const sum = activeSubmissions.reduce((acc, s) => acc + s.durationSpentMinutes, 0);
    return Math.round(sum / activeSubmissions.length);
  }, [activeSubmissions]);

  // Chart 1: Score Distribution (Ranges)
  const scoreDistributionData = useMemo(() => {
    const categories = [
      { range: '0 - 59 (Kurang)', count: 0, color: '#ef4444' },
      { range: '60 - 74 (Cukup)', count: 0, color: '#f59e0b' },
      { range: '75 - 84 (Baik)', count: 0, color: '#3b82f6' },
      { range: '85 - 100 (Sangat Baik)', count: 0, color: '#10b981' }
    ];

    activeSubmissions.forEach(sub => {
      const score = sub.totalScore;
      if (score < 60) categories[0].count++;
      else if (score < 75) categories[1].count++;
      else if (score < 85) categories[2].count++;
      else categories[3].count++;
    });

    return categories;
  }, [activeSubmissions]);

  // Chart 2: Completion Status (Pie Chart)
  const completionData = useMemo(() => {
    return [
      { name: 'Sudah Selesai', value: completedCount, color: '#10b981' },
      { name: 'Belum Ujian', value: notCompletedCount, color: '#cbd5e1' }
    ];
  }, [completedCount, notCompletedCount]);

  // Chart 3: Cognitive Levels Performance (Pemahaman, Aplikasi, Penalaran)
  const cognitiveLevelsData = useMemo(() => {
    if (activeSubmissions.length === 0) return [];
    let sumP = 0, sumA = 0, sumH = 0;
    activeSubmissions.forEach(s => {
      sumP += s.scoreByLevel.pemahaman.score;
      sumA += s.scoreByLevel.aplikasi.score;
      sumH += s.scoreByLevel.penalaran.score;
    });
    const len = activeSubmissions.length;
    return [
      { domain: 'Pemahaman (10%)', score: Math.round(sumP / len), fullMark: 100 },
      { domain: 'Aplikasi (50%)', score: Math.round(sumA / len), fullMark: 100 },
      { domain: 'Penalaran HOTS (40%)', score: Math.round(sumH / len), fullMark: 100 }
    ];
  }, [activeSubmissions]);

  // Chart 4: Class 7A vs 7B Breakdown
  const classComparisonData = useMemo(() => {
    const class7A = activeSubmissions.filter(s => s.studentClass === '7A');
    const class7B = activeSubmissions.filter(s => s.studentClass === '7B');

    const avg7A = class7A.length ? Math.round(class7A.reduce((a, b) => a + b.totalScore, 0) / class7A.length) : 0;
    const avg7B = class7B.length ? Math.round(class7B.reduce((a, b) => a + b.totalScore, 0) / class7B.length) : 0;

    return [
      { kelas: 'Kelas 7A', rerataNilai: avg7A, jumlahSiswa: class7A.length },
      { kelas: 'Kelas 7B', rerataNilai: avg7B, jumlahSiswa: class7B.length }
    ];
  }, [activeSubmissions]);

  return (
    <div className="space-y-6">
      {/* Notice if displaying sample demo data */}
      {isDemo && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Mode Pratinjau Analitik:</strong> Belum ada siswa yang menyelesaikan ujian pada sesi ini. Grafik di bawah menampilkan contoh simulasi data performa siswa kelas 7A & 7B. Grafik akan otomatis berganti ke data nyata setelah siswa mengumpulkan ujian.
            </span>
          </div>
          <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded font-bold uppercase shrink-0">
            Contoh Simulasi
          </span>
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Rata-rata Nilai</span>
            <span className="text-2xl font-black font-mono text-blue-700">{averageScore}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Skala 100</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Status Partisipasi</span>
            <span className="text-2xl font-black font-mono text-emerald-700">{completionPercentage}%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{completedCount} dari {totalStudents} Siswa</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Rentang Skor</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black font-mono text-slate-900">{minScore}</span>
              <span className="text-xs text-slate-400">s.d</span>
              <span className="text-xl font-black font-mono text-emerald-600">{maxScore}</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Min / Maks</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Rerata Durasi</span>
            <span className="text-2xl font-black font-mono text-purple-700">{avgDuration} mnt</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Batas: 80 Menit</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid 2x2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: Bar Chart Distribusi Rentang Nilai */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Distribusi Rentang Nilai Siswa
              </h3>
              <p className="text-[11px] text-slate-500">Kategori ketuntasan belajar formatif Bab 3 Rasio</p>
            </div>
            <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Bar Chart
            </span>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistributionData} margin={{ top: 10, right: 15, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  interval={0}
                  angle={-10}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val: any) => [`${val} Siswa`, 'Jumlah']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                  {scoreDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Donut / Pie Chart Status Partisipasi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <PieChartIcon className="w-4 h-4 text-emerald-600" />
                Status Penyelesaian Ujian Siswa
              </h3>
              <p className="text-[11px] text-slate-500">Perbandingan siswa yang telah submit vs belum</p>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
              Pie Chart
            </span>
          </div>

          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val} Siswa`, 'Jumlah']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Bar Chart Performa Level Kognitif TKA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-purple-600" />
                Capaian Rerata Level Kognitif TKA
              </h3>
              <p className="text-[11px] text-slate-500">Pemahaman (10%), Aplikasi (50%), Penalaran HOTS (40%)</p>
            </div>
            <span className="text-[10px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
              Kognitif TKA
            </span>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical" 
                data={cognitiveLevelsData} 
                margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <YAxis dataKey="domain" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
                <Tooltip 
                  formatter={(val: any) => [`${val}%`, 'Rata-rata Capaian']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="score" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={26}>
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#8b5cf6" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: Komparasi Kelas 7A vs 7B */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                Komparasi Rerata Nilai: Kelas 7A vs 7B
              </h3>
              <p className="text-[11px] text-slate-500">Perbandingan capaian nilai rata-rata antar kelas</p>
            </div>
            <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Per Kelas
            </span>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classComparisonData} margin={{ top: 15, right: 25, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="kelas" tick={{ fontSize: 12, fill: '#334155', fontWeight: 'bold' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val: any, name: any) => [
                    name === 'rerataNilai' ? `${val} (Skala 100)` : `${val} Siswa`,
                    name === 'rerataNilai' ? 'Rerata Nilai' : 'Siswa Selesai'
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar name="Rerata Nilai" dataKey="rerataNilai" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={42} />
                <Bar name="Siswa Selesai" dataKey="jumlahSiswa" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
