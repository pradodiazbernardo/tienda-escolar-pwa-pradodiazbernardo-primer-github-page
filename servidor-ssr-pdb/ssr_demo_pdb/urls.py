from django.contrib import admin
from django.urls import path, include  # include() nos deja "delegar" rutas a otra app

urlpatterns = [
    # /admin/  -> panel de administración que trae Django de fábrica (no lo usaremos, pero no estorba)
    path('admin/', admin.site.urls),

    # Cualquier ruta que empiece vacía ('') se delega al archivo urls.py de la app "catalogo".
    # Así, /catalogo/ terminará resuelta por catalogo/urls.py
    path('', include('catalogo_pdb.urls')),
]