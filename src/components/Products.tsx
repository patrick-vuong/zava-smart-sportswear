import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ShoppingCart, Eye, Zap, Activity, TShirt, Sneaker } from '@phosphor-icons/react'
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
      description: 'Professional-grade smart jersey with integrated biometric sensors.',
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
      description: 'Revolutionary smart cleats with pressure sensors and gait analysis.',
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
      description: 'Training-focused smart jersey for daily workouts and practice.',
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
      description: 'Lightweight smart cleats designed for maximum speed and agility.',
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30 h-full">
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 transition-colors">
                    {product.category === 'jersey' ? (
                      <TShirt className="w-6 h-6 text-primary group-hover:text-accent transition-colors" weight="bold" />
                    ) : (
                      <Sneaker className="w-6 h-6 text-primary group-hover:text-accent transition-colors" weight="bold" />
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  
                  {/* Price */}
                  <div className="text-2xl font-bold text-accent mb-3">${product.price}</div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
                  
                  {/* Category Badge */}
                  <Badge variant="secondary" className="mb-4">
                    {product.category === 'jersey' ? 'Smart Jersey' : 'Smart Cleats'}
                  </Badge>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
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
                      className="flex-1 bg-accent hover:bg-accent/90"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
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