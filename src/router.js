/**
 * Simple hash-based router for tool switching
 */
export class Router {
  constructor() {
    this.routes = new Map()
    this.currentRoute = null
    this.onRouteChange = null
    window.addEventListener('hashchange', () => this.resolve())
  }

  register(id, { render, setup, cleanup } = {}) {
    this.routes.set(id, { render, setup, cleanup })
    return this
  }

  navigate(id) {
    window.location.hash = `#${id}`
  }

  resolve() {
    const hash = window.location.hash.slice(1) || 'json-formatter'
    const route = this.routes.get(hash)
    if (!route) return this.navigate('json-formatter')
    if (this.currentRoute === hash) return

    // Cleanup previous
    if (this.currentRoute) {
      const prev = this.routes.get(this.currentRoute)
      if (prev?.cleanup) prev.cleanup()
    }

    this.currentRoute = hash
    const content = document.getElementById('content')
    content.innerHTML = ''
    if (route.render) route.render(content)
    if (route.setup) setTimeout(() => route.setup(), 0)

    // Update sidebar active state
    document.querySelectorAll('.sidebar-item').forEach(el => {
      el.classList.toggle('active', el.dataset.tool === hash)
    })

    if (this.onRouteChange) this.onRouteChange(hash)
  }

  start() {
    this.resolve()
  }
}

// Toast notification
export function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast')
  if (existing) existing.remove()
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

// Copy to clipboard
export function setupCopyButtons(container) {
  container.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.dataset.target)
      if (!target) return
      let text = target.value ?? target.textContent
      try {
        await navigator.clipboard.writeText(text)
        const orig = btn.textContent
        btn.textContent = '已复制!'
        setTimeout(() => btn.textContent = orig, 1500)
      } catch {
        showToast('复制失败', 'error')
      }
    })
  })
}

// Count characters, lines, words
export function updateStats(textareaId, statsId) {
  const textarea = document.getElementById(textareaId)
  const stats = document.getElementById(statsId)
  if (!textarea || !stats) return
  textarea.addEventListener('input', () => {
    const text = textarea.value
    const lines = text === '' ? 0 : text.split('\n').length
    const chars = text.length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    stats.innerHTML = `<strong>${chars}</strong> 字符 · <strong>${words}</strong> 词 · <strong>${lines}</strong> 行`
  })
}
