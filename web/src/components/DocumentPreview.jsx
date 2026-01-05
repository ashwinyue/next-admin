import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Download, Copy, Check, ExternalLink, Maximize2, FileText } from 'lucide-react'
import { useToast } from './Toast'

// Sample markdown content
const sampleMarkdown = `# Issue2MD 开发指南

## 项目简介

Issue2MD 是一个将 GitHub Issue 自动转换为 Markdown 文档的工具。

## 功能特性

- ✅ 自动转换 Issue 为 Markdown
- ✅ 保留评论和元数据
- ✅ 支持批量转换
- ✅ 自定义模板

## 安装

\`\`\`bash
git clone https://github.com/mervyn/issue2md
cd issue2md
make install
\`\`\`

## 使用方法

### 基本用法

\`\`\`bash
issue2md --issue 1234 --output docs/
\`\`\`

### 批量转换

\`\`\`bash
issue2md --batch --label "documentation"
\`\`\`

## 配置选项

| 选项 | 描述 | 默认值 |
|------|------|--------|
| \`--output\` | 输出目录 | \`./docs\` |
| \`--template\` | 模板文件 | \`default.md\` |
| \`--include-comments\` | 包含评论 | \`false\` |

## 代码示例

\`\`\`go
func ConvertIssue(id int) (*Document, error) {
    issue := fetchIssue(id)
    return parseToMarkdown(issue)
}
\`\`\`

> 💡 **提示**: 使用 \`--dry-run\` 选项可以预览转换结果而不实际写入文件。

## 开发路线图

1. [x] 基础转换功能
2. [x] 批量操作
3. [ ] 自定义模板引擎
4. [ ] Web 界面

---

最后更新: 2025-01-06
`

export default function DocumentPreview({ isOpen, onClose, document }) {
  const [content, setContent] = useState(sampleMarkdown)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (document?.content) {
      setContent(document.content)
    }
  }, [document])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success('复制成功', 'Markdown 内容已复制到剪贴板')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('复制失败', '无法访问剪贴板')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = document?.name || 'document.md'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('下载成功', `已下载 ${document?.name || 'document.md'}`)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-void/90 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-surface border border-void-border shadow-2xl overflow-hidden ${
          isFullscreen ? 'w-[95vw] h-[95vh]' : 'w-full max-w-5xl max-h-[85vh]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-void-border bg-surface-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <h2 className="font-display text-lg tracking-wider text-white">{document?.name || '文档预览'}</h2>
              <p className="text-gray-600 text-xs font-mono">{document?.path || '/docs/README.md'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-600 hover:text-white hover:bg-void-border transition-colors rounded-sm"
              title={isFullscreen ? '退出全屏' : '全屏'}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 text-gray-600 hover:text-white hover:bg-void-border transition-colors rounded-sm"
              title="复制"
            >
              {copied ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-white hover:bg-void-border transition-colors rounded-sm"
              title="下载"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-white hover:bg-void-border transition-colors rounded-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-73px)]">
          {/* Editor / Preview Tabs */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b border-void-border">
              <button className="px-6 py-3 text-sm font-display text-neon-cyan border-b-2 border-neon-cyan">
                预览
              </button>
              <button className="px-6 py-3 text-sm font-display text-gray-600 hover:text-gray-400 transition-colors">
                源码
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-8 bg-void-light/50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl mx-auto prose prose-invert prose-lg"
              >
                {/* Rendered Markdown */}
                <div className="text-gray-300 space-y-6">
                  {/* Title */}
                  <h1 className="text-3xl font-display tracking-wider text-white border-b border-void-border pb-4">
                    Issue2MD 开发指南
                  </h1>

                  {/* Section */}
                  <section>
                    <h2 className="text-xl font-display text-neon-cyan mb-3">项目简介</h2>
                    <p className="leading-relaxed">
                      Issue2MD 是一个将 GitHub Issue 自动转换为 Markdown 文档的工具。
                    </p>
                  </section>

                  {/* Features */}
                  <section>
                    <h2 className="text-xl font-display text-neon-cyan mb-3">功能特性</h2>
                    <ul className="space-y-2">
                      {['自动转换 Issue 为 Markdown', '保留评论和元数据', '支持批量转换', '自定义模板'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-neon-green">✅</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Code Block */}
                  <section>
                    <h2 className="text-xl font-display text-neon-cyan mb-3">安装</h2>
                    <div className="relative group">
                      <pre className="bg-surface border border-void-border p-4 overflow-x-auto">
                        <code className="text-neon-amber text-sm font-mono">
                          {`git clone https://github.com/mervyn/issue2md
cd issue2md
make install`}
                        </code>
                      </pre>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-gray-600 font-mono">bash</span>
                      </div>
                    </div>
                  </section>

                  {/* Table */}
                  <section>
                    <h2 className="text-xl font-display text-neon-cyan mb-3">配置选项</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-void-border">
                            <th className="text-left py-2 px-3 text-sm font-display text-gray-500">选项</th>
                            <th className="text-left py-2 px-3 text-sm font-display text-gray-500">描述</th>
                            <th className="text-left py-2 px-3 text-sm font-display text-gray-500">默认值</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ['--output', '输出目录', './docs'],
                            ['--template', '模板文件', 'default.md'],
                            ['--include-comments', '包含评论', 'false'],
                          ].map(([option, desc, defaultValue], i) => (
                            <tr key={i} className="border-b border-void-border/50">
                              <td className="py-2 px-3 font-mono text-neon-cyan text-sm">{`\`${option}\``}</td>
                              <td className="py-2 px-3 text-gray-400 text-sm">{desc}</td>
                              <td className="py-2 px-3 font-mono text-gray-500 text-sm">{`\`${defaultValue}\``}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Blockquote */}
                  <section>
                    <blockquote className="border-l-2 border-neon-amber pl-4 py-2 bg-neon-amber/5">
                      <p className="text-neon-amber">
                        💡 <span className="font-semibold">提示</span>: 使用 \`--dry-run\` 选项可以预览转换结果而不实际写入文件。
                      </p>
                    </blockquote>
                  </section>

                  {/* Footer */}
                  <div className="pt-6 border-t border-void-border flex items-center justify-between text-sm text-gray-600">
                    <span>最后更新: 2025-01-06</span>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <a href="#" className="hover:text-neon-cyan transition-colors">在 GitHub 上查看</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-neon-cyan/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-neon-pink/5 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}
