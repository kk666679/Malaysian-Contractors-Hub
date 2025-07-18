from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import random

marketplace_bp = Blueprint('marketplace', __name__)

@marketplace_bp.route('/api/marketplace/specialists', methods=['GET'])
@cross_origin()
def get_specialists():
    """Get list of available specialists"""
    specialty = request.args.get('specialty', 'all')
    location = request.args.get('location', 'all')
    availability = request.args.get('availability', 'all')
    
    # Sample specialist data
    specialists = [
        {
            'id': 'SP001',
            'name': 'Ahmad Bin Hassan',
            'specialty': 'IWK Certified Plumber',
            'certifications': ['IWK Certified', 'CIDB Grade G4'],
            'location': 'Kuala Lumpur',
            'rating': 4.8,
            'reviews': 127,
            'hourly_rate': 85,
            'availability': 'Available',
            'experience_years': 12,
            'completed_projects': 89,
            'profile_image': '/api/placeholder/profile1.jpg',
            'specialties': ['Sewerage Systems', 'Drainage', 'Water Supply'],
            'contact': {
                'phone': '+60 12-345 6789',
                'email': 'ahmad.hassan@email.com'
            }
        },
        {
            'id': 'SP002',
            'name': 'Lim Wei Ming',
            'specialty': 'High Voltage Electrician',
            'certifications': ['TNB Certified', 'CIDB Grade G5', 'High Voltage License'],
            'location': 'Penang',
            'rating': 4.9,
            'reviews': 203,
            'hourly_rate': 120,
            'availability': 'Available',
            'experience_years': 15,
            'completed_projects': 156,
            'profile_image': '/api/placeholder/profile2.jpg',
            'specialties': ['High Voltage Systems', 'Switchgear', 'Power Distribution'],
            'contact': {
                'phone': '+60 16-789 0123',
                'email': 'lim.weiming@email.com'
            }
        },
        {
            'id': 'SP003',
            'name': 'Siti Nurhaliza',
            'specialty': 'ACMV Technician',
            'certifications': ['ACMV Certified', 'CIDB Grade G4', 'Refrigeration License'],
            'location': 'Johor Bahru',
            'rating': 4.7,
            'reviews': 94,
            'hourly_rate': 95,
            'availability': 'Busy',
            'experience_years': 8,
            'completed_projects': 67,
            'profile_image': '/api/placeholder/profile3.jpg',
            'specialties': ['ACMV Systems', 'Chiller Maintenance', 'Ductwork'],
            'contact': {
                'phone': '+60 19-456 7890',
                'email': 'siti.nurhaliza@email.com'
            }
        },
        {
            'id': 'SP004',
            'name': 'Raj Kumar',
            'specialty': 'Fire Protection Specialist',
            'certifications': ['BOMBA Certified', 'NFPA Certified', 'CIDB Grade G5'],
            'location': 'Kuala Lumpur',
            'rating': 4.9,
            'reviews': 178,
            'hourly_rate': 110,
            'availability': 'Available',
            'experience_years': 18,
            'completed_projects': 234,
            'profile_image': '/api/placeholder/profile4.jpg',
            'specialties': ['Fire Sprinkler Systems', 'Fire Alarm', 'Emergency Systems'],
            'contact': {
                'phone': '+60 17-234 5678',
                'email': 'raj.kumar@email.com'
            }
        },
        {
            'id': 'SP005',
            'name': 'Chen Li Hua',
            'specialty': 'ELV Systems Engineer',
            'certifications': ['SIRIM Certified', 'CCTV Specialist', 'CIDB Grade G4'],
            'location': 'Selangor',
            'rating': 4.6,
            'reviews': 112,
            'hourly_rate': 100,
            'availability': 'Available',
            'experience_years': 10,
            'completed_projects': 98,
            'profile_image': '/api/placeholder/profile5.jpg',
            'specialties': ['CCTV Systems', 'Access Control', 'PA Systems'],
            'contact': {
                'phone': '+60 18-567 8901',
                'email': 'chen.lihua@email.com'
            }
        },
        {
            'id': 'SP006',
            'name': 'Muhammad Farid',
            'specialty': 'Fiber Optic Technician',
            'certifications': ['TM Certified', 'Fiber Optic Specialist', 'CIDB Grade G3'],
            'location': 'Penang',
            'rating': 4.8,
            'reviews': 156,
            'hourly_rate': 90,
            'availability': 'Available',
            'experience_years': 7,
            'completed_projects': 123,
            'profile_image': '/api/placeholder/profile6.jpg',
            'specialties': ['Fiber Optic Installation', 'Network Cabling', 'Telecommunications'],
            'contact': {
                'phone': '+60 13-678 9012',
                'email': 'muhammad.farid@email.com'
            }
        }
    ]
    
    # Filter specialists based on query parameters
    filtered_specialists = specialists
    
    if specialty != 'all':
        filtered_specialists = [s for s in filtered_specialists if specialty.lower() in s['specialty'].lower()]
    
    if location != 'all':
        filtered_specialists = [s for s in filtered_specialists if location.lower() in s['location'].lower()]
    
    if availability != 'all':
        filtered_specialists = [s for s in filtered_specialists if s['availability'].lower() == availability.lower()]
    
    return jsonify({
        'success': True,
        'data': {
            'specialists': filtered_specialists,
            'total': len(filtered_specialists),
            'filters_applied': {
                'specialty': specialty,
                'location': location,
                'availability': availability
            }
        }
    })

@marketplace_bp.route('/api/marketplace/specialist/<specialist_id>', methods=['GET'])
@cross_origin()
def get_specialist_details(specialist_id):
    """Get detailed information about a specific specialist"""
    # This would normally fetch from database
    specialist_details = {
        'id': specialist_id,
        'name': 'Ahmad Bin Hassan',
        'specialty': 'IWK Certified Plumber',
        'certifications': ['IWK Certified', 'CIDB Grade G4'],
        'location': 'Kuala Lumpur',
        'rating': 4.8,
        'reviews': 127,
        'hourly_rate': 85,
        'availability': 'Available',
        'experience_years': 12,
        'completed_projects': 89,
        'profile_image': '/api/placeholder/profile1.jpg',
        'specialties': ['Sewerage Systems', 'Drainage', 'Water Supply'],
        'bio': 'Experienced plumber with 12 years in the industry. Specialized in IWK-compliant sewerage systems and drainage solutions. Committed to quality workmanship and timely project completion.',
        'portfolio': [
            {
                'project': 'Residential Complex Sewerage System',
                'location': 'Mont Kiara, KL',
                'year': 2024,
                'description': 'Complete sewerage system installation for 200-unit residential complex'
            },
            {
                'project': 'Commercial Building Drainage',
                'location': 'KLCC, KL',
                'year': 2023,
                'description': 'Storm drainage system for 30-story commercial building'
            }
        ],
        'recent_reviews': [
            {
                'reviewer': 'ABC Construction',
                'rating': 5,
                'comment': 'Excellent work on our sewerage project. Very professional and knowledgeable.',
                'date': '2024-06-15'
            },
            {
                'reviewer': 'XYZ Developers',
                'rating': 4,
                'comment': 'Good quality work, completed on time. Would recommend.',
                'date': '2024-05-20'
            }
        ],
        'contact': {
            'phone': '+60 12-345 6789',
            'email': 'ahmad.hassan@email.com',
            'whatsapp': '+60 12-345 6789'
        },
        'schedule': {
            'next_available': '2025-07-20',
            'typical_response_time': '2 hours',
            'working_hours': '8:00 AM - 6:00 PM'
        }
    }
    
    return jsonify({
        'success': True,
        'data': specialist_details
    })

@marketplace_bp.route('/api/marketplace/hire', methods=['POST'])
@cross_origin()
def hire_specialist():
    """Submit a hiring request for a specialist"""
    data = request.get_json()
    
    specialist_id = data.get('specialist_id')
    project_details = data.get('project_details', {})
    client_info = data.get('client_info', {})
    
    # Generate a hiring request ID
    request_id = f"HR{random.randint(10000, 99999)}"
    
    hiring_request = {
        'request_id': request_id,
        'specialist_id': specialist_id,
        'status': 'Pending',
        'submitted_date': '2025-07-17',
        'project_details': project_details,
        'client_info': client_info,
        'estimated_response_time': '2-4 hours',
        'next_steps': [
            'Specialist will review your request',
            'You will receive a response within 2-4 hours',
            'If accepted, specialist will contact you directly',
            'Project details and timeline will be finalized'
        ]
    }
    
    return jsonify({
        'success': True,
        'message': 'Hiring request submitted successfully',
        'data': hiring_request
    })

@marketplace_bp.route('/api/marketplace/categories', methods=['GET'])
@cross_origin()
def get_specialist_categories():
    """Get available specialist categories"""
    categories = {
        'plumbing': {
            'name': 'Plumbing & Water Systems',
            'specialists_count': 45,
            'avg_hourly_rate': 85,
            'subcategories': [
                'IWK Certified Plumbers',
                'Water Supply Specialists',
                'Drainage Experts',
                'Hot Water Systems'
            ]
        },
        'electrical': {
            'name': 'Electrical Systems',
            'specialists_count': 67,
            'avg_hourly_rate': 110,
            'subcategories': [
                'High Voltage Electricians',
                'Solar System Installers',
                'Smart Grid Specialists',
                'Power Distribution'
            ]
        },
        'acmv': {
            'name': 'ACMV Systems',
            'specialists_count': 38,
            'avg_hourly_rate': 95,
            'subcategories': [
                'ACMV Technicians',
                'Chiller Specialists',
                'Ventilation Experts',
                'Energy Efficiency'
            ]
        },
        'fire_protection': {
            'name': 'Fire Protection',
            'specialists_count': 29,
            'avg_hourly_rate': 105,
            'subcategories': [
                'Fire Sprinkler Systems',
                'Fire Alarm Systems',
                'Emergency Systems',
                'BOMBA Compliance'
            ]
        },
        'elv': {
            'name': 'ELV Systems',
            'specialists_count': 52,
            'avg_hourly_rate': 90,
            'subcategories': [
                'CCTV Systems',
                'Access Control',
                'PA Systems',
                'Building Automation'
            ]
        },
        'telecommunications': {
            'name': 'Telecommunications',
            'specialists_count': 34,
            'avg_hourly_rate': 88,
            'subcategories': [
                'Fiber Optic Installation',
                'Network Cabling',
                'TM Compliance',
                'Wireless Systems'
            ]
        }
    }
    
    return jsonify({
        'success': True,
        'data': categories
    })

@marketplace_bp.route('/api/marketplace/search', methods=['POST'])
@cross_origin()
def search_specialists():
    """Advanced search for specialists"""
    data = request.get_json()
    
    search_criteria = {
        'keywords': data.get('keywords', ''),
        'location': data.get('location', ''),
        'specialty': data.get('specialty', ''),
        'min_rating': data.get('min_rating', 0),
        'max_hourly_rate': data.get('max_hourly_rate', 1000),
        'availability': data.get('availability', 'all'),
        'certifications': data.get('certifications', [])
    }
    
    # This would normally perform database search
    # For demo, return filtered results
    search_results = {
        'total_found': 23,
        'search_criteria': search_criteria,
        'specialists': [
            # Sample search results would be returned here
        ],
        'suggested_filters': [
            'IWK Certified',
            'BOMBA Approved',
            'TM Certified',
            'High Voltage Licensed'
        ]
    }
    
    return jsonify({
        'success': True,
        'data': search_results
    })

