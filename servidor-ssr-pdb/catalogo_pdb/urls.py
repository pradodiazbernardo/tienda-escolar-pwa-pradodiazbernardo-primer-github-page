"""
Rutas propias de la app "catalogo".

Django separa las rutas por app para que cada una sea independiente
y reutilizable en otros proyectos.
"""
from django.urls import path
from . import views  # importamos las funciones definidas en views.py de esta misma carpeta

urlpatterns = [
    # http://127.0.0.1:8000/catalogo/  ->  ejecuta la función vista_ssr()
    path('catalogo_pdb/', views.vista_ssr, name='catalogo_ssr'),
]