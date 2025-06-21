'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, GraduationCap, User, Search, Filter as FilterIcon } from 'lucide-react';

const studentsData = [
  { SNo: 1, studentName: 'Aishu J', regNo: '611220104123', rollNo: '2k24AHS157', year: 'I', department: 'AHS', section: 'A', instituteName: 'JKKN College of Allied Health Sciences', stopping: 'Seelanayakkampatti Bypass', pendingFee: 4500, remainingAmulets: 40, refilledAmulets: 0, status: 'Active' },
  { SNo: 2, studentName: 'Arun S', regNo: '611220104145', rollNo: '2k22BP135', year: 'III', department: 'B.PHARM', section: 'A', instituteName: 'JKKN College of Pharmacy', stopping: 'Kakapalayam', pendingFee: 4500, remainingAmulets: 50, refilledAmulets: 0, status: 'Active' },
  { SNo: 3, studentName: 'Balagi G', regNo: '611220104134', rollNo: '2k20PD159', year: 'V', department: 'PHARM D', section: 'B', instituteName: 'JKKN College of Pharmacy', stopping: 'Thiruvagowndanoor Bypass', pendingFee: 4500, remainingAmulets: 50, refilledAmulets: 0, status: 'Active' },
  { SNo: 4, studentName: 'Gobi U', regNo: '611220104185', rollNo: '2k21CSE152', year: 'IV', department: 'CSE', section: 'B', instituteName: 'JKKN College of Engineering & Technology', stopping: 'Kakapalayam', pendingFee: 4500, remainingAmulets: 60, refilledAmulets: 100, status: 'Active' },
  { SNo: 5, studentName: 'Gopal O', regNo: '611220104198', rollNo: '2k24EEE165', year: 'I', department: 'EEE', section: 'C', instituteName: 'JKKN College of Engineering & Technology', stopping: 'Seelanayakkampatti Bypass', pendingFee: 3000, remainingAmulets: 60, refilledAmulets: 0, status: 'Active' },
];

const staffData = [
  { SNo: 1, staffName: 'Aishu J', staffID: '2k24AHS157', department: 'AHS', designation: 'Professor', instituteName: 'JKKN College of Allied Health Sciences', boardingPoint: 'Seelanayakkampatti Bypass', pendingFee: 4500, remainingAmulets: 40, refilledAmulets: 0, status: 'Active' },
  { SNo: 2, staffName: 'Arun S', staffID: '2k22BP135', department: 'B.PHARM', designation: 'Assistant Professor', instituteName: 'JKKN College of Pharmacy', boardingPoint: 'Kakapalayam', pendingFee: 4500, remainingAmulets: 50, refilledAmulets: 0, status: 'Active' },
  { SNo: 3, staffName: 'Balagi G', staffID: '2k20PD159', department: 'PHARM D', designation: 'Professor', instituteName: 'JKKN College of Pharmacy', boardingPoint: 'Thiruvagowndanoor Bypass', pendingFee: 4500, remainingAmulets: 50, refilledAmulets: 0, status: 'Active' },
  { SNo: 4, staffName: 'Gobi U', staffID: '2k21CSE152', department: 'CSE', designation: 'Associate Professor', instituteName: 'JKKN College of Engineering & Technology', boardingPoint: 'Kakapalayam', pendingFee: 4500, remainingAmulets: 60, refilledAmulets: 100, status: 'Active' },
  { SNo: 5, staffName: 'Gopal O', staffID: '2k24EEE165', department: 'EEE', designation: 'Associate Professor', instituteName: 'JKKN College of Engineering & Technology', boardingPoint: 'Seelanayakkampatti Bypass', pendingFee: 3000, remainingAmulets: 60, refilledAmulets: 0, status: 'Active' },
];

const studentHeaders = ['SNo', 'studentName', 'regNo', 'rollNo', 'year', 'department', 'section', 'instituteName', 'stopping', 'pendingFee', 'remainingAmulets', 'refilledAmulets', 'status'];
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

const getFilterOptions = (data: any[], keys: string[]) => {
  const options: Record<string, string[]> = {};
  keys.forEach((key) => {
    options[key] = Array.from(new Set(data.map((item) => item[key]).filter(Boolean)));
  });
  return options;
};

const RoutePassengers = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const studentFilterKeys = ['year', 'department', 'section', 'instituteName', 'stopping', 'status'];
  const staffFilterKeys = ['department', 'designation', 'instituteName', 'boardingPoint', 'status'];

  const studentFilterOptions = useMemo(() => getFilterOptions(studentsData, studentFilterKeys), []);
  const staffFilterOptions = useMemo(() => getFilterOptions(staffData, staffFilterKeys), []);

  function filterData(data: any[], filterKeys: string[]) {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilters = filterKeys.every((key) => {
        if (!selectedFilters[key] || selectedFilters[key].length === 0) return true;
        return selectedFilters[key].includes(item[key]);
      });
      return matchesSearch && matchesFilters;
    });
  }

  const filteredStudents = filterData(studentsData, studentFilterKeys);
  const filteredStaff = filterData(staffData, staffFilterKeys);

  const getCurrentPageData = (data: any[], currentPage: number) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  function handleFilterChange(key: string, value: string) {
    setSelectedFilters((prev) => {
      const arr = prev[key] || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen">
      {/* Header */}
      <div className="flex items-center p-5">
        <button
          onClick={() => router.back()}
          className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Route Passengers</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-5 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888] w-4 h-4" />
          <input
            type="text"
            placeholder="Search passengers..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageStudent(1); setCurrentPageStaff(1); }}
            className="w-full rounded-lg pl-10 pr-4 py-2 bg-[#23272e] text-white placeholder-[#888] border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          />
        </div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#23272e] text-white hover:bg-[#353A40]"
        >
          <FilterIcon size={16} />
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="bg-[#181c23] rounded-lg p-4 mx-5 mb-6 flex flex-wrap gap-4">
          {/* Student Filters */}
          <div className="flex flex-col gap-2">
            <span className="text-white font-semibold mb-1">Student Filters</span>
            {studentFilterKeys.map((key) => (
              <div key={key} className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[#888] text-xs w-28">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                {studentFilterOptions[key]?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(key, option)}
                    className={`px-2 py-1 rounded text-xs ${selectedFilters[key]?.includes(option) ? 'bg-[#4a90e2] text-white' : 'bg-[#23272e] text-[#888]'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </div>
          {/* Staff Filters */}
          <div className="flex flex-col gap-2">
            <span className="text-white font-semibold mb-1">Staff Filters</span>
            {staffFilterKeys.map((key) => (
              <div key={key} className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[#888] text-xs w-28">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                {staffFilterOptions[key]?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(key, option)}
                    className={`px-2 py-1 rounded text-xs ${selectedFilters[key]?.includes(option) ? 'bg-[#4a90e2] text-white' : 'bg-[#23272e] text-[#888]'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-5">
        {/* Students Table */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="text-[#4a90e2]" size={20} />
            <span className="text-white text-lg font-bold">Students</span>
            <span className="text-[#888] text-sm">Total of {filteredStudents.length}</span>
          </div>
          <Table headers={studentHeaders} rows={getCurrentPageData(filteredStudents, currentPageStudent)} />
          <Pagination currentPage={currentPageStudent} totalPages={Math.ceil(filteredStudents.length / itemsPerPage)} onPageChange={setCurrentPageStudent} />
        </div>
        {/* Staff Table */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <User className="text-[#4a90e2]" size={20} />
            <span className="text-white text-lg font-bold">Staff</span>
            <span className="text-[#888] text-sm">Total of {filteredStaff.length}</span>
          </div>
          <Table headers={staffHeaders} rows={getCurrentPageData(filteredStaff, currentPageStaff)} />
          <Pagination currentPage={currentPageStaff} totalPages={Math.ceil(filteredStaff.length / itemsPerPage)} onPageChange={setCurrentPageStaff} />
        </div>
      </div>
    </div>
  );
};

export default RoutePassengers; 