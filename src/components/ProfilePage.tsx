import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, User, Mail, Phone, Building, Calendar, Award, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function ProfilePage() {
  const navigate = useNavigate();

  const userProfile = {
    name: 'Dr. Yana Aditia Gerhana, S.T., M.Kom.',
    role: 'Reviewer',
    email: 'yanaaditiagerhana@uinsgd.ac.id',
    phone: '+62 812-3456-7890',
    department: 'Teknik Informatika',
    joinDate: '2020-01-15',
    casesHandled: 45,
    casesResolved: 38,
    casesInProgress: 7,
    achievements: [
      { title: 'Quick Resolver', description: 'Menyelesaikan 10+ kasus dalam sebulan', icon: '⚡' },
      { title: 'Detail Oriented', description: 'Catatan reviewer terlengkap', icon: '🔍' },
      { title: 'Senior Reviewer', description: '3+ tahun pengalaman', icon: '🏆' }
    ]
  };

  const recentActivity = [
    { date: '2025-11-24', action: 'Menyelesaikan review kasus ETK-JKL012', type: 'resolved' },
    { date: '2025-11-23', action: 'Menambahkan catatan pada kasus ETK-ABC123', type: 'note' },
    { date: '2025-11-22', action: 'Menerima kasus baru ETK-DEF456', type: 'assigned' },
    { date: '2025-11-20', action: 'Menyelesaikan review kasus ETK-XYZ789', type: 'resolved' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="size-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <User className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-900">Profil Pengguna</h1>
              <p className="text-gray-500">Informasi akun dan aktivitas Anda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl text-gray-900 mb-1">{userProfile.name}</h2>
                <Badge className="bg-blue-100 text-blue-700">{userProfile.role}</Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{userProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Telepon</p>
                    <p className="text-gray-900">{userProfile.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="size-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Departemen</p>
                    <p className="text-gray-900">{userProfile.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Bergabung</p>
                    <p className="text-gray-900">{userProfile.joinDate}</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-blue-600 text-white"
                onClick={() => navigate('/pengaturan')}
              >
                Edit Profil
              </Button>
            </Card>
          </div>

          {/* Stats and Activity */}
          <div className="md:col-span-2 space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6 text-center">
                <FileText className="size-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl text-gray-900 mb-1">{userProfile.casesHandled}</p>
                <p className="text-sm text-gray-500">Total Kasus</p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="size-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl text-gray-900 mb-1">{userProfile.casesResolved}</p>
                <p className="text-sm text-gray-500">Diselesaikan</p>
              </Card>
              <Card className="p-6 text-center">
                <Award className="size-8 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl text-gray-900 mb-1">{userProfile.casesInProgress}</p>
                <p className="text-sm text-gray-500">Sedang Ditinjau</p>
              </Card>
            </div>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-xl mb-4 text-gray-900">Pencapaian</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {userProfile.achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-gray-900 mb-1">{achievement.title}</p>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-xl mb-4 text-gray-900">Aktivitas Terbaru</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                    <Badge className={
                      activity.type === 'resolved' ? 'bg-green-100 text-green-700' :
                      activity.type === 'assigned' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {activity.type === 'resolved' ? 'Selesai' :
                       activity.type === 'assigned' ? 'Ditugaskan' : 'Catatan'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
