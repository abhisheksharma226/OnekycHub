"use client"

import { useState } from "react"
import {
  BarChart3,
  FileText,
  ClipboardList,
  UserCheck,
  Code,
  Settings,
  MessageSquare,
  FileBarChart,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)

  const menuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      id: "requests",
      label: "User Data Requests",
      icon: FileText,
    },
    {
      id: "activity",
      label: "Activity Log",
      icon: ClipboardList,
    },
    {
      id: "consent",
      label: "Consent Management",
      icon: UserCheck,
    },
    {
      id: "api",
      label: "API Integration",
      icon: Code,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
    {
      id: "communication",
      label: "Admin Communication",
      icon: MessageSquare,
    },
    {
      id: "compliance",
      label: "Compliance Reports",
      icon: FileBarChart,
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setIsOpen(false) // Close sidebar on mobile after selection
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-200 transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <span className="font-semibold text-lg">OneKYCHub</span>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-md hover:bg-gray-200">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md transition-colors",
                activeTab === item.id ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200",
              )}
            >
              <item.icon size={20} className="mr-3" />
              {expanded && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Institute info */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="font-semibold">A</span>
            </div>
            {expanded && (
              <div>
                <p className="font-medium">Acme Institute</p>
                <p className="text-xs text-gray-500">Premium Plan</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

