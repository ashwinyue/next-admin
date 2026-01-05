import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  GitPullRequest,
  MessageSquare,
  Clock,
  User,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit3,
  Share2,
  Bookmark,
  MoreVertical,
  Paperclip,
  Link as LinkIcon,
} from 'lucide-react'
import { useToast } from '../components/Toast'

// Mock issue data
const mockIssue = {
  id: 1847,
  title: '实现 Issue 转换功能',
  status: 'open',
  author: { name: 'mervyn', avatar: null },
  createdAt: '2025-01-06T10:30:00Z',
  updatedAt: '2025-01-06T14:22:00Z',
  labels: ['feature', 'high-priority', 'enhancement'],
  assignees: ['mervyn', 'dev-team'],
  milestone: 'v1.0.0',
  comments: [
    {
      id: 1,
      author: 'dev-team',
      avatar: null,
      createdAt: '2025-01-06T11:15:00Z',
      body: '这个功能需要支持批量转换吗？建议添加一个进度条显示转换进度。',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '🎉', count: 1 }],
    },
    {
      id: 2,
      author: 'mervyn',
      avatar: null,
      createdAt: '2025-01-06T12:30:00Z',
      body: '好建议！我会添加批量转换功能和进度显示。计划在本周完成。',
      reactions: [{ emoji: '👍', count: 5 }],
    },
    {
      id: 3,
      author: 'contributor',
      avatar: null,
      createdAt: '2025-01-06T14:22:00Z',
      body: '如果需要帮助，我可以协助实现前端部分的功能。',
      reactions: [{ emoji: '❤️', count: 2 }, { emoji: '🚀', count: 1 }],
    },
  ],
  attachments: [
    { name: 'design-mockup.png', size: '245 KB', url: '#' },
    { name: 'api-spec.yaml', size: '12 KB', url: '#' },
  ],
  related: [1846, 1848, 1850],
  body: `## 功能描述

实现将 GitHub Issue 自动转换为 Markdown 文档的功能。

## 需求分析

1. **基础转换**
   - Issue 标题 → 文档标题
   - Issue 内容 → 文档正文
   - 评论 → 可选的附录部分

2. **元数据处理**
   - 创建时间、更新时间
   - 标签和里程碑
   - 负责人信息

3. **格式选项**
   - 支持不同 Markdown 风格
   - 自定义 Frontmatter 模板
   - 代码块语法高亮

## 技术方案

\`\`\`go
func ConvertIssueToMarkdown(issue *Issue) (string, error) {
    // 实现细节
}
\`\`\`

## 验收标准

- [x] 基本转换功能
- [x] 元数据导出
- [ ] 批量转换
- [ ] 自定义模板
- [ ] 预览功能

## 截止日期

2025-01-15`,
}

const statusConfig = {
  open: { icon: AlertCircle, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/30', label: '待处理' },
  'in-progress': { icon: Clock, color: 'text-neon-amber', bg: 'bg-neon-amber/10', border: 'border-neon-amber/30', label: '进行中' },
  closed: { icon: CheckCircle, color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/30', label: '已关闭' },
}

const labelColors = {
  'feature': 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
  'bug': 'bg-neon-pink/20 text-neon-pink border-neon-pink/30',
  'enhancement': 'bg-neon-green/20 text-neon-green border-neon-green/30',
  'docs': 'bg-neon-amber/20 text-neon-amber border-neon-amber/30',
  'high-priority': 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function IssueDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [issue] = useState(mockIssue)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleConvert = () => {
    toast.success('转换成功', `Issue #${id} 已转换为 Markdown 文档`)
  }

  const handleComment = () => {
    if (!newComment.trim()) return
    toast.success('评论已发布', '您的评论已成功添加')
    setNewComment('')
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <Link
          to="/issues"
          className="flex items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-mono">返回 Issues 列表</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 border transition-colors ${
              isBookmarked
                ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan'
                : 'border-void-border text-gray-500 hover:text-gray-300'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked && 'fill-current'}`} />
          </button>
          <button className="p-2 border border-void-border text-gray-500 hover:text-gray-300 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 border border-void-border text-gray-500 hover:text-gray-300 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Issue Title & Status */}
      <motion.div variants={item} className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-neon-cyan font-mono text-lg">#{issue.id}</span>
            {(() => {
              const config = statusConfig[issue.status]
              const Icon = config.icon
              return (
                <span className={`flex items-center gap-2 px-3 py-1 text-xs font-display uppercase tracking-wider border ${config.bg} ${config.color} ${config.border}`}>
                  <Icon className="w-3 h-3" />
                  {config.label}
                </span>
              )
            })()}
          </div>
          <h1 className="text-3xl font-display tracking-wide text-white mb-4">{issue.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            {issue.labels.map((label) => (
              <span
                key={label}
                className={`px-2 py-1 text-xs border ${labelColors[label] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleConvert}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <Edit3 className="w-4 h-4" />
          转换为文档
        </button>
      </motion.div>

      {/* Meta Info */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: User, label: '作者', value: issue.author.name },
          { icon: Clock, label: '创建时间', value: new Date(issue.createdAt).toLocaleDateString('zh-CN') },
          { icon: Clock, label: '更新时间', value: new Date(issue.updatedAt).toLocaleDateString('zh-CN') },
          { icon: MessageSquare, label: '评论', value: issue.comments.length.toString() },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="bg-surface border border-void-border p-4">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </div>
              <p className="text-white font-mono text-sm">{item.value}</p>
            </div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Body */}
          <motion.div variants={item} className="bg-surface border border-void-border p-6">
            <h2 className="font-display text-sm tracking-wider text-gray-400 mb-4">描述</h2>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {issue.body}
              </div>
            </div>
          </motion.div>

          {/* Attachments */}
          {issue.attachments.length > 0 && (
            <motion.div variants={item} className="bg-surface border border-void-border p-6">
              <h2 className="font-display text-sm tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                附件
              </h2>
              <div className="space-y-2">
                {issue.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    className="flex items-center justify-between p-3 bg-void-light border border-void-border hover:border-neon-cyan/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
                        <Paperclip className="w-4 h-4 text-neon-cyan" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm group-hover:text-neon-cyan transition-colors">{file.name}</p>
                        <p className="text-gray-600 text-xs font-mono">{file.size}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Comments */}
          <motion.div variants={item} className="bg-surface border border-void-border p-6">
            <h2 className="font-display text-sm tracking-wider text-gray-400 mb-6 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              评论 ({issue.comments.length})
            </h2>

            <div className="space-y-6">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="border-b border-void-border pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-void-border rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-medium">{comment.author}</span>
                        <span className="text-gray-600 text-xs font-mono">
                          {new Date(comment.createdAt).toLocaleString('zh-CN')}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{comment.body}</p>

                      {/* Reactions */}
                      {comment.reactions.length > 0 && (
                        <div className="flex items-center gap-2 mt-3">
                          {comment.reactions.map((reaction, index) => (
                            <button
                              key={index}
                              className="flex items-center gap-1 px-2 py-1 bg-void-light border border-void-border hover:border-neon-cyan/50 transition-colors text-sm"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-gray-500">{reaction.count}</span>
                            </button>
                          ))}
                          <button className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                            + 添加反应
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* New Comment */}
            <div className="mt-6 pt-6 border-t border-void-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-neon-cyan" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="写下你的评论..."
                    rows={4}
                    className="w-full bg-void-light border border-void-border text-gray-300 text-sm p-4 focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-400 transition-colors">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-400 transition-colors">
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleComment}
                      disabled={!newComment.trim()}
                      className="btn-primary disabled:opacity-50"
                    >
                      发布评论
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <motion.div variants={item} className="bg-surface border border-void-border p-4">
            <h3 className="font-display text-xs tracking-wider text-gray-500 mb-4">快捷操作</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-void-light transition-colors flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                编辑 Issue
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-void-light transition-colors flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                标记为已完成
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-void-light transition-colors flex items-center gap-2">
                <User className="w-4 h-4" />
                分配给自己
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-void-light transition-colors flex items-center gap-2">
                <Tag className="w-4 h-4" />
                添加标签
              </button>
            </div>
          </motion.div>

          {/* Related Issues */}
          <motion.div variants={item} className="bg-surface border border-void-border p-4">
            <h3 className="font-display text-xs tracking-wider text-gray-500 mb-4">相关 Issues</h3>
            <div className="space-y-2">
              {issue.related.map((relatedId) => (
                <Link
                  key={relatedId}
                  to={`/issues/${relatedId}`}
                  className="block p-3 bg-void-light border border-void-border hover:border-neon-cyan/50 transition-colors"
                >
                  <span className="text-neon-cyan font-mono text-sm">#{relatedId}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Milestone */}
          {issue.milestone && (
            <motion.div variants={item} className="bg-surface border border-void-border p-4">
              <h3 className="font-display text-xs tracking-wider text-gray-500 mb-3">里程碑</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neon-amber/10 border border-neon-amber/30 flex items-center justify-center">
                  <GitPullRequest className="w-5 h-5 text-neon-amber" />
                </div>
                <div>
                  <p className="text-white font-mono text-sm">{issue.milestone}</p>
                  <div className="w-32 h-1 bg-void-border mt-2 overflow-hidden">
                    <div className="h-full w-3/4 bg-neon-amber" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Assignees */}
          {issue.assignees.length > 0 && (
            <motion.div variants={item} className="bg-surface border border-void-border p-4">
              <h3 className="font-display text-xs tracking-wider text-gray-500 mb-3">负责人</h3>
              <div className="flex flex-wrap gap-2">
                {issue.assignees.map((assignee) => (
                  <div key={assignee} className="flex items-center gap-2 px-3 py-2 bg-void-light border border-void-border">
                    <div className="w-6 h-6 bg-void-border rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-gray-400 text-sm">{assignee}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
