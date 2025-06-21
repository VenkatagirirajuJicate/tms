'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, GraduationCap, User, Search } from 'lucide-react';

const studentsData = [
  { SNo: 1, studentName: 'Senthil S', regNo: '611220104123', rollNo: '2k24AHS157', year: 'I', department: 'AHS', section: 'A', instituteName: 'JKKN AHS', boardingPoint: 'Thiruvagowndanoor Bypass', pendingFee: 4500, remainingAmulets: 60, refilledAmulets: 0, status: 'Active' },
  { SNo: 2, studentName: 'Balagi G', regNo: '611220103233', rollNo: '2k22BP135', year: 'III', department: 'B.PHARM', section: 'A', instituteName: 'JKKN Pharmacy', boardingPoint: 'Thiruvagowndanoor Bypass', pendingFee: 4500, remainingAmulets: 50, refilledAmulets: 0, status: 'Active' },
];

const staffData = [
  { SNo: 1, staffName: 'Balagi G', staffID: '2k20PD159', department: 'PHARM D', designation: 'Professor', instituteName: 'JKKN College of Pharmacy', boardingPoint: 'Thiruvagowndanoor Bypass', pendingFee: 'Nil', remainingAmulets: 50, refilledAmulets: 0, status: 'Active' },
  { SNo: 2, staffName: 'Senthil S', staffID: '2k24AHS124', department: 'AHS', designation: 'Professor', instituteName: 'JKKN College of Allied Health Sciences', boardingPoint: 'Thiruvagowndanoor Bypass', pendingFee: 1000, remainingAmulets: 60, refilledAmulets: 100, status: 'Active' },
];

const studentHeaders = ['SNo', 'studentName', 'regNo', 'rollNo', 'year', 'department', 'section', 'instituteName', 'boardingPoint', 'pendingFee', 'remainingAmulets', 'refilledAmulets', 'status'];
const staffHeaders = ['SNo', 'staffName', 'staffID', 'department', 'designation', 'instituteName', 'boardingPoint', 'pendingFee', 'remainingAmulets', 'refilledAmulets', 'status'];

const itemsPerPage = 5;

function Table({ headers, rows }: { headers: string[]; rows: any[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#222] mb-4">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#23272e] text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-2 font-semibold whitespace-nowrap">{header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="text-center py-4 text-[#888]">No data found</td></tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={idx} className="even:bg-[#181c23]">
                {headers.map((header) => (
                  <td key={header} className="px-3 py-2 whitespace-nowrap text-white">{row[header]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (n: number) => void }) {
  return (
    <div className="flex justify-center items-center gap-2 mb-6">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-[#23272e] text-white disabled:opacity-50">Prev</button>
      <span className="text-white">Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-[#23272e] text-white disabled:opacity-50">Next</button>
    </div>
  );
}

function DataSection({ title, icon: Icon, headers, data }: { title: string; icon: any; headers: string[]; data: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-[#4a90e2]" size={20} />
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888] w-4 h-4" />
        <input
          type="text"
          placeholder={`Search ${title}...`}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full rounded-lg pl-10 pr-4 py-2 bg-[#23272e] text-white placeholder-[#888] border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
        />
      </div>

      <Table headers={headers} rows={paginatedData} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

function StoppingPassengersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stopName = searchParams.get('stopName') || 'Unknown Stop';
  const title = `${stopName} - Passengers`;

  return (
    <div className="flex-1 bg-[#1E1E1E] min-h-screen">
      {/* Header */}
      <div className="flex items-center p-5">
        <button
          onClick={() => router.back()}
          className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <div className="px-5">
        <DataSection
          title="Students"
          icon={GraduationCap}
          headers={studentHeaders}
          data={studentsData}
        />
        <DataSection
          title="Staff"
          icon={User}
          headers={staffHeaders}
          data={staffData}
        />
      </div>
    </div>
  );
}

const StoppingPassengers = () => {
  return (
    <Suspense fallback={<div className="flex-1 bg-[#1E1E1E] min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <StoppingPassengersContent />
    </Suspense>
  );
};

export default StoppingPassengers; 