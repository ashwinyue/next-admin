import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Grid3x3,
  List,
  Folder,
  File,
  Calendar,
  Eye,
  Download,
  Trash2,
  Edit,
  Plus,
} from 'lucide-react'

// Mock data
const documents = [
  { id: 1, name: 'API 文档集合', type: 'folder', items: 24, modified: '2025-01-06', size: '-' },
  { id: 2, name: '开发指南.md', type: 'file', modified: '2025-01-05', size: '45 KB', format: 'markdown' },
  { id: 3, name: '系统架构设计', type: 'folder', items: 12, modified: '2025-01-05', size: '-' },
  { id: 4, name: '部署文档.md', type: 'file', modified: '2025-01-04', size: '128 KB', format: 'markdown' },
  { id: 5, name: '用户手册', type: 'folder', items: 8, modified: '2025-01-04', size: '-' },
  { id: 6, name: 'CHANGELOG.md', type: 'file', modified: '2025-01-03', size: '12 KB', format: 'markdown' },
  { id: 7, name: '贡献指南.md', type: 'file', modified: '2025-01-03', size: '34 KB', format: 'markdown' },
  { id: 8, name: 'API 参考手册.md', type: 'file', modified: '2025-01-02', size: '256 KB', format: 'markdown' },
]

const formatIcons = {
  folder: { icon: Folder, color: 'text-neon-amber' },
  markdown: { icon: File, color: 'text-neon-cyan' },
  pdf: { icon: File, color: 'text-red-400' },
  default: { icon: File, color: 'text-gray-500' },
}

function DocumentCard({ doc, index, viewMode }) {
  const isFolder = doc.type === 'folder'
  const Icon = isFolder ? Folder : (formatIcons[doc.format]?.icon || File)
  const iconColor = isFolder ? 'text-neon-amber' : (formatIcons[doc.format]?.color || 'text-gray-500')

  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="group relative bg-surface border border-void-border p-6 card-hover cursor-pointer"
      >
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 flex items-center justify-center bg-void-border hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-void-border hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 bg-void-light border border-void-border flex items-center justify-center ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate group-hover:text-neon-cyan transition-colors">
              {doc.name}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 font-mono">
              {isFolder ? (
                <span>{doc.items} 项</span>
              ) : (
                <>
                  <span>{doc.size}</span>
                  <span>{doc.modified}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-neon-cyan/5 transition-colors cursor-pointer"
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <span className="text-gray-200 group-hover:text-white transition-colors">{doc.name}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-gray-500 text-sm font-mono">{doc.type === 'folder' ? '-' : doc.format?.toUpperCase() || 'FILE'}</td>
      <td className="px-4 py-4 text-gray-500 text-sm font-mono">{doc.size}</td>
      <td className="px-4 py-4 text-gray-500 text-sm font-mono">{doc.modified}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-neon-pink/20 hover:text-neon-pink transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  )
}

export default function Documents() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display tracking-wider text-white mb-1">文档库</h1>
          <p className="text-gray-600 font-mono text-xs">DOCUMENTS // REPOSITORY</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          新建文档
        </button>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="搜索文档..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-tech pl-11"
          />
        </div>

        <div className="flex items-center gap-2 bg-surface border border-void-border p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredDocs.map((doc, index) => (
            <DocumentCard key={doc.id} doc={doc} index={index} viewMode={viewMode} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-void-border overflow-hidden"
        >
          <table className="table-tech">
            <thead>
              <tr>
                <th>名称</th>
                <th className="w-32">类型</th>
                <th className="w-32">大小</th>
                <th className="w-36">修改时间</th>
                <th className="w-36">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc, index) => (
                <DocumentCard key={doc.id} doc={doc} index={index} viewMode={viewMode} />
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 text-sm text-gray-600 font-mono"
      >
        <span className="text-neon-cyan">/</span>
        <span>root</span>
        <span className="text-gray-700">/</span>
        <span>documents</span>
      </motion.div>
    </div>
  )
}
