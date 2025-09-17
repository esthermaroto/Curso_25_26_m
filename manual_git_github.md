# Manual configurar github por ssh

## Instalación de la clave de Github

**Crea la clave de ssh para Github**

```bash
ssh-keygen -t ed25519 -C "esther.maroto.torres@gmail.com"
```

Una vez creada la clave la añadimos a Github en la sección de de configuración de **SSH and GPG keys** copiándola completa del resultado del siguiente comando, en el apartado "Key":

``` bash
cat ~/.ssh/id_ed25519.pub
```

![imagen ssh](/img/img2.png)


## Añadir la clave a Agent 

En Windows, abrimos **PowerShell** en modo administrador e introducimos los siguientes comandos para poder añadir la clave.

```bash
Get-Service ssh-agent | Set-Service -StartupType Automatic 
```

>Obtiene el servicio de Windows para guardar claves ssh

```bash
Set-Service ssh-agent
```

```bash
ssh-add ~/.ssh/id_ed25519
```

>Añade la clave privada al _ssh-agent_ 



![imagen pwd](/img/img1.png)

Ya estaría añadida la clave en la memoria del _ssh-agent_

## Verificar la clave 

Para comprobar que hemos añadido la clave corectamente, de nuevo en **Git bash**

``` bash 
ssh -T git@github.com
```

Al introducir este comando nos debe de salir  un mensaje de confirmación, con nuestro nombre de usuario de github:

![imagen git](/img/img3.png)


