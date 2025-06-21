'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Eye, Search } from 'lucide-react';

const stoppingsData = [
  { sNo: '1', stopName: 'THIRUVAGOWNDANOOR BYPASS', timing: '7:10', passengerCount: '4' },
  { sNo: '2', stopName: 'KANTHAMPATTI BYPASS', timing: '7:15', passengerCount: '3' },
  { sNo: '3', stopName: 'SEELANAYAKKAM PATTI BYPASS', timing: '7:25', passengerCount: '10' },
  { sNo: '4', stopName: 'KONDALAMPATTI BYPASS', timing: '7:30', passengerCount: '4' },
  { sNo: '5', stopName: 'NEAIKARAPATTI', timing: '7:35', passengerCount: '7' },
  { sNo: '6', stopName: 'ARIYANOOR', timing: '7:42', passengerCount: '5' },
  { sNo: '7', stopName: 'SEERAGAPAADI', timing: '7:45', passengerCount: '8' },
  { sNo: '8', stopName: 'MAGUDANJAVADI', timing: '8:00', passengerCount: '2' },
  { sNo: '9', stopName: 'GOWNDANOOR', timing: '8:05', passengerCount: '3' },
  { sNo: '10', stopName: 'KAALIPATTI PIRIVBU', timing: '8:10', passengerCount: '6' },
  { sNo: '11', stopName: 'VAIGUNDHAM', timing: '8:12', passengerCount: '5' },
  { sNo: '12', stopName: 'P R M KALYANA MANDABAM', timing: '8:20', passengerCount: '4' },
  { sNo: '13', stopName: 'JKKN GROUP OF INSTITUTIONS', timing: '8:45', passengerCount: '66' },
];

const headers = ['SNo', 'stopName', 'timing', 'passengerCount', 'actions'];

const itemsPerPage = 10;

function Table({ headers, rows }: { headers: string[]; rows: any[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#222] mb-4">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#23272e] text-white">
          <tr>
            <th className="px-3 py-2 font-semibold whitespace-nowrap">S.No</th>
            <th className="px-3 py-2 font-semibold whitespace-nowrap">Stop Name</th>
            <th className="px-3 py-2 font-semibold whitespace-nowrap">Timing</th>
            <th className="px-3 py-2 font-semibold whitespace-nowrap">Passenger Count</th>
            <th className="px-3 py-2 font-semibold whitespace-nowrap">View Students</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="text-center py-4 text-[#888]">No data found</td></tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={idx} className="even:bg-[#181c23]">
                <td className="px-3 py-2 whitespace-nowrap text-white">{row.sNo}</td>
                <td className="px-3 py-2 whitespace-nowrap text-white">{row.stopName}</td>
                <td className="px-3 py-2 whitespace-nowrap text-white">{row.timing}</td>
                <td className="px-3 py-2 whitespace-nowrap text-white">{row.passengerCount}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button
                    onClick={() => row.onViewPassengers(row.stopName)}
                    className="text-[#3498db] hover:text-[#2980b9] transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                </td>
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

const RouteStoppings = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = stoppingsData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewPassengers = (stopName: string) => {
    router.push(`/stopping-passengers?stopName=${encodeURIComponent(stopName)}`);
  };

  const tableRows = paginatedData.map((item) => ({
    ...item,
    onViewPassengers: handleViewPassengers,
  }));

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
        <h1 className="text-2xl font-bold text-white">Route 15 - Stoppings</h1>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888] w-4 h-4" />
          <input
            type="text"
            placeholder="Search stops..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full rounded-lg pl-10 pr-4 py-2 bg-[#23272e] text-white placeholder-[#888] border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="px-5">
        <Table headers={headers} rows={tableRows} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default RouteStoppings; 