import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import bcrypt

# MongoDB connection
client = MongoClient("mongodb+srv://avasanth081:avasanth081@cluster0.08qsmhs.mongodb.net/")
db = client["job_portal"]  
users_collection = db["users"]
companies_collection = db["companies"]
jobs_collection = db["jobs"]
applications_collection = db["applications"]


def serialize_doc(doc):
    if doc and '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

# ============= USER AUTHENTICATION =============

@csrf_exempt
def signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            role = data.get("role", "applicant")  # applicant or company
            
            if not username or not email or not password:
                return JsonResponse({"error": "Username, email, and password required"}, status=400)
            
            # Check if user exists
            if users_collection.find_one({"$or": [{"username": username}, {"email": email}]}):
                return JsonResponse({"error": "User with this username or email already exists"}, status=400)
            
            # Hash password
            hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            # Save to DB
            users_collection.insert_one({
                "username": username,
                "email": email,
                "password": hashed_pw,
                "role": role,
                "created_at": datetime.now()
            })
            
            return JsonResponse({"message": "Signup successful"}, status=201)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            email = data.get("email")
            password = data.get("password")
            
            if not email or not password:
                return JsonResponse({"error": "Email and password required"}, status=400)
            
            # Find user
            user = users_collection.find_one({"email": email})
            
            if not user:
                return JsonResponse({"error": "Invalid credentials"}, status=401)
            
            # Check password
            if bcrypt.checkpw(password.encode('utf-8'), user['password']):
                return JsonResponse({
                    "message": "Login successful",
                    "user_id": str(user['_id']),
                    "username": user['username'],
                    "email": user['email'],
                    "role": user['role']
                }, status=200)
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=401)
                
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

# ============= COMPANY VIEWS =============

@csrf_exempt
def create_company(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            user_id = data.get("user_id")
            name = data.get("name")
            description = data.get("description")
            website = data.get("website")
            location = data.get("location")
            email = data.get("email")
            phone = data.get("phone")
            logo = data.get("logo", "")
            
            if not user_id or not name or not email:
                return JsonResponse({"error": "User ID, company name, and email required"}, status=400)
            
            # Insert company
            result = companies_collection.insert_one({
                "user_id": user_id,
                "name": name,
                "description": description,
                "website": website,
                "location": location,
                "email": email,
                "phone": phone,
                "logo": logo,
                "created_at": datetime.now()
            })
            
            return JsonResponse({
                "message": "Company created successfully",
                "company_id": str(result.inserted_id)
            }, status=201)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_companies(request):
    if request.method == "GET":
        try:
            companies = list(companies_collection.find())
            
            for company in companies:
                company['_id'] = str(company['_id'])
            
            return JsonResponse({"companies": companies}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def company_detail(request, company_id):
    try:
        if request.method == "GET":
            company = companies_collection.find_one({"_id": ObjectId(company_id)})
            
            if not company:
                return JsonResponse({"error": "Company not found"}, status=404)
            
            return JsonResponse(serialize_doc(company), status=200)
        
        elif request.method == "PUT":
            data = json.loads(request.body)
            
            update_data = {
                "name": data.get("name"),
                "description": data.get("description"),
                "website": data.get("website"),
                "location": data.get("location"),
                "email": data.get("email"),
                "phone": data.get("phone"),
                "logo": data.get("logo", ""),
                "updated_at": datetime.now()
            }
            
            # Remove None values
            update_data = {k: v for k, v in update_data.items() if v is not None}
            
            companies_collection.update_one(
                {"_id": ObjectId(company_id)},
                {"$set": update_data}
            )
            
            return JsonResponse({"message": "Company updated successfully"}, status=200)
        
        elif request.method == "DELETE":
            companies_collection.delete_one({"_id": ObjectId(company_id)})
            return JsonResponse({"message": "Company deleted successfully"}, status=200)
            
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# ============= JOB VIEWS =============

@csrf_exempt
def create_job(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            title = data.get("title")
            company = data.get("company")
            description = data.get("description")
            requirements = data.get("requirements", [])
            location = data.get("location")
            job_type = data.get("job_type")  # Full-time, Part-time, Contract, Remote
            salary = data.get("salary")
            experience_level = data.get("experience_level", "")
            posted_by = data.get("posted_by")  # user_id
            deadline = data.get("deadline")
            skills = data.get("skills", [])
            
            if not title or not company or not posted_by:
                return JsonResponse({"error": "Title, company, and posted_by required"}, status=400)
            
            # Insert job
            result = jobs_collection.insert_one({
                "title": title,
                "company": company,
                "description": description,
                "requirements": requirements,
                "location": location,
                "job_type": job_type,
                "salary": salary,
                "experience_level": experience_level,
                "posted_by": posted_by,
                "posted_date": datetime.now(),
                "deadline": deadline,
                "skills": skills,
                "is_active": True
            })
            
            return JsonResponse({
                "message": "Job created successfully",
                "job_id": str(result.inserted_id)
            }, status=201)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_jobs(request):
    if request.method == "GET":
        try:
            query = {"is_active": True}
            
            # Apply filters
            title = request.GET.get('title')
            if title:
                query['title'] = {'$regex': title, '$options': 'i'}
            
            location = request.GET.get('location')
            if location:
                query['location'] = {'$regex': location, '$options': 'i'}
            
            job_type = request.GET.get('job_type')
            if job_type:
                query['job_type'] = job_type
            
            company = request.GET.get('company')
            if company:
                query['company'] = {'$regex': company, '$options': 'i'}
            
            min_salary = request.GET.get('min_salary')
            if min_salary:
                query['salary'] = {'$gte': int(min_salary)}
            
            max_salary = request.GET.get('max_salary')
            if max_salary:
                if 'salary' in query:
                    query['salary']['$lte'] = int(max_salary)
                else:
                    query['salary'] = {'$lte': int(max_salary)}
            
            # Get jobs
            jobs = list(jobs_collection.find(query).sort('posted_date', -1))
            
            for job in jobs:
                job['_id'] = str(job['_id'])
            
            return JsonResponse({"jobs": jobs}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_job(request, job_id):
    if request.method == "GET":
        try:
            job = jobs_collection.find_one({"_id": ObjectId(job_id)})
            
            if not job:
                return JsonResponse({"error": "Job not found"}, status=404)
            
            return JsonResponse(serialize_doc(job), status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_my_jobs(request, user_id):
    if request.method == "GET":
        try:
            jobs = list(jobs_collection.find({"posted_by": user_id}))
            
            for job in jobs:
                job['_id'] = str(job['_id'])
            
            return JsonResponse({"jobs": jobs}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def update_job(request, job_id):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            
            update_data = {
                "title": data.get("title"),
                "company": data.get("company"),
                "description": data.get("description"),
                "requirements": data.get("requirements"),
                "location": data.get("location"),
                "job_type": data.get("job_type"),
                "salary": data.get("salary"),
                "experience_level": data.get("experience_level"),
                "deadline": data.get("deadline"),
                "skills": data.get("skills"),
                "is_active": data.get("is_active"),
                "updated_at": datetime.now()
            }
            
            # Remove None values
            update_data = {k: v for k, v in update_data.items() if v is not None}
            
            jobs_collection.update_one(
                {"_id": ObjectId(job_id)},
                {"$set": update_data}
            )
            
            return JsonResponse({"message": "Job updated successfully"}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def delete_job(request, job_id):
    if request.method == "DELETE":
        try:
            jobs_collection.delete_one({"_id": ObjectId(job_id)})
            return JsonResponse({"message": "Job deleted successfully"}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

# ============= APPLICATION VIEWS =============

@csrf_exempt
def apply_job(request, job_id):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            applicant_id = data.get("applicant_id")
            applicant_name = data.get("applicant_name")
            applicant_email = data.get("applicant_email")
            cover_letter = data.get("cover_letter", "")
            resume_url = data.get("resume_url", "")
            phone = data.get("phone", "")
            
            if not applicant_id or not applicant_email:
                return JsonResponse({"error": "Applicant ID and email required"}, status=400)
            
            # Check if job exists
            job = jobs_collection.find_one({"_id": ObjectId(job_id)})
            if not job:
                return JsonResponse({"error": "Job not found"}, status=404)
            
            # Check if already applied
            existing = applications_collection.find_one({
                "job_id": job_id,
                "applicant_id": applicant_id
            })
            
            if existing:
                return JsonResponse({"error": "You have already applied for this job"}, status=400)
            
            # Insert application
            result = applications_collection.insert_one({
                "job_id": job_id,
                "job_title": job['title'],
                "company": job['company'],
                "applicant_id": applicant_id,
                "applicant_name": applicant_name,
                "applicant_email": applicant_email,
                "cover_letter": cover_letter,
                "resume_url": resume_url,
                "phone": phone,
                "status": "pending",  # pending, accepted, rejected
                "applied_date": datetime.now()
            })
            
            return JsonResponse({
                "message": "Application submitted successfully",
                "application_id": str(result.inserted_id)
            }, status=201)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_my_applications(request, user_id):
    if request.method == "GET":
        try:
            applications = list(applications_collection.find({"applicant_id": user_id}))
            
            for app in applications:
                app['_id'] = str(app['_id'])
            
            return JsonResponse({"applications": applications}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_job_applications(request, job_id):
    if request.method == "GET":
        try:
            query = {"job_id": job_id}
            
            # Filter by status
            status_filter = request.GET.get('status')
            if status_filter:
                query['status'] = status_filter
            
            applications = list(applications_collection.find(query))
            
            for app in applications:
                app['_id'] = str(app['_id'])
            
            return JsonResponse({"applications": applications}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_application(request, application_id):
    if request.method == "GET":
        try:
            application = applications_collection.find_one({"_id": ObjectId(application_id)})
            
            if not application:
                return JsonResponse({"error": "Application not found"}, status=404)
            
            return JsonResponse(serialize_doc(application), status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def update_application_status(request, application_id):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            
            new_status = data.get("status")
            
            if new_status not in ['pending', 'accepted', 'rejected']:
                return JsonResponse({"error": "Invalid status"}, status=400)
            
            applications_collection.update_one(
                {"_id": ObjectId(application_id)},
                {"$set": {"status": new_status, "updated_at": datetime.now()}}
            )
            
            return JsonResponse({"message": "Application status updated successfully"}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def withdraw_application(request, application_id):
    if request.method == "DELETE":
        try:
            applications_collection.delete_one({"_id": ObjectId(application_id)})
            return JsonResponse({"message": "Application withdrawn successfully"}, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

# ============= DASHBOARD VIEWS =============

@csrf_exempt
def company_dashboard(request, user_id):
    if request.method == "GET":
        try:
            # Get all jobs by this company
            jobs = list(jobs_collection.find({"posted_by": user_id}))
            total_jobs = len(jobs)
            
            job_ids = [str(job['_id']) for job in jobs]
            
            # Get all applications for these jobs
            total_applications = applications_collection.count_documents({"job_id": {"$in": job_ids}})
            pending = applications_collection.count_documents({"job_id": {"$in": job_ids}, "status": "pending"})
            accepted = applications_collection.count_documents({"job_id": {"$in": job_ids}, "status": "accepted"})
            rejected = applications_collection.count_documents({"job_id": {"$in": job_ids}, "status": "rejected"})
            
            return JsonResponse({
                "total_jobs": total_jobs,
                "total_applications": total_applications,
                "pending_applications": pending,
                "accepted_applications": accepted,
                "rejected_applications": rejected
            }, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def applicant_dashboard(request, user_id):
    if request.method == "GET":
        try:
            total = applications_collection.count_documents({"applicant_id": user_id})
            pending = applications_collection.count_documents({"applicant_id": user_id, "status": "pending"})
            accepted = applications_collection.count_documents({"applicant_id": user_id, "status": "accepted"})
            rejected = applications_collection.count_documents({"applicant_id": user_id, "status": "rejected"})
            
            return JsonResponse({
                "total_applications": total,
                "pending": pending,
                "accepted": accepted,
                "rejected": rejected
            }, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
