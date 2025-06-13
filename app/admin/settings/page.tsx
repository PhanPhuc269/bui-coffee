import { SettingsAdmin } from "@/components/admin/settings-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cài đặt - Cà Phê Bụi",
  description: "Quản lý thông tin tĩnh và cài đặt hệ thống",
}

export default function SettingsAdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Cài đặt Hệ thống</h1>
      <SettingsAdmin />
    </div>
  )
}
