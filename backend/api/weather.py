from flask import Blueprint, jsonify, request
import requests
from datetime import datetime, timedelta

weather_bp = Blueprint('weather', __name__)

# Mock weather data for Malaysia (in a real app, this would connect to METMalaysia API)
MOCK_WEATHER_DATA = {
    'KL': {
        'current': {
            'temperature': 32,
            'humidity': 75,
            'rainfall': 0,
            'weather': 'partly_cloudy'
        },
        'forecast': [
            {'date': '2025-07-18', 'rainfall': 5, 'weather': 'light_rain', 'risk': 'low'},
            {'date': '2025-07-19', 'rainfall': 15, 'weather': 'moderate_rain', 'risk': 'medium'},
            {'date': '2025-07-20', 'rainfall': 25, 'weather': 'heavy_rain', 'risk': 'high'},
            {'date': '2025-07-21', 'rainfall': 8, 'weather': 'light_rain', 'risk': 'low'},
            {'date': '2025-07-22', 'rainfall': 0, 'weather': 'sunny', 'risk': 'none'},
            {'date': '2025-07-23', 'rainfall': 2, 'weather': 'partly_cloudy', 'risk': 'none'},
            {'date': '2025-07-24', 'rainfall': 12, 'weather': 'moderate_rain', 'risk': 'medium'}
        ]
    },
    'Penang': {
        'current': {
            'temperature': 31,
            'humidity': 78,
            'rainfall': 3,
            'weather': 'light_rain'
        },
        'forecast': [
            {'date': '2025-07-18', 'rainfall': 8, 'weather': 'light_rain', 'risk': 'low'},
            {'date': '2025-07-19', 'rainfall': 18, 'weather': 'moderate_rain', 'risk': 'medium'},
            {'date': '2025-07-20', 'rainfall': 30, 'weather': 'heavy_rain', 'risk': 'high'},
            {'date': '2025-07-21', 'rainfall': 12, 'weather': 'moderate_rain', 'risk': 'medium'},
            {'date': '2025-07-22', 'rainfall': 5, 'weather': 'light_rain', 'risk': 'low'},
            {'date': '2025-07-23', 'rainfall': 0, 'weather': 'sunny', 'risk': 'none'},
            {'date': '2025-07-24', 'rainfall': 7, 'weather': 'light_rain', 'risk': 'low'}
        ]
    },
    'Johor': {
        'current': {
            'temperature': 33,
            'humidity': 72,
            'rainfall': 0,
            'weather': 'sunny'
        },
        'forecast': [
            {'date': '2025-07-18', 'rainfall': 2, 'weather': 'partly_cloudy', 'risk': 'none'},
            {'date': '2025-07-19', 'rainfall': 10, 'weather': 'light_rain', 'risk': 'low'},
            {'date': '2025-07-20', 'rainfall': 20, 'weather': 'moderate_rain', 'risk': 'medium'},
            {'date': '2025-07-21', 'rainfall': 6, 'weather': 'light_rain', 'risk': 'low'},
            {'date': '2025-07-22', 'rainfall': 0, 'weather': 'sunny', 'risk': 'none'},
            {'date': '2025-07-23', 'rainfall': 1, 'weather': 'partly_cloudy', 'risk': 'none'},
            {'date': '2025-07-24', 'rainfall': 15, 'weather': 'moderate_rain', 'risk': 'medium'}
        ]
    }
}

@weather_bp.route('/weather/current', methods=['GET'])
def get_current_weather():
    state = request.args.get('state', 'KL')
    
    if state not in MOCK_WEATHER_DATA:
        return jsonify({'error': 'State not found'}), 404
    
    current_weather = MOCK_WEATHER_DATA[state]['current']
    return jsonify({
        'state': state,
        'current': current_weather,
        'last_updated': datetime.utcnow().isoformat()
    })

@weather_bp.route('/weather/forecast', methods=['GET'])
def get_weather_forecast():
    state = request.args.get('state', 'KL')
    days = int(request.args.get('days', 7))
    
    if state not in MOCK_WEATHER_DATA:
        return jsonify({'error': 'State not found'}), 404
    
    forecast = MOCK_WEATHER_DATA[state]['forecast'][:days]
    return jsonify({
        'state': state,
        'forecast': forecast,
        'generated_at': datetime.utcnow().isoformat()
    })

@weather_bp.route('/weather/monsoon-risk', methods=['POST'])
def assess_monsoon_risk():
    data = request.json
    state = data.get('state', 'KL')
    project_type = data.get('project_type')
    start_date = data.get('start_date')
    duration_days = data.get('duration_days', 30)
    
    if state not in MOCK_WEATHER_DATA:
        return jsonify({'error': 'State not found'}), 404
    
    # Get forecast data
    forecast = MOCK_WEATHER_DATA[state]['forecast']
    
    # Calculate risk assessment
    high_risk_days = sum(1 for day in forecast if day['risk'] == 'high')
    medium_risk_days = sum(1 for day in forecast if day['risk'] == 'medium')
    low_risk_days = sum(1 for day in forecast if day['risk'] == 'low')
    
    # Project type risk factors
    project_risk_factors = {
        'civil': {
            'earthworks': 0.9,  # High sensitivity to rain
            'drainage': 0.7,    # Medium sensitivity
            'piling': 0.5       # Lower sensitivity
        },
        'electrical': {
            'outdoor_work': 0.8,
            'indoor_work': 0.2
        },
        'sewerage': {
            'excavation': 0.9,
            'pipe_laying': 0.7
        },
        'elv': {
            'outdoor_installation': 0.6,
            'indoor_installation': 0.1
        }
    }
    
    # Calculate overall risk score
    base_risk = (high_risk_days * 3 + medium_risk_days * 2 + low_risk_days * 1) / len(forecast)
    project_factor = project_risk_factors.get(project_type, {}).get('general', 0.5)
    overall_risk = base_risk * project_factor
    
    # Risk level classification
    if overall_risk >= 2.5:
        risk_level = 'high'
        recommendations = [
            'Consider postponing outdoor work during high-risk days',
            'Ensure proper drainage at construction site',
            'Have backup indoor activities planned',
            'Monitor weather updates daily'
        ]
    elif overall_risk >= 1.5:
        risk_level = 'medium'
        recommendations = [
            'Plan flexible work schedules',
            'Prepare waterproof covers for materials',
            'Have contingency plans for weather delays',
            'Monitor weather forecasts regularly'
        ]
    else:
        risk_level = 'low'
        recommendations = [
            'Normal construction activities can proceed',
            'Keep basic weather protection measures',
            'Monitor long-term weather patterns'
        ]
    
    return jsonify({
        'state': state,
        'project_type': project_type,
        'assessment_period': f'{duration_days} days',
        'overall_risk_score': round(overall_risk, 2),
        'risk_level': risk_level,
        'risk_breakdown': {
            'high_risk_days': high_risk_days,
            'medium_risk_days': medium_risk_days,
            'low_risk_days': low_risk_days,
            'safe_days': len(forecast) - high_risk_days - medium_risk_days - low_risk_days
        },
        'recommendations': recommendations,
        'optimal_work_days': [day['date'] for day in forecast if day['risk'] in ['none', 'low']],
        'avoid_work_days': [day['date'] for day in forecast if day['risk'] == 'high']
    })

@weather_bp.route('/weather/schedule-optimization', methods=['POST'])
def optimize_schedule():
    data = request.json
    state = data.get('state', 'KL')
    project_tasks = data.get('tasks', [])  # List of tasks with duration and weather sensitivity
    
    if state not in MOCK_WEATHER_DATA:
        return jsonify({'error': 'State not found'}), 404
    
    forecast = MOCK_WEATHER_DATA[state]['forecast']
    
    # Simple scheduling algorithm
    optimized_schedule = []
    current_date_index = 0
    
    for task in project_tasks:
        task_name = task.get('name')
        duration = task.get('duration_days', 1)
        weather_sensitivity = task.get('weather_sensitivity', 'medium')  # low, medium, high
        
        # Find suitable days based on weather sensitivity
        suitable_days = []
        for i in range(current_date_index, min(current_date_index + 14, len(forecast))):
            day = forecast[i]
            if weather_sensitivity == 'high' and day['risk'] in ['none', 'low']:
                suitable_days.append(day)
            elif weather_sensitivity == 'medium' and day['risk'] != 'high':
                suitable_days.append(day)
            elif weather_sensitivity == 'low':
                suitable_days.append(day)
        
        # Schedule the task
        if len(suitable_days) >= duration:
            scheduled_days = suitable_days[:duration]
            optimized_schedule.append({
                'task_name': task_name,
                'start_date': scheduled_days[0]['date'],
                'end_date': scheduled_days[-1]['date'],
                'duration_days': duration,
                'weather_risk': max([day['risk'] for day in scheduled_days]),
                'scheduled_days': [day['date'] for day in scheduled_days]
            })
            current_date_index += duration
        else:
            optimized_schedule.append({
                'task_name': task_name,
                'status': 'cannot_schedule',
                'reason': 'insufficient_suitable_weather_days',
                'available_days': len(suitable_days),
                'required_days': duration
            })
    
    return jsonify({
        'state': state,
        'optimized_schedule': optimized_schedule,
        'total_tasks': len(project_tasks),
        'successfully_scheduled': len([task for task in optimized_schedule if 'start_date' in task]),
        'weather_forecast_period': f"{forecast[0]['date']} to {forecast[-1]['date']}"
    })

