import { useState, useEffect } from 'react'
import { HiOutlineUsers, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi'
import { getDashboard, getEmployees } from '../api'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [dashboardRes, employeesRes] = await Promise.all([
        getDashboard(),
        getEmployees()
      ])
      setStats(dashboardRes.data)
      setEmployees(employeesRes.data)
      setError('')
    } catch (err) {
      console.log(err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-700 rounded-full animate-spin"></div>
        <p className="text-blue-500 mt-3 text-sm">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 tracking-tight">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="card flex flex-col gap-2 items-start border-0 shadow-md bg-gradient-to-br from-blue-600/90 to-blue-400/80 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-3">
              <HiOutlineUsers className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold">Total Employees</div>
              <div className="text-3xl font-bold">{stats?.total_employees || 0}</div>
            </div>
          </div>
        </div>
        <div className="card flex flex-col gap-2 items-start border-0 shadow-md bg-gradient-to-br from-green-500/90 to-green-300/80 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-3">
              <HiOutlineCheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold">Present Today</div>
              <div className="text-3xl font-bold">{stats?.present_today || 0}</div>
            </div>
          </div>
        </div>
        <div className="card flex flex-col gap-2 items-start border-0 shadow-md bg-gradient-to-br from-pink-500/90 to-pink-300/80 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-3">
              <HiOutlineXCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold">Absent Today</div>
              <div className="text-3xl font-bold">{stats?.absent_today || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="card border-0 shadow bg-white/90">
        <div className="px-2 py-2 border-b border-blue-100 mb-2">
          <h3 className="text-xl font-semibold text-blue-700">Recent Employees</h3>
        </div>

        {employees.length === 0 ? (
          <div className="py-12 text-center">
            <HiOutlineUsers className="w-12 h-12 text-blue-200 mx-auto mb-3" />
            <p className="text-blue-400">No employees yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-blue-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left font-semibold text-blue-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left font-semibold text-blue-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left font-semibold text-blue-500 uppercase tracking-wider">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {employees.slice(0, 5).map(emp => (
                  <tr key={emp.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-blue-700">{emp.employee_id}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-blue-900">{emp.full_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-500">{emp.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-500">{emp.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
