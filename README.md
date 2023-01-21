# 1. Description détaillée du probleme du taquin:

Le taquin est un jeu solitaire en forme de damier créé vers 18701 aux États-Unis. Sa théorie mathématique a été publiée
par l'American Journal of mathematics pure and applied en 1879. En 1891, son invention fut revendiquée par Sam Loyd, au
moment où le jeu connaissait un engouement considérable, tant aux États-Unis qu'en Europe. Il est composé de 15 petits
carreaux numérotés de 1 à 15 qui glissent dans un cadre prévu pour 16. Il consiste à remettre dans l'ordre les 15
carreaux à partir d'une configuration initiale quelconque. Le principe a été étendu à toutes sortes d'autres jeux. La
plupart sont à base de blocs rectangulaires plutôt que carrés, mais le but est toujours de disposer les blocs d'une
façon déterminée par un nombre minimal de mouvements. Le Rubik's Cube est aujourd'hui considéré comme l'un des « descendants » du taquin.

# 2. Algorithmes

## DFS:

```procédure DFS(nœud courant)
    marquer nœud courant comme visité
    pour chaque nœud adjacent non visité à nœud courant
        DFS(nœud adjacent)
```

## BFS:

```procédure BFS(nœud départ)
    mettre nœud départ dans la file
    marquer nœud départ comme visité
    tant que la file n'est pas vide
        nœud courant = retirer le premier élément de la file
        pour chaque nœud adjacent non visité à nœud courant
            mettre nœud adjacent dans la file
            marquer nœud adjacent comme visité
```

## A\*

```procédure A*(nœud départ, nœud objectif)
    mettre nœud départ dans la liste ouverte avec un coût g(nœud départ) = 0
    tant que la liste ouverte n'est pas vide
        nœud courant = nœud avec le coût f(n) le plus faible dans la liste ouverte
        retirer nœud courant de la liste ouverte
        mettre nœud courant dans la liste fermée
        si nœud courant est l'objectif
            retourner le chemin jusqu'à l'objectif
        pour chaque nœud adjacent à nœud courant
            si nœud adjacent est déjà dans la liste fermée, continuer
            coût g(nœud adjacent) = coût g(nœud courant) + coût pour aller de nœud courant à nœud adjacent
            coût h(nœud adjacent) = estimation de la distance de nœud adjacent à l'objectif (fonction heuristique)
            coût f(nœud adjacent) = coût g(nœud adjacent) + coût h(nœud adjacent)
            si nœud adjacent n'est pas encore dans la liste ouverte, l'ajouter à la liste ouverte
            sinon, si le coût f(nœud adjacent) est meilleur que le coût actuel, mettre à jour le coût f(nœud adjacent)
```
