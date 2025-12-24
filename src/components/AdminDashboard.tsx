import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, LogOut, Users, TrendingUp, Settings, BarChart3, PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const trendData = [
    { month: 'Jun', reports: 12 },
    { month: 'Jul', reports: 19 },
    { month: 'Aug', reports: 15 },
    { month: 'Sep', reports: 22 },
    { month: 'Oct', reports: 18 },
    { month: 'Nov', reports: 24 }
  ];

  const categoryData = [
    { name: 'Plagiarisme', value: 35, color: '#ef4444' },
    { name: 'Penyalahgunaan AI', value: 28, color: '#f97316' },
    { name: 'Hacking WiFi', value: 15, color: '#eab308' },
    { name: 'Akses Ilegal', value: 12, color: '#ec4899' },
    { name: 'Data Pribadi', value: 6, color: '#a855f7' },
    { name: 'Cyberbullying', value: 4, color: '#3b82f6' }
  ];

  const statusData = [
    { status: 'Pending', count: 8 },
    { status: 'Investigating', count: 11 },
    { status: 'Resolved', count: 5 }
  ];

  const reviewers = [
    { id: 1, name: 'Dr. Yana Aditia Gerhana, S.T., M.Kom.', email: 'ahmad@university.ac.id', cases: 12, status: 'active' },
    { id: 2, name: 'Prof. Siti Nurhaliza', email: 'siti@university.ac.id', cases: 8, status: 'active' },
    { id: 3, name: 'Dr. Budi Santoso', email: 'budi@university.ac.id', cases: 15, status: 'active' },
    { id: 4, name: 'Dra. Ratna Dewi', email: 'ratna@university.ac.id', cases: 6, status: 'inactive' }
  ];

  const categories = [
    { id: 1, name: 'Plagiarisme', icon: '📝', color: 'bg-red-100 text-red-700', reportCount: 35 },
    { id: 2, name: 'Penyalahgunaan AI', icon: '🤖', color: 'bg-orange-100 text-orange-700', reportCount: 28 },
    { id: 3, name: 'Hacking WiFi Kampus', icon: '📡', color: 'bg-yellow-100 text-yellow-700', reportCount: 15 },
    { id: 4, name: 'Akses Ilegal', icon: '🔓', color: 'bg-pink-100 text-pink-700', reportCount: 12 },
    { id: 5, name: 'Penyebaran Data Pribadi', icon: '🔐', color: 'bg-purple-100 text-purple-700', reportCount: 6 },
    { id: 6, name: 'Cyberbullying', icon: '💬', color: 'bg-blue-100 text-blue-700', reportCount: 4 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Shield className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">ETIKA-CAMPUS</h2>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <Button 
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activeTab === 'overview' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 className="size-4 mr-2" />
            Overview
          </Button>
          <Button 
            variant={activeTab === 'reviewers' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activeTab === 'reviewers' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setActiveTab('reviewers')}
          >
            <Users className="size-4 mr-2" />
            Reviewers
          </Button>
          <Button 
            variant={activeTab === 'categories' ? 'default' : 'ghost'}
            className={`w-full justify-start ${activeTab === 'categories' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Settings className="size-4 mr-2" />
            Kategori
          </Button>
        </div>

        <div className="pt-4 border-t">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700 mb-1">Login sebagai:</p>
            <p className="text-blue-700">Admin System</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/')}>
            <Home className="size-4 mr-2" />
            Beranda
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => navigate('/')}>
            <LogOut className="size-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl mb-2 text-gray-900">Dashboard Administrator</h1>
              <p className="text-gray-500">Kelola sistem dan analisis tren pelanggaran</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Laporan</p>
                    <p className="text-3xl text-gray-900">100</p>
                    <p className="text-xs text-green-600 mt-1">↑ 12% dari bulan lalu</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="size-6 text-blue-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Reviewers Aktif</p>
                    <p className="text-3xl text-gray-900">8</p>
                    <p className="text-xs text-gray-500 mt-1">dari 10 total</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="size-6 text-green-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Avg Response Time</p>
                    <p className="text-3xl text-gray-900">2.3</p>
                    <p className="text-xs text-gray-500 mt-1">hari</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="size-6 text-purple-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Resolution Rate</p>
                    <p className="text-3xl text-gray-900">87%</p>
                    <p className="text-xs text-green-600 mt-1">↑ 5% improvement</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="size-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <h3 className="text-lg mb-4 text-gray-900">Tren Laporan (6 Bulan Terakhir)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="reports" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg mb-4 text-gray-900">Distribusi Kategori</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg mb-4 text-gray-900">Status Laporan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {/* Reviewers Tab */}
        {activeTab === 'reviewers' && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-2 text-gray-900">Manajemen Reviewer</h1>
                <p className="text-gray-500">Kelola akun dan status reviewer</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">
                    <PlusCircle className="size-4 mr-2" />
                    Tambah Reviewer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Reviewer Baru</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Nama Lengkap</Label>
                      <Input placeholder="Dr. Nama Lengkap" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" placeholder="email@university.ac.id" />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full bg-blue-600 text-white">
                      Tambah Reviewer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm text-gray-700">Nama</th>
                    <th className="text-left p-4 text-sm text-gray-700">Email</th>
                    <th className="text-left p-4 text-sm text-gray-700">Kasus Ditangani</th>
                    <th className="text-left p-4 text-sm text-gray-700">Status</th>
                    <th className="text-left p-4 text-sm text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewers.map((reviewer) => (
                    <tr key={reviewer.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-gray-900">{reviewer.name}</td>
                      <td className="p-4 text-gray-600">{reviewer.email}</td>
                      <td className="p-4">
                        <Badge className="bg-blue-100 text-blue-700">{reviewer.cases} kasus</Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={reviewer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {reviewer.status === 'active' ? 'Aktif' : 'Non-aktif'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="size-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="size-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-2 text-gray-900">Manajemen Kategori</h1>
                <p className="text-gray-500">Kelola kategori pelanggaran</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">
                    <PlusCircle className="size-4 mr-2" />
                    Tambah Kategori
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Kategori Baru</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Nama Kategori</Label>
                      <Input placeholder="Nama kategori pelanggaran" />
                    </div>
                    <div>
                      <Label>Icon (Emoji)</Label>
                      <Input placeholder="📝" />
                    </div>
                    <div>
                      <Label>Warna</Label>
                      <Input placeholder="bg-red-100 text-red-700" />
                    </div>
                    <Button className="w-full bg-blue-600 text-white">
                      Tambah Kategori
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-lg mb-2 text-gray-900">{category.name}</h3>
                  <Badge className={category.color}>
                    {category.reportCount} laporan
                  </Badge>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
