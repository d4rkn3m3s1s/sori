import { useEffect } from 'react'

declare global {
  interface Window {
    particlesJS: any
  }
}

function ParticleBackground() {
  useEffect(() => {
    // Particles.js konfigürasyonu
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B']
            },
            shape: {
              type: ['circle', 'edge'],
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.2,
                sync: false
              }
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#8B5CF6',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 3.5,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 180,
                line_linked: {
                  opacity: 0.8
                }
              },
              push: {
                particles_nb: 5
              }
            }
          },
          retina_detect: true
        })
      }
    }
    
    // Script zaten var mı kontrol et
    const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]')
    if (!existingScript) {
      document.head.appendChild(script)
    } else {
      // Script zaten varsa direkt çalıştır
      if (window.particlesJS) {
        script.onload?.({} as Event)
      }
    }

    return () => {
      // Canvas'ı temizle
      const canvas = document.querySelector('#particles-js canvas')
      if (canvas) {
        canvas.remove()
      }
    }
  }, [])

  return <div id="particles-js" className="absolute inset-0 -z-10" />
}

export default ParticleBackground
