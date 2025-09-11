import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  HeartStraight, 
  Thermometer, 
  ChartLine, 
  Smartphone, 
  CloudArrowUp,
  Sneaker,
  TShirt,
  Bluetooth,
  Battery
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface TechnologyProps {
  id: string
}

export function Technology({ id }: TechnologyProps) {
  const jerseyFeatures = [
    {
      icon: HeartStraight,
      title: 'Biometric Monitoring',
      description: 'Continuous heart rate, breathing rate, and stress level tracking through embedded sensors.'
    },
    {
      icon: Thermometer,
      title: 'Temperature Control',
      description: 'Smart fabric technology that regulates body temperature and moisture management.'
    },
    {
      icon: Activity,
      title: 'Motion Analysis',
      description: 'Advanced accelerometers track movement patterns, posture, and athletic form.'
    },
    {
      icon: ChartLine,
      title: 'Performance Analytics',
      description: 'Real-time data processing and insights delivered to your mobile device.'
    }
  ]

  const cleatsFeatures = [
    {
      icon: Activity,
      title: 'Pressure Mapping',
      description: 'Detailed foot pressure analysis to optimize stride and prevent injuries.'
    },
    {
      icon: ChartLine,
      title: 'Gait Analysis',
      description: 'Comprehensive running form analysis with personalized improvement suggestions.'
    },
    {
      icon: Sneaker,
      title: 'Balance Optimization',
      description: 'Center of gravity tracking to enhance stability and athletic performance.'
    },
    {
      icon: CloudArrowUp,
      title: 'Speed Metrics',
      description: 'Precise speed, acceleration, and direction change measurements.'
    }
  ]

  const techSpecs = [
    {
      icon: Bluetooth,
      title: 'Connectivity',
      value: 'Bluetooth 5.0 + WiFi',
      description: 'Seamless data transfer to mobile app'
    },
    {
      icon: Battery,
      title: 'Battery Life',
      value: 'Up to 72 hours',
      description: 'Long-lasting performance for extended training'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      value: 'iOS & Android',
      description: 'Comprehensive analytics dashboard'
    },
    {
      icon: CloudArrowUp,
      title: 'Data Storage',
      value: 'Cloud Sync',
      description: 'Automatic backup and team sharing'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id={id} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Revolutionary Smart Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our proprietary sensors and analytics platform transform traditional sportswear 
            into intelligent performance enhancement tools.
          </p>
        </motion.div>

        {/* Technology Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {techSpecs.map((spec) => (
            <motion.div key={spec.title} variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-tech-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <spec.icon className="w-6 h-6 text-white" weight="bold" />
                  </div>
                  <h3 className="font-semibold mb-2">{spec.title}</h3>
                  <div className="text-2xl font-bold text-accent mb-2">{spec.value}</div>
                  <p className="text-sm text-muted-foreground">{spec.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Smart Jersey Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <TShirt className="w-8 h-8 text-accent mr-3" weight="bold" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Smart Jersey Technology</h3>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {jerseyFeatures.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" weight="bold" />
                    </div>
                    <h4 className="font-semibold mb-3">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Smart Cleats Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-8">
            <Sneaker className="w-8 h-8 text-accent mr-3" weight="bold" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Smart Cleats Technology</h3>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cleatsFeatures.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" weight="bold" />
                    </div>
                    <h4 className="font-semibold mb-3">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8">
              <Smartphone className="w-16 h-16 mx-auto mb-6 text-accent" weight="bold" />
              <h3 className="text-2xl font-bold mb-4">Experience the Future of Athletic Performance</h3>
              <p className="text-lg mb-6 text-primary-foreground/90">
                Our mobile app provides real-time insights, personalized coaching, 
                and team analytics to maximize your athletic potential.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  Real-time Coaching
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  Team Analytics
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  Injury Prevention
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  Performance Trends
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}