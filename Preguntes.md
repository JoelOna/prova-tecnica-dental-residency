### 1. Explica brevemente qué es Node.js y en qué se diferencia de otras tecnologías de servidor.

Node.js es un entorno de ejecución de JavaScript. Se diferencia principalemente en que es un multiplataforma, es asíncrono.

### 2. Menciona tres ventajas principales de usar Node.js en comparación con otros entornos de servidor.

- Mejor rendimiento, ya que al utilizar un sistema de evento permite que no se quede bloqueado el proceso principal
- Ecosistema de paquetes, al utilizar NPM hay mayor facilidad de reutilizar código de otros desarolladores.
- Mayor facilidad de capacidad de desarollo, ya que en Node se escribe código en JavaScript, es más fácil adaptarse si ya estás famirializado con JavaScript.


### 3. ¿Qué es npm? ¿Para qué se utiliza en el desarrollo de aplicaciones Node.js?

NPM es un administrador de paquetes de Node. Se utiliza para descargar dependencias y paquetes para nuestros proyectos.

### 4. Describe el concepto de "callback" en Node.js y su relevancia en la programación asincrónica.

Són funciones que se ejecutan cuándo acaba una tarea. Cuándo acabe de leer archivo ejecutar el `console.log('Resultado del archivo: ',txt)` , mientras se va ejecutando el código que hay a continuación, és decir el `console.log('Leyendo archivo...')` .

```
fs.readFile('./datos','utf-8',(error, txt)=>{
    console.log('Resultado del archivo: ',txt)
})
console.log('Leyendo archivo...')
```

### 5. ¿Qué son los módulos en Node.js? Proporciona un ejemplo de cómo puedes importar y utilizar un módulo en una aplicación.
Los modulos sirven para separar el código en diferentes ficheros que se pueden importar y exportar para no repetir código. Hay dos tipos de modulso en Node.js:

**Commonjs**
```
const userValidation = (name,password)=>{
    for (const user of users){
          if(name === user.userName && password === user.password){
               return true
          }
        }
        return false
    }
    module.exports = userValidation
```


*Importación*
    `const userValidation = require('./controller/userValidation')`

**ES Modules**
```
export function userValidation (name,password){
        for (const user of users){
            if(name === user.userName && password === user.password){
                return true
            }
        }
        return false
    }
```


*Importación*
    `const {userValidation} from './controller/userValidation'`