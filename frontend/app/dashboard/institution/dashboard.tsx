"use client"

import { useState } from "react"
import { Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "./components/sidebar"
import DashboardOverview from "./components/dashboard-overview"
import UserDataRequests from "./components/user-data-requests"
import ActivityLog from "./components/activity-log"
import ConsentManagement from "./components/consent-management"
import ApiIntegration from "./components/api-integration"
import Settings from "./components/settings"
import AdminCommunication from "./components/admin-communication"
import ComplianceReports from "./components/compliance-reports"
import NotificationsPanel from "./components/notifications-panel"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "requests":
        return <UserDataRequests />
      case "activity":
        return <ActivityLog />
      case "consent":
        return <ConsentManagement />
      case "api":
        return <ApiIntegration />
      case "settings":
        return <Settings />
      case "communication":
        return <AdminCommunication />
      case "compliance":
        return <ComplianceReports />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="border-gray-200">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">
            {activeTab === "overview" ? "Dashboard" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative border-gray-200"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full"></span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <span className="hidden md:inline font-medium">John Doe</span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>

      {/* Notifications panel */}
      {notificationsOpen && <NotificationsPanel onClose={() => setNotificationsOpen(false)} />}
    </div>
  )
}

