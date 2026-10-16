import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Inbox, Filter } from 'lucide-react';

export const DataTable = ({
  columns,
  data,
  searchPlaceholder = 'Search records...',
  searchKeys = [],
  filterOptions = [],
  defaultFilterKey = null,
  emptyMessage = 'No records found',
  pageSize = 10,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    let result = data || [];

    // Filter by category/status
    if (defaultFilterKey && selectedFilter !== 'ALL') {
      result = result.filter((item) => {
        const val = item[defaultFilterKey];
        return String(val).toUpperCase() === selectedFilter.toUpperCase();
      });
    }

    // Search
    if (searchTerm.trim() && searchKeys.length > 0) {
      const q = searchTerm.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((k) => String(item[k] || '').toLowerCase().includes(q))
      );
    }

    return result;
  }, [data, searchTerm, selectedFilter, defaultFilterKey, searchKeys]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-navy-900/40">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 text-sm bg-navy-950/70 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
          />
        </div>

        {filterOptions.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => {
                setSelectedFilter('ALL');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === 'ALL'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              All ({data.length})
            </button>
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setSelectedFilter(opt.value);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedFilter === opt.value
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-950/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-5 py-3.5 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-slate-300">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-slate-800/40 transition-colors duration-150"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-5 py-4 ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Inbox className="w-10 h-10 mb-2 stroke-[1.5]" />
                    <p className="text-sm font-medium text-slate-400">{emptyMessage}</p>
                    {searchTerm && (
                      <p className="text-xs text-slate-500 mt-1">
                        Try adjusting your search query or filters.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-5 py-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 bg-navy-900/40">
          <span>
            Showing <strong className="text-slate-200">{(currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong className="text-slate-200">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </strong>{' '}
            of <strong className="text-slate-200">{filteredData.length}</strong> records
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-700/60 bg-navy-950/60 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-700/60 bg-navy-950/60 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
