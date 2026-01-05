import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Save,
  RotateCcw,
  Github,
  Key,
  Bell,
  Palette,
  Database,
  Shield,
  Server,
  Moon,
  Sun,
} from 'lucide-react'

// Mock settings
const initialSettings = {
  // General
  siteName: 'ISSUE2MD',
  siteDescription: 'Issue to Markdown Converter',
  language: 'zh-CN',

  // GitHub
  githubToken: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  defaultOwner: 'mervyn',
  defaultRepo: 'awesomeProject8',

  // API
  apiEndpoint: 'http://localhost:8080/api',
  apiTimeout: '30',
  rateLimit: '1000',

  // Notifications
  enableNotifications: true,
  emailAlerts: false,
  webhookUrl: '',

  // Appearance
  theme: 'dark',
  accentColor: 'neon-cyan',
  compactMode: false,
}

function SettingSection({ icon: Icon, title, description, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface border border-void-border p-6"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-neon-cyan" />
        </div>
        <div>
          <h2 className="font-display text-sm tracking-wider text-white">{title}</h2>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-void-border last:border-0">
      <div className="flex-1">
        <label className="text-gray-300 text-sm font-medium">{label}</label>
        {description && <p className="text-gray-600 text-xs mt-1">{description}</p>}
      </div>
      <div className="ml-6">{children}</div>
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
        checked ? 'bg-neon-cyan/20' : 'bg-void-border'
      }`}
    >
      <motion.div
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-1 w-4 h-4 rounded-full ${
          checked ? 'bg-neon-cyan shadow-[0_0_10px_currentColor]' : 'bg-gray-600'
        }`}
      />
    </button>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings)
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save logic here
    console.log('Saving settings:', settings)
    setHasChanges(false)
  }

  const handleReset = () => {
    setSettings(initialSettings)
    setHasChanges(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display tracking-wider text-white mb-1">系统设置</h1>
          <p className="text-gray-600 font-mono text-xs">SETTINGS // CONFIGURATION</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            保存更改
          </button>
        </div>
      </motion.div>

      {/* General Settings */}
      <SettingSection
        icon={Server}
        title="通用设置"
        description="配置系统基本信息"
        delay={0.1}
      >
        <div className="space-y-4">
          <SettingRow label="站点名称" description="显示在页面标题和导航栏">
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSetting('siteName', e.target.value)}
              className="w-48 input-tech"
            />
          </SettingRow>
          <SettingRow label="站点描述" description="简短描述此系统的用途">
            <input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => updateSetting('siteDescription', e.target.value)}
              className="w-64 input-tech"
            />
          </SettingRow>
          <SettingRow label="语言" description="系统显示语言">
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="w-32 input-tech"
            >
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English</option>
              <option value="ja-JP">日本語</option>
            </select>
          </SettingRow>
        </div>
      </SettingSection>

      {/* GitHub Settings */}
      <SettingSection
        icon={Github}
        title="GitHub 集成"
        description="配置 GitHub API 访问令牌和默认仓库"
        delay={0.2}
      >
        <div className="space-y-4">
          <SettingRow label="Personal Access Token" description="用于访问 GitHub API 的令牌">
            <div className="relative">
              <input
                type="password"
                value={settings.githubToken}
                onChange={(e) => updateSetting('githubToken', e.target.value)}
                className="w-80 input-tech font-mono text-sm"
              />
              <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            </div>
          </SettingRow>
          <SettingRow label="默认仓库所有者" description="GitHub 用户名或组织名">
            <input
              type="text"
              value={settings.defaultOwner}
              onChange={(e) => updateSetting('defaultOwner', e.target.value)}
              className="w-48 input-tech"
            />
          </SettingRow>
          <SettingRow label="默认仓库名称" description="默认处理的目标仓库">
            <input
              type="text"
              value={settings.defaultRepo}
              onChange={(e) => updateSetting('defaultRepo', e.target.value)}
              className="w-48 input-tech"
            />
          </SettingRow>
        </div>
      </SettingSection>

      {/* API Settings */}
      <SettingSection
        icon={Database}
        title="API 配置"
        description="后端 API 连接设置"
        delay={0.3}
      >
        <div className="space-y-4">
          <SettingRow label="API 端点" description="后端服务地址">
            <input
              type="text"
              value={settings.apiEndpoint}
              onChange={(e) => updateSetting('apiEndpoint', e.target.value)}
              className="w-64 input-tech font-mono text-sm"
            />
          </SettingRow>
          <SettingRow label="请求超时" description="API 请求超时时间（秒）">
            <input
              type="number"
              value={settings.apiTimeout}
              onChange={(e) => updateSetting('apiTimeout', e.target.value)}
              className="w-24 input-tech font-mono text-sm"
            />
          </SettingRow>
          <SettingRow label="速率限制" description="每分钟最大请求数">
            <input
              type="number"
              value={settings.rateLimit}
              onChange={(e) => updateSetting('rateLimit', e.target.value)}
              className="w-24 input-tech font-mono text-sm"
            />
          </SettingRow>
        </div>
      </SettingSection>

      {/* Notification Settings */}
      <SettingSection
        icon={Bell}
        title="通知设置"
        description="配置系统通知和告警"
        delay={0.4}
      >
        <div className="space-y-4">
          <SettingRow label="启用通知" description="接收系统事件通知">
            <Toggle checked={settings.enableNotifications} onChange={() => updateSetting('enableNotifications', !settings.enableNotifications)} />
          </SettingRow>
          <SettingRow label="邮件告警" description="发送重要事件到邮箱">
            <Toggle checked={settings.emailAlerts} onChange={() => updateSetting('emailAlerts', !settings.emailAlerts)} />
          </SettingRow>
          <SettingRow label="Webhook URL" description="接收 POST 通知的地址">
            <input
              type="text"
              value={settings.webhookUrl}
              onChange={(e) => updateSetting('webhookUrl', e.target.value)}
              placeholder="https://..."
              className="w-64 input-tech font-mono text-sm"
            />
          </SettingRow>
        </div>
      </SettingSection>

      {/* Appearance Settings */}
      <SettingSection
        icon={Palette}
        title="外观设置"
        description="自定义系统显示效果"
        delay={0.5}
      >
        <div className="space-y-4">
          <SettingRow label="主题模式" description="选择明亮或暗色主题">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSetting('theme', 'light')}
                className={`p-2 rounded border transition-colors ${settings.theme === 'light' ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan' : 'border-void-border text-gray-500 hover:text-gray-300'}`}
              >
                <Sun className="w-5 h-5" />
              </button>
              <button
                onClick={() => updateSetting('theme', 'dark')}
                className={`p-2 rounded border transition-colors ${settings.theme === 'dark' ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan' : 'border-void-border text-gray-500 hover:text-gray-300'}`}
              >
                <Moon className="w-5 h-5" />
              </button>
            </div>
          </SettingRow>
          <SettingRow label="强调色" description="系统主要强调颜色">
            <div className="flex items-center gap-2">
              {['neon-cyan', 'neon-pink', 'neon-green', 'neon-amber'].map((color) => (
                <button
                  key={color}
                  onClick={() => updateSetting('accentColor', color)}
                  className={`w-8 h-8 rounded bg-${color} transition-transform ${
                    settings.accentColor === color ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: `var(--color-${color})` }}
                />
              ))}
            </div>
          </SettingRow>
          <SettingRow label="紧凑模式" description="减少间距以显示更多内容">
            <Toggle checked={settings.compactMode} onChange={() => updateSetting('compactMode', !settings.compactMode)} />
          </SettingRow>
        </div>
      </SettingSection>

      {/* Danger Zone */}
      <SettingSection
        icon={Shield}
        title="危险区域"
        description="不可逆的破坏性操作"
        delay={0.6}
      >
        <div className="p-4 bg-neon-pink/10 border border-neon-pink/30 rounded-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium mb-1">清除所有缓存</h3>
              <p className="text-gray-500 text-sm">删除所有缓存的文档和临时数据</p>
            </div>
            <button className="px-4 py-2 bg-neon-pink/20 border border-neon-pink/50 text-neon-pink font-display text-xs tracking-wider uppercase hover:bg-neon-pink/30 transition-colors">
              执行清除
            </button>
          </div>
        </div>
      </SettingSection>
    </div>
  )
}
