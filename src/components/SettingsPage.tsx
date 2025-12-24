import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, User, Lock, Bell, Palette, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

export default function SettingsPage() {
  const navigate = useNavigate();
  
  // Account settings
  const [name, setName] = useState('Dr. Yana Aditia Gerhana, S.T., M.Kom.');
  const [email, setEmail] = useState('yanaaditiagerhana@uinsgd.ac.id');
  const [phone, setPhone] = useState('+62 812-3456-7890');

  // Password settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification settings
  const [emailNotif, setEmailNotif] = useState(true);
  const [newCaseNotif, setNewCaseNotif] = useState(true);
  const [statusUpdateNotif, setStatusUpdateNotif] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const handleSaveAccount = () => {
    toast.success('Informasi akun berhasil diperbarui!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Password baru tidak cocok!');
      return;
    }
    toast.success('Password berhasil diubah!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = () => {
    toast.success('Pengaturan notifikasi berhasil disimpan!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="size-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Shield className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-900">Pengaturan</h1>
              <p className="text-gray-500">Kelola preferensi akun Anda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">
              <User className="size-4 mr-2" />
              Akun
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="size-4 mr-2" />
              Keamanan
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="size-4 mr-2" />
              Notifikasi
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="p-8">
              <h3 className="text-xl mb-6 text-gray-900">Informasi Akun</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">Email universitas resmi</p>
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value="Reviewer" disabled />
                  <p className="text-sm text-gray-500 mt-1">Hubungi admin untuk mengubah role</p>
                </div>

                <Button 
                  className="bg-blue-600 text-white"
                  onClick={handleSaveAccount}
                >
                  <Save className="size-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="p-8">
              <h3 className="text-xl mb-6 text-gray-900">Keamanan & Password</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <Input 
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input 
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimal 8 karakter, kombinasi huruf dan angka</p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <Input 
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button 
                  className="bg-blue-600 text-white"
                  onClick={handleChangePassword}
                >
                  <Lock className="size-4 mr-2" />
                  Ubah Password
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h4 className="text-lg mb-4 text-gray-900">Autentikasi Dua Faktor</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900 mb-1">Two-Factor Authentication (2FA)</p>
                    <p className="text-sm text-gray-600">Tambahan keamanan untuk akun Anda</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg mb-4 text-gray-900">Sesi Login Aktif</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-gray-900">💻 Chrome on Windows</p>
                      <p className="text-sm text-gray-500">Jakarta, Indonesia • Saat ini</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Logout
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-gray-900">📱 Safari on iPhone</p>
                      <p className="text-sm text-gray-500">Jakarta, Indonesia • 2 jam lalu</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-8">
              <h3 className="text-xl mb-6 text-gray-900">Preferensi Notifikasi</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900 mb-1">Email Notifications</p>
                    <p className="text-sm text-gray-600">Terima notifikasi melalui email</p>
                  </div>
                  <Switch 
                    checked={emailNotif}
                    onCheckedChange={setEmailNotif}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900 mb-1">Kasus Baru Ditugaskan</p>
                    <p className="text-sm text-gray-600">Notifikasi saat ada kasus baru untuk Anda</p>
                  </div>
                  <Switch 
                    checked={newCaseNotif}
                    onCheckedChange={setNewCaseNotif}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900 mb-1">Update Status Kasus</p>
                    <p className="text-sm text-gray-600">Notifikasi perubahan status pada kasus Anda</p>
                  </div>
                  <Switch 
                    checked={statusUpdateNotif}
                    onCheckedChange={setStatusUpdateNotif}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900 mb-1">Laporan Mingguan</p>
                    <p className="text-sm text-gray-600">Ringkasan aktivitas setiap minggu</p>
                  </div>
                  <Switch 
                    checked={weeklyReport}
                    onCheckedChange={setWeeklyReport}
                  />
                </div>

                <Button 
                  className="bg-blue-600 text-white"
                  onClick={handleSaveNotifications}
                >
                  <Save className="size-4 mr-2" />
                  Simpan Preferensi
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h4 className="text-lg mb-4 text-gray-900">Quiet Hours</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Atur waktu dimana Anda tidak ingin menerima notifikasi
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Mulai</Label>
                    <Input type="time" defaultValue="22:00" />
                  </div>
                  <div>
                    <Label>Selesai</Label>
                    <Input type="time" defaultValue="07:00" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
