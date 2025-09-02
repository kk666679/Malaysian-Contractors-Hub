import { Button } from './ui/button'
import { Badge } from './ui/badge'

const SpecialistDetailModal = ({ specialist, onClose, onHire }) => {
  if (!specialist) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{specialist.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <img 
                src={specialist.profile_image} 
                alt={specialist.name}
                className="w-full h-auto rounded-lg object-cover"
              />
              
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="ml-1 text-lg font-medium">{specialist.rating}</span>
                  <span className="ml-1 text-gray-500">({specialist.reviews} reviews)</span>
                </div>
                
                <p className="mb-2">
                  <span className="font-medium">Location:</span> {specialist.location}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Rate:</span> RM{specialist.hourly_rate}/hour
                </p>
                <p className="mb-2">
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 ${specialist.availability === 'Available' ? 'text-green-600' : 'text-amber-600'}`}>
                    {specialist.availability}
                  </span>
                </p>
                
                <div className="mt-4">
                  <Button 
                    className="w-full" 
                    onClick={() => onHire(specialist)}
                  >
                    Hire Specialist
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold mb-2">{specialist.specialty}</h3>
              
              <div className="mb-4">
                {specialist.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">{cert}</Badge>
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Specialties:</h4>
                <div>
                  {specialist.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">{specialty}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">About:</h4>
                <p className="text-gray-700">
                  {specialist.bio || `${specialist.name} is a professional ${specialist.specialty} based in ${specialist.location} with extensive experience in ${specialist.specialties.join(', ')}.`}
                </p>
              </div>
              
              {specialist.portfolio && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Portfolio:</h4>
                  <div className="space-y-3">
                    {specialist.portfolio.map((project, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <h5 className="font-medium">{project.project}</h5>
                        <p className="text-sm text-gray-600">{project.location} • {project.year}</p>
                        <p className="mt-1 text-sm">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {specialist.recent_reviews && (
                <div>
                  <h4 className="font-medium mb-2">Recent Reviews:</h4>
                  <div className="space-y-3">
                    {specialist.recent_reviews.map((review, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <span className="font-medium">{review.reviewer}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-sm">{review.comment}</p>
                        <p className="mt-1 text-xs text-gray-500">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Contact Information:</h4>
            <p className="mb-1">
              <span className="font-medium">Phone:</span> {specialist.contact?.phone || 'Contact information not available'}
            </p>
            <p className="mb-1">
              <span className="font-medium">Email:</span> {specialist.contact?.email || 'Contact information not available'}
            </p>
            {specialist.contact?.whatsapp && (
              <p className="mb-1">
                <span className="font-medium">WhatsApp:</span> {specialist.contact.whatsapp}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialistDetailModal