# infomaniakTest

Il s'agit de ma solution du test d'entrée à infomaniak.

Le backend a été réalisé en Node Js avec le module express pour le server http.


Il y a plusieurs routes qui correspondent à l'application que j'ai créee. Les premières sont des routes pour l'algorithme de résolution du problème.
- https://infomaniaktest.herokuapp.com/v1  La première version de l'algorithme
- https://infomaniaktest.herokuapp.com/v2  La deuxième version de l'algorithme
- https://infomaniaktest.herokuapp.com/    La dernière version de l'algorithme

Les adresses sont requêtables selon le sujet. C'est à dire avec une requête du même format et sous POST.

## Première version de l'algorithme

Il s'agit d'une version assez basique. En effet, l'algorithme test juste si le paquets peut être délivré par le livreur courant. Si la distance parcourue par le livreur ainsi que son retour à son point de départ dépasse les 240Km alors on passe au prochain packet. Si un packet peut-être délivré alors on passe au prochain livreur et au prochain packet afin de faire une distribution assez équitable. 
Le problème de cet algorithme est la perte des paquets, chaque paquets qui ne peuvent pas être livré par le livreur courant sont perdu. Ce qui peut-être assez problématique pour une optimisation du nombre de paquets délivrés.

## Deuxième version de l'algorithme

Le principe d'amélioration de la deuxième version essaie de distribué le plus de paquets possible. La majeur différence provient de la détérmination du livreur courant. Il est déterminé par rapport à la distance qu'il a déjà parcourue. On prend donc celui qui en le moins de distance parcourue.
Cet algorithme améliore donc le nombre de paquets distribués car s'ils ne peuvent pas être pris par le livreur avec le moins de distance parcourue alors il ne peut tout simplement pas être distribué. De plus, cela reste une distribution équitable car les livreurs étant payé par la distance parcourue auront tous une distance proche les uns des autres. Celui qui livre le packet à peu de chance de livrer le prochain car sa distance à augmentée.

## Troisième version de l'algorithme

La dernière itération de l'algorithme est une amélioration de la précédente. Maintenant que le choix des livreurs est optimisé, il ne reste plus que le choix du paquet. Celui-ci est le plus proche parmis les paquets du livreur courant. Ainsi le nombre de paquet laissé de côté diminue fortement. Si un paquet ne peut pas être livré par le livreur ayant le moins de distance parcourue et qui est juste à côté alors il y a très peu de chance qu'il puisse l'être.
De plus les paquets livrés sont enlevés de la liste donc chaque paquet sont traités au moins une fois.


