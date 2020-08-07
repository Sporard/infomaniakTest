<h1 align="center">Bienvenue sur le README du test d'entrée à Infomaniak 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://infomaniaktest.herokuapp.com/api-docs" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Sporard/infomaniakTest/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Sporard/infomaniakTest/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/Sporard/infomaniaktest" />
  </a>
</p>

> Test d'infomaniak pour l'alternance

### 🏠 [Homepage](https://github.com/Sporard/infomaniakTest#readme)

### ✨ [Demo](https://infomaniaktest.herokuapp.com)

## Installation
Si le host de l'api ne fonctionne pas vous pouvez l'installer directement sur une machine pour cela il vous faudra Node JS.

[Télécharger Node JS ](https://nodejs.org/en/)

Puis clonez le dépôt et aller dans le dossier correspondant 
```
git clone https://github.com/Sporard/infomaniakTest.git
cd infomaniakTest
```


```sh
npm install
```

## Utilisation

```sh
npm start
```

le serveur sera alors normalement accessible sur [localhost](localhost:3000).

## Travail effectué


Il s'agit de ma solution du test d'entrée à infomaniak.

Le backend a été réalisé en Node Js avec le module express pour le server http.


Il y a plusieurs routes qui correspondent à l'application que j'ai créee. Les premières sont des routes pour l'algorithme de résolution du problème.
- [La première version de l'algorithme](#Première-version-de-l'algorithme)  
- [La deuxième version de l'algorithme](#Deuxième-version-de-l'algorithme)  
- [La dernière version de l'algorithme](#Troisième-version-de-l'algorithme)

Les adresses sont requêtables selon le sujet. C'est à dire avec une requête du même format et sous POST.

Ce README se divise en deux partie:
- [La partie expliquant les algorithmes utilisés](#L'algorithme)
- [Une partie expliquant l'API créee](#L'API)
### L'algorithme 
Le problème ressemble à un problème de sac à dos avec multiples sac. Or ce problème est NP-Complet, je n'ai donc la prétention d'avoir la solution exacte à chaque fois.
Cependant dans cette section je vais vous décrire les différentes version de l'algorithme pour résoudre le problème soumis dans le sujet.
### Première version de l'algorithme

Il s'agit d'une version assez basique. En effet, l'algorithme test juste si le paquets peut être délivré par le livreur courant. Si la distance parcourue par le livreur ainsi que son retour à son point de départ dépasse les 240Km alors on passe au prochain packet. Si un packet peut-être délivré alors on passe au prochain livreur et au prochain packet afin de faire une distribution assez équitable. 
Le problème de cet algorithme est la perte des paquets, chaque paquets qui ne peuvent pas être livré par le livreur courant sont perdu. Ce qui peut-être assez problématique pour une optimisation du nombre de paquets délivrés.

### Deuxième version de l'algorithme

Le principe d'amélioration de la deuxième version essaie de distribué le plus de paquets possible. La majeur différence provient de la détérmination du livreur courant. Il est déterminé par rapport à la distance qu'il a déjà parcourue. On prend donc celui qui en le moins de distance parcourue.
Cet algorithme améliore donc le nombre de paquets distribués car s'ils ne peuvent pas être pris par le livreur avec le moins de distance parcourue alors il ne peut tout simplement pas être distribué. De plus, cela reste une distribution équitable car les livreurs étant payé par la distance parcourue auront tous une distance proche les uns des autres. Celui qui livre le packet à peu de chance de livrer le prochain car sa distance à augmentée.

### Troisième version de l'algorithme 
La dernière itération de l'algorithme est une amélioration de la précédente. Maintenant que le choix des livreurs est optimisé, il ne reste plus que le choix du paquet. Celui-ci est le plus proche parmis les paquets du livreur courant. Ainsi le nombre de paquet laissé de côté diminue fortement. Si un paquet ne peut pas être livré par le livreur ayant le moins de distance parcourue et qui est juste à côté alors il y a très peu de chance qu'il puisse l'être.
De plus les paquets livrés sont enlevés de la liste donc chaque paquet sont traités au moins une fois.


## L'API

Maintenant que l'algorithme déterminant une solution au problème, cela reste néamoins pas très pratique si on veut mettre en oeuvre une résolution concrete. C'est pourquoi j'ai créer un prototype d'API qui pourrait permettre de construire un site ou une application permettant la gestion des livraisons des paquets.

Plus de détail technique se trouve sur la documentation swagger de l'api.
- [version WEB](https://infomaniaktest.herokuapp.com/api-docs)
- [version README](#Doc-de-l'api)

### Les ressources

L'api se repose sur les principales ressources du sujet : les livreurs et les paquets. 

### Fonctionnement de l'API

Les livraisons fonctionne sous forme de jour. C'est à dire que chaque requête sur la route POST /api/delivery avec les données souhaitées en body est à considérer comme un nouveau jour, où chaque paquets sont nouveaux et que les livreurs sont ceux travaillant aujourd'hui.
A chaque nouvelle journée, nous ajoutons les nouveau livreurs dans la liste des livreurs. Puis [la dernière version de l'algorithme](#Troisième-version-de-l'algorithme) se charge de distribué les paquets sauf que cette fois-ci chaque paquets non livrés sont mis en attente et ils passeront prioritaire le lendemain.


### Doc de l'api
<!-- markdown-swagger -->
 Endpoint                   | Method | Auth? | Description                                                                                    
 -------------------------- | ------ | ----- | -----------------------------------------------------------------------------------------------
 `/api`                     | GET    | No    | This function is used to get all the data stocked by the API                                   
 `/api/delivery`            | POST   | No    | This function is used to get the list of delivery of the current day                           
 `/api/mailmen`             | GET    | No    | This function is used to have all the mailmens stocked by the API                              
 `/api/mailmen/:idMailmen`  | GET    | No    | This function is used to get on specific mailmen in all the mailmen stocked by the api         
 `/api/packages`            | GET    | No    | This function is used to have all the package delivered  by the API                            
 `/api/packages/:idPackage` | GET    | No    | This function is used to get on specific package delivered by the api                          
 `/api/waiting`             | GET    | No    | This function is used to have all the package waiting to be delivered                          
 `/api/waiting/:idWaiting`  | GET    | No    | This function is used to have all the package waiting to be delivered                          
 `/v3`                        | POST   | No    | This function is used to get a solution of the problem with the last version of the algorithm  
 `/v1`                      | POST   | No    | This function is used to get a solution of the problem with the first version of the algorithm 
 `/v2`                      | POST   | No    | This function is used to get a solution of the problem with the second version of the algorithm
<!-- /markdown-swagger -->

## Author

👤 **Pierre Sabard**

* Website: https://www.linkedin.com/in/pierre-sabard/
* Github: [@Sporard](https://github.com/Sporard)
* LinkedIn: [@pierre sabard](https://linkedin.com/in/pierre sabard)



## 📝 License

Copyright © 2020 [Pierre Sabard](https://github.com/Sporard).<br />
This project is [ISC](https://github.com/Sporard/infomaniakTest/blob/master/LICENSE) licensed.

