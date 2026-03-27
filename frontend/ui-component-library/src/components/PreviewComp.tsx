"use client";


interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const PreviewButton = ({
  text = "Click Me",
  bgColor = "#007AFF",
  textColor = "#FFFFFF",
  ...props
}: any) => (
  <button
    className="btn-primary"
    style={{ background: bgColor, color: textColor }}
    {...props}
  >
    {text}
  </button>
);

export const PreviewSecondaryButton = ({
  text = "Secondary",
  borderColor = "#007AFF",
  textColor = "#007AFF",
  ...props
}: any) => (
  <button
    className="btn-secondary"
    style={{ border: `2px solid ${borderColor}`, color: textColor }}
    {...props}
  >
    {text}
  </button>
);

export const PreviewInput = ({
  label = "Input Label",
  placeholder = "Enter text...",
  ...props
}: any) => (
  <div className="input-group" {...props}>
    <label className="input-label font-semibold mb-1 block">{label}</label>
    <input type="text" className="input-field w-full p-2 border rounded" placeholder={placeholder} />
  </div>
);

export const PreviewHeading = ({
  text = "Main Heading",
  color = "#000",
  fontSize = "32px",
  ...props
}: any) => (
  <h1 className="heading-primary font-bold" style={{ color, fontSize }} {...props}>
    {text}
  </h1>
);

export const PreviewText = ({
  text = "This is a paragraph.",
  color = "#333",
  fontSize = "16px",
  ...props
}: any) => (
  <p className="text-body" style={{ color, fontSize }} {...props}>
    {text}
  </p>
);

export const PreviewNavbar = ({
  brand = "Brand",
  bgColor = "#FFFFFF",
  textColor = "#000000",
  navLinks = [],
  children,
  ...props
}: any) => (
  <nav
    className="navbar flex items-center justify-between p-4 shadow-sm"
    style={{ background: bgColor, color: textColor }}
    {...props}
  >
    <div className="navbar-brand font-bold text-xl">{brand}</div>
    <div className="navbar-links flex gap-4">
      {navLinks && navLinks.length > 0 ? (
        navLinks.map((link: NavLink, idx: number) => (
          <a
            key={idx}
            href={link.href}
            className="navbar-link hover:opacity-80"
            style={{ color: textColor }}
          >
            {link.label}
          </a>
        ))
      ) : (
        <span className="placeholder-text opacity-50">Add navigation links</span>
      )}
      {children}
    </div>
  </nav>
);

export const PreviewHero = ({
  title = "Hero Title",
  subtitle = "Subtitle",
  gradientStart = "#667eea",
  gradientEnd = "#764ba2",
  children,
  ...props
}: any) => (
  <section
    className="hero py-20 px-10 text-center text-white"
    style={{
      background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
    }}
    {...props}
  >
    <div className="hero-content">
      <h1 className="hero-title text-5xl font-extrabold mb-4">{title}</h1>
      <p className="hero-subtitle text-xl mb-8 opacity-90">{subtitle}</p>
      <div className="hero-actions flex justify-center gap-4">
        {children || <div className="drop-hint border-2 border-dashed border-white/30 p-4 rounded text-white/50">Drop buttons here</div>}
      </div>
    </div>
  </section>
);

export const PreviewContainer = ({
  padding = "32px",
  bgColor = "transparent",
  children,
  ...props
}: any) => (
  <div
    className="container mx-auto"
    style={{ padding, background: bgColor }}
    {...props}
  >
    {children || <div className="empty-container-p border-2 border-dashed border-gray-300 p-8 rounded text-center text-gray-400">Container: Drop items here</div>}
  </div>
);

export const PreviewCard = ({
  title = "Card Title",
  showTitle = true,
  bgColor = "#FFFFFF",
  children,
  ...props
}: any) => (
  <div className="card shadow-lg rounded-xl overflow-hidden" style={{ backgroundColor: bgColor }} {...props}>
    <div className="p-6">
      {showTitle && <h3 className="card-title text-xl font-bold mb-4 border-b pb-2">{title}</h3>}
      <div className="card-body">
        {children || <div className="drop-hint text-gray-400 italic">Card Content</div>}
      </div>
    </div>
  </div>
);

export const PreviewGrid = ({
  columns = "3",
  gap = "24px",
  children,
  ...props
}: any) => (
  <div
    className="grid"
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }}
    {...props}
  >
    {children || Array.from({ length: parseInt(columns || "3") }).map((_, i) => (
          <div key={i} className="grid-placeholder border border-dashed border-gray-300 p-4 rounded text-center text-gray-400">
            Column {i + 1}
          </div>
        ))}
  </div>
);

export const PreviewFlexRow = ({
  justify = "flex-start",
  gap = "16px",
  children,
  ...props
}: any) => (
  <div className="flex-row flex items-center" style={{ justifyContent: justify, gap }} {...props}>
    {children || <div className="drop-hint text-gray-400 italic">Flex Row Items</div>}
  </div>
);

export const PreviewFooter = ({
  bgColor = "#1F2937",
  textColor = "#FFFFFF",
  copyright = "© 2024",
  children,
  ...props
}: any) => (
  <footer
    style={{ background: bgColor, color: textColor }}
    className="footer p-8 text-center mt-auto"
    {...props}
  >
    <div className="footer-content max-w-5xl mx-auto">
      {children || <p className="opacity-80">{copyright}</p>}
    </div>
  </footer>
);

export const PreviewSection = ({
  bgColor = "#FFFFFF",
  padding = "3rem 2rem",
  children,
  ...props
}: any) => (
  <section
    style={{ background: bgColor, padding }}
    className="section"
    {...props}
  >
    {children || <div className="drop-hint border-2 border-dashed border-gray-200 p-12 rounded text-center text-gray-400">Section Content</div>}
  </section>
);

export const PreviewTestimonial = ({
  name = "John",
  title = "CEO",
  content = "Great product!",
  bgColor = "#F9FAFB",
  textColor = "#333333",
  borderColor = "#007AFF",
  ...props
}: any) => (
  <div
    style={{
      background: bgColor,
      color: textColor,
      borderLeft: `4px solid ${borderColor}`,
    }}
    className="testimonial p-6 shadow-sm rounded-r-lg"
    {...props}
  >
    <p className="italic mb-4" style={{ color: textColor }}>"{content}"</p>
    <div>
      <div className="testimonial-name font-bold" style={{ color: textColor }}>
        {name}
      </div>
      <div className="testimonial-title text-sm opacity-70" style={{ color: textColor }}>
        {title}
      </div>
    </div>
  </div>
);

export const PreviewFeatureBox = ({
  icon = "✨",
  title = "Feature",
  description = "Description",
  bgColor = "#F9FAFB",
  titleColor = "#000000",
  descColor = "#666666",
  iconSize = "2rem",
  ...props
}: any) => (
  <div className="feature-box p-6 rounded-xl border border-gray-100 text-center transition-all hover:shadow-md" {...props} style={{ backgroundColor: bgColor }}>
    <div className="feature-icon mb-4" style={{ fontSize: iconSize }}>
      {icon}
    </div>
    <h3 className="feature-title font-bold text-lg mb-2" style={{ color: titleColor }}>
      {title}
    </h3>
    <p className="feature-description text-sm leading-relaxed" style={{ color: descColor }}>
      {description}
    </p>
  </div>
);

export const PreviewCTA = ({
  title = "Ready to build something great?",
  subtitle = "Join our community of creators today.",
  buttonText = "Get Started",
  bgColor = "#007AFF",
  textColor = "#FFFFFF",
  titleSize = "1.875rem",
  subtitleSize = "1rem",
  padding = "3rem",
  borderRadius = "12px",
  buttonBg = "#005ECC",
  children,
  ...props
}: any) => (
  <div
    style={{
      background: bgColor,
      color: textColor,
      padding: `${padding} 2rem`,
      borderRadius: borderRadius,
    }}
    className="cta text-center shadow-xl shadow-blue-500/20"
    {...props}
  >
    <h2 className="cta-title font-bold mb-2" style={{ fontSize: titleSize }}>
      {title}
    </h2>
    <p className="cta-subtitle opacity-90 mb-6" style={{ fontSize: subtitleSize }}>
      {subtitle}
    </p>
    {children || (
      <button
        style={{
          backgroundColor: buttonBg,
          color: textColor,
          padding: "0.875rem 2rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: 600,
        }}
        className="transition-transform hover:scale-105 active:scale-95"
      >
        {buttonText}
      </button>
    )}
  </div>
);

export const PreviewStats = ({
  value = "100%",
  label = "Satisfaction",
  valueColor = "#007AFF",
  labelColor = "#666666",
  bgColor = "transparent",
  valueSize = "2.5rem",
  labelSize = "0.875rem",
  padding = "1rem",
  borderRadius = "8px",
  ...props
}: any) => (
  <div
    className="stats text-center"
    {...props}
    style={{
      background: bgColor,
      padding: padding,
      borderRadius: borderRadius,
    }}
  >
    <div
      className="stats-value font-extrabold mb-1"
      style={{ color: valueColor, fontSize: valueSize }}
    >
      {value}
    </div>
    <div
      className="stats-label font-medium uppercase tracking-wider"
      style={{ color: labelColor, fontSize: labelSize }}
    >
      {label}
    </div>
  </div>
);

export const PreviewImage = ({
  src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  alt = "Placeholder",
  width = "100%",
  height = "auto",
  borderRadius = "12px",
  ...props
}: any) => (
  <img
    src={src}
    alt={alt}
    className="img-responsive shadow-md"
    style={{ width, height, borderRadius, objectFit: 'cover' }}
    {...props}
  />
);

export const PreviewAvatar = ({
  src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
  size = "48px",
  ...props
}: any) => (
  <img
    src={src}
    alt="Avatar"
    className="border-2 border-white shadow-sm"
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
    }}
    {...props}
  />
);

export const PreviewBadge = ({
  text = "Featured",
  color = "#007AFF",
  textColor = "#FFFFFF",
  ...props
}: any) => (
  <span
    className="badge px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
    style={{ backgroundColor: color, color: textColor }}
    {...props}
  >
    {text}
  </span>
);

export const PreviewDivider = ({
  color = "#E5E5EA",
  thickness = "1px",
  margin = "24px",
  ...props
}: any) => (
  <div
    style={{
      height: thickness,
      backgroundColor: color,
      margin: `${margin} 0`,
      width: "100%",
      opacity: 0.5
    }}
    {...props}
  />
);

export const PreviewSpacer = ({ height = "32px", ...props }: any) => (
  <div style={{ height, width: "100%" }} {...props} />
);

export const PreviewQuote = ({
  text = "The best way to predict the future is to create it.",
  author = "Peter Drucker",
  textColor = "#555555",
  borderColor = "#007AFF",
  ...props
}: any) => (
  <blockquote
    className="quote p-6 border-l-4 italic bg-gray-50 dark:bg-gray-800 rounded-r-lg"
    style={{ color: textColor, borderLeftColor: borderColor }}
    {...props}
  >
    <p className="text-lg mb-2">"{text}"</p>
    <footer className="quote-author font-bold not-italic text-sm">— {author}</footer>
  </blockquote>
);
