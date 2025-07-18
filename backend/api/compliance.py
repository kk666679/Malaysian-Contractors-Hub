from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

compliance_bp = Blueprint('compliance_api', __name__)

@compliance_bp.route('/api/compliance/standards', methods=['GET'])
@cross_origin()
def get_compliance_standards():
    """Get all Malaysian compliance standards"""
    standards = {
        'iwk': {
            'name': 'Indah Water Konsortium (IWK)',
            'category': 'Sewerage',
            'description': 'National sewerage company responsible for sewerage services',
            'requirements': [
                'Sewerage connection permits',
                'Design approval for sewerage systems',
                'Compliance with sewerage standards',
                'Regular maintenance and inspection'
            ],
            'documents': [
                'IWK Design Guidelines',
                'Sewerage Services Act 1993',
                'Connection Application Forms',
                'Technical Specifications'
            ],
            'contact': {
                'website': 'https://www.iwk.com.my',
                'phone': '1-800-88-7788',
                'email': 'customer@iwk.com.my'
            }
        },
        'tm': {
            'name': 'Telekom Malaysia (TM)',
            'category': 'Telecommunications',
            'description': 'National telecommunications infrastructure provider',
            'requirements': [
                'Fiber optic installation permits',
                'Compliance with TM specifications',
                'Underground cable routing approval',
                'Network integration standards'
            ],
            'documents': [
                'TM Fiber Installation Guidelines',
                'Underground Cable Standards',
                'Network Access Procedures',
                'Technical Specifications'
            ],
            'contact': {
                'website': 'https://www.tm.com.my',
                'phone': '100',
                'email': 'info@tm.com.my'
            }
        },
        'jkr': {
            'name': 'Jabatan Kerja Raya (JKR)',
            'category': 'Public Works',
            'description': 'Public Works Department responsible for infrastructure standards',
            'requirements': [
                'Building plan approval',
                'Compliance with JKR standards',
                'Infrastructure design approval',
                'Quality assurance procedures'
            ],
            'documents': [
                'JKR Standard Specifications',
                'Building Guidelines',
                'Infrastructure Standards',
                'Quality Control Procedures'
            ],
            'contact': {
                'website': 'https://www.jkr.gov.my',
                'phone': '03-2691 4000',
                'email': 'webmaster@jkr.gov.my'
            }
        },
        'cidb': {
            'name': 'Construction Industry Development Board (CIDB)',
            'category': 'Construction Industry',
            'description': 'Statutory body for construction industry development',
            'requirements': [
                'Contractor registration',
                'Personnel certification',
                'Quality management systems',
                'Safety compliance'
            ],
            'documents': [
                'CIDB Act 520',
                'Registration Guidelines',
                'Certification Requirements',
                'Safety Standards'
            ],
            'contact': {
                'website': 'https://www.cidb.gov.my',
                'phone': '03-4047 7000',
                'email': 'info@cidb.gov.my'
            }
        }
    }
    
    return jsonify({
        'success': True,
        'data': standards
    })

@compliance_bp.route('/api/compliance/checklist', methods=['POST'])
@cross_origin()
def generate_compliance_checklist():
    """Generate compliance checklist for a project"""
    data = request.get_json()
    project_type = data.get('project_type', 'general')
    services = data.get('services', [])
    
    checklist = {
        'project_info': {
            'type': project_type,
            'services': services,
            'generated_date': '2025-07-17'
        },
        'mandatory_compliance': [],
        'recommended_compliance': [],
        'documentation_required': [],
        'estimated_timeline': '4-6 weeks'
    }
    
    # Add mandatory compliance based on services
    if 'sewerage' in services:
        checklist['mandatory_compliance'].extend([
            'IWK sewerage connection permit',
            'IWK design approval',
            'Environmental impact assessment'
        ])
        checklist['documentation_required'].extend([
            'Sewerage system design drawings',
            'IWK application forms',
            'Site survey reports'
        ])
    
    if 'electrical' in services:
        checklist['mandatory_compliance'].extend([
            'TNB electrical connection approval',
            'Electrical installation certificate',
            'Safety compliance certificate'
        ])
        checklist['documentation_required'].extend([
            'Electrical system design',
            'Load calculation reports',
            'Safety assessment documents'
        ])
    
    if 'telecommunications' in services:
        checklist['mandatory_compliance'].extend([
            'TM fiber installation permit',
            'MCMC equipment approval',
            'Network integration approval'
        ])
        checklist['documentation_required'].extend([
            'Network design drawings',
            'Equipment specifications',
            'Installation procedures'
        ])
    
    # Add general requirements
    checklist['mandatory_compliance'].extend([
        'CIDB contractor registration',
        'JKR building plan approval',
        'Local authority permits'
    ])
    
    checklist['recommended_compliance'].extend([
        'ISO 9001 quality management',
        'OHSAS 18001 safety management',
        'Environmental management system'
    ])
    
    return jsonify({
        'success': True,
        'data': checklist
    })

@compliance_bp.route('/api/compliance/documents', methods=['GET'])
@cross_origin()
def get_compliance_documents():
    """Get list of compliance documents and templates"""
    documents = {
        'templates': [
            {
                'name': 'IWK Connection Application',
                'category': 'Sewerage',
                'format': 'PDF',
                'description': 'Standard application form for sewerage connections',
                'download_url': '/api/compliance/download/iwk-application'
            },
            {
                'name': 'TM Fiber Installation Checklist',
                'category': 'Telecommunications',
                'format': 'PDF',
                'description': 'Pre-installation checklist for fiber optic systems',
                'download_url': '/api/compliance/download/tm-checklist'
            },
            {
                'name': 'JKR Building Plan Submission',
                'category': 'Building',
                'format': 'PDF',
                'description': 'Guidelines for building plan submission',
                'download_url': '/api/compliance/download/jkr-submission'
            },
            {
                'name': 'CIDB Registration Guide',
                'category': 'Registration',
                'format': 'PDF',
                'description': 'Step-by-step contractor registration guide',
                'download_url': '/api/compliance/download/cidb-guide'
            }
        ],
        'standards': [
            {
                'name': 'MS 1525:2019 - ACMV Systems',
                'category': 'ACMV',
                'description': 'Malaysian standard for air conditioning and mechanical ventilation',
                'status': 'Current'
            },
            {
                'name': 'MS 2680:2017 - Fire Safety',
                'category': 'Fire Protection',
                'description': 'Code of practice for fire safety in buildings',
                'status': 'Current'
            },
            {
                'name': 'MS 1064:2016 - Electrical Installation',
                'category': 'Electrical',
                'description': 'Code of practice for electrical installations',
                'status': 'Current'
            }
        ]
    }
    
    return jsonify({
        'success': True,
        'data': documents
    })

@compliance_bp.route('/api/compliance/audit', methods=['POST'])
@cross_origin()
def compliance_audit():
    """Perform compliance audit for a project"""
    data = request.get_json()
    project_id = data.get('project_id')
    audit_type = data.get('audit_type', 'full')
    
    # Simulate compliance audit results
    audit_results = {
        'project_id': project_id,
        'audit_date': '2025-07-17',
        'audit_type': audit_type,
        'overall_score': 85,
        'compliance_status': 'Good',
        'areas_assessed': [
            {
                'area': 'Documentation',
                'score': 90,
                'status': 'Excellent',
                'issues': []
            },
            {
                'area': 'Safety Compliance',
                'score': 85,
                'status': 'Good',
                'issues': [
                    'Update safety training records',
                    'Review emergency procedures'
                ]
            },
            {
                'area': 'Quality Standards',
                'score': 80,
                'status': 'Good',
                'issues': [
                    'Implement quality control checklist',
                    'Update testing procedures'
                ]
            },
            {
                'area': 'Environmental Compliance',
                'score': 88,
                'status': 'Good',
                'issues': [
                    'Update waste management plan'
                ]
            }
        ],
        'recommendations': [
            'Schedule quarterly compliance reviews',
            'Implement digital documentation system',
            'Enhance staff training programs',
            'Regular third-party audits'
        ],
        'next_audit_due': '2025-10-17'
    }
    
    return jsonify({
        'success': True,
        'data': audit_results
    })

