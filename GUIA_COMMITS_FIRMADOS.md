# Guia Para Subir Cambios En Partes Y Con Commits Firmados

Esta guia esta pensada para subir trabajo real en varios commits pequenos, claros y ordenados, en lugar de empujar todo junto en un solo commit grande.

La idea profesional no es "disfrazar" cambios sin sentido, sino separar el trabajo por bloques reales:

- configuracion
- integracion
- estilos
- componentes
- formularios
- correcciones
- limpieza

Si haces eso bien, el historial se ve natural, entendible y mantenible.

## 1. Regla principal

Cada commit debe responder una sola pregunta:

"Que cambio concreto introduce este commit?"

Si el commit mezcla muchas cosas, se nota.
Si el commit tiene un objetivo pequeño y claro, se ve natural.

Ejemplos buenos:

- `feat(frontend): conectar catalogo con API`
- `fix(frontend): corregir mapeo de producto en detalle`
- `style(frontend): ajustar layout de header y footer`
- `refactor(frontend): simplificar servicio de mensajes`

Ejemplos malos:

- `cambios`
- `avance`
- `update`
- `arreglos varios`

## 2. Antes de empezar

Revisa que cambios tienes:

```powershell
git status
git diff
```

Si quieres ver archivo por archivo:

```powershell
git diff -- backend
git diff -- frontend
```

## 3. Como partir los cambios en commits pequenos

La herramienta mas importante para esto es:

```powershell
git add -p
```

Eso te deja agregar cambios por pedazos en lugar de agregar un archivo entero.

Cuando lo corras, Git te ira mostrando bloques y opciones como:

- `y` para agregar ese bloque
- `n` para no agregarlo
- `s` para dividirlo en bloques mas pequenos
- `e` para editar el bloque manualmente
- `q` para salir

Esto es lo que hace que puedas construir commits separados de forma creible y limpia.

## 4. Flujo recomendado

Haz siempre este ciclo:

1. Revisar cambios.
2. Elegir un grupo pequeno con un solo objetivo.
3. Agregar solo ese grupo con `git add -p`.
4. Confirmar que el stage contiene solo eso.
5. Hacer el commit firmado.
6. Repetir con el siguiente bloque.

## 5. Como revisar exactamente que vas a commitear

Antes de cada commit:

```powershell
git diff --staged
```

Eso te deja ver solo lo que ya esta en stage.

Si metiste algo que no querias:

```powershell
git restore --staged <archivo>
```

O si quieres volver a seleccionar por partes:

```powershell
git restore --staged <archivo>
git add -p <archivo>
```

## 6. Como hacer commits firmados

Si ya tienes firma configurada, usa:

```powershell
git commit -S -m "feat(frontend): conectar catalogo con API"
```

Si quieres forzar que todos salgan firmados:

```powershell
git config commit.gpgsign true
```

Para revisar si quedo activo:

```powershell
git config --get commit.gpgsign
```

Para comprobar luego la firma:

```powershell
git log --show-signature -n 5
```

## 7. Si aun no tienes firma configurada

Revisa primero que tipo de firma usas:

```powershell
git config --get gpg.format
git config --get user.signingkey
```

Tambien puedes revisar toda la configuracion relevante:

```powershell
git config --list | Select-String "sign|gpg|user.signingkey"
```

Si aun no esta configurada la firma, primero configura eso antes de empezar a subir.

## 8. Orden recomendado para que el historial se vea limpio

Un historial limpio normalmente se arma en este orden:

1. Base o configuracion
2. Integracion de servicios
3. Componentes o vistas
4. Formularios
5. Ajustes visuales
6. Correcciones pequenas

Ejemplo realista:

```text
feat(frontend): adaptar servicio de productos al backend real
feat(frontend): conectar formulario de contacto con la API
feat(frontend): integrar alta de productos con payload final
fix(frontend): corregir mapeo de campos entre frontend y backend
style(frontend): ajustar shell principal para header y footer
```

Eso se ve mejor que un solo commit gigante con todo mezclado.

## 9. Como sacar varios commits de un mismo trabajo ya hecho

Si ya trabajaste mucho y todo esta junto, puedes partirlo igual:

1. No hagas `git add .`
2. Usa `git add -p`
3. Selecciona primero solo los bloques relacionados con una parte
4. Haz commit
5. Repite con el resto

Si un mismo archivo tiene cambios de varios temas, `git add -p` te ayuda a separar dentro del mismo archivo.

Ejemplo:

- primero haces commit de solo servicios
- despues commit de solo formularios
- despues commit de solo estilos

Aunque el trabajo se haya hecho en una sola sesion, el historial puede quedar ordenado por unidades logicas reales.

## 10. Como hacer que cada commit parezca natural

Haz que cada commit tenga estas caracteristicas:

- toca pocas cosas relacionadas
- tiene un mensaje especifico
- deja el proyecto en un estado razonable
- no mezcla estilos con logica si no hace falta
- no mezcla frontend y backend si el cambio no lo requiere

Lo importante es que el commit cuente una historia tecnica valida.

## 11. Ejemplo paso a paso

Supongamos que tienes cambios en servicios, formularios y estilos.

### Commit 1: servicios

Selecciona solo servicios:

```powershell
git add -p frontend/src/app/services/products.service.ts
git add -p frontend/src/app/services/messages.service.ts
```

Revisa:

```powershell
git diff --staged
```

Confirma:

```powershell
git commit -S -m "feat(frontend): conectar servicios con endpoints reales"
```

### Commit 2: formularios

Selecciona solo formularios:

```powershell
git add -p frontend/src/app/pages/add-product/add-product.ts
git add -p frontend/src/app/pages/add-product/add-product.html
git add -p frontend/src/app/pages/contact/contact.ts
git add -p frontend/src/app/pages/contact/contact.html
```

Confirma:

```powershell
git commit -S -m "feat(frontend): integrar formularios con la API"
```

### Commit 3: mapeos y modelos

```powershell
git add -p frontend/src/app/models/product.interface.ts
git add -p frontend/src/app/models/message.interface.ts
git add -p frontend/src/app/models/cart-item.interface.ts
git add -p frontend/src/app/services/cart.service.ts
```

Confirma:

```powershell
git commit -S -m "refactor(frontend): alinear modelos con la integracion actual"
```

### Commit 4: detalles visuales o layout

```powershell
git add -p frontend/src/app/app.css
git add -p frontend/src/app/layout/header/header.css
git add -p frontend/src/app/layout/footer/footer.css
git add -p frontend/src/styles.css
```

Confirma:

```powershell
git commit -S -m "style(frontend): ajustar layout general y estilos base"
```

## 12. Como empujar al remoto

Despues de revisar que todo esta bien:

```powershell
git log --oneline -n 10
git push origin <tu-rama>
```

Si quieres comprobar firmas antes:

```powershell
git log --show-signature -n 10
```

## 13. Si necesitas reacomodar commits antes de subir

Si aun no has hecho `push`, puedes reorganizar commits locales con:

```powershell
git rebase -i HEAD~4
```

Eso te sirve para:

- reordenar commits
- combinar commits
- cambiar mensajes

Si solo quieres cambiar el mensaje del ultimo:

```powershell
git commit --amend -S -m "feat(frontend): mensaje corregido"
```

Haz esto solo si todavia no compartiste esos commits con otras personas.

## 14. Buenas practicas para que se vea profesional

- Usa mensajes cortos pero concretos.
- No subas un commit enorme si puedes separarlo por intencion.
- Firma todos los commits.
- Revisa el stage antes de cada commit.
- No metas archivos accidentales.
- Si un cambio no pertenece al commit actual, dejalo fuera del stage.

## 15. Plantilla simple para tus mensajes

Puedes usar esta estructura:

```text
feat(frontend): ...
fix(frontend): ...
refactor(frontend): ...
style(frontend): ...
chore(frontend): ...
```

Ejemplos:

```text
feat(frontend): conectar catalogo con backend
feat(frontend): enviar formulario de contacto a la API
fix(frontend): corregir mapeo de producto en detalle
style(frontend): pulir layout del shell principal
```

## 16. Resumen corto

Si quieres que el historial se vea como varios avances pequenos y no como un solo bloque:

- usa `git add -p`
- arma commits por intencion
- revisa con `git diff --staged`
- firma cada commit con `git commit -S`
- empuja solo cuando el historial ya este limpio

Eso no solo "parece" mejor: realmente deja un historial mucho mas profesional y facil de revisar.
