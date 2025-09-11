import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface HeroProps {
  id: string
  onExploreClick: () => void
}

export function Hero({ id, onExploreClick }: HeroProps) {
  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-60 h-60 rounded-full bg-accent/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unleash Your Potential
            <br />
            <span className="text-accent">with Smart Sportswear</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of athletic performance with Zava's revolutionary 
            smart jerseys and cleats equipped with advanced sensors and real-time analytics.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold"
              onClick={onExploreClick}
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" weight="bold" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold"
            >
              <Play className="mr-2 w-5 h-5" weight="fill" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Cards Preview */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 hidden lg:block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex space-x-4">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-2">
                <Play className="w-6 h-6 text-accent-foreground" weight="fill" />
              </div>
              <p className="text-sm font-medium text-white">Real-time Analytics</p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-2">
                <ArrowRight className="w-6 h-6 text-accent-foreground" weight="bold" />
              </div>
              <p className="text-sm font-medium text-white">Performance Tracking</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}