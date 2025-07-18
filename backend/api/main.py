import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.models.project import Project, MaterialCost, LaborRate, ComplianceTemplate
from src.routes.user import user_bp
from src.routes.project import project_bp, material_bp, labor_bp, compliance_bp
from src.routes.weather import weather_bp
from src.routes.compliance import compliance_bp as compliance_api_bp
from src.routes.marketplace import marketplace_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(project_bp, url_prefix='/api')
app.register_blueprint(material_bp, url_prefix='/api')
app.register_blueprint(labor_bp, url_prefix='/api')
app.register_blueprint(compliance_bp, url_prefix='/api')
app.register_blueprint(weather_bp, url_prefix='/api')
app.register_blueprint(compliance_api_bp)
app.register_blueprint(marketplace_bp)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()
    
    # Seed some initial data
    if not MaterialCost.query.first():
        # Seed material costs
        materials = [
            MaterialCost(material_name='Ordinary Portland Cement', material_type='cement', unit='kg', cost_per_unit=0.45, supplier='YTL Cement', state='KL'),
            MaterialCost(material_name='Steel Rebar', material_type='steel', unit='kg', cost_per_unit=3.20, supplier='Southern Steel', state='KL'),
            MaterialCost(material_name='PVC Pipe 100mm', material_type='pvc_pipes', unit='m', cost_per_unit=12.50, supplier='Pipelife Malaysia', state='KL'),
            MaterialCost(material_name='Cable Tray 300mm', material_type='cable_trays', unit='m', cost_per_unit=45.00, supplier='Schneider Electric', state='KL'),
            # Penang prices (slightly lower)
            MaterialCost(material_name='Ordinary Portland Cement', material_type='cement', unit='kg', cost_per_unit=0.42, supplier='Lafarge Malaysia', state='Penang'),
            MaterialCost(material_name='Steel Rebar', material_type='steel', unit='kg', cost_per_unit=3.10, supplier='Megasteel', state='Penang'),
            # Johor prices (lowest)
            MaterialCost(material_name='Ordinary Portland Cement', material_type='cement', unit='kg', cost_per_unit=0.40, supplier='Tasek Cement', state='Johor'),
            MaterialCost(material_name='Steel Rebar', material_type='steel', unit='kg', cost_per_unit=2.95, supplier='Ann Joo Resources', state='Johor'),
        ]
        
        for material in materials:
            db.session.add(material)
    
    if not LaborRate.query.first():
        # Seed labor rates
        labor_rates = [
            # KL rates
            LaborRate(job_title='General Worker', skill_level='unskilled', hourly_rate=12.00, daily_rate=96.00, state='KL'),
            LaborRate(job_title='Skilled Electrician', skill_level='skilled', hourly_rate=25.00, daily_rate=200.00, state='KL', specialization='electrical'),
            LaborRate(job_title='ACMV Technician', skill_level='skilled', hourly_rate=30.00, daily_rate=240.00, state='KL', specialization='ACMV'),
            LaborRate(job_title='IWK Certified Plumber', skill_level='skilled', hourly_rate=28.00, daily_rate=224.00, state='KL', specialization='IWK_plumbing'),
            # Penang rates (10% lower)
            LaborRate(job_title='General Worker', skill_level='unskilled', hourly_rate=11.00, daily_rate=88.00, state='Penang'),
            LaborRate(job_title='Skilled Electrician', skill_level='skilled', hourly_rate=22.50, daily_rate=180.00, state='Penang', specialization='electrical'),
            # Johor rates (15% lower)
            LaborRate(job_title='General Worker', skill_level='unskilled', hourly_rate=10.50, daily_rate=84.00, state='Johor'),
            LaborRate(job_title='Skilled Electrician', skill_level='skilled', hourly_rate=21.00, daily_rate=168.00, state='Johor', specialization='electrical'),
        ]
        
        for rate in labor_rates:
            db.session.add(rate)
    
    if not ComplianceTemplate.query.first():
        # Seed compliance templates
        templates = [
            ComplianceTemplate(
                standard_name='IWK',
                category='sewerage',
                template_data={
                    'required_documents': ['Sewerage Connection Application', 'Site Plan', 'Drainage Plan'],
                    'inspection_points': ['Pre-connection', 'During Installation', 'Final Inspection'],
                    'standards': ['MS 1228:1991', 'Uniform Building By-Laws']
                },
                requirements=['Licensed plumber', 'IWK approval', 'Local authority permit']
            ),
            ComplianceTemplate(
                standard_name='TM',
                category='telecom',
                template_data={
                    'required_documents': ['Fiber Installation Plan', 'Building Access Agreement'],
                    'technical_specs': ['Single-mode fiber', 'MCMC approved equipment'],
                    'installation_standards': ['MCMC MTSFB TC G007:2016']
                },
                requirements=['TM certified installer', 'MCMC equipment approval', 'Building management consent']
            ),
            ComplianceTemplate(
                standard_name='JKR',
                category='building',
                template_data={
                    'standards': ['JKR Standard Specifications for Building Works 2020'],
                    'quality_requirements': ['Material testing', 'Workmanship standards'],
                    'documentation': ['Progress reports', 'Quality certificates']
                },
                requirements=['JKR approved contractor', 'Quality assurance plan', 'Regular inspections']
            ),
            ComplianceTemplate(
                standard_name='CIDB',
                category='construction',
                template_data={
                    'registration_requirements': ['CIDB contractor registration', 'Valid license'],
                    'safety_standards': ['OSHA compliance', 'Safety training'],
                    'quality_standards': ['ISO 9001', 'Quality management system']
                },
                requirements=['CIDB registration', 'Safety officer', 'Quality control plan']
            )
        ]
        
        for template in templates:
            db.session.add(template)
    
    db.session.commit()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
