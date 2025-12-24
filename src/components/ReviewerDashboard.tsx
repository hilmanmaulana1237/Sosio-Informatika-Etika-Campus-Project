import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, LogOut, Search, Filter, Eye, CheckCircle, Clock, AlertTriangle, FileText, User, Calendar, Download, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function ReviewerDashboard() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalNote, setInternalNote] = useState('');

  // Mock data
  const reports = [
    {
      id: 'ETK-ABC123',
      category: 'Plagiarisme',
      categoryColor: 'bg-red-100 text-red-700',
      status: 'investigating',
      priority: 'high',
      submittedDate: '2025-11-20',
      description: 'Laporan dugaan plagiarisme pada tugas akhir mata kuliah Pemrograman Web. Ditemukan kesamaan signifikan dengan karya mahasiswa tahun sebelumnya.',
      reporter: 'Anonim',
      evidence: ['dokumen1.pdf', 'screenshot1.png'],
      notes: [
        { date: '2025-11-23', author: 'Dr. Ahmad', text: 'Sedang menganalisis similarity index' }
      ]
    },
    {
      id: 'ETK-DEF456',
      category: 'Penyalahgunaan AI',
      categoryColor: 'bg-orange-100 text-orange-700',
      status: 'pending',
      priority: 'medium',
      submittedDate: '2025-11-22',
      description: 'Mahasiswa diduga menggunakan ChatGPT untuk mengerjakan seluruh tugas individu tanpa pemahaman.',
      reporter: 'Drs. Budi Santoso',
      evidence: ['chat-log.txt'],
      notes: []
    },
    {
      id: 'ETK-GHI789',
      category: 'Hacking WiFi Kampus',
      categoryColor: 'bg-yellow-100 text-yellow-700',
      status: 'resolved',
      priority: 'high',
      submittedDate: '2025-11-18',
      description: 'Terdeteksi aktivitas mencurigakan pada jaringan WiFi kampus dari lab komputer gedung A.',
      reporter: 'IT Support Team',
      evidence: ['network-log.txt', 'ip-addresses.csv'],
      notes: [
        { date: '2025-11-22', author: 'Dr. Ahmad', text: 'Kasus diselesaikan, pelaku telah diidentifikasi' }
      ]
    },
    {
      id: 'ETK-JKL012',
      category: 'Cyberbullying',
      categoryColor: 'bg-blue-100 text-blue-700',
      status: 'investigating',
      priority: 'high',
      submittedDate: '2025-11-23',
      description: 'Laporan cyberbullying melalui grup WhatsApp kelas terhadap mahasiswa tertentu.',
      reporter: 'Anonim',
      evidence: ['screenshots-wa.zip'],
      notes: [
        { date: '2025-11-24', author: 'Dr. Ahmad', text: 'Perlu koordinasi dengan bagian kemahasiswaan' }
      ]
    }
  ];

  const stats = [
    { label: 'Total Laporan', value: '24', icon: FileText, color: 'bg-blue-100 text-blue-700' },
    { label: 'Pending', value: '8', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Sedang Ditinjau', value: '11', icon: AlertTriangle, color: 'bg-orange-100 text-orange-700' },
    { label: 'Selesai', value: '5', icon: CheckCircle, color: 'bg-green-100 text-green-700' }
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
      investigating: { color: 'bg-orange-100 text-orange-700', label: 'Ditinjau' },
      resolved: { color: 'bg-green-100 text-green-700', label: 'Selesai' }
    };
    return config[status] || config.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { color: string; label: string }> = {
      high: { color: 'bg-red-100 text-red-700', label: 'Prioritas Tinggi' },
      medium: { color: 'bg-blue-100 text-blue-700', label: 'Prioritas Sedang' },
      low: { color: 'bg-gray-100 text-gray-700', label: 'Prioritas Rendah' }
    };
    return config[priority] || config.medium;
  };

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesSearch = report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

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
            <p className="text-xs text-gray-500">Reviewer Dashboard</p>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <Button variant="default" className="w-full justify-start bg-blue-600 text-white">
            <FileText className="size-4 mr-2" />
            Laporan
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profil')}>
            <User className="size-4 mr-2" />
            Profil
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/pengaturan')}>
            <Shield className="size-4 mr-2" />
            Pengaturan
          </Button>
        </div>

        <div className="pt-4 border-t">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700 mb-1">Login sebagai:</p>
            <p className="text-blue-700">Dr. Yana Aditia Gerhana, S.T., M.Kom.</p>
            <p className="text-xs text-gray-500">Reviewer</p>
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
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-gray-900">Dashboard Reviewer</h1>
          <p className="text-gray-500">Kelola dan tinjau laporan pelanggaran etika teknologi</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="size-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="size-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input 
                  placeholder="Cari berdasarkan ID atau deskripsi..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Sedang Ditinjau</SelectItem>
                <SelectItem value="resolved">Selesai</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Plagiarisme">Plagiarisme</SelectItem>
                <SelectItem value="Penyalahgunaan AI">Penyalahgunaan AI</SelectItem>
                <SelectItem value="Hacking WiFi Kampus">Hacking WiFi</SelectItem>
                <SelectItem value="Cyberbullying">Cyberbullying</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Reports Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm text-gray-700">ID Laporan</th>
                  <th className="text-left p-4 text-sm text-gray-700">Kategori</th>
                  <th className="text-left p-4 text-sm text-gray-700">Status</th>
                  <th className="text-left p-4 text-sm text-gray-700">Prioritas</th>
                  <th className="text-left p-4 text-sm text-gray-700">Tanggal</th>
                  <th className="text-left p-4 text-sm text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <code className="text-blue-600">{report.id}</code>
                    </td>
                    <td className="p-4">
                      <Badge className={report.categoryColor}>
                        {report.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusBadge(report.status).color}>
                        {getStatusBadge(report.status).label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getPriorityBadge(report.priority).color}>
                        {getPriorityBadge(report.priority).label}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-600">{report.submittedDate}</td>
                    <td className="p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="size-4 mr-1" />
                            Detail
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Detail Laporan {report.id}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedReport && (
                            <Tabs defaultValue="info" className="mt-4">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="info">Informasi</TabsTrigger>
                                <TabsTrigger value="evidence">Bukti</TabsTrigger>
                                <TabsTrigger value="notes">Catatan Internal</TabsTrigger>
                              </TabsList>

                              <TabsContent value="info" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>ID Laporan</Label>
                                    <p className="text-gray-900">{selectedReport.id}</p>
                                  </div>
                                  <div>
                                    <Label>Kategori</Label>
                                    <p><Badge className={selectedReport.categoryColor}>{selectedReport.category}</Badge></p>
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <p><Badge className={getStatusBadge(selectedReport.status).color}>
                                      {getStatusBadge(selectedReport.status).label}
                                    </Badge></p>
                                  </div>
                                  <div>
                                    <Label>Tanggal Laporan</Label>
                                    <p className="text-gray-900">{selectedReport.submittedDate}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Label>Pelapor</Label>
                                    <p className="text-gray-900">{selectedReport.reporter}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label>Deskripsi Lengkap</Label>
                                  <p className="text-gray-700 mt-2 whitespace-pre-wrap">{selectedReport.description}</p>
                                </div>

                                <div>
                                  <Label>Ubah Status</Label>
                                  <div className="flex gap-2 mt-2">
                                    <Button size="sm" variant="outline" className="bg-yellow-50">
                                      <Clock className="size-4 mr-2" />
                                      Set Pending
                                    </Button>
                                    <Button size="sm" variant="outline" className="bg-orange-50">
                                      <AlertTriangle className="size-4 mr-2" />
                                      Set Investigating
                                    </Button>
                                    <Button size="sm" variant="outline" className="bg-green-50">
                                      <CheckCircle className="size-4 mr-2" />
                                      Set Resolved
                                    </Button>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="evidence" className="space-y-4">
                                <Label>File Bukti</Label>
                                {selectedReport.evidence.map((file: string, idx: number) => (
                                  <Card key={idx} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <FileText className="size-8 text-blue-600" />
                                      <div>
                                        <p className="text-gray-900">{file}</p>
                                        <p className="text-sm text-gray-500">Uploaded by reporter</p>
                                      </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                      <Download className="size-4 mr-2" />
                                      Download
                                    </Button>
                                  </Card>
                                ))}
                              </TabsContent>

                              <TabsContent value="notes" className="space-y-4">
                                <div>
                                  <Label>Tambah Catatan Internal</Label>
                                  <Textarea 
                                    placeholder="Tulis catatan untuk tim reviewer..."
                                    rows={4}
                                    value={internalNote}
                                    onChange={(e) => setInternalNote(e.target.value)}
                                    className="mt-2"
                                  />
                                  <Button className="mt-2 bg-blue-600 text-white">
                                    <MessageSquare className="size-4 mr-2" />
                                    Simpan Catatan
                                  </Button>
                                </div>

                                <div className="mt-6">
                                  <Label>Riwayat Catatan</Label>
                                  <div className="space-y-3 mt-3">
                                    {selectedReport.notes.map((note: any, idx: number) => (
                                      <Card key={idx} className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                          <p className="text-sm text-gray-900">{note.author}</p>
                                          <p className="text-xs text-gray-500">{note.date}</p>
                                        </div>
                                        <p className="text-gray-700">{note.text}</p>
                                      </Card>
                                    ))}
                                    {selectedReport.notes.length === 0 && (
                                      <p className="text-gray-500 text-sm">Belum ada catatan</p>
                                    )}
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
