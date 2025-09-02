import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MapPin, User } from 'lucide-react';

const ServiceCard = ({ service, onContact }) => {
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    return `RM ${price.toLocaleString()}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{service.title}</CardTitle>
          <Badge variant="secondary">{service.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{service.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{service.provider.name}</span>
          </div>
          {service.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{service.location}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-blue-600">
            {formatPrice(service.price)}
          </div>
          <Button size="sm" onClick={() => onContact(service)}>
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;