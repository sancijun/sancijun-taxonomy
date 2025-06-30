const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
// 这是 Tailwind CSS 的主配置文件
module.exports = {
  // `content` 数组告诉 Tailwind 需要扫描哪些文件。
  // Tailwind 会分析这些文件中的类名，并在最终生成的 CSS 中只包含用到的样式，
  // 这种机制（称为 Tree-shaking）可以极大地减小 CSS 文件的大小，优化网站性能。
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  // `darkMode` 配置项用于控制网站的暗色模式如何工作。
  // 设置为 `["class"]` 表示我们通过在 HTML 元素的 class 中添加 "dark" 来手动切换暗色模式。
  // 例如 <html class="dark">...</html>
  darkMode: ["class"],
  // `theme` 对象是定义项目设计系统的核心。
  // 这里可以自定义或覆盖 Tailwind 的默认设计规范，如颜色、字体、间距等。
  theme: {
    // `container` 配置用于自定义 Tailwind 内置的 `.container` 类。
    container: {
      // `center: true` 会自动为容器添加 `margin-left: auto; margin-right: auto;` 使其水平居中。
      center: true,
      // `padding: "2rem"` 为容器提供默认的左右内边距。
      padding: "2rem",
      // `screens` 定义了在不同断点下容器的最大宽度。
      // 这里表示，当屏幕宽度达到或超过 1400px 时，容器的最大宽度将固定为 1400px。
      screens: {
        "2xl": "1400px",
      },
    },
    // `extend` 对象用于扩展 Tailwind 的默认主题，而不是完全替换它。
    // 这是进行品牌化定制最安全、最推荐的方式。
    extend: {
      // `colors` 对象用于定义或扩展项目的调色盘。
      // 这里的颜色都使用了 CSS 变量（例如 `hsl(var(--border))`）。
      // 这种方式使得与 `styles/globals.css` 中的变量定义完全解耦，
      // 从而可以轻松地实现主题切换（如亮色/暗色模式）。
      colors: {
        // 每种颜色都与其在 globals.css 中定义的 CSS 变量相对应。
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // `primary` 这样的颜色被定义为一个对象，包含默认背景色和前景文字色。
        primary: {
          // `DEFAULT` 键定义了基础颜色，可以通过 `bg-primary`, `text-primary` 等类名使用。
          DEFAULT: "hsl(var(--primary))",
          // `foreground` 键定义了与其搭配的前景颜色，可以通过 `text-primary-foreground` 使用。
          // 这对于创建背景和文字颜色对比度良好的按钮等组件非常有用。
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // `borderRadius` 用于自定义边框圆角的大小。
      // 这里也使用了 CSS 变量 `var(--radius)`，使得全局圆角风格可以通过修改一个变量来统一调整。
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      // `fontFamily` 用于定义字体族。
      fontFamily: {
        // `sans` 定义了无衬线字体（通常用于正文）。
        // 它首先使用在 `app/layout.tsx` 中定义的 `--font-sans` 变量（Inter 字体），
        // `...fontFamily.sans` 是一个回退机制，如果自定义字体加载失败，会使用 Tailwind 的默认无衬线字体。
        sans: ["var(--font-sans)", ...fontFamily.sans],
        // `heading` 定义了标题字体。
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      // `keyframes` 用于定义 CSS 动画的关键帧。
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      // `animation` 将上面定义的关键帧与动画属性（时长、缓动函数等）关联起来，
      // 创建可以在 HTML 中直接使用的动画工具类（如 `animate-accordion-down`）。
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // `plugins` 数组用于为 Tailwind 添加额外的功能或第三方插件。
  plugins: [
    // `tailwindcss-animate` 插件简化了基于 `keyframes` 创建动画类的过程。
    require("tailwindcss-animate"),
    // `@tailwindcss/typography` 插件提供了一组 `prose` 类，可以为 Markdown 内容或富文本
    // 自动应用美观、专业的排版样式，极大简化了博客和文档页面的样式开发。
    require("@tailwindcss/typography"),
  ],
}
