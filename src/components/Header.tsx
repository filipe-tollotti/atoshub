import {useState, useEffect} from 'react'
import {Menu, X} from 'lucide-react'
import {motion, AnimatePresence} from 'framer-motion'
import {Link, useLocation} from 'react-router-dom'
import {Button} from '@/components/ui/button'

const navLinks = [
  {href: '#quem-somos', label: 'Quem Somos', isAnchor: true},
  {href: '#solucoes', label: 'Soluções', isAnchor: true},
  {href: '#como-funciona', label: 'Como Funciona', isAnchor: true},
  {href: '/blog', label: 'Blog', isAnchor: false},
  {href: '#contato', label: 'Contato', isAnchor: true},
]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnchorClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    if (location.pathname !== '/') {
      window.location.href = '/' + href
      return
    }
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="flex items-center gap-2"
          >
            <span
              className={`font-serif font-semibold text-xl ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Atos <span className="text-atos-gold">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={location.pathname === '/' ? link.href : `/${link.href}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (location.pathname !== '/') {
                      window.location.href = '/' + link.href
                      return
                    }
                    const element = document.querySelector(link.href)
                    if (element) {
                      element.scrollIntoView({behavior: 'smooth', block: 'start'})
                    }
                  }}
                  className={`text-sm font-medium transition-colors hover:text-atos-gold ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-atos-gold ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  } ${location.pathname === link.href ? 'text-atos-gold' : ''}`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* CTA Button */}
          <a href="#contato">
            <Button
              size="default"
              className="bg-atos-gold text-atos-blue-deep hover:bg-atos-gold-dark font-semibold"
            >
              Fale Conosco
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-foreground' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-foreground' : 'text-white'} size={24} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <a
                    key={link.href}
                    href={location.pathname === '/' ? link.href : `/${link.href}`}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false)
                      handleAnchorClick(link.href, e)
                    }}
                    className="text-foreground hover:text-atos-gold py-2 font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-foreground hover:text-atos-gold py-2 font-medium transition-colors ${
                      location.pathname === link.href ? 'text-atos-gold' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Button
                variant="default"
                className="bg-atos-gold text-atos-blue-deep hover:bg-atos-gold-dark font-medium mt-4"
              >
                Fale Conosco
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
