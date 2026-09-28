from django.shortcuts import render

# "Base de datos" falsa: una lista de diccionarios en memoria.
# En un proyecto real esto vendría de un modelo (models.py) y una tabla,
# pero para ENTENDER qué es SSR no necesitamos base de datos: lo importante
# es que estos datos se insertan en el HTML *antes* de enviarlo al navegador.
PRODUCTOS = [
    {"nombre": "Playera UT Hermosillo", "precio": 250, "stock": 40},
    {"nombre": "Sudadera TIC", "precio": 480, "stock": 15},
    {"nombre": "Taza PWA", "precio": 120, "stock": 60},
    {"nombre": "Mochila 10mo cuatrimestre", "precio": 690, "stock": 8},
]


def vista_ssr(request):
    """
    Vista con Renderizado en Servidor (SSR).

    request: el objeto que representa la petición que hizo el navegador.

    render() hace tres cosas:
      1) toma la plantilla 'catalogo/catalogo_ssr.html'
      2) le inyecta el diccionario de "contexto" (aquí: la lista de productos)
      3) devuelve el HTML final, YA CON LOS DATOS DENTRO, listo para el navegador.

    Por eso es "servidor": el HTML que llega al navegador ya trae escritos
    los nombres y precios. Si haces clic derecho > "Ver código fuente de la
    página" verás los productos en el HTML, aunque JavaScript esté desactivado.
    Compáralo con la vista CSR de la Parte B, donde el HTML llega vacío y es
    JavaScript quien dibuja los productos DESPUÉS, ya en el navegador.
    """
    contexto = {"productos": PRODUCTOS}
    return render(request, 'catalogo/catalogo_ssr.html', contexto)
