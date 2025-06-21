'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown, GraduationCap, User } from 'lucide-react';

const studentData = [
  { SNo: 1, studentName: 'Aishu J', regNo: '611220104123', rollNo: '2k24AHS157', year: 'I', department: 'AHS', section: 'A', instituteName: 'JKKN College of Allied Health Sciences', boardingPoint: 'Seelanayakkampatti Bypass', scheduledStatus: 'Yes', inTimeScanned: '07:55 AM', outTimeScanned: '07:55 AM', status: 'Scanned' },
  { SNo: 2, studentName: 'Arun S', regNo: '611220104145', rollNo: '2k22BP135', year: 'III', department: 'B.PHARM', section: 'A', instituteName: 'JKKN College of Pharmacy', boardingPoint: 'Kakapalayam', scheduledStatus: 'No', inTimeScanned: '-', outTimeScanned: '-', status: '-' },
  { SNo: 3, studentName: 'Balagi G', regNo: '611220104134', rollNo: '2k20PD159', year: 'V', department: 'PHARM D', section: 'B', instituteName: 'JKKN College of Pharmacy', boardingPoint: 'Thiruvagowndanoor Bypass', scheduledStatus: 'Yes', inTimeScanned: '07:40 AM', outTimeScanned: '07:40 AM', status: 'Scanned' },
  { SNo: 4, studentName: 'Gobi U', regNo: '611220104185', rollNo: '2k21CSE152', year: 'IV', department: 'CSE', section: 'B', instituteName: 'JKKN College of Engineering & Technology', boardingPoint: 'Kakapalayam', scheduledStatus: 'Yes', inTimeScanned: '07:55 AM', outTimeScanned: '07:55 AM', status: 'Scanned' },
  { SNo: 5, studentName: 'Gopal O', regNo: '611220104198', rollNo: '2k24EEE165', year: 'I', department: 'EEE', section: 'C', instituteName: 'JKKN College of Engineering & Technology', boardingPoint: 'Seelanayakkampatti Bypass', scheduledStatus: 'No', inTimeScanned: '-', outTimeScanned: '-', status: '-' },
];

const staffData = [
  { SNo: 1, staffName: 'Aishu J', staffID: '2k24AHS157', department: 'AHS', designation: 'Professor', instituteName: 'JKKN College of Allied Health Sciences', boardingPoint: 'Seelanayakkampatti Bypass', scheduledStatus: 'Yes', inTimeScanned: '07:55 AM', outTimeScanned: '07:55 AM', status: 'Scanned' },
  { SNo: 2, staffName: 'Arun S', staffID: '2k22BP135', department: 'B.PHARM', designation: 'Assistant Professor', instituteName: 'JKKN College of Pharmacy', boardingPoint: 'Kakapalayam', scheduledStatus: 'No', inTimeScanned: '-', outTimeScanned: '-', status: '-' },
  { SNo: 3, staffName: 'Balagi G', staffID: '2k20PD159', department: 'PHARM D', designation: 'Professor', instituteName: 'JKKN College of Pharmacy', boardingPoint: 'Thiruvagowndanoor Bypass', scheduledStatus: 'Yes', inTimeScanned: '07:40 AM', outTimeScanned: '07:40 AM', status: 'Scanned' },
  { SNo: 4, staffName: 'Gobi U', staffID: '2k21CSE152', department: 'CSE', designation: 'Associate Professor', instituteName: 'JKKN College of Engineering & Technology', boardingPoint: 'Kakapalayam', scheduledStatus: 'Yes', inTimeScanned: '07:55 AM', outTimeScanned: '07:55 AM', status: 'Scanned' },
  { SNo: 5, staffName: 'Gopal O', staffID: '2k24EEE165', department: 'EEE', designation: 'Associate Professor', instituteName: 'JKKN College of Engineering & Technology', boardingPoint: 'Seelanayakkampatti Bypass', scheduledStatus: 'No', inTimeScanned: '-', outTimeScanned: '-', status: '-' },
];

const studentHeaders = ['SNo', 'studentName', 'regNo', 'rollNo', 'year', 'department', 'section', 'instituteName', 'boardingPoint', 'scheduledStatus', 'inTimeScanned', 'outTimeScanned', 'status'];
const staffHeaders = ['SNo', 'staffName', 'staffID', 'department', 'designation', 'instituteName', 'boardingPoint', 'scheduledStatus', 'inTimeScanned', 'outTimeScanned', 'status'];

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

function FilterButton({ label, value, onPress, isOpen }: { label: string; value: string; onPress: () => void; isOpen: boolean }) {
  return (
    <button
      onClick={onPress}
      className="flex items-center gap-2 px-4 py-2 bg-[#2C2C2C] text-white rounded-lg hover:bg-[#353A40] transition-colors"
    >
      <span>{label}: {value}</span>
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}

function FilterDropdown({ options, isOpen, onSelect, onClose }: { options: string[]; isOpen: boolean; onSelect: (value: string) => void; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 bg-[#2C2C2C] rounded-lg shadow-lg z-10 min-w-[200px]">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => { onSelect(option); onClose(); }}
          className="w-full text-left px-4 py-2 text-white hover:bg-[#353A40] transition-colors"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

const PassengerArrivalStatus = () => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('Morning');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  const [currentStaffPage, setCurrentStaffPage] = useState(1);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const timeOptions = ['Morning', 'Evening', 'Both'];
  const statusOptions = ['All', 'Scanned', 'Not Scanned'];

  const filterData = (data: any[]) => {
    return data.filter((item) => {
      const matchesTime = selectedTime === 'All' || item.scheduledStatus === 'Yes';
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      return matchesTime && matchesStatus;
    });
  };

  const filteredStudents = filterData(studentData);
  const filteredStaff = filterData(staffData);

  const getCurrentPageData = (data: any[], currentPage: number) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

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
        <h1 className="text-2xl font-bold text-white">Passenger Arrival Status</h1>
      </div>

      {/* Filters */}
      <div className="px-5 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <FilterButton
              label="Time"
              value={selectedTime}
              onPress={() => setShowTimeOptions(!showTimeOptions)}
              isOpen={showTimeOptions}
            />
            <FilterDropdown
              options={timeOptions}
              isOpen={showTimeOptions}
              onSelect={setSelectedTime}
              onClose={() => setShowTimeOptions(false)}
            />
          </div>
          <div className="relative">
            <FilterButton
              label="Status"
              value={selectedStatus}
              onPress={() => setShowStatusOptions(!showStatusOptions)}
              isOpen={showStatusOptions}
            />
            <FilterDropdown
              options={statusOptions}
              isOpen={showStatusOptions}
              onSelect={setSelectedStatus}
              onClose={() => setShowStatusOptions(false)}
            />
          </div>
        </div>
      </div>

      <div className="px-5">
        {/* Students Table */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="text-[#4a90e2]" size={20} />
            <span className="text-white text-lg font-bold">Students</span>
            <span className="text-[#888] text-sm">Total of {filteredStudents.length}</span>
          </div>
          <Table headers={studentHeaders} rows={getCurrentPageData(filteredStudents, currentStudentPage)} />
          <Pagination currentPage={currentStudentPage} totalPages={Math.ceil(filteredStudents.length / itemsPerPage)} onPageChange={setCurrentStudentPage} />
        </div>
        {/* Staff Table */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <User className="text-[#4a90e2]" size={20} />
            <span className="text-white text-lg font-bold">Staff</span>
            <span className="text-[#888] text-sm">Total of {filteredStaff.length}</span>
          </div>
          <Table headers={staffHeaders} rows={getCurrentPageData(filteredStaff, currentStaffPage)} />
          <Pagination currentPage={currentStaffPage} totalPages={Math.ceil(filteredStaff.length / itemsPerPage)} onPageChange={setCurrentStaffPage} />
        </div>
      </div>
    </div>
  );
};

export default PassengerArrivalStatus; 