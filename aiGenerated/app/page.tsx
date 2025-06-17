import { DashboardLayout } from "@/components/dashboard-layout"
import { UsersPage } from "@/components/users-page"

export default function Home() {
  return (
    <DashboardLayout>
      <UsersPage />
    </DashboardLayout>
  )
}
