from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from .models import Contact

def home(request):
    """Home page view with introduction and skills"""
    context = {
        'name': 'Vedansh Saini',
        'title': 'Python | AI/ML Developer',
        'intro': 'Building a career with a dynamically managed organization will provide ample opportunities to grow and reflect high-performance standards in any assignment. I am looking forward to a challenging role, where I can utilize my expertise which results in mutual growth for me and my prospective employer.',
        'skills': [
            'Python', 'REST API', 'MySQL', 'PostgreSQL', 'Django', 
            'Machine Learning', 'HTML/CSS', 'NLP, NLU, NLG', 'Pandas', 
            'NumPy', 'Visual Studio Code', 'Selenium', 'Putty', 
            'CHECKMK', 'Beautiful Soup', 'Scrapy'
        ]
    }
    return render(request, 'myapp/home.html', context)

def about(request):
    """About page with personal details"""
    context = {
        'name': 'Vedansh Saini',
        'education': 'Bachelor of Engineering (E.C.E.) / RGPV',
        'bio': 'Experienced Python and AI/ML Developer with a strong background in developing intelligent systems, web scraping, and full-stack applications. Passionate about leveraging technology to solve complex problems and create innovative solutions.'
    }
    return render(request, 'myapp/about.html', context)

def experience(request):
    """Experience page with work history"""
    experiences = [
        {
            'company': 'A&N Maintenance solution Pvt Ltd.',
            'location': 'Mumbai',
            'position': 'PYTHON | AI,ML DEVELOPER (CONTRACTUAL)',
            'duration': '12/2023 - Present',
            'projects': [
                {
                    'name': 'CommSynth AI',
                    'description': [
                        'Developed an AI-powered communication system integrating 3CX, Twilio, IBM Watson, and InfiniteCRM to streamline customer interactions.',
                        'Implemented APIs via Twilio WebSockets to enable real-time bidirectional communication between FastAPI, 3CX, and CRM systems.',
                        'Created an AI training module to enhance assistant performance using customer interaction data.',
                        'Leveraged IBM Watson\'s Text-to-Speech and Speech-to-Text capabilities to provide natural, human-like communication with customers.',
                        'Collaborated with cross-functional teams to design, test, and deploy the system, meeting project requirements and deadlines.'
                    ]
                },
                {
                    'name': 'LawSphere (Legal website for lawyers)',
                    'description': [
                        'Developed a robust web scraping tool using Python and Selenium to extract legal data from Indian government websites.',
                        'Deployed machine learning models to predict and correct potential misclassifications of legal chapters and sections.',
                        'Implemented advanced text processing techniques, including regex and custom functions, to handle Roman numerals and structured list elements.',
                        'Made AI model chatbot for user interaction to get their queries and doubts solved.',
                        'Trained custom language models to understand legal jargon and improve extraction of context-specific information.'
                    ]
                }
            ]
        },
        {
            'company': 'NTT INDIA',
            'location': 'Mumbai',
            'position': 'ASSOCIATE ENGINEER',
            'duration': '07/2022 - 11/2023',
            'projects': [
                {
                    'name': 'Data Center Operations',
                    'description': [
                        'Working as part of the data center team for monitoring production critical servers using CHECKMK.',
                        'Used Service Now as the ticketing tool for issue management.',
                        'Expertise in using Linux on Putty Tools for server management.',
                        'Provided support to the Database team on basic MySQL queries.',
                        'Identified and implemented acceptable resolutions to complex engineering problems.'
                    ]
                }
            ]
        }
    ]
    return render(request, 'myapp/experience.html', {'experiences': experiences})

def projects(request):
    """Projects page with portfolio projects"""
    projects = [
        {
            'name': 'VelocityVend: Real-time Django-Powered Vendor Management & Performance Analytics',
            'description': [
                'Spearheaded the creation of an advanced Vendor Management System as a Django Developer.',
                'Designed model and RESTful API endpoints for seamless vendor operations.',
                'Captured vital vendor information and dynamic performance metrics.',
                'Engineered model and API endpoints for efficient purchase order management.',
                'Introduced real-time performance metrics like On-Time Delivery Rate and Quality Rating.',
                'Developed Vendor Performance Endpoint for retrieving calculated metrics.',
                'Introduced Update Acknowledgment Endpoint for real-time updates when vendors acknowledge purchase orders.',
                'Implemented data integrity checks and real-time updates using Django signals.'
            ],
            'technologies': ['Django', 'REST API', 'Python', 'Database Management']
        },
        {
            'name': 'Automated Web Testing and Reporting Tool',
            'description': [
                'Developed a Python-based automation script using Selenium and OpenPyXL to log into multiple web applications.',
                'Implemented screenshot capture and text element checking functionality.',
                'Created automated Excel spreadsheet updates with test results.',
                'Added detection for critical keywords such as "HA state", "Fan", and "CPU".',
                'Provided efficient quality assurance and monitoring capabilities for web applications.',
                'Streamlined monitoring of web applications and improved issue identification.'
            ],
            'technologies': ['Python', 'Selenium', 'OpenPyXL', 'Web Automation'],
            'impact': 'Streamlined monitoring of web applications, improved issue identification and resolution, and provided visual history of system status.'
        },
        {
            'name': 'Blockchain Data Reader Application',
            'description': [
                'Worked on an innovation project as a full stack developer to create a blockchain data reading application.',
                'Implemented reading blockchain data using Ethereum service.',
                'Created functionality to display data searched using blockchain ID or transaction number.',
                'Worked on server-side technology Python and leveraged common design patterns.',
                'Coded dynamic and user-friendly systems.',
                'Leveraged public APIs for fetching blockchain data and created new APIs to return search results.',
                'Used error handling paradigms to catch runtime errors.',
                'Integrated object-oriented design and development techniques.'
            ],
            'technologies': ['Python', 'Blockchain', 'Ethereum', 'REST API', 'Full Stack Development']
        }
    ]
    return render(request, 'myapp/projects.html', {'projects': projects})

def contact(request):
    """Contact page with form handling"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # Create contact record
        contact = Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        # If it's an AJAX request, return JSON response
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({
                'success': True,
                'message': 'Thank you for your message! I\'ll get back to you soon.'
            })
        
        # For regular form submission
        messages.success(request, 'Thank you for your message! I\'ll get back to you soon.')
        return redirect('contact')
    
    return render(request, 'myapp/contact.html')
