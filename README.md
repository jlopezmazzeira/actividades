# Proyecto Registro de Actividades
Este es un proyecto que esta destinado para llevar el registro de actividades de los usuarios y las cantidades de horas que trabajan en el desarrollo de cada uno de los proyectos a los que pertenece.

Dicho proyecto esta desarrollado con **Angular CLI en su versión 7.2.3**, **Node en su versión 10.15.0** y **MongoDB 3.22.2**.

El proyecto cuenta con 2 directorios, uno donde se encuentra el frontend el cual esta desarrollado con Angular y tiene por nombre **actividades** este directorio contiene los componentes principales, los servicios que se comunicarán con el backend, pipes y módulos. El segundo directorio **backend-server** contiene las rutas, las entidades que serán nuestros modelos, los servicios con los que proveerá al frontend y esta desarrollado con Node y Express.

### Pre-requisitos 📋
_Para poder ejecutar el proyecto en tu máquina local debes tener pre-instaladas las siguientes herramientas:_

```
Angular CLI 7.2.3
Node 10.15.0
MongoDB 3.22.2
```

### Instalación 🔧
_Antes de ejecutar el proyecto debes instalar las dependencias que son necesarias para que se ejecute de manera correcta y lo hacemos de la siguiente forma:_

_Primero instalamos las dependencias en el directorio **backend-server**_

```
cd backend-server
npm install
```
_Y luego instalamos las dependencias en el directorio **actividades**_

```
cd actividades
npm install
```

## Ejecución 🚀
_Para ejecutar debemos tener dos terminales o CMD abiertas ya que el backend y el frontend estan en directorios distintos._

```
cd backend-server
npm start
```

```
cd actividades
ng serve
```

_Y luego abrir una ventana del navegador y colocar **http://localhost:4200/ para poder visualizar el login._
