# Task Management App
## _Pasos para ejecutar_

```sh
git clone https://github.com/JuanOssa1/Todo-App.git
npm i
npm run dev
```
## _O accede de manera remota desde este link_
https://todo-app-ten-delta-70.vercel.app/

La arquitectura utilizada fue un hibrido entre feature-driven y type, es decir, las estructura por una parte está definida por features y la otra por tipos. La idea detrás de esto es que cuando el developer entre al desarrollar entienda de manera rápida en que consiste el proyecto sin necesidad de dar tantas vueltas. Por otra parte, se mantienen cierta estructura por tipos, de tal forma que también sea fácil desde una perspectiva de desarrollo
## Decisiones tecnicas clave
No hay una arquitectura ni una solución perfecta todas tienen sus pros y sus cons, en concreto en este proyecto se quiso priorizar la escalabilidad

- Framework: React, tengo experiencia con él, está bien documentado y facilita muchas tareas que en JS Vanilla resultan dispendiosas. Por otro lado, hice uso de TypeScript facilita mucho el desarrollo y la escalabilidad.
- Manejo del estado: Redux, ofrece un rendimiento excelente y logra centralizar el estado de la aplicación evitando el “prop drilling” quizás un poco “overkill” pero como mencione anteriormente la idea era priorizar la escalabilidad.
- Manejo de los forms: Si bien considere redux por su flexibilidad y formik por su simpleza al final opte por react hook forms, puesto que era lo suficientemente flexible y permitía una implementación medianamente sencilla con MUI. Por otro lado, también es escalable puesto que es una librería bastante conocida por su rendimiento.
- Estilos: Escogí la librería de MUI por un lado me encuentro familiarizada con ella por experiencias previas y por el otro está muy bien y respaldada por google, tiene la pequeña desventaja de que la mayoría de sus estilos de manejan in-line y en principio esto podría parecer una mala practica la realidad es que así es su funcionamiento esperado. Pero tiene un gran plus, nativamente es accesible.
- Navegación: Escogí React router, facil implementación, escalable no hay mucho que agregar en este apartado.
- Persistencia: Firestore, en oportunidades previas he trabajado con el y es una herramienta muy versátil que se integra muy bien con el desarrollo web. La única desventaja es que para esta aplicación en concreto en la que los proyectos tienen relacionadas tareas lo ideal hubiera sido SQL, sin embargo, las queries en firestore están muy optimizadas.

## Oportunidades de mejora
- Mejorar el tema de las importaciones de los archivos esto se puede solucionar mediante un archivo index.
- Terminar el error handling y dar feedback de este al usuario cuando sea necesario, de momento estos se imprimen por consola seria integrarlos a la UI
- Realizar paginación/lazy loading, idea es realizar una paginación con un infinite scroll, cuando se detecte que el usuario ha llegado al final de la página se ejecutaría una función loadMore() 
- Continuar el desarrollo de nuevas features
## Notas
El firestore.ts con los secrets se encuentra subido en el repositorio por fines practicos

