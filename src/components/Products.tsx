import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ShoppingCart, Eye, Zap, Activity } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

interface Product {
  id: string
  name: string
  category: 'jersey' | 'cleats'
  price: number
  image: string
  description: string
  features: string[]
  specs: Record<string, string>
}

interface ProductsProps {
  id: string
}

export function Products({ id }: ProductsProps) {
  const [cart, setCart] = useKV<string[]>('cart', [])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const products: Product[] = [
    {
      id: '1',
      name: 'Zava Pro Jersey',
      category: 'jersey',
      price: 299,
      image: '/api/placeholder/400/500',
      description: 'Professional-grade smart jersey with integrated biometric sensors and moisture-wicking fabric.',
      features: ['Heart Rate Monitoring', 'Temperature Regulation', 'Motion Tracking', 'Sweat Analysis'],
      specs: {
        'Material': 'Advanced Polyester Blend',
        'Sensors': '12 Integrated Biometric Points',
        'Battery Life': '72 Hours',
        'Connectivity': 'Bluetooth 5.0, WiFi',
        'Washing': 'Machine Washable',
      }
    },
    {
      id: '2',
      name: 'Zava Elite Cleats',
      category: 'cleats',
      price: 399,
      image: '/api/placeholder/400/500',
      description: 'Revolutionary smart cleats with pressure sensors and gait analysis technology.',
      features: ['Pressure Mapping', 'Gait Analysis', 'Speed Tracking', 'Balance Optimization'],
      specs: {
        'Material': 'Carbon Fiber & Synthetic',
        'Sensors': '16 Pressure Points',
        'Battery Life': '48 Hours',
        'Connectivity': 'Bluetooth 5.0',
        'Weight': '280g per cleat',
      }
    },
    {
      id: '3',
      name: 'Zava Training Jersey',
      category: 'jersey',
      price: 199,
      image: '/api/placeholder/400/500',
      description: 'Training-focused smart jersey perfect for daily workouts and practice sessions.',
      features: ['Basic Monitoring', 'Comfort Fit', 'Quick Dry', 'Team Sync'],
      specs: {
        'Material': 'Moisture-Wicking Polyester',
        'Sensors': '6 Key Monitoring Points',
        'Battery Life': '48 Hours',
        'Connectivity': 'Bluetooth 5.0',
        'Washing': 'Machine Washable',
      }
    },
    {
      id: '4',
      name: 'Zava Speed Cleats',
      category: 'cleats',
      price: 299,
      image: '/api/placeholder/400/500',
      description: 'Lightweight smart cleats designed for maximum speed and agility tracking.',
      features: ['Sprint Analysis', 'Acceleration Tracking', 'Direction Changes', 'Ground Contact'],
      specs: {
        'Material': 'Lightweight Synthetic',
        'Sensors': '8 Motion Sensors',
        'Battery Life': '36 Hours',
        'Connectivity': 'Bluetooth 5.0',
        'Weight': '240g per cleat',
      }
    },
  ]

  const addToCart = (productId: string) => {
    setCart(currentCart => [...currentCart, productId])
  }

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
    <section id={id} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Smart Sportswear Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our revolutionary lineup of smart jerseys and cleats, 
            engineered to elevate your athletic performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge 
                      className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1"
                    >
                      {product.category === 'jersey' ? 'Jersey' : 'Cleats'}
                    </Badge>
                    <div className="absolute top-2 right-2">
                      {product.category === 'jersey' ? (
                        <Zap className="w-4 h-4 text-white drop-shadow" />
                      ) : (
                        <Activity className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-3 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-sm font-bold leading-tight flex-1 mr-2">{product.name}</CardTitle>
                    <span className="text-lg font-bold text-primary whitespace-nowrap">${product.price}</span>
                  </div>
                  
                  <CardDescription className="text-xs mb-2 line-clamp-2 text-muted-foreground flex-1">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs py-0.5 px-1.5 leading-none">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 2 && (
                      <Badge variant="outline" className="text-xs py-0.5 px-1.5 leading-none">
                        +{product.features.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-1.5 mt-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 h-7 text-xs px-2"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{selectedProduct?.name}</DialogTitle>
                          <DialogDescription className="text-lg">
                            {selectedProduct?.description}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedProduct && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Features</h4>
                              <ul className="space-y-2 mb-4">
                                {selectedProduct.features.map((feature) => (
                                  <li key={feature} className="flex items-center">
                                    <Zap className="w-4 h-4 text-accent mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              
                              <h4 className="font-semibold mb-3">Specifications</h4>
                              <div className="space-y-2">
                                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{key}:</span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      size="sm" 
                      className="flex-1 h-7 text-xs px-2 bg-accent hover:bg-accent/90"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}