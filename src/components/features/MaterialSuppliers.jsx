import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'

const SupplierCard = ({ supplier }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <img 
            src={supplier.logo} 
            alt={supplier.name}
            className="w-12 h-12 object-contain mr-3"
          />
          <div>
            <CardTitle className="text-lg">{supplier.name}</CardTitle>
            <p className="text-sm text-gray-500">{supplier.location}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-3">
          <span className="text-sm font-medium">Categories:</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {supplier.categories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">{category}</Badge>
            ))}
          </div>
        </div>
        
        <p className="text-sm mb-3 line-clamp-2">{supplier.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Rating:</span> {supplier.rating} ({supplier.reviews} reviews)
          </div>
          <div>
            <span className="font-medium">Years Active:</span> {supplier.years_active}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button size="sm" className="w-full">View Products</Button>
      </CardFooter>
    </Card>
  )
}

const MaterialCategoryCard = ({ category }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
          <img 
            src={category.icon} 
            alt={category.name}
            className="w-8 h-8 object-contain"
          />
        </div>
        <CardTitle className="text-lg mb-1">{category.name}</CardTitle>
        <p className="text-sm text-gray-500 mb-2">{category.suppliers_count} suppliers</p>
        <p className="text-xs">{category.products_count}+ products</p>
      </CardContent>
    </Card>
  )
}

const MaterialSuppliers = () => {
  const [activeTab, setActiveTab] = useState('categories')
  
  // Mock data for suppliers
  const suppliers = [
    {
      id: 'SUP001',
      name: 'MalayMEP Supplies',
      logo: 'https://placehold.co/200x200?text=MalayMEP',
      location: 'Kuala Lumpur',
      categories: ['Plumbing', 'Electrical', 'HVAC'],
      description: 'Leading supplier of MEP materials with nationwide delivery and bulk discounts.',
      rating: 4.8,
      reviews: 156,
      years_active: 15
    },
    {
      id: 'SUP002',
      name: 'Penang Electrical',
      logo: 'https://placehold.co/200x200?text=PE',
      location: 'Penang',
      categories: ['Electrical', 'Lighting', 'Automation'],
      description: 'Specialized in electrical components and automation systems with technical support.',
      rating: 4.7,
      reviews: 98,
      years_active: 8
    },
    {
      id: 'SUP003',
      name: 'JB Plumbing Pro',
      logo: 'https://placehold.co/200x200?text=JBP',
      location: 'Johor Bahru',
      categories: ['Plumbing', 'Water Treatment', 'Sewerage'],
      description: 'Complete range of plumbing supplies with IWK-compliant products.',
      rating: 4.6,
      reviews: 112,
      years_active: 12
    }
  ]
  
  // Mock data for material categories
  const categories = [
    {
      id: 'CAT001',
      name: 'Plumbing',
      icon: 'https://placehold.co/100x100?text=🔧',
      suppliers_count: 24,
      products_count: 1250
    },
    {
      id: 'CAT002',
      name: 'Electrical',
      icon: 'https://placehold.co/100x100?text=⚡',
      suppliers_count: 31,
      products_count: 1850
    },
    {
      id: 'CAT003',
      name: 'HVAC',
      icon: 'https://placehold.co/100x100?text=❄️',
      suppliers_count: 18,
      products_count: 980
    },
    {
      id: 'CAT004',
      name: 'Fire Protection',
      icon: 'https://placehold.co/100x100?text=🔥',
      suppliers_count: 15,
      products_count: 720
    },
    {
      id: 'CAT005',
      name: 'Building Automation',
      icon: 'https://placehold.co/100x100?text=🏢',
      suppliers_count: 12,
      products_count: 540
    },
    {
      id: 'CAT006',
      name: 'Tools & Equipment',
      icon: 'https://placehold.co/100x100?text=🔨',
      suppliers_count: 27,
      products_count: 1650
    }
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Material Suppliers</h2>
        <div className="flex border rounded-md overflow-hidden">
          <button
            className={`px-4 py-2 ${activeTab === 'categories' ? 'bg-primary text-white' : 'bg-white'}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'suppliers' ? 'bg-primary text-white' : 'bg-white'}`}
            onClick={() => setActiveTab('suppliers')}
          >
            Suppliers
          </button>
        </div>
      </div>
      
      {activeTab === 'categories' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <MaterialCategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map(supplier => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Are you a material supplier?</h3>
            <p className="text-gray-600">Join our marketplace to reach thousands of contractors across Malaysia</p>
          </div>
          <Button size="lg">Register as Supplier</Button>
        </div>
      </div>
    </div>
  )
}

export default MaterialSuppliers