from django.urls import path
from . import views

urlpatterns = [
    # ============= AUTHENTICATION =============
    path('api/signup/', views.signup, name='signup'),
    path('api/login/', views.login, name='login'),
    
    # ============= COMPANY ROUTES =============
    path('api/companies/', views.get_companies, name='get_companies'),
    path('api/companies/create/', views.create_company, name='create_company'),
    path('api/companies/<str:company_id>/', views.company_detail, name='company_detail'),
    
    # ============= JOB ROUTES =============
    path('api/jobs/', views.get_jobs, name='get_jobs'),
    path('api/jobs/create/', views.create_job, name='create_job'),
    path('api/jobs/<str:job_id>/', views.get_job, name='get_job'),
    path('api/jobs/<str:job_id>/update/', views.update_job, name='update_job'),
    path('api/jobs/<str:job_id>/delete/', views.delete_job, name='delete_job'),
    path('api/jobs/user/<str:user_id>/', views.get_my_jobs, name='get_my_jobs'),
    
    # ============= APPLICATION ROUTES =============
    path('api/jobs/<str:job_id>/apply/', views.apply_job, name='apply_job'),
    path('api/applications/user/<str:user_id>/', views.get_my_applications, name='get_my_applications'),
    path('api/applications/job/<str:job_id>/', views.get_job_applications, name='get_job_applications'),
    path('api/applications/<str:application_id>/', views.get_application, name='get_application'),
    path('api/applications/<str:application_id>/update/', views.update_application_status, name='update_application_status'),
    path('api/applications/<str:application_id>/withdraw/', views.withdraw_application, name='withdraw_application'),
    
    # ============= DASHBOARD ROUTES =============
    path('api/dashboard/company/<str:user_id>/', views.company_dashboard, name='company_dashboard'),
    path('api/dashboard/applicant/<str:user_id>/', views.applicant_dashboard, name='applicant_dashboard'),
]
