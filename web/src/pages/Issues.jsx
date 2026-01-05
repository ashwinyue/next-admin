import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  FileText,
  Calendar,
  User,
  Tag,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'

// Mock data
const issues = [
  { id: 1847, title: '实现 Issue 转换功能', status: 'open', author: 'mervyn', labels: ['feature', 'high-priority'], created: '2025-01-06', comments: 5 },
  { id: 1846, title: '修复文档生成时的格式问题', status: 'in-progress', author: 'dev-team', labels: ['bug', 'docs'], created: '2025-01-05', comments: 12 },
  { id: 1845, title: '添加批量导出功能', status: 'open', author: 'contributor', labels: ['enhancement'], created: '2025-01-05', comments: 3 },
  { id: 1844, title: '优化 Markdown 渲染性能', status: 'closed', author: 'mervyn', labels: ['performance'], created: '2025-01-04', comments: 8 },
  { id: 1843, title: '集成 GitHub API v4', status: 'merged', author: 'dev-team', labels: ['api', 'backend'], created: '2025-01-04', comments: 15 },
  { id: 1842, title: '添加用户认证系统', status: 'open', author: 'security', labels: ['security', 'feature'], created: '2025-01-03', comments: 20 },
  { id: 1841, title: '实现搜索功能', status: 'in-progress', author: 'frontend', labels: ['feature', 'ui'], created: '2025-01-03', comments: 7 },
  { id: 1840, title: '错误处理优化', status: 'closed', author: 'mervyn', labels: ['bug-fix'], created: '2025-01-02', comments: 4 },
]

const statusConfig = {
  open: { label: '待处理', color: 'neon-cyan', bg: 'bg-neon-cyan/10' },
  'in-progress': { label: '进行中', color: 'neon-amber', bg: 'bg-neon-amber/10' },
  closed: { label: '已关闭', color: 'gray-500', bg: 'bg-gray-500/10' },
  merged: { label: '已合并', color: 'neon-green', bg: 'bg-neon-green/10' },
}

const labelColors = {
  'feature': 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
  'bug': 'bg-neon-pink/20 text-neon-pink border-neon-pink/30',
  'enhancement': 'bg-neon-green/20 text-neon-green border-neon-green/30',
  'docs': 'bg-neon-amber/20 text-neon-amber border-neon-amber/30',
  'high-priority': 'bg-red-500/20 text-red-400 border-red-500/30',
  'performance': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'api': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'backend': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'security': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'ui': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'bug-fix': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
}

function IssueRow({ issue, index, onRowClick }) {
  const config = statusConfig[issue.status]

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onRowClick?.(issue.id)}
      className="group hover:bg-neon-cyan/5 transition-colors cursor-pointer"
    >
      <td className="px-4 py-4">
        <span className="text-neon-cyan font-mono">#{issue.id}</span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-gray-600" />
          <span className="text-gray-200 group-hover:text-white transition-colors">{issue.title}</span>
        </div>
        <div className="flex gap-2 mt-2">
          {issue.labels.map((label) => (
            <span
              key={label}
              className={`px-2 py-0.5 text-xs border rounded-sm ${labelColors[label] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
            >
              {label}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-void-border rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-gray-500" />
          </div>
          <span className="text-gray-400 text-sm">{issue.author}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`px-2 py-1 text-xs font-display uppercase tracking-wider border ${config.bg} ${config.color} border-${config.color.split('-')[1]}-500/30`}>
          {config.label}
        </span>
      </td>
      <td className="px-4 py-4 text-gray-500 text-sm font-mono">{issue.created}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="text-sm font-mono">{issue.comments}</span>
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </td>
    </motion.tr>
  )
}

export default function Issues() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.id.toString().includes(searchQuery)
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display tracking-wider text-white mb-1">Issues 管理</h1>
          <p className="text-gray-600 font-mono text-xs">ISSUES // MANAGE_CONVERT</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            同步
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            批量导出
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-4"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="搜索 Issue 标题或编号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-tech pl-11"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-tech pr-10 appearance-none cursor-pointer min-w-[150px]"
          >
            <option value="all">全部状态</option>
            <option value="open">待处理</option>
            <option value="in-progress">进行中</option>
            <option value="closed">已关闭</option>
            <option value="merged">已合并</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>

        {/* More Filters */}
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          更多筛选
        </button>
      </motion.div>

      {/* Issues Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface border border-void-border overflow-hidden"
      >
        <table className="table-tech">
          <thead>
            <tr>
              <th className="w-20">ID</th>
              <th>标题</th>
              <th className="w-40">作者</th>
              <th className="w-32">状态</th>
              <th className="w-32">创建时间</th>
              <th className="w-24">评论</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue, index) => (
              <IssueRow key={issue.id} issue={issue} index={index} onRowClick={(id) => navigate(`/issues/${id}`)} />
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredIssues.length === 0 && (
          <div className="py-16 text-center">
            <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-mono">未找到匹配的 Issues</p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <p className="text-sm text-gray-500 font-mono">
          显示 <span className="text-neon-cyan">1-{filteredIssues.length}</span> 条，共 <span className="text-white">{issues.length}</span> 条
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-void-border text-gray-500 hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors">
            上一页
          </button>
          <button className="px-3 py-1 text-sm bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan">1</button>
          <button className="px-3 py-1 text-sm border border-void-border text-gray-500 hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-void-border text-gray-500 hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm border border-void-border text-gray-500 hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors">
            下一页
          </button>
        </div>
      </motion.div>
    </div>
  )
}
